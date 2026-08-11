import { useLocale, useTranslations } from "next-intl";
import SectionHeading from "../SectionHeading";
import portfolioData from "@/data/portfolio.json";
import { ExternalLink, Images } from "lucide-react";

type PortfolioLocale = "en" | "id";

type PortfolioCategory = "portofolio" | "proyek" | "product";

type PortfolioItem = {
  start_year: string;
  end_year: string;
  name: string;
  description: Record<PortfolioLocale, string>;
  category: PortfolioCategory;
  technologies: string;
  url?: string | null;
};

export default function PortfolioContent({ t }: { t: ReturnType<typeof useTranslations> }) {
  const locale = useLocale() as PortfolioLocale;

  const getUniqueListBy = (arr: any[], key: string) => {
    const seen = new Set();
    return arr.filter(item => {
      const k = item[key];
      return seen.has(k) ? false : seen.add(k);
    });
  };

  const portfolioItems = portfolioData as PortfolioItem[];

  return (
    <section className="flex flex-col gap-2">
      <SectionHeading eyebrow={t("portfolio.eyebrow")} title={t("portfolio.title")} />
      <div className="flex items-stretch gap-2">
        {getUniqueListBy(portfolioItems, 'category')?.map((item) => (
          <div key={item?.category} className="rounded-xl w-fit p-2 bg-slate-500 text-white h-auto">
            <span>{item?.category}</span>
          </div>
        ))}
      </div>
      <div className="project-list">
        {portfolioItems.map((project, index) => {
          const endYear = project.end_year || t("portfolio.present");
          const period = project.start_year === endYear ? project.start_year : `${project.start_year} — ${endYear}`;
          return (
            <div className={`project-item project-${index + 1}`} key={`${project.name}-${project.start_year}`}>
              <div className="project-number">{String(index + 1).padStart(2, "0")}</div>
              <div className="project-copy">
                <div className="project-topline">
                  <span>{period}</span>
                  <span>{t(`portfolio.categories.${project.category}`)}</span>
                </div>
                <h3>{project.name}</h3>
                <p>{project.description[locale]}</p>
                <div className="project-meta">
                  <span>{project.technologies}</span>
                  <div className="flex items-center gap-2">
                    <span className="project-arrow">
                      <Images size={14} />
                    </span>
                    {project?.url && <a href={project?.url} target="_blank" className="project-arrow"><ExternalLink size={14} /></a>}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}