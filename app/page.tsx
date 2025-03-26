"use client"

import { useRef } from "react"
import { ArrowRight, BookOpen, Clock, Star, Users, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import Marquee from "react-fast-marquee"
import CountUp from "react-countup"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

// Sample featured courses data
const featuredCourses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    description: "Learn the core concepts of HTML, CSS, and JavaScript to build modern websites.",
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    instructor: "Sarah Johnson",
    rating: 4.8,
    students: 1245,
    duration: "12 hours",
    level: "Beginner",
    category: "Development",
  },
  {
    id: 2,
    title: "Data Science Essentials",
    description: "Master the fundamentals of data analysis, visualization, and machine learning.",
    image: "/placeholder.svg?height=200&width=350",
    instructor: "Michael Chen",
    rating: 4.9,
    students: 982,
    duration: "15 hours",
    level: "Intermediate",
    category: "Data Science",
  },
  {
    id: 3,
    title: "UX/UI Design Principles",
    description: "Create beautiful, user-friendly interfaces with modern design principles.",
    image: "/placeholder.svg?height=200&width=350",
    instructor: "Emma Rodriguez",
    rating: 4.7,
    students: 756,
    duration: "10 hours",
    level: "Beginner",
    category: "Design",
  },
]

// Sample testimonials
const testimonials = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "Software Developer",
    avatar: "/placeholder.svg?height=80&width=80",
    content:
      "LearnHub has completely transformed my career. The courses are comprehensive and the instructors are top-notch. I went from a beginner to landing my dream job in just 6 months!",
    rating: 5,
  },
  {
    id: 2,
    name: "Sophia Martinez",
    role: "UX Designer",
    avatar: "/placeholder.svg?height=80&width=80",
    content:
      "The design courses on LearnHub are exceptional. They provide practical knowledge that I was able to apply immediately in my work. The community support is also amazing!",
    rating: 5,
  },
  {
    id: 3,
    name: "David Kim",
    role: "Marketing Specialist",
    avatar: "/placeholder.svg?height=80&width=80",
    content:
      "I've taken several marketing courses on different platforms, but LearnHub stands out for its quality content and engaging instructors. Highly recommended!",
    rating: 4,
  },
  {
    id: 4,
    name: "Emily Johnson",
    role: "Data Scientist",
    avatar: "/placeholder.svg?height=80&width=80",
    content:
      "The data science courses on LearnHub helped me transition into a new career. The instructors explain complex concepts in a way that's easy to understand.",
    rating: 5,
  },
  {
    id: 5,
    name: "Michael Rodriguez",
    role: "Frontend Developer",
    avatar: "/placeholder.svg?height=80&width=80",
    content:
      "I've learned so much from LearnHub's frontend development courses. The projects are practical and helped me build a strong portfolio.",
    rating: 5,
  },
]

// Stats data
const stats = [
  { label: "Students", value: 10000, suffix: "+" },
  { label: "Courses", value: 1000, suffix: "+" },
  { label: "Instructors", value: 200, suffix: "+" },
  { label: "Categories", value: 50, suffix: "+" },
]

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

export default function Home() {
  const featuredRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.5 })

  const scrollToFeatured = () => {
    featuredRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="flex flex-col space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 pt-16">
        <motion.div
          className="container flex flex-col items-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div className="text-center" variants={fadeIn}>
            <Badge className="mb-4 px-3 py-1 text-sm" variant="outline">
              Over 1,000+ courses available
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Learn without <span className="text-primary">limits</span>
            </h1>
            <p className="mx-auto mb-8 max-w-[700px] text-lg text-muted-foreground md:text-xl">
              Discover courses taught by industry experts and expand your skills with hands-on projects and interactive
              lessons. Start your learning journey today.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/courses">
                  Explore Courses <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div className="mt-12 flex w-full justify-center" variants={fadeIn}>
            <div className="relative h-[350px] w-full max-w-[900px] overflow-hidden rounded-lg md:h-[500px]">
              <Image
                src="/placeholder.svg?height=500&width=900"
                alt="Students learning online"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                <Button variant="ghost" onClick={scrollToFeatured} className="rounded-full">
                  <ChevronDown className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Stats with counting animation */}
          <motion.div
            ref={statsRef}
            className="mt-12 grid w-full grid-cols-2 gap-4 sm:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="flex flex-col items-center rounded-lg border bg-card p-4 text-center"
                variants={fadeIn}
              >
                <h3 className="text-3xl font-bold">
                  {isStatsInView ? (
                    <CountUp end={stat.value} duration={2.5} separator="," suffix={stat.suffix} delay={index * 0.1} />
                  ) : (
                    `0${stat.suffix}`
                  )}
                </h3>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Courses Section */}
      <section ref={featuredRef} className="container py-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div className="mb-10 flex items-center justify-between" variants={fadeIn}>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Featured Courses</h2>
              <p className="mt-2 text-muted-foreground">Explore our most popular courses and start learning today</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/courses">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" variants={staggerContainer}>
            {featuredCourses.map((course, index) => (
              <motion.div key={course.id} variants={fadeIn} custom={index}>
                <Card className="overflow-hidden transition-all hover:shadow-lg !py-0">
                  <div className="aspect-video relative">
                    <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        {course.category}
                      </Badge>
                      <Badge variant="outline" className="bg-secondary/50">
                        {course.level}
                      </Badge>
                    </div>
                    <CardTitle className="line-clamp-1 mt-2">{course.title}</CardTitle>
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
                      <span className="ml-1 text-xs text-muted-foreground">
                        ({Math.floor(course.students * 0.65)} reviews)
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 px-6 py-3">
                    <div className="flex w-full items-center justify-between">
                      <div className="text-sm font-medium">By {course.instructor}</div>
                      <Button size="sm" variant="ghost" className="gap-1" asChild>
                        <Link href={`/courses/${course.id}`}>
                          <BookOpen className="h-4 w-4" />
                          Enroll
                        </Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Testimonials Section with Marquee */}
      <section className="bg-muted/30 py-16">
        <motion.div
          className="container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div className="mb-12 text-center" variants={fadeIn}>
            <h2 className="text-3xl font-bold tracking-tight">What Our Students Say</h2>
            <p className="mt-2 text-muted-foreground">
              Thousands of students have transformed their careers with LearnHub
            </p>
          </motion.div>

          <motion.div variants={fadeIn} className="py-4">
            <Marquee gradient={false} speed={40} pauseOnHover={true} className="py-4">
              <div className="flex gap-6">
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="w-[350px] flex-shrink-0 mx-4">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">{testimonial.name}</CardTitle>
                          <CardDescription>{testimonial.role}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{testimonial.content}</p>
                    </CardContent>
                    <CardFooter>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-4 w-4",
                              i < testimonial.rating ? "fill-primary text-primary" : "fill-muted text-muted",
                            )}
                          />
                        ))}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </Marquee>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container py-16">
        <motion.div
          className="rounded-lg bg-primary p-8 text-primary-foreground md:p-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">Ready to start your learning journey?</h2>
            <p className="mb-8 text-lg opacity-90">
              Join thousands of students who are already learning and growing with LearnHub.
            </p>
            <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90">
              <Link href="/courses">
                Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

