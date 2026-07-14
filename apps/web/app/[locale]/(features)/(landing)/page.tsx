import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Metadata } from "next"

import { LandingDifference } from "@/app/[locale]/_components/landing/difference"
import { LandingFeatured } from "@/app/[locale]/_components/landing/featured"
import { LandingFooter } from "@/app/[locale]/_components/landing/footer"
import { LandingHeader } from "@/app/[locale]/_components/landing/header"
import { LandingHero } from "@/app/[locale]/_components/landing/hero"
import { LandingHowItWorks } from "@/app/[locale]/_components/landing/how-it-works"
import { LandingTrending } from "@/app/[locale]/_components/landing/trending"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "home" })

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  }
}

export default async function LocaleHomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <LandingHeader />
      <main className="flex-1">
        <LandingHero />
        <LandingTrending />   
        <LandingDifference />
        <LandingFeatured />  
       
        <LandingHowItWorks />
      </main>
      <LandingFooter />
    </div>
  )
}
