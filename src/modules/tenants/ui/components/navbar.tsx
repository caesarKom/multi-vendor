"use client"

import { Button } from "@/components/ui/button"
import { generateTenantURL } from "@/lib/utils"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { ShoppingCartIcon } from "lucide-react"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"

const CheckoutButton = dynamic(
  () =>
    import("@/modules/checkout/ui/components/checkout-button").then(
      (mod) => mod.CheckoutButton
    ),
  {
    ssr: false,
    loading: () => (
      <Button disabled className="bg-white">
        <ShoppingCartIcon />
      </Button>
    ),
  }
)

export const TenantNavbar = ({ slug }: { slug: string }) => {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.tenant.getOne.queryOptions({ slug }))

  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
        <Link
          href={generateTenantURL(slug)}
          className="flex items-center gap-2"
        >
          {data.image?.url && (
            <Image
              src={data.image?.url}
              width={32}
              height={32}
              alt={data.name}
              className="rounded-full border shrink-0 size-[32px]"
            />
          )}
          <p className="text-xl">{data.name}</p>
        </Link>

        <CheckoutButton tenantSlug={slug} />
      </div>
    </nav>
  )
}

export const TenantNavbarSkeleton = () => {
  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
        <div />
        <Button disabled className="bg-white">
          <ShoppingCartIcon />
        </Button>
      </div>
    </nav>
  )
}
