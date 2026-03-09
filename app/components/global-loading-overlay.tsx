"use client"

import { useEffect, useState } from "react"
import { useUIStore } from "@/app/dashboard/stores/ui.store"

export function GlobalLoadingOverlay() {
  const { globalLoading } = useUIStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !globalLoading) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center pointer-events-auto">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl p-8 flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-slate-200 dark:border-slate-700 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-red-600 dark:border-t-red-500 rounded-full animate-spin"></div>
        </div>
        {/* Loading Text */}
        <p className="text-slate-700 dark:text-slate-300 font-medium">Loading...</p>
      </div>
    </div>
  )
}
