"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./brandFilter.module.css";

const BRAND_COLORS: Record<string, string> = {
  Apple: "#555555",
  Samsung: "#1428A0",
  Xiaomi: "#FF6900",
  Google: "#4285F4",
  OnePlus: "#F5010C",
  Huawei: "#CF0A2C",
  Sony: "#1B1A18",
  Motorola: "#E1000F",
  Nokia: "#124191",
  LG: "#A50034",
  Oppo: "#1D5D3C",
  Vivo: "#415FFF",
  Realme: "#FFD700",
};

const FALLBACK_COLORS = [
  "#6A5ACD", "#2E8B57", "#CD853F", "#4682B4", "#D2691E",
  "#708090", "#8B008B", "#556B2F", "#B8860B", "#483D8B",
];

function getBrandColor(brand: string): string {
  if (BRAND_COLORS[brand]) return BRAND_COLORS[brand];
  let hash = 0;
  for (let i = 0; i < brand.length; i++) {
    hash = brand.charCodeAt(i) + ((hash << 5) - hash);
  }
  return FALLBACK_COLORS[Math.abs(hash) % FALLBACK_COLORS.length];
}

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
          style={{ "--brand-color": getBrandColor(brand) } as React.CSSProperties}
        >
          {brand}
        </button>
      ))}
    </div>
  );
}
