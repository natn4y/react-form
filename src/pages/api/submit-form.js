import { promises as fs } from 'fs';
import path from 'path';
import ExcelJS from 'exceljs';

const saveToExcel = async (formData) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Form Data');
  sheet.addRow(['Name', 'Date', 'Shoe Size', 'Jersey Size', 'Email']);

  formData.forEach((data) => {
    sheet.addRow([data.name, data.date, data.shoeSize, data.jerseySize, data.email]);
  });

  // Ajustar a largura das colunas
  sheet.columns.forEach((column) => {
    column.width = 15; // Definir a largura desejada (em caracteres)
  });

  const filePath = path.join(process.cwd(), 'uploads', 'form_data.xlsx');
  await workbook.xlsx.writeFile(filePath);
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, date, shoeSize, jerseySize } = req.body;

  if (!name || !email || !date || !shoeSize || !jerseySize) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const formData = {
      name,
      email,
      date,
      shoeSize,
      jerseySize,
    };

    // Read existing data from file, if any
    let existingData = [];
    try {
      const filePath = path.join(process.cwd(), 'uploads', 'form_data.xlsx');
      const fileData = await fs.readFile(filePath);
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(fileData);
      const worksheet = workbook.getWorksheet('Form Data');
      worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        if (rowNumber !== 1) {
          // Skip header row
          existingData.push({
            name: row.getCell(1).value,
            date: row.getCell(2).value,
            shoeSize: row.getCell(3).value,
            jerseySize: row.getCell(4).value,
            email: row.getCell(5).value,
          });
        }
      });
    } catch (error) {
      console.error(error);
    }

    existingData.push(formData);

    await saveToExcel(existingData);

    res.end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to save form data to Excel' });
  }
}
