import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'tailwindcss/tailwind.css';
import { format } from 'date-fns';
import InputMask from 'react-input-mask';
import axios from 'axios';
import Modal from './Modal';
import Link from 'next/link';

export default function Home() {
const { register, handleSubmit, formState: { errors } } = useForm();
const [showModal, setShowModal] = useState(false);

const onSubmit = async (data) => {
try {
await axios.post('/api/submit-form', data);
console.log('Form submission successful');
// Show success modal
setShowModal(true);
} catch (error) {
console.error('Failed to submit form:', error);
}
};

const closeModal = () => {
setShowModal(false);
};

return (
<div className="flex justify-center items-center min-h-screen">
<form onSubmit={handleSubmit(onSubmit)} className="w-64">
<div className="mb-4">
<label htmlFor="name" className="block mb-2 font-medium">
Nome
</label>
<input
type="text"
id="name"
{...register('name', { required: true })}
className="w-full px-3 py-2 border rounded-md"
/>
{errors.name && <p className="text-red-500">Nome é obrigatório</p>}
</div>
<div className="mb-4">
<label htmlFor="email" className="block mb-2 font-medium">
Email
</label>
<input
type="email"
id="email"
{...register('email', { required: true })}
className="w-full px-3 py-2 border rounded-md"
/>
{errors.email && <p className="text-red-500">Email é obrigatório</p>}
</div>
<div className="mb-4">
<label htmlFor="date" className="block mb-2 font-medium">
Data
</label>
<InputMask
mask="99/99/9999"
type="text"
id="date"
{...register('date', { required: true })}
className="w-full px-3 py-2 border rounded-md"
/>
{errors.date && <p className="text-red-500">Data é obrigatória</p>}
</div>
<div className="mb-4">
<label htmlFor="shoeSize" className="block mb-2 font-medium">
Tamanho do Sapato
</label>
<select
id="shoeSize"
{...register('shoeSize', { required: true })}
className="w-full px-3 py-2 border rounded-md"
>
<option value="31">31</option>
<option value="32">32</option>
<option value="33">33</option>
<option value="43">43</option>
<option value="44">44</option>
<option value="45">45</option>
</select>
{errors.shoeSize && <p className="text-red-500">Tamanho do Sapato é obrigatório</p>}
</div>
<div className="mb-4">
<label htmlFor="jerseySize" className="block mb-2 font-medium">
Tamanho da Camiseta
</label>
<select
id="jerseySize"
{...register('jerseySize', { required: true })}
className="w-full px-3 py-2 border rounded-md"
>
<option value="P">P</option>
<option value="PP">PP</option>
<option value="PM">PM</option>
<option value="M">M</option>
<option value="G">G</option>
<option value="GG">GG</option>
</select>
{errors.jerseySize && <p className="text-red-500">Tamanho da Camiseta é obrigatório</p>}
</div>
<button type="submit" className="w-full py-2 text-white bg-black rounded-md">
Enviar
</button>
</form>
{showModal && (
<Modal closeModal={closeModal}>
<h2 className="text-xl font-bold mb-4">Formulário enviado com sucesso!</h2>
<p className="mb-4">Obrigado pelo envio.</p>
<Link href="/api/download-excel" className="download-button hover:text-blue-500">
<strong>Download do Arquivo Excel</strong>
</Link>
</Modal>
)}
</div>
);
}