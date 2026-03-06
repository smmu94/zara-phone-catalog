import type { CartItem } from "@/lib/types";
import Image from "next/image";
import styles from "./cartItemCard.module.css";

interface CartItemCardProps {
  item: CartItem;
  onRemove: () => void;
}

export default function CartItemCard({ item, onRemove }: CartItemCardProps) {
  const { phone, selectedStorage, selectedColor, price } = item;
  const image =
    phone.colorOptions.find((c) => c.name === selectedColor)?.imageUrl ??
    phone.colorOptions[0]?.imageUrl;

  return (
    <div className={styles.card}>
      <Image
        src={image}
        alt={`${phone.brand} ${phone.name}`}
        width={160}
        height={198}
        className={styles.image}
      />
      <div className={styles.info}>
        <div className={styles.text}>
          <div className={styles.specs}>
            <p className={styles.name}>{phone.name.toUpperCase()}</p>
            <p className={styles.variant}>
              {selectedStorage} | {selectedColor.toUpperCase()}
            </p>
          </div>
          <p className={styles.price}>{price} EUR</p>
        </div>
        <button className={styles.remove} onClick={onRemove}>
          Eliminar
        </button>
      </div>
    </div>
  );
}
