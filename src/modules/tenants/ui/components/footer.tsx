import { cn } from "@/lib/utils"
import { Poppins } from "next/font/google"
import Link from "next/link"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
})

export const TenantFooter = () => {
  return (
    <footer className="h-20 border-t font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex items-center h-full px-4 lg:px-12 py-6 gap-2">
        <p>Powered by</p>
        <Link href="/">
          <span className={cn("text-xl font-semibold", poppins.className)}>
            Funroad
          </span>
        </Link>
      </div>
    </footer>
  )
}
