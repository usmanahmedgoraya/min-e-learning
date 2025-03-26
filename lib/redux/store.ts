import { configureStore } from "@reduxjs/toolkit"
import coursesReducer from "./slices/coursesSlice"
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

export const makeStore = () => {
  return configureStore({
    reducer: {
      courses: coursesReducer,
    },
    middleware: (getDefaultMiddleware: typeof configureStore.prototype.middleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

