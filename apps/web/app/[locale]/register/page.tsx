import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { AuthSplitLayout } from "@/app/[locale]/_components/auth/auth-split-layout"
import { RegisterForm } from "@/app/[locale]/_components/auth/register-form"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "auth.register" })

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  }
}

export default async function RegisterPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "auth" })

  return (
    <AuthSplitLayout
      brand={t("brand")}
      heroQuote={t("hero.quote")}
      trustText={t("hero.trust")}
      copyright={t("footer.copyright")}
      footerLinks={[
        { label: t("footer.destinations"), href: `/${locale}` },
        { label: t("footer.experiences"), href: `/${locale}` },
        { label: t("footer.privacy"), href: `/${locale}/privacy` },
        { label: t("footer.terms"), href: `/${locale}/terms` },
      ]}
    >
      <RegisterForm />
    </AuthSplitLayout>
  )
}
