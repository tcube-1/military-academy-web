import IndianAirForce from '@/components/courses/defence/IndianAirForce';
import IndianArmy from '@/components/courses/defence/IndianArmy';
import IndianCoastGuard from '@/components/courses/defence/IndianCoastGuard';
import IndianNavy from '@/components/courses/defence/IndianNavy';
import Degree from '@/components/courses/Degree';
import IitPage from '@/components/courses/inter/IitPage';
import NdaPage from '@/components/courses/inter/NdaPage';
import NeetPage from '@/components/courses/inter/NeetPage';
import intermdiate from '@/components/courses/Intermdiate';

const pages = {
  intermidte: intermdiate,
  degree: Degree,
  nda: NdaPage,
  army: IndianArmy,
  navy: IndianNavy,
  airforce: IndianAirForce,
  coastguard: IndianCoastGuard,
  neet: NeetPage,
  iit: IitPage,
};

export default async function Page({
  params,
}: {
  params: Promise<{ courses: string[] }>;
}) {
  const { courses } = await params;
  const slug = courses[0];
  const Component = pages[slug.toLowerCase() as keyof typeof pages];

  if (!Component) return <div> page not found</div>;
  return <Component title={slug} />;
}
