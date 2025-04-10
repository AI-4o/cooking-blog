import Link from "next/link"
import { Search, Menu } from "lucide-react"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden w-full max-w-sm md:flex">
            <div className="relative w-full">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Cerca ricette..." className="pl-8" />
            </div>
          </div>
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            <MobileNav />
          </nav>
        </div>
      </div>
    </header>
  )
}

function MainNav() {
  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <span className="text-xl font-bold">Cucina Deliziosa</span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Categorie</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {siteConfig.categories.map((category) => (
                  <li key={category.title} className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        href={category.href}
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">{category.title}</div>
                        <p className="text-sm leading-tight text-muted-foreground">{category.description}</p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/ricette" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Ricette</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/blog" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Blog</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Chi siamo</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <div className="flex flex-col space-y-4 pt-6">
          <Link href="/" className="flex items-center space-x-2 px-2 py-1">
            <span className="text-xl font-bold">Cucina Deliziosa</span>
          </Link>
          <div className="w-full">
            <div className="relative w-full">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Cerca ricette..." className="pl-8 w-full" />
            </div>
          </div>
          <nav className="grid gap-2 py-4">
            <Link
              href="/"
              className="group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium hover:bg-accent"
            >
              Home
            </Link>
            <Link
              href="/ricette"
              className="group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium hover:bg-accent"
            >
              Ricette
            </Link>
            <div className="group mx-2 my-1 text-sm font-medium border-b pb-1">Categorie</div>
            {siteConfig.categories.map((category) => (
              <Link
                key={category.title}
                href={category.href}
                className="group flex w-full items-center rounded-md px-4 py-1 text-sm font-medium hover:bg-accent"
              >
                {category.title}
              </Link>
            ))}
            <Link
              href="/blog"
              className="group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium hover:bg-accent"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium hover:bg-accent"
            >
              Chi siamo
            </Link>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
