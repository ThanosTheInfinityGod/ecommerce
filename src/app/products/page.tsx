'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Product = {
  id: string
  name: string
  price: number
  image_url: string
  description: string
  model_url?: string
}

const DEMO_PRODUCTS: Product[] = [
  {
    id: 'demo-1',
    name: 'Matte Black Sunglasses',
    price: 1299,
    image_url: 'https://i.ibb.co/yQ5ZDRW/matte-black-sunglasses.jpg',
    description: 'Matte black UV-protected unisex sunglasses.',
    model_url: 'https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb'
  },
  // ... other demo products
]

export default function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error || !data || data.length === 0) {
        console.warn('⚠️ Using fallback demo products.')
        setProducts(DEMO_PRODUCTS)
      } else {
        setProducts(data)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8 text-center">🛍️ All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="border rounded-2xl shadow bg-white overflow-hidden hover:shadow-xl transition-all">
            <img src={product.image_url} alt={product.name} className="w-full h-60 object-cover" />
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-500">{product.description}</p>
              <p className="font-bold text-lg text-black">₹{product.price}</p>
              <a href={`/product/${product.id}`} className="inline-block mt-2 px-4 py-2 text-white bg-black rounded-xl hover:bg-gray-800">
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
