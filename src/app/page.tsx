import PhoneGrid from "@/features/phones/list/phoneGrid";
import { getPhones } from "@/lib/data";
import styles from "@/styles/page.module.css"

export default async function PhoneListPage() {
  const phones = await getPhones();
  return (
    <main className={styles.main}>
      <PhoneGrid phones={phones} />
    </main>
  );
}
