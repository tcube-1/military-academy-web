import NavBar from "../components/home/NavBar";
import Ribbon from "../components/home/Ribbon";

interface PageProps {
  params: Promise<{
    branch: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { branch } = await params;

  return (
    <div>
      <Ribbon />
      <NavBar />
      <h1>{branch}</h1>
    </div>
  );
}
