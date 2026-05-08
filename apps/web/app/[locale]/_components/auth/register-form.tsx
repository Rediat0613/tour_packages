"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Building2, Eye, EyeOff, Lock, Mail, User } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { authMutations, persistAuth } from "@/app/[locale]/_components/auth/_services"
import { useAuth } from "@/providers/auth-provider"
import { cn } from "@/lib/utils"

type FieldProps = {
  id: string
  label: string
  error?: string
  children: React.ReactNode
}

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? <p className="text-sm font-medium text-destructive">{error}</p> : null}
    </div>
  )
}

function SocialButton({ label, className }: { label: string; className?: string }) {
  return (
    <Button
      type="button"
      variant="outline"
      className="h-11 w-full justify-center gap-2 border-border bg-card text-foreground/80 hover:text-foreground"
      disabled
      aria-disabled="true"
    >
      <span className={cn("size-4 rounded-sm", className)} aria-hidden="true" />
      {label}
    </Button>
  )
}

export function RegisterForm() {
  const t = useTranslations("auth")
  const locale = useLocale()
  const router = useRouter()
  const { refreshUser } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const schema = z.object({
    fullName: z.string().min(1, t("errors.fullName")),
    agencyName: z.string().min(1, t("errors.agencyName")),
    email: z.string().email(t("errors.email")),
    password: z.string().min(8, t("errors.passwordMin")),
    terms: z.boolean().refine((value) => value, t("errors.terms")),
  })

  type FormValues = z.infer<typeof schema>

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      agencyName: "",
      email: "",
      password: "",
      terms: false,
    },
  })

  const mutation = useMutation({
    ...authMutations.registerAgencyStaff(),
    onSuccess: async (response) => {
      persistAuth(response)
      await refreshUser()
      router.push(`/${locale}`)
    },
    onError: (error) => {
      setFormError(error instanceof Error ? error.message : t("errors.generic"))
    },
  })

  function onSubmit(values: FormValues) {
    setFormError(null)
    mutation.mutate({
      fullName: values.fullName,
      agencyName: values.agencyName,
      email: values.email,
      password: values.password,
    })
  }

  return (
    <div className="space-y-7">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-primary">
          {t("register.title")}
        </h1>
        <p className="text-sm leading-6 text-muted-foreground">
          {t("register.subtitle")}
        </p>
      </div>

      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <Field
          id="fullName"
          label={t("fields.fullName")}
          error={form.formState.errors.fullName?.message}
        >
          <div className="relative">
            <User
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="fullName"
              autoComplete="name"
              placeholder={t("placeholders.fullName")}
              className="pl-11"
              aria-invalid={Boolean(form.formState.errors.fullName)}
              {...form.register("fullName")}
            />
          </div>
        </Field>

        <Field
          id="agencyName"
          label={t("fields.agencyName")}
          error={form.formState.errors.agencyName?.message}
        >
          <div className="relative">
            <Building2
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="agencyName"
              autoComplete="organization"
              placeholder={t("placeholders.agencyName")}
              className="pl-11"
              aria-invalid={Boolean(form.formState.errors.agencyName)}
              {...form.register("agencyName")}
            />
          </div>
        </Field>

        <Field
          id="email"
          label={t("fields.email")}
          error={form.formState.errors.email?.message}
        >
          <div className="relative">
            <Mail
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder={t("placeholders.email")}
              className="pl-11"
              aria-invalid={Boolean(form.formState.errors.email)}
              {...form.register("email")}
            />
          </div>
        </Field>

        <Field
          id="password"
          label={t("fields.password")}
          error={form.formState.errors.password?.message}
        >
          <div className="relative">
            <Lock
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder={t("placeholders.password")}
              className="px-11"
              aria-invalid={Boolean(form.formState.errors.password)}
              {...form.register("password")}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 rounded-md p-1 text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/20"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={
                showPassword ? t("actions.hidePassword") : t("actions.showPassword")
              }
            >
              {showPassword ? (
                <EyeOff className="size-4" aria-hidden="true" />
              ) : (
                <Eye className="size-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </Field>

        <div className="space-y-2">
          <div className="flex items-start gap-3 pt-1">
            <Checkbox
              id="terms"
              className="mt-0.5"
              aria-invalid={Boolean(form.formState.errors.terms)}
              {...form.register("terms")}
            />
            <Label
              htmlFor="terms"
              className="block text-sm font-medium leading-6 text-muted-foreground"
            >
              {t("terms.prefix")}{" "}
              <Link
                href={`/${locale}/terms`}
                className="font-semibold text-secondary hover:text-secondary/80"
              >
                {t("terms.terms")}
              </Link>{" "}
              {t("terms.and")}{" "}
              <Link
                href={`/${locale}/privacy`}
                className="font-semibold text-secondary hover:text-secondary/80"
              >
                {t("terms.privacy")}
              </Link>
            </Label>
          </div>
          {form.formState.errors.terms?.message ? (
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors.terms.message}
            </p>
          ) : null}
        </div>

        {formError ? (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
            {formError}
          </p>
        ) : null}

        <Button
          type="submit"
          className="h-12 w-full bg-secondary text-base font-semibold text-secondary-foreground shadow-[0_16px_30px_rgb(253_118_26/24%)] hover:bg-secondary/90"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? t("actions.creating") : t("register.submit")}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        {t("register.hasAccount")}{" "}
        <Link
          href={`/${locale}/login`}
          className="font-semibold text-secondary hover:text-secondary/80"
        >
          {t("login.link")}
        </Link>
      </p>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Separator className="flex-1" />
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {t("social.continueWith")}
          </span>
          <Separator className="flex-1" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <SocialButton label={t("social.google")} className="bg-primary" />
          <SocialButton label={t("social.facebook")} className="bg-[#3867a8]" />
        </div>
        <p className="text-center text-xs text-muted-foreground">
          {t("social.comingSoon")}
        </p>
      </div>
    </div>
  )
}
