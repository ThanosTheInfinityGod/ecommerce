'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (!error) setSent(true)
    else alert('Error sending login link. Check console.')
    console.error(error)
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-xl rounded-2xl p-8 w-[90%] sm:w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold">Login via Magic Link ✨</h2>
        {sent ? (
          <p className="text-green-600">Check your email for the login link!</p>
        ) : (
          <>
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="w-full border px-4 py-2 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800"
            >
              Send Magic Link
            </button>
          </>
        )}
      </form>
    </div>
  )
}