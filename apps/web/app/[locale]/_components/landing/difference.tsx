import { getTranslations } from "next-intl/server"
import { Gem, ShieldCheck, Users } from "lucide-react"

const ITEMS = [
  { key: "vetted" as const, icon: ShieldCheck },
  { key: "groups" as const, icon: Users },
  { key: "access" as const, icon: Gem },
]

export async function LandingDifference() {
  const t = await getTranslations("home.difference")

  return (
    <section id="experiences" className="scroll-mt-20 bg-muted/60 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">{t("subtitle")}</p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {ITEMS.map(({ key, icon: Icon }) => (
            <article key={key} className="text-center sm:text-left lg:text-center">
              <div className="mx-auto inline-flex size-14 items-center justify-center rounded-2xl bg-card text-primary shadow-[0_12px_30px_rgb(11_28_48/8%)] sm:mx-0 lg:mx-auto">
                <Icon className="size-6" aria-hidden />
              </div>
              <h3 className="mt-5 text-lg font-bold text-primary">{t(`items.${key}.title`)}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
                {t(`items.${key}.description`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
