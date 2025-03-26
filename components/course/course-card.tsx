"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { BookOpen, Clock, Star, Users } from "lucide-react"

import type { Course } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CourseCardProps {
  course: Course
  variant?: "default" | "compact"
}

export const CourseCard = React.memo(function CourseCard({ course, variant = "default" }: CourseCardProps) {
  if (variant === "compact") {
    return (
      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
        <div className="flex h-full flex-col">
          <Link href={`/courses/${course.slug}`} className="block">
            <div className="relative h-32 w-full">
              <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
              {course.isNew && <Badge className="absolute right-2 top-2 bg-primary">New</Badge>}
            </div>
          </Link>
          <CardHeader className="p-3">
            <Link href={`/courses/${course.slug}`}>
              <CardTitle className="line-clamp-1 text-base hover:underline">{course.title}</CardTitle>
            </Link>
            <div className="flex items-center text-sm text-muted-foreground">
              <Star className="mr-1 h-3 w-3 fill-primary text-primary" />
              <span className="mr-1">{course.rating}</span>
              <span className="text-xs">({course.reviews})</span>
            </div>
          </CardHeader>
          <CardFooter className="mt-auto border-t p-3">
            <div className="flex w-full items-center justify-between">
              <span className="font-bold">${course.price.toFixed(2)}</span>
              <Button size="sm" variant="ghost" className="h-8 px-2" asChild>
                <Link href={`/courses/${course.slug}`}>
                  <BookOpen className="mr-1 h-3 w-3" />
                  Details
                </Link>
              </Button>
            </div>
          </CardFooter>
        </div>
      </Card>
    )
  }

  return (
    <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/courses/${course.slug}`} className="block">
        <div className="aspect-video relative">
          <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
          {course.isNew && <Badge className="absolute right-2 top-2 bg-primary">New</Badge>}
        </div>
      </Link>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-primary/10 text-primary">
            {course.category}
          </Badge>
          <Badge variant="outline" className="bg-secondary/50">
            {course.level}
          </Badge>
        </div>
        <Link href={`/courses/${course.slug}`}>
          <CardTitle className="line-clamp-1 mt-2 hover:underline">{course.title}</CardTitle>
        </Link>
        <CardDescription className="line-clamp-2">{course.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="mr-1 h-4 w-4" />
          <span>{course.duration}</span>
          <Users className="ml-4 mr-1 h-4 w-4" />
          <span>{course.students.toLocaleString()} students</span>
        </div>
        <div className="mt-2 flex items-center">
          <Star className="h-4 w-4 fill-primary text-primary" />
          <span className="ml-1 text-sm font-medium">{course.rating}</span>
          <span className="ml-1 text-xs text-muted-foreground">({course.reviews} reviews)</span>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 px-6 py-3">
        <div className="flex w-full items-center justify-between">
          <div className="text-lg font-bold">${course.price.toFixed(2)}</div>
          <Button size="sm" asChild>
            <Link href={`/courses/${course.slug}`}>
              <BookOpen className="mr-2 h-4 w-4" />
              Enroll Now
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
})

