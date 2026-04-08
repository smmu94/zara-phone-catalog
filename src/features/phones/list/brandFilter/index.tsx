"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./brandFilter.module.css";

interface BrandFilterProps {
  brands: string[];
  selectedBrand?: string;
}

export default function BrandFilter({ brands, selectedBrand }: BrandFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleBrandClick = (brand: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedBrand === brand) {
      params.delete("brand");
    } else {
      params.set("brand", brand);
    }
    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname);
  };

  return (
    <div className={styles.wrapper} role="group" aria-label="Filter by brand">
      {brands.map((brand) => (
        <button
          key={brand}
          onClick={() => handleBrandClick(brand)}
          className={`${styles.chip} ${selectedBrand === brand ? styles.active : ""}`}
          aria-pressed={selectedBrand === brand}
        >
          {brand}
        </button>
      ))}
    </div>
  );
}
