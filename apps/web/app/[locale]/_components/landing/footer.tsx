import Link from "next/link"
import { getLocale, getTranslations } from "next-intl/server"

export async function LandingFooter() {
  const t = await getTranslations("home.footer")
  const brand = await getTranslations("auth")
  const locale = await getLocale()

  const links = [
    { href: `/${locale}#destinations`, label: t("destinations") },
    { href: `/${locale}#experiences`, label: t("experiences") },
    { href: `/${locale}/#privacy`, label: t("privacy") },
    { href: `/${locale}/#terms`, label: t("terms") },
  ]

  return (
    <footer className="border-t border-border/50  px-4 py-12 text-center sm:px-6 mt-9">
      <Link
        href={`/${locale}`}
        className="text-lg font-extrabold tracking-tight text-secondary hover:text-secondary/80"
      >
        {brand("brand")}
      </Link>
      <nav className="mt-6 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-foreground/75 transition-colors hover:text-secondary"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <p className="mt-6 text-sm text-foreground/70">{t("copyright")}</p>
    </footer>
  )
}
