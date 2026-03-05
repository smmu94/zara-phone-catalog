"use client";

import { StorageOption } from "@/lib/types";
import styles from "./storageSelector.module.css";

interface StorageSelectorProps {
  storageOptions: StorageOption[];
  selectedStorage: StorageOption | null;
  onSelectStorage: (storage: StorageOption) => void;
}

export default function StorageSelector({
  storageOptions,
  selectedStorage,
  onSelectStorage,
}: StorageSelectorProps) {
  return (
    <div className={styles.selector}>
      <p className={styles.selectorLabel}>STORAGE ¿HOW MUCH SPACE DO YOU NEED?</p>
      <div className={styles.storageOptions}>
        {storageOptions.map((option) => (
          <button
            key={option.capacity}
            className={`${styles.storageBtn} ${selectedStorage?.capacity === option.capacity ? styles.storageBtnActive : ""}`}
            onClick={() => onSelectStorage(option)}
            aria-pressed={selectedStorage?.capacity === option.capacity}
          >
            {option.capacity}
          </button>
        ))}
      </div>
    </div>
  );
}
