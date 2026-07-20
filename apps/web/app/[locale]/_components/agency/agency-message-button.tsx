"use client"

import { MessageSquare } from "lucide-react"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Props = {
  className?: string
}

export function AgencyMessageButton({ className }: Props) {
  const t = useTranslations("agency")

  return (
    <Button
      type="button"
      onClick={() => toast.message(t("messageSoon"))}
      className={cn(
        "h-11 rounded-lg bg-secondary px-5 font-semibold text-secondary-foreground shadow-[0_14px_28px_rgb(253_118_26/22%)] hover:bg-secondary/90",
        className,
      )}
    >
      <MessageSquare className="size-4" aria-hidden />
      {t("messageAgency")}
    </Button>
  )
}
