"use client";

import { ColorOption } from "@/lib/types";
import styles from "./colorSelector.module.css";

interface ColorSelectorProps {
  colors: ColorOption[];
  selectedColor: ColorOption | null;
  onSelectColor: (color: ColorOption) => void;
}

export default function ColorSelector({
  colors,
  selectedColor,
  onSelectColor,
}: ColorSelectorProps) {
  return (
    <div className={styles.selector}>
      <p className={styles.selectorLabel}>COLOR. PICK YOUR FAVOURITE.</p>
      <div className={styles.colorOptionsContainer}>
        <div className={styles.colorOptions}>
          {colors.map((option) => (
            <button
              key={option.name}
              className={`${styles.colorBtn} ${selectedColor?.name === option.name ? styles.colorBtnActive : ""}`}
              onClick={() => onSelectColor(option)}
              aria-label={option.name}
              aria-pressed={selectedColor?.name === option.name}
            >
              <span className={styles.colorOption} style={{ backgroundColor: option.hexCode }} />
            </button>
          ))}
        </div>
        <p className={styles.colorName}>{selectedColor?.name}</p>
      </div>
    </div>
  );
}
