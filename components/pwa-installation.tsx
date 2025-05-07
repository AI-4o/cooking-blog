'use client'
import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import PwaModal from "./pwa-install-modal"


export default function PwaInstallation() {
  const [showModal, setShowModal] = useState(false)
  const [beforeInstallPromptEvent, setbeforeInstallPromptEvent] =
    useState<any>(null)

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault()
      setbeforeInstallPromptEvent(event)
    })

    return () => {
      window.removeEventListener("beforeinstallprompt", (event) => {
        event.preventDefault()
        setbeforeInstallPromptEvent(null)
      })
    }
  }, [])

  const handleInstall = () => {
    console.log("beforeInstallPromptEvent", beforeInstallPromptEvent)
    if (beforeInstallPromptEvent) {
      beforeInstallPromptEvent.prompt()
      setbeforeInstallPromptEvent(null)
    }
  }

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <>
      <Button onClick={() => setShowModal(true)} size="lg" className="bg-blue-500 text-white">
        Install the app
      </Button>
      <PwaModal
        show={showModal}
        onClose={handleClose}
        onInstall={handleInstall}
      />
    </>
  )
}





