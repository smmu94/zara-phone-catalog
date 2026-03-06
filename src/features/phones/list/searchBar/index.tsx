"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounceCallback } from "usehooks-ts";
import styles from "./searchBar.module.css";

interface SearchBarProps {
  totalResults: number;
}

export default function SearchBar({ totalResults }: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = useDebounceCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      params.set("search", value.trim());
    } else {
      params.delete("search");
    }
    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname);
  }, 300);

  return (
    <div className={styles.wrapper}>
      <label htmlFor="phone-search" className={styles.srOnly}>
        Search for a smartphone
      </label>
      <input
        id="phone-search"
        type="search"
        placeholder="Search for a smartphone..."
        defaultValue={searchParams.get("search") ?? ""}
        onChange={(e) => handleSearch(e.target.value)}
        className={styles.input}
      />
      <p className={styles.results} aria-live="polite">
        {totalResults} RESULTS
      </p>
    </div>
  );
}
