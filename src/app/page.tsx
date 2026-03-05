import SearchBar from "@/features/phones/list/searchBar";
import PhoneGrid from "@/features/phones/list/phoneGrid";
import { getPhones } from "@/lib/data";
import styles from "@/styles/page.module.css";

interface HomePageProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function PhoneListPage({ searchParams }: HomePageProps) {
  const { search } = await searchParams;
  const phones = await getPhones(search);
  return (
    <main className={styles.main}>
      <SearchBar totalResults={phones.length} />
      <PhoneGrid phones={phones} />
    </main>
  );
}
