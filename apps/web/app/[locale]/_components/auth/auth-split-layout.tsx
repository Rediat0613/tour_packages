import Image from "next/image"
import Link from "next/link"
import { ShieldCheck } from "lucide-react"

import { AuthFormMotion, AuthHeroMotion } from "@/app/[locale]/_components/auth/auth-motion"
import { cn } from "@/lib/utils"

type FooterLink = {
  label: string
  href: string
}

type Props = {
  children: React.ReactNode
  brand: string
  heroQuote: string
  trustText: string
  footerLinks: FooterLink[]
  copyright: string
  className?: string
}

export function AuthSplitLayout({
  children,
  brand,
  heroQuote,
  trustText,
  footerLinks,
  copyright,
  className,
}: Props) {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <section className="grid flex-1 bg-card lg:min-h-[calc(100vh-170px)] lg:grid-cols-2">
        <AuthHeroMotion className="relative isolate min-h-[360px] overflow-hidden bg-primary lg:min-h-full">
          <Image
            src="/auth-hero.svg"
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-primary/28 to-primary/82" />
          <div className="absolute inset-0 bg-linear-to-r from-primary/45 via-transparent to-transparent" />
          <div className="relative z-10 flex h-full min-h-[360px] flex-col justify-end px-6 py-10 text-white sm:px-10 lg:min-h-full lg:px-12 lg:py-14">
            <div className="max-w-md">
              <p className="text-3xl font-extrabold tracking-tight">{brand}</p>
              <p className="mt-4 text-base leading-7 text-white/92 sm:text-lg">
                “{heroQuote}”
              </p>
              <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-2xl ring-1 ring-white/20 backdrop-blur">
                <ShieldCheck className="size-4" aria-hidden="true" />
                <span>{trustText}</span>
              </div>
            </div>
          </div>
        </AuthHeroMotion>

        <div className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-14">
          <AuthFormMotion
            className={cn(
              "w-full max-w-[448px] rounded-3xl bg-card/92 p-0 shadow-none lg:p-2",
              className,
            )}
          >
            {children}
          </AuthFormMotion>
        </div>
      </section>

      <footer className="bg-[#f1f1f5] px-6 py-10 text-center text-sm text-muted-foreground">
        <Link
          href="/"
          className="font-extrabold tracking-tight text-secondary hover:text-secondary/80"
        >
          {brand}
        </Link>
        <nav className="mt-6 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground/75 transition-colors hover:text-secondary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="mt-6 text-foreground/70">{copyright}</p>
      </footer>
    </main>
  )
}
