import { SPEC_KEYS, type PhoneSpecsData } from "./constants";
import styles from "./phoneSpecs.module.css";

interface PhoneSpecsProps {
  phone: PhoneSpecsData;
}

export default function PhoneSpecs({ phone }: PhoneSpecsProps) {
  const rows = SPEC_KEYS.map(({ label, key }) => ({
    label,
    value: phone[key],
  }));

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>SPECIFICATIONS</h2>
      <div className={styles.table}>
        {rows.map((row) => (
          <div key={row.label} className={styles.row}>
            <span className={styles.cell}>{row.label}</span>
            <span className={styles.cell}>{row.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
