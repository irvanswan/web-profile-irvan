import { Construction } from "lucide-react";
import { useTranslations } from "next-intl";

export default function DirectoryContent({t}: {
  t: ReturnType<typeof useTranslations>
}) {
  return (
    <section className="w-full flex flex-col items-center gap-2">
      <Construction size={30} />
      <span className="font-bold">{t("coming_soon")}</span>
    </section>
  )
}