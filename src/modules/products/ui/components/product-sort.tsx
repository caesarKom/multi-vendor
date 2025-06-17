"use client"

import { useProductFilters } from "../../hooks/use-product-filter"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const ProductSort = () => {
  const [filters, setFilters] = useProductFilters()

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="secondary"
        onClick={() => setFilters({ sort: "curated" })}
        className={cn(
          "rounded-full bg-white hover:bg-white",
          filters.sort !== "curated" &&
            "bg-transparent border-transparent hover:border-border hover:bg-transparent"
        )}
      >
        Curated
      </Button>

      <Button
        size="sm"
        variant="secondary"
        onClick={() => setFilters({ sort: "trending" })}
        className={cn(
          "rounded-full bg-white hover:bg-white",
          filters.sort !== "trending" &&
            "bg-transparent border-transparent hover:border-border hover:bg-transparent"
        )}
      >
        Trending
      </Button>

      <Button
        size="sm"
        variant="secondary"
        onClick={() => setFilters({ sort: "hot_and_new" })}
        className={cn(
          "rounded-full bg-white hover:bg-white",
          filters.sort !== "hot_and_new" &&
            "bg-transparent border-transparent hover:border-border hover:bg-transparent"
        )}
      >
        Hot & New
      </Button>
    </div>
  )
}
