import IndianAirForce from '@/components/courses/defence/IndianAirForce';
import IndianArmy from '@/components/courses/defence/IndianArmy';
import IndianCoastGuard from '@/components/courses/defence/IndianCoastGuard';
import IndianNavy from '@/components/courses/defence/IndianNavy';
import Degree from '@/components/courses/Degree';
import IitPage from '@/components/courses/inter/IitPage';
import NdaPage from '@/components/courses/inter/NdaPage';
import NeetPage from '@/components/courses/inter/NeetPage';
import intermdiate from '@/components/courses/Intermdiate';
import Link from 'next/link';

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
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  const page = slug[0];

  const Component = pages[page.toLowerCase() as keyof typeof pages];

  if (!Component) {
    return (
      <div>
        <h1>Page not found</h1>

        <p>Available Pages:</p>
        {/* -------------------------------------------------------------------- */}
        {/* >> Redirect to available link */}
        {/* -------------------------------------------------------------------- */}
        <ul>
          {Object.keys(pages).map((key) => (
            <li key={key}>
              <Link href={`/courses/${key}`}>{key}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
