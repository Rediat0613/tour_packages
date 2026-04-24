import {getTranslations} from "next-intl/server";

type Props = {
  params: Promise<{locale: string}>;
};

export default async function LocaleHomePage({params}: Props) {
  const {locale} = await params;
  const t = await getTranslations("home");

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-12 md:px-8">
      <div className="space-y-3">
        <span className="inline-flex rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700">
          {t("badge")}
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
          {t("title")}
        </h1>
        <p className="max-w-3xl text-zinc-600">{t("description")}</p>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-xl border border-zinc-200 p-5">
          <h2 className="font-semibold text-zinc-900">{t("surfaces.public")}</h2>
          <p className="mt-2 text-sm text-zinc-600">{t("surfaces.publicDesc")}</p>
        </article>
        <article className="rounded-xl border border-zinc-200 p-5">
          <h2 className="font-semibold text-zinc-900">{t("surfaces.agency")}</h2>
          <p className="mt-2 text-sm text-zinc-600">{t("surfaces.agencyDesc")}</p>
        </article>
        <article className="rounded-xl border border-zinc-200 p-5">
          <h2 className="font-semibold text-zinc-900">{t("surfaces.admin")}</h2>
          <p className="mt-2 text-sm text-zinc-600">{t("surfaces.adminDesc")}</p>
        </article>
      </section>

      <p className="text-sm text-zinc-500">
        {t("localeLabel")}: <span className="font-medium">{locale}</span>
      </p>
    </main>
  );
}
