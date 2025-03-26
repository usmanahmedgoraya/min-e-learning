"use client"

import { useQuery } from "@tanstack/react-query"
import { courses } from "@/lib/data"

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Get all courses with pagination and search
export async function fetchCourses(page = 1, limit = 9, search = "") {
  await delay(800)

  let filteredCourses = [...courses]

  // Apply search filter
  if (search) {
    const searchLower = search.toLowerCase()
    filteredCourses = filteredCourses.filter(
      (course) =>
        course.title.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower) ||
        course.category.toLowerCase().includes(searchLower) ||
        course.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
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
export async function fetchCourseBySlug(slug: string) {
  await delay(800) // Simulate network delay

  const course = courses.find((course) => course.slug === slug)

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
  return useQuery({
    queryKey: ["courses", page, limit, search],
    queryFn: () => fetchCourses(page, limit, search),
    refetchIntervalInBackground:true
  })
}

// Hook for fetching a single course by slug
export function useCourse(slug: string) {
  return useQuery({
    queryKey: ["course", slug],
    queryFn: () => fetchCourseBySlug(slug),
    enabled: !!slug, // Only fetch if slug is provided
  })
}

