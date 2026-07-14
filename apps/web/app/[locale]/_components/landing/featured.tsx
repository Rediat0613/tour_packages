import Image from "next/image"
import Link from "next/link"
import { getLocale, getTranslations } from "next-intl/server"
import { ArrowRight, Clock3, Star, Users } from "lucide-react"

const JOURNEYS = [
  {
    key: "lalibela" as const,
    badge: "topRated" as const,
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80",
    rating: "4.9",
    reviews: "120",
    price: "$2,450",
  },
  {
    key: "simien" as const,
    badge: "newExpedition" as const,
    image:
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80",
    rating: "4.8",
    reviews: "85",
    price: "$3,800",
  },
  {
    key: "danakil" as const,
    badge: null,
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1200&q=80",
    rating: "5.0",
    reviews: "54",
    price: "$1,900",
  },
]

function Stars({ rating }: { rating: string }) {
  const filled = Math.round(Number(rating))
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`size-3.5 ${i < filled ? "fill-secondary text-secondary" : "text-border"}`}
        />
      ))}
    </span>
  )
}

export async function LandingFeatured() {
  const t = await getTranslations("home.featured")
  const locale = await getLocale()

  return (
    <section id="tours" className="scroll-mt-20 bg-background py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-3 text-base text-muted-foreground sm:text-lg">{t("subtitle")}</p>
          </div>
          <Link
            href={`/${locale}#tours`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary transition-colors hover:text-secondary/80"
          >
            {t("viewAll")}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {JOURNEYS.map((journey) => (
            <article
              key={journey.key}
              className="group overflow-hidden rounded-2xl bg-card shadow-[0_16px_40px_rgb(11_28_48/6%)] ring-1 ring-border/40 transition-shadow hover:shadow-[0_20px_44px_rgb(11_28_48/10%)]"
            >
              <div className="relative aspect-16/10 overflow-hidden">
                <Image
                  src={journey.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {journey.badge ? (
                  <span
                    className={
                      journey.badge === "topRated"
                        ? "absolute top-3 left-3 rounded-full bg-[#009485] px-2.5 py-1 text-[11px] font-bold tracking-wide text-white uppercase"
                        : "absolute top-3 left-3 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-bold tracking-wide text-white uppercase"
                    }
                  >
                    {t(`badges.${journey.badge}`)}
                  </span>
                ) : null}
              </div>

              <div className="flex flex-col gap-3 p-5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="size-3.5" aria-hidden />
                    {t(`items.${journey.key}.duration`)}
                  </span>
                  <span aria-hidden>•</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="size-3.5" aria-hidden />
                    {t(`items.${journey.key}.group`)}
                  </span>
                </div>

                <h3 className="text-lg font-bold tracking-tight text-primary">
                  {t(`items.${journey.key}.title`)}
                </h3>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Stars rating={journey.rating} />
                  <span>
                    {journey.rating}{" "}
                    <span className="text-muted-foreground/80">
                      ({t("reviews", { count: journey.reviews })})
                    </span>
                  </span>
                </div>

                <div className="mt-1 flex items-end justify-between border-t border-border/50 pt-4">
                  <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    {t("from")}
                  </span>
                  <span className="text-xl font-extrabold tracking-tight text-primary">
                    {journey.price}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
