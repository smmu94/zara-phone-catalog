import SearchBar from "@/features/phones/list/searchBar";
import PhoneGrid from "@/features/phones/list/phoneGrid";
import BrandFilter from "@/features/phones/list/brandFilter";
import { getPhones } from "@/lib/data";
import styles from "@/styles/phoneListPage.module.css";

interface PhoneListPageProps {
  searchParams: Promise<{ search?: string; brand?: string }>;
}

export default async function PhoneListPage({ searchParams }: PhoneListPageProps) {
  const { search, brand } = await searchParams;
  const allPhones = await getPhones(search);

  const brands = [...new Set(allPhones.map((p) => p.brand))].sort();
  const phones = brand ? allPhones.filter((p) => p.brand === brand) : allPhones;

  return (
    <main className={styles.main}>
      <SearchBar totalResults={phones.length} />
      <BrandFilter brands={brands} selectedBrand={brand} />
      <PhoneGrid phones={phones} />
    </main>
  );
}
