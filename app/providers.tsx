"use client"

import { useEffect, useState } from "react"
import { Toaster } from "sonner"
import { GlobalLoadingOverlay } from "./components/global-loading-overlay"

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      {children}
      {mounted && <Toaster />}
      <GlobalLoadingOverlay />
    </>
  )
}
