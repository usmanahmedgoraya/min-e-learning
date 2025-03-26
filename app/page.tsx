"use client"

import { useEffect, useRef } from "react"
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
import { stats, testimonials } from "@/lib/data"
import { useDispatch } from "react-redux"
import { getCourses, getFeaturedCourses } from "./actions/course.action"
import { setCourses, setFeaturedCourses } from "@/lib/redux/slices/coursesSlice"
import { RootState } from "@/lib/redux/store"
import { useSelector } from "react-redux"
import { Course } from "@/types/type"


// Animation variants
const fadeIn = {
  hidden: { opacity: 1, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export default function Home() {
  const featuredCourses = useSelector((state: RootState) => (state.courses.featuredCourses))
  const featuredRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.5 })

  const dispatch = useDispatch();
  const fetchData = async () => {
    const courseData = await getCourses();
    const featuredCourse = await getFeaturedCourses();
    dispatch(setCourses(courseData))
    dispatch(setFeaturedCourses(featuredCourse))
  }
  useEffect(() => {
    fetchData()
  }, [dispatch])


  const scrollToFeatured = () => {
    featuredRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="flex flex-col space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 pt-16">
        <motion.div
          className="container flex flex-col items-center dark:mb-12"
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
                <Link href="/">Learn More</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div className="mt-12 flex w-full justify-center" variants={fadeIn}>
            <div className="relative h-[350px] w-full max-w-[900px] overflow-hidden rounded-lg md:h-[500px]">
              <Image
                src="https://img.freepik.com/free-photo/close-up-hand-writing-notebook-top-view_23-2148888824.jpg?ga=GA1.1.1866422441.1739526712&semt=ais_hybrid"
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
            {featuredCourses?.map((course:Course, index) => (
              <motion.div key={course._id} variants={fadeIn} custom={index}>
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
                        <Link href={`/courses/${course.slug}`}>
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
                  <Card key={testimonial.id} className="w-[350px] flex-shrink-0 mx-4 p-4">
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

