"use client"

import { type PropsWithChildren, useRef } from "react"
import { Provider } from "react-redux"
import { makeStore, type AppStore } from "./store"

export function ReduxProvider({ children }: PropsWithChildren) {
  // Use a ref to ensure the store is only created once
  const storeRef = useRef<AppStore>(null)
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}

