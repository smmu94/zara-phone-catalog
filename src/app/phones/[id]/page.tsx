import { getPhoneById } from "@/lib/data";

interface PhoneDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function PhoneDetailsPage({ params }: PhoneDetailsPageProps) {
  const { id } = await params;
  const phone = await getPhoneById(id);
  console.log({ phone });

  return <main>Phone Details Page</main>;
}
