import { ProductView } from "@/modules/products/ui/views/product-view"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

interface Props {
  params: Promise<{ productId: string; slug: string }>
}

const ProductIdPage = async ({ params }: Props) => {
  const { productId, slug } = await params

  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.tenant.getOne.queryOptions({ slug }))
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductView productId={productId} tenantSlug={slug} />
    </HydrationBoundary>
  )
}

export default ProductIdPage
