import Link from 'next/link';

const pages = {};

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
