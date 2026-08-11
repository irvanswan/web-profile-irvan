import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";

export const metadata: Metadata = {
  title: "Irvan Junaidi — Full Stack Software Engineer",
  description: "Portfolio of Irvan Junaidi, a full stack software engineer based in Jakarta.",
};

export default function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  return <LocaleLayoutContent params={params}>{children}</LocaleLayoutContent>;
}

async function LocaleLayoutContent({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!["en", "id"].includes(locale)) notFound();
  const messages = await getMessages();
  return <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>;
}
