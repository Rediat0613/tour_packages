import Image from "next/image"
import Link from "next/link"
import { getLocale, getTranslations } from "next-intl/server"
import { ArrowRight, CalendarDays, MapPin, Search, Users } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1600&q=80"

export async function LandingHero() {
  const t = await getTranslations("home.hero")
  const search = await getTranslations("home.search")
  const locale = await getLocale()

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgb(211_228_254/55%),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgb(253_118_26/10%),transparent_45%)]"
      />

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 pt-10 pb-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-12 lg:px-8 lg:pt-16 lg:pb-12">
        <div className="animate-in fade-in slide-in-from-bottom-3 duration-700">
          <span className="inline-flex rounded-full bg-[#e8f6ef] px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#0f6b4c]">
            {t("badge")}
          </span>

          <h1 className="mt-5 max-w-xl text-4xl font-extrabold tracking-tight text-primary sm:text-5xl lg:text-[3.35rem] lg:leading-[1.08]">
            {t("titleBefore")}{" "}
            <span className="text-secondary">{t("titleAccent")}</span>{" "}
            {t("titleAfter")}
          </h1>

          <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
            {t("subtitle")}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={`/${locale}#destinations`}
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "h-12 gap-2 rounded-xl px-5 text-base font-semibold shadow-[0_16px_30px_rgb(253_118_26/24%)]",
              )}
            >
              {t("ctaPrimary")}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href={`/${locale}#how-it-works`}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-12 rounded-xl border-primary/20 px-5 text-base font-semibold text-primary hover:bg-muted",
              )}
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>

        <div className="relative animate-in fade-in slide-in-from-right-4 duration-700 delay-150">
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl shadow-[0_28px_60px_rgb(11_28_48/14%)] sm:aspect-5/4 lg:aspect-4/3">
            <Image
              src={HERO_IMAGE}
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-primary/25 via-transparent to-transparent" />
          </div>

          <aside className="absolute -bottom-4 left-3 right-3 rounded-2xl bg-card p-4 shadow-[0_20px_40px_rgb(11_28_48/12%)] sm:left-6 sm:right-auto sm:max-w-sm sm:bottom-6 sm:p-5">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold text-primary">
                {t("testimonialName").slice(0, 1)}
              </div>
              <div>
                <p className="text-sm font-bold text-primary">{t("testimonialName")}</p>
                <p className="text-xs text-muted-foreground">{t("testimonialRole")}</p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-primary/80 italic">
              “{t("testimonialQuote")}”
            </p>
          </aside>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
        <form
          action={`/${locale}#destinations`}
          className="grid gap-3 rounded-2xl bg-card p-3 shadow-[0_24px_50px_rgb(11_28_48/10%)] sm:p-4 lg:grid-cols-[1.2fr_1fr_1fr_auto]"
        >
          <label className="flex items-center gap-3 rounded-xl bg-muted/70 px-3 py-2.5">
            <MapPin className="size-5 shrink-0 text-secondary" aria-hidden />
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-semibold text-primary">{search("whereLabel")}</span>
              <input
                name="where"
                placeholder={search("wherePlaceholder")}
                className="w-full bg-transparent text-sm text-primary outline-none placeholder:text-muted-foreground"
              />
            </span>
          </label>

          <label className="flex items-center gap-3 rounded-xl bg-muted/70 px-3 py-2.5">
            <CalendarDays className="size-5 shrink-0 text-secondary" aria-hidden />
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-semibold text-primary">{search("whenLabel")}</span>
              <input
                name="when"
                placeholder={search("whenPlaceholder")}
                className="w-full bg-transparent text-sm text-primary outline-none placeholder:text-muted-foreground"
              />
            </span>
          </label>

          <label className="flex items-center gap-3 rounded-xl bg-muted/70 px-3 py-2.5">
            <Users className="size-5 shrink-0 text-secondary" aria-hidden />
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-semibold text-primary">{search("guestsLabel")}</span>
              <input
                name="guests"
                placeholder={search("guestsPlaceholder")}
                className="w-full bg-transparent text-sm text-primary outline-none placeholder:text-muted-foreground"
              />
            </span>
          </label>

          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Search className="size-4" aria-hidden />
            {search("submit")}
          </button>
        </form>
      </div>
    </section>
  )
}
