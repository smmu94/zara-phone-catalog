import { ROUTES } from "@/lib/constants";
import { Phone } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import styles from "./phoneCard.module.css";

interface PhoneCardProps {
  phone: Phone;
}

export default function PhoneCard({ phone }: PhoneCardProps) {
  return (
    <Link href={ROUTES.PHONES.DETAILS(phone.id)} className={styles.card}>
      <Image
        src={phone.imageUrl}
        alt={`${phone.brand} ${phone.name}`}
        width={200}
        height={200}
        className={styles.image}
      />
      <div className={styles.info}>
        <div className={styles.left}>
          <span className={styles.brand}>{phone.brand}</span>
          <span className={styles.name}>{phone.name}</span>
        </div>
        <span className={styles.price}>{phone.basePrice} EUR</span>
      </div>
    </Link>
  );
}
