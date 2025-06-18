import type { SearchParams } from "nuqs/server"
import { getQueryClient, trpc } from "@/trpc/server"
import { loadProductFiters } from "@/modules/products/search-params"
import { ProductListView } from "@/modules/products/ui/views/product-list-view"
import { DEFAULT_LIMIT } from "@/constants"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

interface Props {
  searchParams: Promise<SearchParams>
  params: Promise<{ slug: string }>
}

const TenantPageSlug = async ({ params, searchParams }: Props) => {
  const { slug } = await params
  const filters = await loadProductFiters(searchParams)

  const queryClient = getQueryClient()
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      tenantSlug: slug,
      limit: DEFAULT_LIMIT,
    })
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView tenantSlug={slug} narrowView />
    </HydrationBoundary>
  )
}

export default TenantPageSlug
