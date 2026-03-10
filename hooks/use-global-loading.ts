"use client"

import { useUIStore } from "@/app/dashboard/stores/ui.store"

/**
 * Hook to control global loading state
 * 
 * Usage:
 * const { startLoading, stopLoading } = useGlobalLoading()
 * 
 * // Start loading
 * startLoading()
 * 
 * // Stop loading
 * stopLoading()
 * 
 * // Or use as a wrapper:
 * const result = await withGlobalLoading(async () => {
 *   return await fetchData()
 * })
 */
export function useGlobalLoading() {
  const { setGlobalLoading } = useUIStore()

  const startLoading = () => setGlobalLoading(true)
  const stopLoading = () => setGlobalLoading(false)

  const withGlobalLoading = async <T,>(
    asyncFn: () => Promise<T>
  ): Promise<T> => {
    try {
      startLoading()
      const result = await asyncFn()
      return result
    } finally {
      stopLoading()
    }
  }

  return {
    startLoading,
    stopLoading,
    withGlobalLoading,
  }
}
