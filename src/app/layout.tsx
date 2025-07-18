// src/app/layout.tsx

import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Immersive E-Commerce',
  description: '3D + AR shopping for the future',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
