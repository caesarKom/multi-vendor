import type { SearchParams } from "nuqs/server"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { loadProductFiters } from "@/modules/products/search-params"
import { ProductListView } from "@/modules/products/ui/views/product-list-view"
import { DEFAULT_LIMIT } from "@/constants"

interface Props {
  searchParams: Promise<SearchParams>
}

const HomePage = async ({ searchParams }: Props) => {
  const filters = await loadProductFiters(searchParams)

  const queryClient = getQueryClient()
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      limit: DEFAULT_LIMIT,
    })
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView />
    </HydrationBoundary>
  )
}

export default HomePage
