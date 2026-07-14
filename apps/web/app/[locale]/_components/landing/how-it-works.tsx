import { getTranslations } from "next-intl/server"
import { Compass, Search, ShieldCheck } from "lucide-react"

const STEPS = [
  { key: "discover" as const, icon: Search },
  { key: "book" as const, icon: ShieldCheck },
  { key: "experience" as const, icon: Compass },
]

export async function LandingHowItWorks() {
  const t = await getTranslations("home.howItWorks")

  return (
    <section id="how-it-works" className="scroll-mt-20 bg-card py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">{t("subtitle")}</p>
        </div>

        <ol className="relative mt-14 grid gap-10 sm:grid-cols-3 sm:gap-6">
          <div
            aria-hidden
            className="pointer-events-none absolute top-7 right-[16%] left-[16%] hidden h-px bg-border sm:block"
          />
          {STEPS.map(({ key, icon: Icon }) => (
            <li key={key} className="relative text-center">
              <div className="mx-auto inline-flex size-14 items-center justify-center rounded-full bg-[#e0f2fe] text-[#0369a1] shadow-sm ring-4 ring-card">
                <Icon className="size-6" aria-hidden />
              </div>
              <h3 className="mt-5 text-lg font-bold text-primary">{t(`steps.${key}.title`)}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
                {t(`steps.${key}.description`)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
