"use client"

import { useState } from "react"
import { Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ShareButtons } from "@/components/share-buttons"

export function RecipeInteractions() {
  const [liked, setLiked] = useState(false)

  return (
    <div className="flex items-center justify-between mt-12 pt-6 border-t">
      <Button
        variant={liked ? "default" : "outline"}
        size="sm"
        onClick={() => setLiked(!liked)}
        className={liked ? "bg-red-500 hover:bg-red-600 border-red-500" : ""}
      >
        <Heart className={`mr-2 h-4 w-4 ${liked ? "fill-white" : ""}`} />
        {liked ? "Mi piace!" : "Mi piace?"}
      </Button>

      <ShareButtons />
    </div>
  )
} 