"use client"

import { Input } from "@/components/ui/input"
import { BookmarkCheckIcon, ListFilterIcon, SearchIcon } from "lucide-react"
import CategoriesSidebar from "./categories-sidebar"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"

interface Props {
  disabled?: boolean
  defaultValue?: string | undefined
  onChange?: (value: string) => void
}

const SearchInput = ({ disabled, defaultValue, onChange }: Props) => {
  const [searchValue, setSearchValue] = useState(defaultValue || "")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const trpc = useTRPC()
  const session = useQuery(trpc.auth.session.queryOptions())

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onChange?.(searchValue)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [onChange, searchValue])

  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-6 text-neutral-500" />
        <Input
          className="pl-10"
          placeholder="Search products"
          disabled={disabled}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <Button
        variant="elevated"
        className="size-10 shrink-0 flex lg:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <ListFilterIcon />
      </Button>

      {session.data?.user && (
        <Button variant="elevated" asChild className="h-10">
          <Link href="/library">
            <BookmarkCheckIcon className="mr-2" />
            Library
          </Link>
        </Button>
      )}
    </div>
  )
}

export default SearchInput
