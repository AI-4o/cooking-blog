"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Copy, Facebook, Twitter, Linkedin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ShareButtons() {
  const pathname = usePathname()
  const [copied, setCopied] = useState(false)

  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}${pathname}`
      : `https://cucina-deliziosa.vercel.app${pathname}`

  const handleCopy = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
  }

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`, "_blank")
  }

  const shareToLinkedin = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank")
  }

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground mr-1">Condividi:</span>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={shareToFacebook}>
              <Facebook className="h-4 w-4" />
              <span className="sr-only">Condividi su Facebook</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Facebook</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={shareToTwitter}>
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Condividi su Twitter</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Twitter</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={shareToLinkedin}>
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">Condividi su LinkedIn</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>LinkedIn</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={handleCopy}>
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copia link</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>{copied ? <p>Copiato!</p> : <p>Copia link</p>}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
