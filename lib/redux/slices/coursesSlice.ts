import { Course } from '@/types/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface CoursesState {
  courses: Course[];
  featuredCourses:Course[]
  currentCourse: Course | null;
}

const initialState: CoursesState = {
  courses: [],
  featuredCourses:[],
  currentCourse: null,
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    // Add courses to the state
    setCourses(state, action: PayloadAction<Course[]>) {
      state.courses = action.payload;
    },
    setFeaturedCourses(state, action: PayloadAction<Course[]>) {
      state.featuredCourses = action.payload;
    },
    
    // Add a single course
    addCourse(state, action: PayloadAction<Course>) {
      state.courses.push(action.payload);
    },
    
    // Update a course
    updateCourse(state, action: PayloadAction<Course>) {
      const index = state.courses.findIndex(course => course._id === action.payload._id);
      if (index !== -1) {
        state.courses[index] = action.payload;
      }
    },
    
    // Remove a course
    removeCourse(state, action: PayloadAction<number>) {
      state.courses = state.courses.filter(course => course._id !== action.payload);
    },
    
    // Set the current course being viewed/edited
    setCurrentCourse(state, action: PayloadAction<Course | null>) {
      state.currentCourse = action.payload;
    },
    
    // Clear all courses
    clearCourses(state) {
      state.courses = [];
      state.currentCourse = null;
    }
  },
});

// Export the action creators
export const { 
  setCourses, 
  addCourse, 
  updateCourse, 
  removeCourse, 
  setCurrentCourse,
  clearCourses,
  setFeaturedCourses
} = coursesSlice.actions;

// Export the reducer
export default coursesSlice.reducer;