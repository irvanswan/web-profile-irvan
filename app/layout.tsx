import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Irvan Junaidi — Full Stack Software Engineer",
  description: "Portfolio of Irvan Junaidi, a full stack software engineer based in Jakarta.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
