"use client"

import { SlidersHorizontal, X } from "lucide-react"
import { useState } from "react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { motion } from "framer-motion"

interface CourseFiltersProps {
  categories: { id: number; name: string; slug: string; count: number }[]
  levels: { id: number; name: string; slug: string; count: number }[]
  durations: { id: number; name: string; value: string; count: number }[]
  filters: {
    categories: string[]
    levels: string[]
    durations: string[]
    priceRange: [number, number]
    sortBy: string
  }
  toggleCategory: (category: string) => void
  toggleLevel: (level: string) => void
  toggleDuration: (duration: string) => void
  updatePriceRange: (range: [number, number]) => void
  updateSortBy: (sortBy: string) => void
  resetFilters: () => void
  totalResults: number
}

export function CourseFilters({
  categories,
  levels,
  durations,
  filters,
  toggleCategory,
  toggleLevel,
  toggleDuration,
  updatePriceRange,
  updateSortBy,
  resetFilters,
  totalResults,
}: CourseFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const activeFiltersCount =
    filters.categories.length +
    filters.levels.length +
    filters.durations.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 100 ? 1 : 0)

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  }

  return (
    <motion.div className="flex flex-col space-y-4" initial="hidden" animate="visible" variants={fadeIn}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1 lg:hidden">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px] lg:hidden">
              <SheetHeader className="mb-5">
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <MobileFilters
                categories={categories}
                levels={levels}
                durations={durations}
                filters={filters}
                toggleCategory={toggleCategory}
                toggleLevel={toggleLevel}
                toggleDuration={toggleDuration}
                updatePriceRange={updatePriceRange}
                resetFilters={resetFilters}
                closeSheet={() => setIsOpen(false)}
                totalResults={totalResults}
                updateSortBy={updateSortBy}
                
              />
            </SheetContent>
          </Sheet>

          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{totalResults}</span> results
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Select value={filters.sortBy} onValueChange={updateSortBy}>
            <SelectTrigger className="h-8 w-[130px] text-xs sm:w-[150px] sm:text-sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>

          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs sm:text-sm" onClick={resetFilters}>
              <X className="mr-1 h-3 w-3" />
              Clear
            </Button>
          )}
        </div>
      </div>

      <div className="hidden lg:block">
        <DesktopFilters
          categories={categories}
          levels={levels}
          durations={durations}
          filters={filters}
          toggleCategory={toggleCategory}
          toggleLevel={toggleLevel}
          toggleDuration={toggleDuration}
          updatePriceRange={updatePriceRange}
          resetFilters={resetFilters}
          updateSortBy={updateSortBy}
        />
      </div>
    </motion.div>
  )
}

function MobileFilters({
  categories,
  levels,
  durations,
  filters,
  toggleCategory,
  toggleLevel,
  toggleDuration,
  updatePriceRange,
  resetFilters,
  closeSheet
}: CourseFiltersProps & { closeSheet: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-auto">
        <Accordion type="multiple" defaultValue={["categories", "levels", "durations", "price"]}>
          <AccordionItem value="categories">
            <AccordionTrigger>Categories</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category.id}-mobile`}
                      checked={filters.categories.includes(category.name.toLowerCase())}
                      onCheckedChange={() => toggleCategory(category.name)}
                    />
                    <label
                      htmlFor={`category-${category.id}-mobile`}
                      className="flex flex-1 items-center justify-between text-sm"
                    >
                      {category.name}
                      <span className="text-xs text-muted-foreground">({category.count})</span>
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="levels">
            <AccordionTrigger>Levels</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-2">
                {levels.map((level) => (
                  <div key={level.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`level-${level.id}-mobile`}
                      checked={filters.levels.includes(level.name.toLowerCase())}
                      onCheckedChange={() => toggleLevel(level.name)}
                    />
                    <label
                      htmlFor={`level-${level.id}-mobile`}
                      className="flex flex-1 items-center justify-between text-sm"
                    >
                      {level.name}
                      <span className="text-xs text-muted-foreground">({level.count})</span>
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="durations">
            <AccordionTrigger>Duration</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-2">
                {durations.map((duration) => (
                  <div key={duration.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`duration-${duration.id}-mobile`}
                      checked={filters.durations.includes(duration.value)}
                      onCheckedChange={() => toggleDuration(duration.value)}
                    />
                    <label
                      htmlFor={`duration-${duration.id}-mobile`}
                      className="flex flex-1 items-center justify-between text-sm"
                    >
                      {duration.name}
                      <span className="text-xs text-muted-foreground">({duration.count})</span>
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="price">
            <AccordionTrigger>Price Range</AccordionTrigger>
            <AccordionContent>
              <div className="px-2 pt-2">
                <Slider
                  defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
                  max={100}
                  step={1}
                  onValueChange={(value: number[]) => updatePriceRange(value as [number, number])}
                />
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="mt-auto flex items-center justify-between border-t pt-4">
        <Button variant="outline" size="sm" onClick={resetFilters}>
          Reset Filters
        </Button>
        <Button size="sm" onClick={closeSheet}>
          Apply Filters
        </Button>
      </div>
    </div>
  )
}

function DesktopFilters({
  categories,
  levels,
  durations,
  filters,
  toggleCategory,
  toggleLevel,
  toggleDuration,
  updatePriceRange,
  resetFilters,
}: Omit<CourseFiltersProps, "totalResults">) {
  return (
    <div className="space-y-6 rounded-lg border p-4">
      <div className="space-y-4">
        <h3 className="font-medium">Categories</h3>
        <div className="flex flex-col space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={filters.categories.includes(category.name.toLowerCase())}
                onCheckedChange={() => toggleCategory(category.name)}
              />
              <label htmlFor={`category-${category.id}`} className="flex flex-1 items-center justify-between text-sm">
                {category.name}
                <span className="text-xs text-muted-foreground">({category.count})</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Levels</h3>
        <div className="flex flex-col space-y-2">
          {levels.map((level) => (
            <div key={level.id} className="flex items-center space-x-2">
              <Checkbox
                id={`level-${level.id}`}
                checked={filters.levels.includes(level.name.toLowerCase())}
                onCheckedChange={() => toggleLevel(level.name)}
              />
              <label htmlFor={`level-${level.id}`} className="flex flex-1 items-center justify-between text-sm">
                {level.name}
                <span className="text-xs text-muted-foreground">({level.count})</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Duration</h3>
        <div className="flex flex-col space-y-2">
          {durations.map((duration) => (
            <div key={duration.id} className="flex items-center space-x-2">
              <Checkbox
                id={`duration-${duration.id}`}
                checked={filters.durations.includes(duration.value)}
                onCheckedChange={() => toggleDuration(duration.value)}
              />
              <label htmlFor={`duration-${duration.id}`} className="flex flex-1 items-center justify-between text-sm">
                {duration.name}
                <span className="text-xs text-muted-foreground">({duration.count})</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Price Range</h3>
        <div className="px-2 pt-2">
          <Slider
            defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
            max={100}
            step={1}
            onValueChange={(value: number[]) => updatePriceRange(value as [number, number])}
          />
          <div className="mt-2 flex items-center justify-between text-sm">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      <Button variant="outline" size="sm" className="w-full" onClick={resetFilters}>
        Reset Filters
      </Button>
    </div>
  )
}

