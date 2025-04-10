import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { getAllRecipes } from "@/lib/mdx";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Tutte le ricette",
  description:
    "Esplora la nostra collezione di ricette tradizionali e innovative della cucina italiana",
  openGraph: {
    title: "Tutte le ricette | Cucina Deliziosa",
    description:
      "Esplora la nostra collezione di ricette tradizionali e innovative della cucina italiana",
  },
};

export default async function RecipesPage() {
  const recipes = await getAllRecipes();

  // Extract all unique categories
  const allCategories = Array.from(
    new Set(recipes.flatMap((recipe) => recipe.frontmatter.categories || []))
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Le nostre ricette</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Esplora la nostra collezione di ricette tradizionali e innovative
          della cucina italiana
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <Card
            key={recipe.slug}
            className="overflow-hidden flex flex-col h-full"
          >
            <div className="relative h-48">
              <Image
                src={
                  recipe.frontmatter.image ||
                  "/placeholder.svg?height=200&width=400"
                }
                alt={recipe.frontmatter.title}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex flex-wrap gap-2 mb-2">
                {recipe.frontmatter.categories?.map((category: string) => (
                  <Badge key={category} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>
              <h2 className="text-xl font-bold">{recipe.frontmatter.title}</h2>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>
                  Tempo di preparazione: {recipe.frontmatter.prepTime || "N/A"}
                </span>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <span>
                  Difficoltà: {recipe.frontmatter.difficulty || "Media"}
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground line-clamp-3">
                {recipe.frontmatter.excerpt}
              </p>
            </CardContent>
            <CardFooter>
              <Link
                href={`/ricette/${recipe.slug}`}
                className="text-primary hover:underline w-full text-center py-2 border rounded-md hover:bg-primary/5 transition-colors"
              >
                Leggi ricetta
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
