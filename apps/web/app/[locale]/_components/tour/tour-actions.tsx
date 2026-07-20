"use client"

import { Heart, Share2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

export function TourActions() {
  const t = useTranslations("tour")

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="outline"
        className="h-10 rounded-lg border-primary/15 px-3 font-semibold text-primary"
        onClick={() => toast.message(t("booking.shareSoon"))}
      >
        <Share2 className="size-4" aria-hidden />
        {t("share")}
      </Button>
      <Button
        type="button"
        variant="outline"
        className="h-10 rounded-lg border-primary/15 px-3 font-semibold text-primary"
        onClick={() => toast.success(t("booking.saved"))}
      >
        <Heart className="size-4" aria-hidden />
        {t("save")}
      </Button>
    </div>
  )
}
