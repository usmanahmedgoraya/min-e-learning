import { Category, Course, Duration, Level, NavItems } from "@/types/type"


// NavItems data
export const navItems: NavItems[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Courses",
    href: "/courses",
  },
  {
    name: "Contact us",
    href: "/contact",
  },
]

// Categories data
export const categories: Category[] = [
  { id: 1, name: "Development", slug: "development", count: 12 },
  { id: 2, name: "Design", slug: "design", count: 8 },
  { id: 3, name: "Business", slug: "business", count: 6 },
  { id: 4, name: "Marketing", slug: "marketing", count: 5 },
  { id: 5, name: "Data Science", slug: "data-science", count: 7 },
  { id: 6, name: "IT & Software", slug: "it-software", count: 9 },
  { id: 7, name: "Personal Development", slug: "personal-development", count: 4 },
]

// Levels data
export const levels: Level[] = [
  { id: 1, name: "Beginner", slug: "beginner" },
  { id: 2, name: "Intermediate", slug: "intermediate" },
  { id: 3, name: "Advanced", slug: "advanced" },
]

// Duration filters
export const durations: Duration[] = [
  { id: 1, name: "0-5 hours", value: "0-5" },
  { id: 2, name: "5-10 hours", value: "5-10" },
  { id: 3, name: "10+ hours", value: "10+" },
]

// Courses data
export const courses: Course[] = [
  {
    _id: 1,
    title: "Web Development Fundamentals",
    slug: "web-development-fundamentals",
    description: "Learn the core concepts of HTML, CSS, and JavaScript to build modern websites.",
    longDescription:
      "This comprehensive course covers everything you need to know to start building modern websites. You'll learn HTML5, CSS3, and JavaScript from the ground up, with practical projects and real-world examples. By the end of this course, you'll be able to create responsive websites that work across all devices.",
    image: "/placeholder.svg?height=200&width=350",
    instructor: "Sarah Johnson",
    instructorImage: "/placeholder.svg?height=50&width=50",
    rating: 4.8,
    reviews: 842,
    students: 1245,
    duration: "12 hours",
    lessons: 24,
    level: "Beginner",
    category: "Development",
    tags: ["HTML", "CSS", "JavaScript", "Web Development"],
    price: 49.99,
    isFeatured: true,
    isNew: false,
    updatedAt: "2023-09-15",
  },
  {
    _id: 2,
    title: "Data Science Essentials",
    slug: "data-science-essentials",
    description: "Master the fundamentals of data analysis, visualization, and machine learning.",
    longDescription:
      "Dive into the world of data science with this comprehensive course. You'll learn how to collect, clean, and analyze data, create compelling visualizations, and build machine learning models. This course covers Python, pandas, NumPy, Matplotlib, and scikit-learn.",
    image: "/placeholder.svg?height=200&width=350",
    instructor: "Michael Chen",
    instructorImage: "/placeholder.svg?height=50&width=50",
    rating: 4.9,
    reviews: 675,
    students: 982,
    duration: "15 hours",
    lessons: 30,
    level: "Intermediate",
    category: "Data Science",
    tags: ["Python", "Data Analysis", "Machine Learning", "Statistics"],
    price: 59.99,
    isFeatured: true,
    isNew: false,
    updatedAt: "2023-10-20",
  },
  {
    _id: 3,
    title: "UX/UI Design Principles",
    slug: "ux-ui-design-principles",
    description: "Create beautiful, user-friendly interfaces with modern design principles.",
    longDescription:
      "Learn the principles of user experience and user interface design. This course covers the entire design process from research and wireframing to prototyping and testing. You'll master tools like Figma and learn how to create designs that users love.",
    image: "/placeholder.svg?height=200&width=350",
    instructor: "Emma Rodriguez",
    instructorImage: "/placeholder.svg?height=50&width=50",
    rating: 4.7,
    reviews: 523,
    students: 756,
    duration: "10 hours",
    lessons: 20,
    level: "Beginner",
    category: "Design",
    tags: ["UI", "UX", "Figma", "Design Thinking"],
    price: 49.99,
    isFeatured: true,
    isNew: false,
    updatedAt: "2023-08-05",
  },
  {
    _id: 4,
    title: "Advanced React Development",
    slug: "advanced-react-development",
    description: "Take your React skills to the next level with advanced patterns and techniques.",
    longDescription:
      "This advanced course is designed for developers who already know the basics of React and want to master advanced concepts. You'll learn about React hooks, context API, Redux, performance optimization, and more. By the end of this course, you'll be able to build complex, scalable React applications.",
    image: "/placeholder.svg?height=200&width=350",
    instructor: "David Kim",
    instructorImage: "/placeholder.svg?height=50&width=50",
    rating: 4.9,
    reviews: 412,
    students: 645,
    duration: "14 hours",
    lessons: 28,
    level: "Advanced",
    category: "Development",
    tags: ["React", "JavaScript", "Redux", "Web Development"],
    price: 69.99,
    isFeatured: false,
    isNew: true,
    updatedAt: "2023-11-10",
  },
  {
    _id: 5,
    title: "Digital Marketing Masterclass",
    slug: "digital-marketing-masterclass",
    description: "Learn how to create and execute effective digital marketing campaigns.",
    longDescription:
      "This comprehensive digital marketing course covers all aspects of online marketing, including SEO, social media, email marketing, content marketing, and paid advertising. You'll learn how to create a digital marketing strategy, measure results, and optimize your campaigns for maximum ROI.",
    image: "/placeholder.svg?height=200&width=350",
    instructor: "Jessica Martinez",
    instructorImage: "/placeholder.svg?height=50&width=50",
    rating: 4.6,
    reviews: 378,
    students: 892,
    duration: "16 hours",
    lessons: 32,
    level: "Intermediate",
    category: "Marketing",
    tags: ["Digital Marketing", "SEO", "Social Media", "Content Marketing"],
    price: 54.99,
    isFeatured: false,
    isNew: false,
    updatedAt: "2023-07-25",
  },
  {
    _id: 6,
    title: "Python for Data Analysis",
    slug: "python-for-data-analysis",
    description: "Master Python libraries like Pandas, NumPy, and Matplotlib for data analysis.",
    longDescription:
      "This course focuses on using Python for data analysis. You'll learn how to use pandas for data manipulation, NumPy for numerical computing, and Matplotlib and Seaborn for data visualization. Through hands-on projects, you'll gain practical experience analyzing real-world datasets.",
    image: "/placeholder.svg?height=200&width=350",
    instructor: "Robert Chen",
    instructorImage: "/placeholder.svg?height=50&width=50",
    rating: 4.8,
    reviews: 456,
    students: 723,
    duration: "12 hours",
    lessons: 24,
    level: "Intermediate",
    category: "Data Science",
    tags: ["Python", "Pandas", "NumPy", "Data Analysis"],
    price: 49.99,
    isFeatured: false,
    isNew: true,
    updatedAt: "2023-10-05",
  },
  {
    _id: 7,
    title: "Graphic Design Fundamentals",
    slug: "graphic-design-fundamentals",
    description: "Learn the principles of graphic design and how to use industry-standard tools.",
    longDescription:
      "This course covers the fundamental principles of graphic design, including typography, color theory, composition, and visual hierarchy. You'll learn how to use Adobe Photoshop and Illustrator to create professional designs for print and digital media.",
    image: "/placeholder.svg?height=200&width=350",
    instructor: "Sophia Lee",
    instructorImage: "/placeholder.svg?height=50&width=50",
    rating: 4.7,
    reviews: 389,
    students: 612,
    duration: "10 hours",
    lessons: 20,
    level: "Beginner",
    category: "Design",
    tags: ["Graphic Design", "Photoshop", "Illustrator", "Typography"],
    price: 44.99,
    isFeatured: false,
    isNew: false,
    updatedAt: "2023-06-15",
  },
  {
    _id: 8,
    title: "Business Strategy and Management",
    slug: "business-strategy-management",
    description: "Develop strategic thinking and management skills for business success.",
    longDescription:
      "This course teaches you how to develop and implement effective business strategies. You'll learn about strategic planning, competitive analysis, organizational management, and leadership. Through case studies and practical exercises, you'll develop the skills needed to lead successful businesses.",
    image: "/placeholder.svg?height=200&width=350",
    instructor: "James Wilson",
    instructorImage: "/placeholder.svg?height=50&width=50",
    rating: 4.6,
    reviews: 312,
    students: 542,
    duration: "14 hours",
    lessons: 28,
    level: "Intermediate",
    category: "Business",
    tags: ["Business Strategy", "Management", "Leadership", "Strategic Planning"],
    price: 59.99,
    isFeatured: false,
    isNew: false,
    updatedAt: "2023-09-01",
  },
  {
    _id: 9,
    title: "Mobile App Development with React Native",
    slug: "mobile-app-development-react-native",
    description: "Build cross-platform mobile apps for iOS and Android using React Native.",
    longDescription:
      "Learn how to build mobile applications that work on both iOS and Android using React Native. This course covers the fundamentals of React Native, including components, navigation, state management, and accessing device features. By the end, you'll be able to build and deploy your own mobile apps.",
    image: "/placeholder.svg?height=200&width=350",
    instructor: "Alex Johnson",
    instructorImage: "/placeholder.svg?height=50&width=50",
    rating: 4.8,
    reviews: 287,
    students: 498,
    duration: "16 hours",
    lessons: 32,
    level: "Intermediate",
    category: "Development",
    tags: ["React Native", "Mobile Development", "JavaScript", "Cross-Platform"],
    price: 64.99,
    isFeatured: false,
    isNew: true,
    updatedAt: "2023-11-20",
  },
  {
    _id: 10,
    title: "Cloud Computing with AWS",
    slug: "cloud-computing-aws",
    description: "Master Amazon Web Services (AWS) and build scalable cloud applications.",
    longDescription:
      "This comprehensive course on AWS cloud computing covers all the essential services, including EC2, S3, RDS, Lambda, and more. You'll learn how to architect, deploy, and scale applications in the cloud. The course includes hands-on labs and real-world projects to reinforce your learning.",
    image: "/placeholder.svg?height=200&width=350",
    instructor: "Thomas Brown",
    instructorImage: "/placeholder.svg?height=50&width=50",
    rating: 4.9,
    reviews: 342,
    students: 587,
    duration: "18 hours",
    lessons: 36,
    level: "Advanced",
    category: "IT & Software",
    tags: ["AWS", "Cloud Computing", "DevOps", "Serverless"],
    price: 69.99,
    isFeatured: false,
    isNew: false,
    updatedAt: "2023-10-15",
  },
  {
    _id: 11,
    title: "Content Marketing Strategy",
    slug: "content-marketing-strategy",
    description: "Learn how to create and distribute valuable content to attract and engage your audience.",
    longDescription:
      "This course teaches you how to develop a content marketing strategy that drives business results. You'll learn how to create compelling content, distribute it effectively, and measure its impact. Topics include content planning, creation, SEO, social media promotion, and analytics.",
    image: "/placeholder.svg?height=200&width=350",
    instructor: "Laura Smith",
    instructorImage: "/placeholder.svg?height=50&width=50",
    rating: 4.7,
    reviews: 276,
    students: 512,
    duration: "10 hours",
    lessons: 20,
    level: "Beginner",
    category: "Marketing",
    tags: ["Content Marketing", "SEO", "Social Media", "Content Strategy"],
    price: 49.99,
    isFeatured: false,
    isNew: false,
    updatedAt: "2023-08-20",
  },
  {
    _id: 12,
    title: "Machine Learning Fundamentals",
    slug: "machine-learning-fundamentals",
    description: "Learn the basics of machine learning algorithms and how to implement them in Python.",
    longDescription:
      "This course provides a solid foundation in machine learning concepts and techniques. You'll learn about supervised and unsupervised learning, classification, regression, clustering, and more. Using Python and scikit-learn, you'll implement various machine learning algorithms and apply them to real-world problems.",
    image: "/placeholder.svg?height=200&width=350",
    instructor: "Daniel Lee",
    instructorImage: "/placeholder.svg?height=50&width=50",
    rating: 4.8,
    reviews: 398,
    students: 678,
    duration: "14 hours",
    lessons: 28,
    level: "Intermediate",
    category: "Data Science",
    tags: ["Machine Learning", "Python", "AI", "Data Science"],
    price: 59.99,
    isFeatured: false,
    isNew: false,
    updatedAt: "2023-09-10",
  },
]

// Get featured courses
export const getFeaturedCourses = () => {
  return courses.filter((course) => course.isFeatured)
}

// Get new courses
export const getNewCourses = () => {
  return courses.filter((course) => course.isNew)
}

// Get courses by category
export const getCoursesByCategory = (categorySlug: string) => {
  return courses.filter((course) => {
    const category = categories.find((c) => c.slug === categorySlug)
    return category ? course.category === category.name : false
  })
}

// Get courses by level
export const getCoursesByLevel = (levelSlug: string) => {
  return courses.filter((course) => {
    const level = levels.find((l) => l.slug === levelSlug)
    return level ? course.level === level.name : false
  })
}

// Get courses by duration
export const getCoursesByDuration = (durationValue: string) => {
  return courses.filter((course) => {
    const hours = Number.parseInt(course.duration.split(" ")[0])

    if (durationValue === "0-5") {
      return hours <= 5
    } else if (durationValue === "5-10") {
      return hours > 5 && hours <= 10
    } else if (durationValue === "10+") {
      return hours > 10
    }

    return false
  })
}

// Search courses
export const searchCourses = (query: string) => {
  const lowercaseQuery = query.toLowerCase()
  return courses.filter(
    (course) =>
      course.title.toLowerCase().includes(lowercaseQuery) ||
      course.description.toLowerCase().includes(lowercaseQuery) ||
      course.category.toLowerCase().includes(lowercaseQuery) ||
      course.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
  )
}




// Sample testimonials
export const testimonials = [
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
export const stats = [
  { label: "Students", value: 10000, suffix: "+" },
  { label: "Courses", value: 1000, suffix: "+" },
  { label: "Instructors", value: 200, suffix: "+" },
  { label: "Categories", value: 50, suffix: "+" },
]

