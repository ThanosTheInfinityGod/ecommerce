// src/app/page.tsx
'use client'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const handleLogout = async () => {
    await supabase.auth.signOut()
    location.reload()
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Welcome to Immersive E-Commerce 🛒</h1>
      <p className="text-gray-600">Your journey into 3D & AR commerce starts here.</p>
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
      >
        Logout
      </button>
    </div>
  )
}
