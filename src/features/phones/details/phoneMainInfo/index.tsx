"use client";

import { useCart } from "@/features/cart/CartContext";
import { ColorOption, PhoneDetail, StorageOption } from "@/lib/types";
import Button from "@/shared/components/button";
import Image from "next/image";
import { useState } from "react";
import ColorSelector from "./components/colorSelector";
import styles from "./phoneMainInfo.module.css";
import StorageSelector from "./components/storageSelector";

interface PhoneMainInfoProps {
  phone: PhoneDetail;
}

export default function PhoneMainInfo({ phone }: PhoneMainInfoProps) {
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<StorageOption | null>(null);
  const { addItem } = useCart();

  const currentImage = selectedColor?.imageUrl ?? phone.colorOptions[0]?.imageUrl;
  const currentPrice = selectedStorage?.price ?? phone.basePrice;
  const canAddToCart = selectedColor !== null && selectedStorage !== null;

  const handleAddToCart = () => {
    if (!canAddToCart) return;
    addItem({
      phone,
      selectedColor: selectedColor.name,
      selectedStorage: selectedStorage.capacity,
      price: selectedStorage.price,
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <Image
          src={currentImage}
          alt={`${phone.brand} ${phone.name}`}
          width={260}
          height={273}
          className={styles.image}
          priority
        />
      </div>

      <div className={styles.info}>
        <div className={styles.header}>
          <h1 className={styles.name}>{phone.name.toUpperCase()}</h1>
          <p className={styles.price}>From {currentPrice} EUR</p>
        </div>

        <div className={styles.selectors}>
          <StorageSelector
            storageOptions={phone.storageOptions}
            selectedStorage={selectedStorage}
            onSelectStorage={setSelectedStorage}
          />

          <ColorSelector
            colors={phone.colorOptions}
            selectedColor={selectedColor}
            onSelectColor={setSelectedColor}
          />
        </div>

        <Button variant="primary" disabled={!canAddToCart} onClick={handleAddToCart}>
          AÑADIR
        </Button>
      </div>
    </div>
  );
}
