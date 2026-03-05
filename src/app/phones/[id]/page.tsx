import BackButton from "@/features/phones/details/backButton";
import PhoneMainInfo from "@/features/phones/details/phoneMainInfo";
import { getPhoneById } from "@/lib/data";
import styles from "@/styles/phoneDetailsPage.module.css";

interface PhoneDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function PhoneDetailsPage({ params }: PhoneDetailsPageProps) {
  const { id } = await params;
  const phone = await getPhoneById(id);

  return (
    <main>
      <BackButton />
      <div className={styles.phoneDetailsContainer}>
        <PhoneMainInfo phone={phone} />
      </div>
    </main>
  );
}
