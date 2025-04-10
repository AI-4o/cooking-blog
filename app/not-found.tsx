import Link from "next/link"
import { ChefHat } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex h-[calc(100vh-8rem)] flex-col items-center justify-center">
      <div className="mx-auto flex max-w-[450px] flex-col items-center justify-center text-center">
        <ChefHat className="h-24 w-24 text-muted-foreground" />
        <h1 className="mt-6 text-3xl font-bold">Pagina non trovata</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Ops! Sembra che la ricetta che stai cercando sia andata persa nella dispensa.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild>
            <Link href="/">Torna alla home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/ricette">Esplora le ricette</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
