"use client"

import { useTRPC } from "@/trpc/client"
import Categories from "./categories"
import SearchInput from "./search-input"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { DEFAULT_BG_COLOR } from "@/modules/home/constants"
import BreadcrumbNavigation from "./breadcrumb-navigation"
import { useProductFilters } from "@/modules/products/hooks/use-product-filter"

export const SearchFilters = () => {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions())

  const [filters, setFilters] = useProductFilters()

  const params = useParams()
  const categoryParam = params.category as string | undefined
  const activeCategory = categoryParam || "all"
  const activeCategoryData = data.find(
    (category) => category.slug === activeCategory
  )

  const activeCategoryColor = activeCategoryData?.color || DEFAULT_BG_COLOR
  const activeCategoryName = activeCategoryData?.name || null

  const activeSubcategory = params.subcategory as string | undefined
  const activeSubcategoryName =
    activeCategoryData?.subcategories?.find(
      (sub) => sub.slug === activeSubcategory
    )?.name || null

  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
      style={{ backgroundColor: activeCategoryColor }}
    >
      <SearchInput
        defaultValue={filters.search}
        onChange={(value) => setFilters({ search: value })}
      />

      <div className="hidden lg:block">
        <Categories data={data} />
      </div>

      <BreadcrumbNavigation
        activeCategory={activeCategory}
        activeCategoryName={activeCategoryName}
        activeSubcategoryName={activeSubcategoryName}
      />
    </div>
  )
}

export const SearchFiltersSkeleton = () => {
  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <SearchInput disabled />
      <div className="hidden lg:block">
        <div className="h-10" />
      </div>
    </div>
  )
}
