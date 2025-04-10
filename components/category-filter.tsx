"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Check, ChevronsUpDown, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

interface CategoryFilterProps {
  categories: string[]
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [open, setOpen] = React.useState(false)
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([])

  React.useEffect(() => {
    // Get categories from URL
    const categoryParam = searchParams.get("categoria")
    if (categoryParam) {
      setSelectedCategories(categoryParam.split(","))
    } else {
      setSelectedCategories([])
    }
  }, [searchParams])

  const handleSelect = (currentValue: string) => {
    const newSelected = selectedCategories.includes(currentValue)
      ? selectedCategories.filter((cat) => cat !== currentValue)
      : [...selectedCategories, currentValue]

    setSelectedCategories(newSelected)

    // Update URL params
    const params = new URLSearchParams(searchParams.toString())
    if (newSelected.length > 0) {
      params.set("categoria", newSelected.join(","))
    } else {
      params.delete("categoria")
    }

    router.push(`/ricette?${params.toString()}`)
  }

  const clearFilters = () => {
    setSelectedCategories([])
    const params = new URLSearchParams(searchParams.toString())
    params.delete("categoria")
    router.push(`/ricette?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full md:w-[200px] justify-between"
          >
            Filtra per categoria
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full md:w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Cerca categoria..." />
            <CommandList>
              <CommandEmpty>Nessuna categoria trovata.</CommandEmpty>
              <CommandGroup>
                {categories.map((category) => (
                  <CommandItem key={category} value={category} onSelect={() => handleSelect(category)}>
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedCategories.includes(category) ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {category}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="flex flex-wrap gap-2 mt-2">
        {selectedCategories.map((category) => (
          <Badge key={category} variant="secondary" className="gap-1">
            {category}
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-muted-foreground hover:text-foreground"
              onClick={() => handleSelect(category)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Rimuovi {category}</span>
            </Button>
          </Badge>
        ))}

        {selectedCategories.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-6 px-2">
            Rimuovi filtri
          </Button>
        )}
      </div>
    </div>
  )
}
