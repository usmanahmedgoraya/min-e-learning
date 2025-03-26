"use client"

import { useState, useCallback, useEffect, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useDebounce } from "use-debounce"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { useCourses } from "@/hooks/use-course-data"
import { CourseCard } from "@/components/course/course-card"
import { CourseCardSkeleton } from "@/components/skeleton/course-card-skeleton"
import { CourseFilters } from "@/components/course/course-filters"
import { SearchInput } from "@/components/search-input"
import { Button } from "@/components/ui/button"
import { categories, levels, durations, courses as allCourses } from "@/lib/data"

export default function CoursesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get query parameters
  const pageParam = searchParams?.get("page")
  const searchParam = searchParams?.get("search")

  // Set up state
  const [page, setPage] = useState(pageParam ? Number.parseInt(pageParam) : 1)
  const [search, setSearch] = useState(searchParam || "")
  const [debouncedSearch] = useDebounce(search, 300)

  // Set up filter state
  const [filters, setFilters] = useState({
    categories: [] as string[],
    levels: [] as string[],
    durations: [] as string[],
    priceRange: [0, 100] as [number, number],
    sortBy: "popular",
  })

  // Fetch courses with React Query
  const {
    data: fetchedData,
    isLoading: isQueryLoading,
    isFetching,
    error: queryError,
  } = useCourses(page, 9, debouncedSearch)

  // Apply client-side filters to the fetched data
  const filteredData = useMemo(() => {
    if (!fetchedData) return { courses: [], pagination: { page: 1, limit: 9, totalItems: 0, totalPages: 0 } }

    let filteredCourses = [...fetchedData.courses]

    // Apply category filters
    if (filters.categories.length > 0) {
      filteredCourses = filteredCourses.filter((course) => filters.categories.includes(course.category.toLowerCase()))
    }

    // Apply level filters
    if (filters.levels.length > 0) {
      filteredCourses = filteredCourses.filter((course) => filters.levels.includes(course.level.toLowerCase()))
    }

    // Apply duration filters
    if (filters.durations.length > 0) {
      filteredCourses = filteredCourses.filter((course) => {
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
    filteredCourses = filteredCourses.filter(
      (course) => course.price >= filters.priceRange[0] && course.price <= filters.priceRange[1],
    )

    // Apply sorting
    if (filters.sortBy === "popular") {
      filteredCourses.sort((a, b) => b.students - a.students)
    } else if (filters.sortBy === "newest") {
      filteredCourses.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    } else if (filters.sortBy === "price-low") {
      filteredCourses.sort((a, b) => a.price - b.price)
    } else if (filters.sortBy === "price-high") {
      filteredCourses.sort((a, b) => b.price - a.price)
    } else if (filters.sortBy === "rating") {
      filteredCourses.sort((a, b) => b.rating - a.rating)
    }

    return {
      courses: filteredCourses,
      pagination: {
        ...fetchedData.pagination,
        totalItems: filteredCourses.length,
        totalPages: Math.ceil(filteredCourses.length / fetchedData.pagination.limit),
      },
    }
  }, [fetchedData, filters])

  // Determine if we're loading
  const isLoading = isQueryLoading || !filteredData

  // Update URL when page or search changes
  useEffect(() => {
    const params = new URLSearchParams()
    if (page > 1) params.set("page", page.toString())
    if (debouncedSearch) params.set("search", debouncedSearch)

    const newUrl = params.toString() ? `?${params.toString()}` : ""
    router.push(`/courses${newUrl}`, { scroll: false })
  }, [page, debouncedSearch, router])

  // Handle search change
  const handleSearchChange = useCallback((value: string) => {
    setSearch(value)
    setPage(1) // Reset to first page on new search
  }, [])

  // Handle page change
  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  // Filter handlers
  const toggleCategory = useCallback((category: string) => {
    setFilters((prev) => {
      const categoryLower = category.toLowerCase()
      const exists = prev.categories.includes(categoryLower)

      return {
        ...prev,
        categories: exists ? prev.categories.filter((c) => c !== categoryLower) : [...prev.categories, categoryLower],
      }
    })
  }, [])

  const toggleLevel = useCallback((level: string) => {
    setFilters((prev) => {
      const levelLower = level.toLowerCase()
      const exists = prev.levels.includes(levelLower)

      return {
        ...prev,
        levels: exists ? prev.levels.filter((l) => l !== levelLower) : [...prev.levels, levelLower],
      }
    })
  }, [])

  const toggleDuration = useCallback((duration: string) => {
    setFilters((prev) => {
      const exists = prev.durations.includes(duration)

      return {
        ...prev,
        durations: exists ? prev.durations.filter((d) => d !== duration) : [...prev.durations, duration],
      }
    })
  }, [])

  const updatePriceRange = useCallback((range: [number, number]) => {
    setFilters((prev) => ({ ...prev, priceRange: range }))
  }, [])

  const updateSortBy = useCallback((sortBy: string) => {
    setFilters((prev) => ({ ...prev, sortBy }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters({
      categories: [],
      levels: [],
      durations: [],
      priceRange: [0, 100],
      sortBy: "popular",
    })
  }, [])

  // Calculate filter counts based on all courses
  const filterCounts = useMemo(
    () => ({
      categories: categories.map((category) => ({
        ...category,
        count: allCourses.filter((course) => course.category.toLowerCase() === category.name.toLowerCase()).length,
      })),
      levels: levels.map((level) => ({
        ...level,
        count: allCourses.filter((course) => course.level.toLowerCase() === level.name.toLowerCase()).length,
      })),
      durations: durations.map((duration) => {
        let count = 0
        if (duration.value === "0-5") {
          count = allCourses.filter((course) => Number.parseInt(course.duration.split(" ")[0]) <= 5).length
        } else if (duration.value === "5-10") {
          count = allCourses.filter((course) => {
            const hours = Number.parseInt(course.duration.split(" ")[0])
            return hours > 5 && hours <= 10
          }).length
        } else if (duration.value === "10+") {
          count = allCourses.filter((course) => Number.parseInt(course.duration.split(" ")[0]) > 10).length
        }
        return { ...duration, count }
      }),
    }),
    [],
  )

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Courses</h1>
        <p className="text-muted-foreground">Browse our collection of courses to enhance your skills and knowledge</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6"
      >
        <SearchInput
          value={search}
          onChange={handleSearchChange}
          placeholder="Search for courses, topics, or keywords..."
          className="max-w-2xl"
          autoSearch={true}
        />
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <CourseFilters
            categories={filterCounts.categories}
            levels={filterCounts.levels}
            durations={filterCounts.durations}
            filters={filters}
            toggleCategory={toggleCategory}
            toggleLevel={toggleLevel}
            toggleDuration={toggleDuration}
            updatePriceRange={updatePriceRange}
            updateSortBy={updateSortBy}
            resetFilters={resetFilters}
            totalResults={filteredData?.pagination.totalItems || 0}
          />
        </div>

        <div className="lg:col-span-3">
          {isFetching && (
            <div className="mb-4 flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Updating results...</span>
            </div>
          )}

          <AnimatePresence mode="wait">
            {isLoading ? (
              // Show skeleton loading instead of full page loader
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {Array(9)
                  .fill(0)
                  .map((_, index) => (
                    <CourseCardSkeleton key={index} />
                  ))}
              </motion.div>
            ) : queryError || !filteredData ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center"
              >
                <h3 className="mb-2 text-xl font-medium">Error Loading Courses</h3>
                <p className="mb-6 text-muted-foreground">
                  There was an error loading the courses. Please try again later.
                </p>
                <Button onClick={() => window.location.reload()}>Refresh Page</Button>
              </motion.div>
            ) : filteredData.courses.length === 0 ? (
              <motion.div
                key="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center"
              >
                <h3 className="mb-2 text-xl font-medium">No courses found</h3>
                <p className="mb-6 text-muted-foreground">Try adjusting your search criteria or filters</p>
                <div className="flex gap-4">
                  <Button onClick={() => handleSearchChange("")}>Clear Search</Button>
                  <Button variant="outline" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="results" variants={container} initial="hidden" animate="show" exit={{ opacity: 0 }}>
                <motion.div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredData.courses.map((course) => (
                    <motion.div key={course.id} variants={item}>
                      <CourseCard course={course} />
                    </motion.div>
                  ))}
                </motion.div>

                {filteredData?.pagination?.totalPages > 1 && (
                  <motion.div
                    className="mt-8 flex items-center justify-center space-x-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {Array.from({ length: filteredData.pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <Button
                        key={pageNum}
                        variant={pageNum === page ? "default" : "outline"}
                        size="icon"
                        onClick={() => handlePageChange(pageNum)}
                        className="h-8 w-8"
                      >
                        {pageNum}
                      </Button>
                    ))}

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page === filteredData.pagination.totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

