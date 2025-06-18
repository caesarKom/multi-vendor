import { DEFAULT_LIMIT } from "@/constants"
import { loadProductFiters } from "@/modules/products/search-params"
import { ProductListView } from "@/modules/products/ui/views/product-list-view"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { SearchParams } from "nuqs/server"

interface Props {
  params: Promise<{ subcategory: string }>
  searchParams: Promise<SearchParams>
}

const SubcategoryPage = async ({ params, searchParams }: Props) => {
  const { subcategory } = await params
  const filters = await loadProductFiters(searchParams)

  const queryClient = getQueryClient()
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      category: subcategory,
      ...filters,
      limit: DEFAULT_LIMIT,
    })
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView category={subcategory} />
    </HydrationBoundary>
  )
}

export default SubcategoryPage
