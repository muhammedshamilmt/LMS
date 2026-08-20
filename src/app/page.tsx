import Landing from "@/components/Landing";
import { redirect } from "next/navigation";

export default function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  if (searchParams?.code) {
    redirect(`/auth/callback?code=${searchParams.code}`);
  }
  return <Landing />;
}
