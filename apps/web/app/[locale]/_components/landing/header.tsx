"use client"

import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { Menu, Search, UserRound, X } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useUiStore } from "@/stores/use-ui-store"

const NAV_KEYS = ["destinations", "tours", "experiences", "journal"] as const

export function LandingHeader() {
  const t = useTranslations("home.nav")
  const brand = useTranslations("auth")
  const locale = useLocale()
  const { mobileMenuOpen, setMobileMenuOpen, toggleMobileMenu } = useUiStore()
  const otherLocale = locale === "en" ? "am" : "en"

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}`}
          className="shrink-0 text-lg font-extrabold tracking-tight text-primary"
        >
          {brand("brand")}
        </Link>

        <nav className="ml-6 hidden items-center gap-6 lg:flex" aria-label="Primary">
          {NAV_KEYS.map((key, index) => (
            <Link
              key={key}
              href={`/${locale}#${key === "destinations" ? "destinations" : key}`}
              className={cn(
                "text-sm font-semibold text-primary/70 transition-colors hover:text-primary",
                index === 0 && "text-secondary underline decoration-2 underline-offset-8",
              )}
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <label className="relative hidden min-w-0 md:block md:w-52 lg:w-64">
            <span className="sr-only">{t("searchPlaceholder")}</span>
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              type="search"
              placeholder={t("searchPlaceholder")}
              className="h-10 rounded-full border-transparent bg-muted pl-9 shadow-none"
            />
          </label>

          <Link
            href={`/${otherLocale}`}
            className="hidden rounded-full px-2.5 py-1.5 text-xs font-bold tracking-wide text-primary/70 transition-colors hover:bg-muted hover:text-primary sm:inline-flex"
            hrefLang={otherLocale}
          >
            {t("switchLocale")}
          </Link>

          <Link
            href={`/${locale}/login`}
            className="hidden size-10 items-center justify-center rounded-full bg-muted text-primary transition-colors hover:bg-accent sm:inline-flex"
            aria-label={brand("login.link")}
          >
            <UserRound className="size-4" aria-hidden />
          </Link>

          <Link
            href={`/${locale}/register`}
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "hidden h-10 rounded-xl px-4 font-semibold shadow-[0_12px_24px_rgb(253_118_26/22%)] sm:inline-flex",
            )}
          >
            {t("signUp")}
          </Link>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-xl bg-muted text-primary lg:hidden"
            onClick={toggleMobileMenu}
            aria-expanded={mobileMenuOpen}
            aria-controls="landing-mobile-nav"
            aria-label={mobileMenuOpen ? t("closeMenu") : t("openMenu")}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id="landing-mobile-nav"
        className={cn(
          "border-t border-border/40 bg-background px-4 py-4 lg:hidden",
          mobileMenuOpen ? "block" : "hidden",
        )}
      >
        <nav className="flex flex-col gap-1" aria-label="Mobile">
          {NAV_KEYS.map((key) => (
            <Link
              key={key}
              href={`/${locale}#${key === "destinations" ? "destinations" : key}`}
              className="rounded-lg px-3 py-2.5 text-sm font-semibold text-primary hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t(key)}
            </Link>
          ))}
        </nav>
        <div className="mt-3 flex flex-col gap-2 border-t border-border/40 pt-3">
          <Link
            href={`/${otherLocale}`}
            className="rounded-lg px-3 py-2.5 text-sm font-semibold text-primary hover:bg-muted"
            hrefLang={otherLocale}
            onClick={() => setMobileMenuOpen(false)}
          >
            {t("switchLocale")}
          </Link>
          <Link
            href={`/${locale}/register`}
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "h-11 w-full rounded-xl font-semibold",
            )}
            onClick={() => setMobileMenuOpen(false)}
          >
            {t("signUp")}
          </Link>
        </div>
      </div>
    </header>
  )
}
