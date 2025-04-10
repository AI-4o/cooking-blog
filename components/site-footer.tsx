import Link from "next/link"
import { Instagram, Facebook, Twitter } from "lucide-react"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Cucina Deliziosa</h3>
            <p className="text-sm text-muted-foreground">
              Un blog di cucina italiana con ricette tradizionali e innovative, consigli culinari e tendenze
              gastronomiche.
            </p>
            <div className="flex space-x-3">
              <Link href={siteConfig.links.instagram}>
                <Button variant="ghost" size="icon">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Button>
              </Link>
              <Link href={siteConfig.links.facebook}>
                <Button variant="ghost" size="icon">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Button>
              </Link>
              <Link href={siteConfig.links.twitter}>
                <Button variant="ghost" size="icon">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Button>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Link rapidi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/ricette" className="hover:underline">
                  Tutte le ricette
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  Chi siamo
                </Link>
              </li>
              <li>
                <Link href="/contatti" className="hover:underline">
                  Contatti
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Categorie</h3>
            <ul className="space-y-2 text-sm">
              {siteConfig.categories.map((category) => (
                <li key={category.title}>
                  <Link href={category.href} className="hover:underline">
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Newsletter</h3>
            <p className="text-sm text-muted-foreground">Iscriviti per ricevere nuove ricette e aggiornamenti.</p>
            <div className="flex flex-col space-y-2">
              <Input placeholder="La tua email" type="email" />
              <Button>Iscriviti</Button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Cucina Deliziosa. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  )
}
