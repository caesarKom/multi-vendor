import { TenantFooter } from "@/modules/tenants/ui/components/footer"
import {
  TenantNavbar,
  TenantNavbarSkeleton,
} from "@/modules/tenants/ui/components/navbar"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { Suspense } from "react"

interface TenantsLayoutProps {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

const TenantsLayout = async ({ children, params }: TenantsLayoutProps) => {
  const { slug } = await params

  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.tenant.getOne.queryOptions({ slug }))

  return (
    <div className="min-h-screen bg-[#f4f4f0] flex flex-col">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<TenantNavbarSkeleton />}>
          <TenantNavbar slug={slug} />
        </Suspense>
      </HydrationBoundary>
      <div className="flex-1">
        <div className="max-w-(--breakpoint-xl) mx-auto">{children}</div>
      </div>
      <TenantFooter />
    </div>
  )
}

export default TenantsLayout
