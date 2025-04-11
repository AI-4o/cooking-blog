import type React from "react"
import { Inter } from "next/font/google"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  metadataBase: new URL('https://cucina-deliziosa.vercel.app'),
  title: {
    default: "Cucina Deliziosa | Ricette e consigli culinari",
    template: "%s | Cucina Deliziosa",
  },
  description: "Un blog di cucina italiana con ricette tradizionali e innovative",
  keywords: ["cucina italiana", "ricette", "cibo", "blog di cucina"],
  authors: [
    {
      name: "Chef Gustavo Bene",
      url: "https://cucina-deliziosa.vercel.app",
    },
  ],
  creator: "Chef Gustavo Bene",
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://cucina-deliziosa.vercel.app",
    title: "Cucina Deliziosa | Ricette e consigli culinari",
    description: "Un blog di cucina italiana con ricette tradizionali e innovative",
    siteName: "Cucina Deliziosa",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cucina Deliziosa | Ricette e consigli culinari",
    description: "Un blog di cucina italiana con ricette tradizionali e innovative",
    creator: "@cucina_deliziosa",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'