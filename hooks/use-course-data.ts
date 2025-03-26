"use client"

import { RootState } from "@/lib/redux/store"
import { useQuery } from "@tanstack/react-query"
import { useSelector } from "react-redux"

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Get all courses with pagination and search
export async function fetchCourses(page = 1, limit = 9, search = "", allCourses: any[]) {
  await delay(500) // Reduced delay for better UX
  let filteredCourses = [...allCourses]

  // Apply search filter
  if (search) {
    const searchLower = search.toLowerCase()
    filteredCourses = filteredCourses.filter(
      (course) =>
        course.title.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower) ||
        course.category.toLowerCase().includes(searchLower) ||
        (course.tags && course.tags.some((tag: string) => tag.toLowerCase().includes(searchLower)))
    )
  }

  // Calculate pagination
  const totalItems = filteredCourses.length
  const totalPages = Math.ceil(totalItems / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedCourses = filteredCourses.slice(startIndex, endIndex)

  return {
    courses: paginatedCourses,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages,
    },
  }
}

// Get a single course by slug
export async function fetchCourseBySlug(slug: string, allCourses: any[]) {
  await delay(500)
  const course = allCourses.find((course) => course.slug === slug)

  if (!course) {
    throw new Error("Course not found")
  }

  // Generate mock lessons for the course
  const lessonCount = typeof course.lessons === "number" ? course.lessons : 0
  const lessonItems = Array.from({ length: lessonCount }, (_, i) => ({
    id: i + 1,
    title: `Lesson ${i + 1}: ${i === 0 ? "Introduction to " : ""}${course.title.split(" ").slice(0, 3).join(" ")}${i > 0 ? ` - Part ${i}` : ""}`,
    duration: `${Math.floor(Math.random() * 30) + 10} min`,
    isPreview: i === 0,
  }))

  return {
    ...course,
    lessonItems: lessonItems,
  }
}

// Hook for fetching courses with pagination and search
export function useCourses(page = 1, limit = 9, search = "") {
  const { courses: allCourses } = useSelector((state: RootState) => state.courses)
  
  return useQuery({
    queryKey: ["courses", page, limit, search, allCourses],
    queryFn: () => fetchCourses(page, limit, search, allCourses),
    staleTime: 5000, // Consider using staleTime to keep data fresh
    enabled: !!allCourses && allCourses.length > 0
  })
}

// Hook for fetching a single course by slug
export function useCourse(slug: string) {
  const { courses: allCourses } = useSelector((state: RootState) => state.courses)
  
  return useQuery({
    queryKey: ["course", slug, allCourses],
    queryFn: () => fetchCourseBySlug(slug, allCourses),
    enabled: !!slug && !!allCourses && allCourses.length > 0,
  })
}