import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Clock, BarChart3, ChefHat, ArrowLeft } from "lucide-react"

import { getRecipeBySlug, getAllRecipes } from "@/lib/mdx"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { RecipeInteractions } from "@/components/recipe-interactions"
import { MDXContent } from "@/components/mdx-content"
import { RecipeParams } from "@/app/types/next"

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const slug = params.slug;
  const recipe = await getRecipeBySlug(slug);

  if (!recipe) {
    return {
      title: "Ricetta non trovata",
    }
  }

  return {
    title: recipe.frontmatter.title,
    description: recipe.frontmatter.excerpt,
  }
}

export async function generateStaticParams() {
  const recipes = await getAllRecipes()

  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }))
}

export const dynamic = 'force-dynamic';

// Use minimal typing to avoid TypeScript errors
export default async function RecipePage({ params }: any) {
  const slug = params.slug;
  const recipe = await getRecipeBySlug(slug);

  if (!recipe) {
    notFound()
  }

  // Extract the MDX content and serialize it for client-side consumption
  const serializedContent = recipe.content;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link href="/ricette">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Torna alle ricette
          </Link>
        </Button>
      </div>

      <article>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {recipe.frontmatter.categories?.map((category: string) => (
                  <Badge key={category} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>
              <h1 className="text-4xl font-bold mb-4">{recipe.frontmatter.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">{recipe.frontmatter.excerpt}</p>

              <div className="flex flex-wrap gap-6 mb-8">
                {recipe.frontmatter.prepTime && (
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-primary" />
                    <span>Tempo: {recipe.frontmatter.prepTime}</span>
                  </div>
                )}
                {recipe.frontmatter.difficulty && (
                  <div className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                    <span>Difficoltà: {recipe.frontmatter.difficulty}</span>
                  </div>
                )}
                {recipe.frontmatter.servings && (
                  <div className="flex items-center">
                    <ChefHat className="h-5 w-5 mr-2 text-primary" />
                    <span>Porzioni: {recipe.frontmatter.servings}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="relative w-full h-96 rounded-lg overflow-hidden mb-8">
              <Image
                src={recipe.frontmatter.image || "/placeholder.svg?height=500&width=800"}
                alt={recipe.frontmatter.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            <div className="prose prose-stone dark:prose-invert max-w-none">
              <MDXContent content={serializedContent} />
            </div>

            <RecipeInteractions />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-muted/30 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Ingredienti</h2>
                <Separator className="mb-4" />
                <ul className="space-y-2">
                  {recipe.frontmatter.ingredients?.map((ingredient: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {recipe.frontmatter.tips && (
                <div className="bg-muted/30 rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-4">Consigli dello chef</h2>
                  <Separator className="mb-4" />
                  <p>{recipe.frontmatter.tips}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
