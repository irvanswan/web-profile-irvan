import { useTranslations } from "next-intl";
import SectionHeading from "../SectionHeading";

export default function SkillsContent(
  { t }:{ t: ReturnType<typeof useTranslations> 
}) { 
  const groups = [["frontend", "frontendList"], ["backend", "backendList"], ["data", "dataList"], ["practice", "practiceList"]] as const; 
  return (
     <section className="flex flex-col gap-2">
      <SectionHeading eyebrow={t("skills.eyebrow")} title={t("skills.title")} />
      <div className="skills-list">
        {groups.map(([label, list]) => (
            <div className="skill-row" key={label}>
              <span>{t(`skills.${label}`)}</span>
              <p>{t(`skills.${list}`)}</p>
            </div>
          )
        )}
      </div>
    </section>
  ) }