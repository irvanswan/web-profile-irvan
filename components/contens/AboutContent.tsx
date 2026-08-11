import { useTranslations } from "next-intl"
import SectionHeading from "../SectionHeading"

export default function AboutContent({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <>
      <SectionHeading eyebrow={t("about.eyebrow")} title={t("about.title")} />
      <p className="lead-copy">{t("about.summary")}</p>
      <p className="body-copy">{t("about.body")}</p>
      <div className="fact-row">
        <div>
          <small>BASE</small>
          <strong>{t("about.location")}</strong>
        </div>
        <div>
          <small>STATUS</small>
          <strong>{t("about.availability")}</strong>
        </div>
      </div>
    </>
  )
}