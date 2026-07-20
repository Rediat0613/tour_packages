import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"
import {
  ArrowRight,
  BadgeCheck,
  Globe,
  Mail,
  MapPin,
  Phone,
  Star,
} from "lucide-react"

import { AgencyMessageButton } from "@/app/[locale]/_components/agency/agency-message-button"
import { LandingFooter } from "@/app/[locale]/_components/landing/footer"
import { LandingHeader } from "@/app/[locale]/_components/landing/header"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getAgency, listAgencyIds } from "@/lib/agencies"
import { getTour } from "@/lib/tours"
import { routing } from "@/i18n/routing"

type Props = {
  params: Promise<{ locale: string; id: string }>
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    listAgencyIds().map((id) => ({ locale, id })),
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params
  const agency = getAgency(id)
  if (!agency) return {}

  const t = await getTranslations({ locale, namespace: "agency" })
  return {
    title: t(`items.${agency.id}.name`),
    description: t(`items.${agency.id}.tagline`),
  }
}

export default async function AgencyDetailPage({ params }: Props) {
  const { locale, id } = await params
  setRequestLocale(locale)

  const agency = getAgency(id)
  if (!agency) notFound()

  const t = await getTranslations("agency")
  const tourT = await getTranslations("tour")

  const name = t(`items.${agency.id}.name`)
  const tagline = t(`items.${agency.id}.tagline`)
  const about = t.raw(`items.${agency.id}.about`) as string[]
  const specialties = t.raw(`items.${agency.id}.specialties`) as string[]
  const location = t.raw(`items.${agency.id}.location`) as string[]

  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <LandingHeader />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <section className="animate-in fade-in duration-500">
          <div className="relative h-44 overflow-hidden rounded-3xl sm:h-56 lg:h-64">
            <Image
              src={agency.coverImage}
              alt=""
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1216px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-primary/90 via-primary/50 to-primary/25" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-primary/80 to-transparent sm:h-32" />
          </div>

          <div className="relative -mt-14 flex flex-col gap-5 px-1 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between sm:px-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-5">
              <div className="flex size-28 shrink-0 items-center justify-center rounded-full bg-card text-2xl font-extrabold tracking-tight text-primary shadow-[0_18px_40px_rgb(11_28_48/18%)] ring-4 ring-card">
                {agency.logoInitials}
              </div>

              <div className="min-w-0 rounded-2xl bg-card/95 px-4 py-3 shadow-[0_16px_40px_rgb(11_28_48/14%)] ring-1 ring-border/50 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
                    {name}
                  </h1>
                  {agency.verified ? (
                    <BadgeCheck className="size-6 shrink-0 text-[#009485]" aria-label={t("verified")} />
                  ) : null}
                </div>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Star className="size-4 fill-secondary text-secondary" aria-hidden />
                  <span>
                    {t("reviews", { rating: agency.rating, count: agency.reviewCount })}
                  </span>
                </p>
              </div>
            </div>

            <AgencyMessageButton className="self-start sm:shrink-0" />
          </div>
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div className="space-y-8">
            <Card className="rounded-2xl ring-border/40">
              <CardHeader>
                <CardTitle className="text-xl font-extrabold tracking-tight text-primary">
                  {t("about")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {about.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 24)}
                    className="text-sm leading-7 text-muted-foreground sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
                <div className="flex flex-wrap gap-2 pt-1">
                  {specialties.map((tag) => (
                    <Badge
                      key={tag}
                      className="h-7 rounded-full border-transparent bg-[#e6f7f4] px-3 text-xs font-semibold text-primary"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <section className="space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-extrabold tracking-tight text-primary">
                  {t("toursOffered")}
                </h2>
                <Link
                  href={`/${locale}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-secondary hover:text-secondary/80"
                >
                  {t("viewAll")}
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {agency.tours.map((tourId) => {
                  const tour = getTour(tourId)
                  if (!tour) return null
                  const tourTitle = tourT(`items.${tourId}.title`)
                  const tourTags = tourT.raw(`items.${tourId}.tags`) as string[]
                  const tourDescription = tourT(`items.${tourId}.description`)

                  return (
                    <Link
                      key={tourId}
                      href={`/${locale}/tour/${tourId}`}
                      className="group overflow-hidden rounded-2xl bg-card ring-1 ring-border/40 transition-shadow hover:shadow-[0_20px_44px_rgb(11_28_48/10%)]"
                    >
                      <article>
                        <div className="relative aspect-16/10 overflow-hidden">
                          <Image
                            src={tour.images[0]}
                            alt=""
                            fill
                            sizes="(max-width: 640px) 100vw, 40vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-primary/70 via-primary/10 to-transparent" />
                          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-card/95 px-2.5 py-1 text-xs font-bold text-primary shadow-sm backdrop-blur">
                            <Star className="size-3 fill-secondary text-secondary" aria-hidden />
                            {tour.rating}{" "}
                            <span className="font-medium text-muted-foreground">
                              ({tour.reviewCount})
                            </span>
                          </span>
                          <span className="absolute right-3 bottom-3 rounded-lg bg-primary/90 px-2.5 py-1 text-xs font-bold text-primary-foreground backdrop-blur">
                            {t("from")} ${tour.price.toLocaleString("en-US")}
                          </span>
                        </div>

                        <div className="space-y-2 p-5">
                          <p className="text-[11px] font-semibold tracking-wide text-secondary uppercase">
                            {tourTags.join(" • ")}
                          </p>
                          <h3 className="text-base font-bold tracking-tight text-primary">
                            {tourTitle}
                          </h3>
                          <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
                            {tourDescription}
                          </p>
                        </div>
                      </article>
                    </Link>
                  )
                })}
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-24">
            <Card className="rounded-2xl ring-border/40">
              <CardHeader>
                <CardTitle className="text-lg font-extrabold tracking-tight text-primary">
                  {t("contact")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex gap-3">
                  <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e0f2fe] text-[#0369a1]">
                    <Phone className="size-4" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      {t("phone")}
                    </p>
                    <a
                      href={`tel:${agency.phone.replace(/\s/g, "")}`}
                      className="font-semibold text-primary hover:text-secondary"
                    >
                      {agency.phone}
                    </a>
                    <p className="text-xs text-muted-foreground">{t("phoneHours")}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e0f2fe] text-[#0369a1]">
                    <Mail className="size-4" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      {t("email")}
                    </p>
                    <a
                      href={`mailto:${agency.email}`}
                      className="font-semibold break-all text-primary hover:text-secondary"
                    >
                      {agency.email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e0f2fe] text-[#0369a1]">
                    <MapPin className="size-4" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      {t("officeLocation")}
                    </p>
                    {location.map((line) => (
                      <p key={line} className="text-sm font-medium text-primary">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>

                {/* ponytail: static map placeholder — swap for a maps embed when an API key exists */}
                <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-xl bg-[#dce9ff] ring-1 ring-border/40">
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgb(255_255_255/60%),transparent_40%),radial-gradient(circle_at_70%_70%,rgb(0_148_133/18%),transparent_45%)]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-40 bg-[linear-gradient(rgb(11_28_48/8%)_1px,transparent_1px),linear-gradient(90deg,rgb(11_28_48/8%)_1px,transparent_1px)] bg-size-[24px_24px]"
                  />
                  <MapPin
                    className="relative size-9 text-secondary drop-shadow-[0_6px_10px_rgb(11_28_48/25%)]"
                    aria-label={t("mapLabel")}
                  />
                </div>

                <Separator />

                <a
                  href={agency.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border-2 border-primary/15 font-semibold text-primary transition-colors hover:bg-muted"
                >
                  <Globe className="size-4" aria-hidden />
                  {t("visitWebsite")}
                </a>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>

      <LandingFooter />
    </div>
  )
}
