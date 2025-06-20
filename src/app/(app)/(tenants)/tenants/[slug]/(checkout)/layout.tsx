import { CheckoutNavbar } from "@/modules/checkout/ui/components/checkout-navbar"
import { TenantFooter } from "@/modules/tenants/ui/components/footer"

interface TenantsLayoutProps {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

const CheckoutLayout = async ({ children, params }: TenantsLayoutProps) => {
  const { slug } = await params

  return (
    <div className="min-h-screen bg-[#f4f4f0] flex flex-col">
      <CheckoutNavbar slug={slug} />

      <div className="flex-1">
        <div className="max-w-(--breakpoint-xl) mx-auto">{children}</div>
      </div>
      <TenantFooter />
    </div>
  )
}

export default CheckoutLayout
