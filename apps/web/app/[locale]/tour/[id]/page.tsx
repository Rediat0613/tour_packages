import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { ArrowRight, Check, MapPin, Star, X } from "lucide-react"

import { TourBookingForm } from "@/app/[locale]/_components/tour/booking-form"
import { TourActions } from "@/app/[locale]/_components/tour/tour-actions"
import { TourGallery } from "@/app/[locale]/_components/tour/tour-gallery"
import { LandingFooter } from "@/app/[locale]/_components/landing/footer"
import { LandingHeader } from "@/app/[locale]/_components/landing/header"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getTour, listTourIds } from "@/lib/tours"
import { routing } from "@/i18n/routing"

type Props = {
  params: Promise<{ locale: string; id: string }>
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    listTourIds().map((id) => ({ locale, id })),
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params
  const tour = getTour(id)
  if (!tour) return {}

  const t = await getTranslations({ locale, namespace: "tour" })
  return {
    title: t(`items.${tour.id}.title`),
    description: t(`items.${tour.id}.description`),
  }
}

export default async function TourDetailPage({ params }: Props) {
  const { locale, id } = await params
  setRequestLocale(locale)

  const tour = getTour(id)
  if (!tour) notFound()

  const t = await getTranslations("tour")
  const title = t(`items.${tour.id}.title`)
  const location = t(`items.${tour.id}.location`)
  const description = t(`items.${tour.id}.description`)
  const tags = t.raw(`items.${tour.id}.tags`) as string[]
  const included = t.raw(`items.${tour.id}.included`) as string[]
  const notIncluded = t.raw(`items.${tour.id}.notIncluded`) as string[]
  const itineraryDays = ["1", "2", "3"] as const

  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <LandingHeader />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
              {title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 font-medium text-primary">
                <Star className="size-4 fill-secondary text-secondary" aria-hidden />
                {t("reviews", {
                  rating: tour.rating,
                  count: tour.reviewCount,
                })}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4 text-secondary" aria-hidden />
                {location}
              </span>
            </div>
          </div>
          <TourActions />
        </div>

        <div className="mt-6 animate-in fade-in duration-500">
          <TourGallery images={tour.images} title={title} />
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-10">
            <section className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    className="h-7 rounded-full border-transparent bg-[#e6f7f4] px-3 text-xs font-semibold text-primary"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
                {description}
              </p>
            </section>

            <Separator />

            <section className="space-y-6">
              <h2 className="text-2xl font-extrabold tracking-tight text-primary">
                {t("itinerary")}
              </h2>
              <ol className="space-y-6">
                {itineraryDays.map((day) => (
                  <li key={day} className="flex gap-4">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e0f2fe] text-sm font-bold text-[#0369a1]">
                      {day}
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <h3 className="font-bold text-primary">
                        {t("dayLabel", { day })}:{" "}
                        {t(`items.${tour.id}.itinerary.${day}.title`)}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground sm:text-base">
                        {t(`items.${tour.id}.itinerary.${day}.body`)}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <Separator />

            <section className="grid gap-8 sm:grid-cols-2">
              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-primary">
                  {t("included")}
                </h2>
                <ul className="mt-4 space-y-3">
                  {included.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-foreground/85 sm:text-base">
                      <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-[#e6f7f4] text-[#009485]">
                        <Check className="size-3.5" aria-hidden />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-primary">
                  {t("notIncluded")}
                </h2>
                <ul className="mt-4 space-y-3">
                  {notIncluded.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-foreground/85 sm:text-base">
                      <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        <X className="size-3.5" aria-hidden />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24">
            <TourBookingForm price={tour.price} tourId={tour.id} />

            <Card className="rounded-2xl ring-border/40">
              <CardContent className="flex items-center gap-3 pt-1">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold text-primary">
                  {tour.providerInitials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-primary">
                    {t(`items.${tour.id}.providerName`)}
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-[#009485]">
                    {t("verifiedExpert")}
                  </p>
                </div>
                <Link
                  href={`/${locale}/agency/${tour.agencyId}`}
                  className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-secondary hover:text-secondary/80"
                >
                  {t("viewProfile")}
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
      <LandingFooter />
    </div>
  )
}
