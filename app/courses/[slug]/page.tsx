"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, BookOpen, Calendar, Clock, FileText, Play, Star, Users } from "lucide-react"
import { motion } from "framer-motion"

import { useCourse } from "@/hooks/use-course-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProtectedEnrollButton } from "@/components/with-auth"
import { CourseDetailSkeleton } from "@/components/skeleton/course-detail-skeleton"
import { Lesson } from "@/types/type"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export default function CourseDetailPage() {
  const params = useParams()
  const slug = params?.slug as string

  const { data: course, isLoading, error } = useCourse(slug)

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link
          href="/courses"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Link>
      </div>

      {isLoading ? (
        <CourseDetailSkeleton />
      ) : error || !course ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h2 className="mb-2 text-2xl font-bold">Course Not Found</h2>
          <p className="mb-6 text-muted-foreground">The course you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Button asChild>
            <Link href="/courses">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Link>
          </Button>
        </div>
      ) : (
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <div className="grid gap-8 lg:grid-cols-3">
            <motion.div className="lg:col-span-2" variants={fadeIn}>
              <div className="mb-6">
                <h1 className="mb-2 text-3xl font-bold tracking-tight">{course.title}</h1>
                <p className="text-xl text-muted-foreground">{course.description}</p>
              </div>

              <div className="mb-6 flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  {course.category}
                </Badge>
                <Badge variant="outline" className="bg-secondary/50">
                  {course.level}
                </Badge>
                {course.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mb-8 flex flex-wrap gap-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  {course.duration} total
                </div>
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  {course.lessons} lessons
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  {course.students.toLocaleString()} students
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Last updated {course.updatedAt}
                </div>
                <div className="flex items-center">
                  <Star className="mr-2 h-4 w-4 fill-primary text-primary" />
                  {course.rating} ({course.reviews} reviews)
                </div>
              </div>

              <Tabs defaultValue="overview" className="mb-8">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                  <TabsTrigger value="instructor">Instructor</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-4">
                  <motion.div
                    className="prose max-w-none dark:prose-invert"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-xl font-bold text-accent-foreground my-3">About This Course</h3>
                    <p>{course.longDescription || course.description}</p>
                    <h3 className="text-xl font-bold text-accent-foreground my-3">What You&apos;ll Learn</h3>
                    <ul className="list-disc">
                      <li>Understand the core concepts of {course.title}</li>
                      <li>Apply your knowledge to real-world projects</li>
                      <li>Master the essential skills needed in the industry</li>
                      <li>Build a portfolio of projects to showcase your abilities</li>
                    </ul>
                    <h3 className="text-xl font-bold text-accent-foreground my-3">Requirements</h3>
                    <ul className="list-disc">
                      <li>Basic understanding of {course.category}</li>
                      <li>A computer with internet access</li>
                      <li>Dedication and willingness to learn</li>
                    </ul>
                  </motion.div>
                </TabsContent>
                <TabsContent value="curriculum" className="mt-4">
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-xl font-bold">Course Content</h3>
                    <p className="text-muted-foreground">
                      {course.lessons} lessons • {course.duration} total
                    </p>
                    <div className="space-y-2">
                      {course.lessonItems && course.lessonItems.length > 0 ? (
                        course.lessonItems.map((lesson: Lesson, index: number) => (
                          <motion.div
                            key={lesson.id}
                            className="flex items-center justify-between rounded-lg border p-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                          >
                            <div className="flex items-center">
                              <Play className="mr-2 h-4 w-4" />
                              <span>{lesson.title}</span>
                              {lesson.isPreview && (
                                <Badge variant="outline" className="ml-2">
                                  Preview
                                </Badge>
                              )}
                            </div>
                            <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                          </motion.div>
                        ))
                      ) : (
                        <p>No lessons available</p>
                      )}
                    </div>
                  </motion.div>
                </TabsContent>
                <TabsContent value="instructor" className="mt-4">
                  <motion.div
                    className="flex items-start gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="relative h-16 w-16 overflow-hidden rounded-full">
                      <Image
                        src={course.instructorImage || "/placeholder.svg?height=64&width=64"}
                        alt={course.instructor}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{course.instructor}</h3>
                      <p className="text-muted-foreground">Expert in {course.category}</p>
                      <p className="mt-2">
                        An experienced instructor with a passion for teaching and helping students master{" "}
                        {course.category}.
                      </p>
                    </div>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </motion.div>

            <motion.div className="lg:col-span-1" variants={fadeIn}>
              <Card className="sticky top-20">
                <div className="aspect-video relative">
                  <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Button variant="outline" className="bg-background/80 backdrop-blur-sm">
                      <Play className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>${course.price}</span>
                    {course.isNew && <Badge>New</Badge>}
                  </CardTitle>
                  <CardDescription>Full lifetime access to this course</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Duration</span>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Lessons</span>
                      <span className="font-medium">{course.lessons} lessons</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Level</span>
                      <span className="font-medium">{course.level}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Certificate</span>
                      <span className="font-medium">Yes</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2 pb-4">
                  <ProtectedEnrollButton price={course.price} />
                  <Button variant="outline" className="w-full">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Add to Wishlist
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

