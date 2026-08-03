import IndianAirForce from "@/app/components/courses/defence/IndianAirForce";
import IndianArmy from "@/app/components/courses/defence/IndianArmy";
import IndianCostGuard from "@/app/components/courses/defence/IndianCostGuard";
import IndianNavy from "@/app/components/courses/defence/IndianNavy";
import Degree from "@/app/components/courses/Degree";
import IitPage from "@/app/components/courses/inter/IitPage";
import NdaPage from "@/app/components/courses/inter/NdaPage";
import NeetPage from "@/app/components/courses/inter/NeetPage";
import intermidte from "@/app/components/courses/Intermidte";

const pages = {
  intermidte: intermidte,
  degree: Degree,
  nda: NdaPage,
  army: IndianArmy,
  navy: IndianNavy,
  airforce: IndianAirForce,
  costguard: IndianCostGuard,
  neet: NeetPage,
  iit: IitPage,
};

export default async function Page({
  params,
}: {
  params: Promise<{ courses: string }>;
}) {
  const { courses } = await params;
  const slug = courses[0];
  const Component = pages[slug.toLowerCase() as keyof typeof pages];

  if (!Component) return <div> page not found</div>;
  return <Component title={courses} />;
}
