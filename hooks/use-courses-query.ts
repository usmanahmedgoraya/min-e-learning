"use client"

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useCallback, useMemo } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { getCourses } from "@/app/actions/course.action"

export type CourseFilters = {
  search?: string
  category?: string[]
  level?: string[]
  duration?: string[]
  price?: [number, number]
  sort?: string
  page?: number
  limit?: number
}

export function useCoursesQuery(initialFilters: CourseFilters = {}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()

  // Build query string from filters
  const buildQueryString = useCallback((filters: CourseFilters) => {
    const params = new URLSearchParams()

    if (filters.search) params.set("search", filters.search)
    if (filters.category?.length) params.set("category", filters.category.join(","))
    if (filters.level?.length) params.set("level", filters.level.join(","))
    if (filters.duration?.length) params.set("duration", filters.duration.join(","))
    if (filters.price) params.set("price", `${filters.price[0]}-${filters.price[1]}`)
    if (filters.sort) params.set("sort", filters.sort)
    if (filters.page && filters.page > 1) params.set("page", filters.page.toString())
    if (filters.limit) params.set("limit", filters.limit.toString())

    return params.toString()
  }, [])

  // Parse current filters from URL
  const currentFilters = useMemo(() => {
    const filters: CourseFilters = {
      search: searchParams.get("search") || undefined,
      category: searchParams.get("category")?.split(",") || undefined,
      level: searchParams.get("level")?.split(",") || undefined,
      duration: searchParams.get("duration")?.split(",") || undefined,
      sort: searchParams.get("sort") || undefined,
      page: searchParams.has("page") ? Number.parseInt(searchParams.get("page") || "1") : 1,
      limit: searchParams.has("limit") ? Number.parseInt(searchParams.get("limit") || "9") : 9,
    }

    const priceRange = searchParams.get("price")
    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number)
      filters.price = [min, max]
    }

    return filters
  }, [searchParams])

  // Fetch courses with current filters
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["courses", currentFilters],
    queryFn: async () => {
      const queryString = buildQueryString(currentFilters)
      return getCourses(queryString)
    },
    staleTime: 1000 * 60 * 5,
  })

  // Prefetch next page
  const prefetchNextPage = useCallback(() => {
    if (data && data.count/9 > (currentFilters.page || 1) * (currentFilters.limit || 9)) {
      const nextPageFilters = {
        ...currentFilters,
        page: (currentFilters.page || 1) + 1,
      }
      const queryString = buildQueryString(nextPageFilters)

      queryClient.prefetchQuery({
        queryKey: ["courses", nextPageFilters],
        queryFn: async () => getCourses(queryString),
      })
    }
  }, [data, isFetching, currentFilters, buildQueryString, queryClient])

  // Update filters and URL
  const updateFilters = useCallback(
    (newFilters: Partial<CourseFilters>) => {
      const updatedFilters = { ...currentFilters, ...newFilters }

      // Reset page to 1 when filters change
      if (!newFilters.page && updatedFilters.page !== 1) {
        updatedFilters.page = 1
      }

      const queryString = buildQueryString(updatedFilters)
      router.push(`${pathname}${queryString ? `?${queryString}` : ""}`, { scroll: false })
    },
    [currentFilters, buildQueryString, router, pathname],
  )

  return {
    data,
    isLoading,
    error,
    filters: currentFilters,
    updateFilters,
    prefetchNextPage,
  }
}

