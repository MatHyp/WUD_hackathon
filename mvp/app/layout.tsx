import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { Toaster } from "@/components/ui/toaster"
import { PreferencesProvider } from "@/lib/preferences-context"

const inter = Inter({ subsets: ["latin", "latin-ext"] })

export const metadata: Metadata = {
  title: "Karta Miejska - Twoje miasto w jednej aplikacji",
  description: "Kupuj bilety, odkrywaj wydarzenia i zarządzaj swoją kartą miejską",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        <PreferencesProvider>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
          </PreferencesProvider>
      </body>
    </html>
  )
}
