import { ROUTES } from "@/lib/constants";
import { Phone } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import styles from "./phoneCard.module.css";

interface PhoneCardProps {
  phone: Phone;
  priority?: boolean;
}

export default function PhoneCard({ phone, priority = false }: PhoneCardProps) {
  return (
    <Link href={ROUTES.PHONES.DETAILS(phone.id)} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={phone.imageUrl}
          alt={`${phone.brand} ${phone.name}`}
          fill
          sizes="312px"
          priority={priority}
          className={styles.image}
        />
      </div>
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
