"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { motion } from "framer-motion"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  autoSearch?: boolean
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search courses...",
  className = "",
  autoSearch = true,
}: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value)

  // Update local value when prop value changes
  useEffect(() => {
    setLocalValue(value)
  }, [value])

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setLocalValue(newValue)

    // If autoSearch is enabled, trigger onChange immediately
    if (autoSearch) {
      onChange(newValue)
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onChange(localValue)
  }

  // Clear search
  const handleClear = () => {
    setLocalValue("")
    onChange("")
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Input type="search" placeholder={placeholder} value={localValue} onChange={handleChange} className="pr-16" />
      {localValue && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-8 top-0 h-10 w-10"
          onClick={handleClear}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
      <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 h-10 w-10">
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </motion.form>
  )
}

