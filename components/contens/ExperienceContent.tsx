import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import SectionHeading from "../SectionHeading";
import experienceData from '@/data/work_experience.json';
import { BriefcaseBusiness } from "lucide-react";

export default function ExperienceContent({ t }: {
  t: ReturnType<typeof useTranslations>
}) {
  const params = useParams();
  const language: "en" | "id" = params?.locale as "en" | "id";
  return (
    <div className="flex flex-col gap-2 w-full">
      <SectionHeading
        eyebrow={t("experience.eyebrow")}
        title={t("experience.title")}
      />
      <div className="timeline w-full">
        {experienceData?.map((item, idx) => (
          <div key={`exp-${idx}`} className="timeline-item">
            <div className="timeline-mark">
              <BriefcaseBusiness size={17} />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center gap-2 w-full section-heading">
                <h5 className="text-2xl">{item?.company_name}</h5>
                <span className="rounded-lg p-2 bg-blue-50">
                  {item?.start_year} - {item?.end_year || t("now")}
                </span>
              </div>
              <span>{item?.position}</span>
              <div
                className="
    [&_ul]:list-disc
    [&_ul]:space-y-2
    [&_ul]:pl-5
    [&_li]:pl-1
  "
                dangerouslySetInnerHTML={{
                  __html: item?.description?.[language] ?? "",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}