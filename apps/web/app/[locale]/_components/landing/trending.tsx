import Image from "next/image"
import Link from "next/link"
import { getLocale, getTranslations } from "next-intl/server"
import { ArrowRight } from "lucide-react"

const DESTINATIONS = [
  {
    key: "lalibela" as const,
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    key: "simien" as const,
    image:
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=900&q=80",
    featured: false,
  },
  {
    key: "danakil" as const,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80",
    featured: false,
  },
]

export async function LandingTrending() {
  const t = await getTranslations("home.trending")
  const locale = await getLocale()

  return (
    <section id="destinations" className="scroll-mt-20 bg-card py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-3 text-base text-muted-foreground sm:text-lg">{t("subtitle")}</p>
          </div>
          <Link
            href={`/${locale}#destinations`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-secondary"
          >
            {t("seeAll")}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.35fr_1fr] lg:gap-5">
          {DESTINATIONS.filter((d) => d.featured).map((destination) => (
            <article
              key={destination.key}
              className="group relative min-h-[320px] overflow-hidden rounded-2xl sm:min-h-[420px]"
            >
              <Image
                src={destination.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/85 via-primary/25 to-primary/10" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <span className="inline-flex rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold text-white ring-1 ring-white/25 backdrop-blur">
                  {t("popular")}
                </span>
                <h3 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
                  {t(`items.${destination.key}.name`)}
                </h3>
                <p className="mt-1 text-sm text-white/85">
                  {t("experiences", { count: t(`items.${destination.key}.count`) })}
                </p>
              </div>
            </article>
          ))}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-5">
            {DESTINATIONS.filter((d) => !d.featured).map((destination) => (
              <article
                key={destination.key}
                className="group relative min-h-[180px] overflow-hidden rounded-2xl sm:min-h-[200px]"
              >
                <Image
                  src={destination.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-primary/30 to-primary/10" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-xl font-extrabold text-white">
                    {t(`items.${destination.key}.name`)}
                  </h3>
                  <p className="mt-1 text-sm text-white/85">
                    {t("experiences", { count: t(`items.${destination.key}.count`) })}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
