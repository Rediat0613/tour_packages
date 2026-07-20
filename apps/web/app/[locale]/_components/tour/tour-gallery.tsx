import Image from "next/image"
import { LayoutGrid } from "lucide-react"
import { getTranslations } from "next-intl/server"

type Props = {
  images: string[]
  title: string
}

export async function TourGallery({ images, title }: Props) {
  const t = await getTranslations("tour")
  const [hero, ...rest] = images
  const grid = rest.slice(0, 4)

  return (
    <div className="grid gap-2 sm:gap-3 lg:grid-cols-2">
      <div className="relative min-h-[240px] overflow-hidden rounded-2xl sm:min-h-[320px] lg:min-h-[420px]">
        <Image
          src={hero}
          alt={title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      <div className="grid grid-cols-2 grid-rows-2 gap-2 sm:gap-3">
        {grid.map((src, index) => (
          <div
            key={src}
            className="relative min-h-[110px] overflow-hidden rounded-2xl sm:min-h-[150px] lg:min-h-[204px]"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
            {index === grid.length - 1 ? (
              <button
                type="button"
                className="absolute right-3 bottom-3 inline-flex items-center gap-2 rounded-xl bg-card/95 px-3 py-2 text-xs font-semibold text-primary shadow-sm ring-1 ring-border/60 backdrop-blur transition-colors hover:bg-card"
              >
                <LayoutGrid className="size-3.5" aria-hidden />
                {t("showAllPhotos")}
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}
