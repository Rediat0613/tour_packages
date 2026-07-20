"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarDays } from "lucide-react"
import { useTranslations } from "next-intl"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Props = {
  price: number
  tourId: string
}

function tomorrowIso() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  d.setHours(0, 0, 0, 0)
  return d.toISOString().slice(0, 10)
}

export function TourBookingForm({ price, tourId }: Props) {
  const t = useTranslations("tour")

  const schema = z.object({
    fullName: z.string().trim().min(2, t("errors.fullName")),
    phone: z
      .string()
      .trim()
      .min(7, t("errors.phone"))
      .regex(/^[+\d][\d\s()-]{6,}$/, t("errors.phone")),
    date: z
      .string()
      .min(1, t("errors.date"))
      .refine((value) => value >= tomorrowIso(), t("errors.date")),
    guests: z.string().min(1, t("errors.guests")),
  })

  type FormValues = z.infer<typeof schema>

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      phone: "",
      date: "",
      guests: "2",
    },
  })

  const onSubmit = form.handleSubmit(async () => {
    // ponytail: no booking API yet — toast only until lead endpoint exists
    await new Promise((r) => setTimeout(r, 400))
    toast.success(t("booking.success"))
    form.reset({ fullName: "", phone: "", date: "", guests: "2" })
  })

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price)

  return (
    <Card className="rounded-2xl shadow-[0_20px_40px_rgb(11_28_48/8%)] ring-border/40">
      <CardContent className="space-y-5 pt-1">
        <p className="text-2xl font-extrabold tracking-tight text-primary">
          {t("booking.from")} {formattedPrice}{" "}
          <span className="text-base font-semibold text-muted-foreground">
            {t("booking.perPerson")}
          </span>
        </p>

        <form onSubmit={onSubmit} className="space-y-4" noValidate data-tour-id={tourId}>
          <div className="space-y-2">
            <Label htmlFor="fullName">{t("booking.fullName")}</Label>
            <Input
              id="fullName"
              autoComplete="name"
              placeholder={t("booking.fullNamePlaceholder")}
              aria-invalid={!!form.formState.errors.fullName}
              {...form.register("fullName")}
            />
            {form.formState.errors.fullName ? (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.fullName.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{t("booking.phone")}</Label>
            <Input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder={t("booking.phonePlaceholder")}
              aria-invalid={!!form.formState.errors.phone}
              {...form.register("phone")}
            />
            {form.formState.errors.phone ? (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.phone.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">{t("booking.date")}</Label>
            <div className="relative">
              <CalendarDays
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                id="date"
                type="date"
                min={tomorrowIso()}
                className="pl-9"
                aria-invalid={!!form.formState.errors.date}
                {...form.register("date")}
              />
            </div>
            {form.formState.errors.date ? (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.date.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="guests">{t("booking.guests")}</Label>
            <Controller
              control={form.control}
              name="guests"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value ?? "2")}
                >
                  <SelectTrigger id="guests" className="h-11 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["1", "2", "3", "4", "5", "6"].map((count) => (
                      <SelectItem key={count} value={count}>
                        {t("booking.guestOption", { count })}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {form.formState.errors.guests ? (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.guests.message}
              </p>
            ) : null}
          </div>

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="h-12 w-full rounded-lg bg-secondary text-base font-semibold text-secondary-foreground shadow-[0_16px_30px_rgb(253_118_26/24%)] hover:bg-secondary/90"
          >
            {form.formState.isSubmitting
              ? t("booking.submitting")
              : t("booking.submit")}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            {t("booking.noCharge")}
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
