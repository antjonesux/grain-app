import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { errors } from '@/lib/errorMessages'
import type { JourneyCategoryRow } from '@/types/database.types'

interface UseJourneyCategoriesResult {
  categories: JourneyCategoryRow[]
  error: string | null
  isLoading: boolean
}

export const useJourneyCategories = (): UseJourneyCategoriesResult => {
  const [categories, setCategories] = useState<JourneyCategoryRow[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      setError(null)
      setIsLoading(true)
      try {
        const { data, error: fetchError } = await supabase
          .from('journey_categories')
          .select('id, key, name, created_at')
          .order('key')

        if (fetchError) {
          setError(errors.loadCategories)
          setCategories([])
          return
        }
        setCategories((data ?? []) as JourneyCategoryRow[])
      } catch (err) {
        setError(err instanceof Error ? err.message : errors.loadCategories)
        setCategories([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return { categories, error, isLoading }
}
