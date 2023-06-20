import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'uploads', 'form_data.xlsx');
  const fileStream = fs.createReadStream(filePath);
  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Content-Disposition', 'attachment; filename=form_data.xlsx');
  fileStream.pipe(res);
}