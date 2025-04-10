import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { serialize } from "next-mdx-remote/serialize"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrism from "rehype-prism-plus"

const recipesDirectory = path.join(process.cwd(), "content/ricette")

/**
 * Retrieves all recipe files from the content/ricette directory and returns them as an array of objects.
 * Each recipe object contains its slug and frontmatter data (title, excerpt, date, etc.).
 * Recipes are sorted by date in descending order (newest first).
 * Returns an empty array if the recipes directory doesn't exist.
 */
export async function getAllRecipes() {
 
  if (!fs.existsSync(recipesDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(recipesDirectory)

  const recipes = fileNames
    .map((fileName) => {
      // Remove ".mdx" or ".md" from file name to get id
      const slug = fileName.replace(/\.mdx?$/, "")

      // Read markdown file as string
      const fullPath = path.join(recipesDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")

      // Use gray-matter to parse the metadata section
      const { data } = matter(fileContents)

      // Ensure frontmatter data has the correct shape
      return {
        slug,
        frontmatter: {
          title: data.title || "",
          excerpt: data.excerpt || "",
          date: data.date ? new Date(data.date).toISOString() : "",
          image: data.image || null,
          categories: data.categories || [],
          prepTime: data.prepTime || null,
          cookTime: data.cookTime || null,
          difficulty: data.difficulty || null,
          servings: data.servings || null,
          ingredients: data.ingredients || [],
          tips: data.tips || null,
        },
      }
    })

  // Sort by date
  return recipes.sort((a, b) => {
    if (!a.frontmatter.date || !b.frontmatter.date) return 0
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  })
}

/**
 * Retrieves a single recipe by its slug.
 * Searches for both .mdx and .md file extensions.
 * Returns the recipe content as MDX source along with its frontmatter data.
 * Returns null if the recipe doesn't exist or if the recipes directory doesn't exist.
 * @param slug - The unique identifier of the recipe (filename without extension)
 */
export async function getRecipeBySlug(slug: string) {
  // Ensure the directory exists
  if (!fs.existsSync(recipesDirectory)) {
    return null
  }

  // Try both .md and .mdx extensions
  let fullPath: string | null = null
  if (fs.existsSync(path.join(recipesDirectory, `${slug}.mdx`))) {
    fullPath = path.join(recipesDirectory, `${slug}.mdx`)
  } else if (fs.existsSync(path.join(recipesDirectory, `${slug}.md`))) {
    fullPath = path.join(recipesDirectory, `${slug}.md`)
  }

  if (!fullPath) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")

  // Use gray-matter to parse the post metadata section
  const { content, data } = matter(fileContents)

  // Serialize MDX content for client-side rendering
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }], rehypePrism],
    },
    parseFrontmatter: false, // Already parsed with gray-matter
  })

  const recipe = {
    slug,
    content: mdxSource,
    frontmatter: {
      title: data.title || "",
      excerpt: data.excerpt || "",
      date: data.date ? new Date(data.date).toISOString() : "",
      image: data.image || null,
      categories: data.categories || [],
      prepTime: data.prepTime || null,
      cookTime: data.cookTime || null,
      difficulty: data.difficulty || null,
      servings: data.servings || null,
      ingredients: data.ingredients || [],
      tips: data.tips || null,
    },
  }
  return recipe
}
