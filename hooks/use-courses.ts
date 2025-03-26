"use client"

import { useState, useEffect, useMemo } from "react"
import { courses, categories, levels, durations } from "@/lib/data"
import { Course } from "@/types/type"
import { RootState } from "@/lib/redux/store"
import { useSelector } from "react-redux"

type FilterState = {
  search: string
  categories: string[]
  levels: string[]
  durations: string[]
  priceRange: [number, number]
  sortBy: string
}

const initialFilters: FilterState = {
  search: "",
  categories: [],
  levels: [],
  durations: [],
  priceRange: [0, 100],
  sortBy: "popular",
}

export function useCourses() {
  const { courses } = useSelector((state: RootState) => state.courses);
  const [filters, setFilters] = useState<FilterState>(initialFilters)
  const [filteredCourses, setFilteredCourses] = useState<Course[]>()


  // Apply filters to courses
  useEffect(() => {
    let result = [...courses]

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      result = result && result?.filter(
        (course) =>
          course.title.toLowerCase().includes(searchLower) ||
          course.description.toLowerCase().includes(searchLower) ||
          course.category.toLowerCase().includes(searchLower) ||
          course.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
      )
    }

    // Apply category filters
    if (filters.categories.length > 0) {
      result = result.filter((course) => filters.categories.includes(course.category.toLowerCase()))
    }

    // Apply level filters
    if (filters.levels.length > 0) {
      result = result.filter((course) => filters.levels.includes(course.level.toLowerCase()))
    }

    // Apply duration filters
    if (filters.durations.length > 0) {
      result = result.filter((course) => {
        const hours = Number.parseInt(course.duration.split(" ")[0])

        return filters.durations.some((duration) => {
          if (duration === "0-5") return hours <= 5
          if (duration === "5-10") return hours > 5 && hours <= 10
          if (duration === "10+") return hours > 10
          return false
        })
      })
    }

    // Apply price range filter
    result = result.filter((course) => course.price >= filters.priceRange[0] && course.price <= filters.priceRange[1])

    // Apply sorting
    if (filters.sortBy === "popular") {
      result.sort((a, b) => b.students - a.students)
    } else if (filters.sortBy === "newest") {
      result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    } else if (filters.sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price)
    } else if (filters.sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price)
    } else if (filters.sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating)
    }

    setFilteredCourses(result)
  }, [filters])

  // Update search term
  const updateSearch = (search: string) => {
    setFilters((prev) => ({ ...prev, search }))
  }

  // Toggle category filter
  const toggleCategory = (category: string) => {
    setFilters((prev) => {
      const categoryLower = category.toLowerCase()
      const exists = prev.categories.includes(categoryLower)

      return {
        ...prev,
        categories: exists ? prev.categories.filter((c) => c !== categoryLower) : [...prev.categories, categoryLower],
      }
    })
  }

  // Toggle level filter
  const toggleLevel = (level: string) => {
    setFilters((prev) => {
      const levelLower = level.toLowerCase()
      const exists = prev.levels.includes(levelLower)

      return {
        ...prev,
        levels: exists ? prev.levels.filter((l) => l !== levelLower) : [...prev.levels, levelLower],
      }
    })
  }

  // Toggle duration filter
  const toggleDuration = (duration: string) => {
    setFilters((prev) => {
      const exists = prev.durations.includes(duration)

      return {
        ...prev,
        durations: exists ? prev.durations.filter((d) => d !== duration) : [...prev.durations, duration],
      }
    })
  }

  // Update price range
  const updatePriceRange = (range: [number, number]) => {
    setFilters((prev) => ({ ...prev, priceRange: range }))
  }

  // Update sort method
  const updateSortBy = (sortBy: string) => {
    setFilters((prev) => ({ ...prev, sortBy }))
  }

  // Reset all filters
  const resetFilters = () => {
    setFilters(initialFilters)
  }

  // Get filter counts
  const filterCounts = useMemo(() => {
    return {
      total: filteredCourses?.length,
      categories: categories.map((category) => ({
        ...category,
        count: courses.filter((course) => course.category.toLowerCase() === category.name.toLowerCase()).length,
      })),
      levels: levels.map((level) => ({
        ...level,
        count: courses.filter((course) => course.level.toLowerCase() === level.name.toLowerCase()).length,
      })),
      durations: durations.map((duration) => {
        let count = 0
        if (duration.value === "0-5") {
          count = courses.filter((course) => Number.parseInt(course.duration.split(" ")[0]) <= 5).length
        } else if (duration.value === "5-10") {
          count = courses.filter((course) => {
            const hours = Number.parseInt(course.duration.split(" ")[0])
            return hours > 5 && hours <= 10
          }).length
        } else if (duration.value === "10+") {
          count = courses.filter((course) => Number.parseInt(course.duration.split(" ")[0]) > 10).length
        }
        return { ...duration, count }
      }),
    }
  }, [filteredCourses?.length])

  return {
    courses: filteredCourses,
    filters,
    filterCounts,
    updateSearch,
    toggleCategory,
    toggleLevel,
    toggleDuration,
    updatePriceRange,
    updateSortBy,
    resetFilters,
  }
}

