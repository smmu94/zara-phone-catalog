import { getPhones } from "@/lib/data";

export default async function PhoneListPage() {
  const phones = await getPhones();
  console.log(phones);
  return <main>Phone List</main>;
}
