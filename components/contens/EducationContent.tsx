import { GraduationCap, Sparkles } from "lucide-react"
import SectionHeading from "../SectionHeading"
import { useTranslations } from "next-intl"

export default function EducationContent({ t }: {
  t: ReturnType<typeof useTranslations>
}) {
  return (
    <>
      <SectionHeading eyebrow={t("education.eyebrow")} title={t("education.title")} />
      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-mark">
            <GraduationCap size={17} />
          </div>
          <div>
            <h3>{t("education.polytechnic")}</h3>
            <p>{t("education.polytechnicMeta")}</p>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-mark">
            <Sparkles size={17} />
          </div>
          <div>
            <h3>{t("education.bootcamp")}</h3>
            <p>{t("education.bootcampMeta")}</p>
          </div>
        </div>
      </div>
      <div className="certification">
        <small>{t("education.certifications")}</small>
        <p>{t("education.certificationList")}</p>
      </div>
    </>
  )
}