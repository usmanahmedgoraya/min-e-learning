export type Lesson = {
    id: number
    title: string
    duration: string
    isPreview: boolean
  }
  
  export type Course = {
    _id: number
    title: string
    slug: string
    description: string
    longDescription?: string
    image: string
    instructor: string
    instructorImage?: string
    rating: number
    reviews: number
    students: number
    duration: string
    lessons: number
    lessonItems?: Lesson[]
    level: "Beginner" | "Intermediate" | "Advanced"
    category: string
    tags: string[]
    price: number
    isFeatured: boolean
    isNew: boolean
    updatedAt: string
  }
  
  export type Category = {
    id: number
    name: string
    slug: string
    count: number
  }
  
  export type Level = {
    id: number
    name: "Beginner" | "Intermediate" | "Advanced"
    slug: string
  }
  
  export type Duration = {
    id: number
    name: string
    value: string
  }
  
  export type NavItems = {
    name: string,
    href: string
  }