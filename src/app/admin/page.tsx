'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Product = {
  id: string
  name: string
  price: number
  image_url: string
  description: string
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [form, setForm] = useState({
    name: '',
    price: '',
    image_url: '',
    description: '',
  })

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    if (data) setProducts(data)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.from('products').insert([{
      ...form,
      price: Number(form.price),
    }])
    if (!error) {
      setForm({ name: '', price: '', image_url: '', description: '' })
      fetchProducts()
    } else {
      alert('Error adding product')
      console.error(error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard 🛠️</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md">
        <input name="name" required value={form.name} onChange={handleChange} placeholder="Product Name" className="w-full border px-4 py-2 rounded-xl" />
        <input name="price" required value={form.price} onChange={handleChange} placeholder="Price" type="number" className="w-full border px-4 py-2 rounded-xl" />
        <input name="image_url" value={form.image_url} onChange={handleChange} placeholder="Image URL" className="w-full border px-4 py-2 rounded-xl" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border px-4 py-2 rounded-xl" />
        <button type="submit" className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800">Add Product</button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-xl bg-white shadow">
            <img src={product.image_url} alt={product.name} className="w-full h-40 object-cover rounded" />
            <h2 className="font-bold mt-2">{product.name}</h2>
            <p className="text-sm text-gray-600">₹{product.price}</p>
            <p className="text-sm">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
