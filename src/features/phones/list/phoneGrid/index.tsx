import PhoneCard from "@/features/phones/components/phoneCard";
import { Phone } from "@/lib/types";
import styles from "./phoneGrid.module.css";

interface PhoneGridProps {
  phones: Phone[];
}

export default function PhoneGrid({ phones }: PhoneGridProps) {
  return (
    <ul className={styles.grid}>
      {phones.map((phone, index) => (
        <li key={`${phone.id}-${index}`}>
          <PhoneCard key={phone.id} phone={phone} priority={index < 4} />
        </li>
      ))}
    </ul>
  );
}
