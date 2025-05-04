import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getAllRecipes } from "@/lib/mdx"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import PwaInstallation from "@/components/pwa-installation"


export const metadata = {
  title: "Cucina Deliziosa | Ricette e consigli culinari",
  description: "Un blog di cucina italiana con ricette tradizionali e innovative",
  manifest: "/manifest.json", // add manifest to all pages
  keywords: ["cucina italiana", "ricette", "cibo", "blog di cucina"],
  openGraph: {
    title: "Cucina Deliziosa | Ricette e consigli culinari",
    description: "Un blog di cucina italiana con ricette tradizionali e innovative",
    type: "website",
    url: "https://cucina-deliziosa.vercel.app",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cucina Deliziosa",
      },
    ],
  },
}

export default async function Home() {
  const recipes = await getAllRecipes()
  const featuredRecipes = recipes.slice(0, 3)
  const recentRecipes = recipes.slice(3, 9)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 to-black/40" />
          <Image
            src="/cucina-top.png"
            alt="Cucina Deliziosa"
            width={1200}
            height={600}
            className="w-full h-[500px] object-cover"
            priority
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Cucina Deliziosa</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-6 max-w-2xl">
              Scopri il gusto autentico della cucina italiana con le nostre ricette tradizionali e creative
            </p>
            <div className="flex gap-4">
              <Button size="lg" asChild>
                <Link href="/ricette">
                  Esplora le ricette <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <PwaInstallation />
            </div>
          </div>
        </div>
      </section >

      {/* Featured Recipes */}
      < section className="mb-16" >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Ricette in evidenza</h2>
          <Link href="/ricette" className="text-primary hover:underline">
            Vedi tutte
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredRecipes.map((recipe) => (
            <Card key={recipe.slug} className="overflow-hidden h-full flex flex-col">
              <div className="relative h-48">
                <Image
                  src={recipe.frontmatter.image || "/placeholder.svg?height=200&width=400"}
                  alt={recipe.frontmatter.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex gap-2 mb-2">
                  {recipe.frontmatter.categories?.slice(0, 2).map((category: string) => (
                    <Badge key={category} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-xl font-bold">{recipe.frontmatter.title}</h3>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-3">{recipe.frontmatter.excerpt}</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/ricette/${recipe.slug}`}>Leggi ricetta</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section >

      {/* Recent Recipes */}
      < section >
        <h2 className="text-3xl font-bold mb-8">Ultime ricette</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentRecipes.map((recipe) => (
            <Link
              key={recipe.slug}
              href={`/ricette/${recipe.slug}`}
              className="group flex gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                <Image
                  src={recipe.frontmatter.image || "/placeholder.svg?height=80&width=80"}
                  alt={recipe.frontmatter.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold group-hover:text-primary transition-colors">{recipe.frontmatter.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{recipe.frontmatter.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section >
    </div >
  )
}
