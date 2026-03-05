"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./backButton.module.css";

export default function BackButton() {
  const { back } = useRouter();

  return (
    <div className={styles.wrapper}>
      <button onClick={back} className={styles.btn}>
        <Image
          src="/chevron_left.svg"
          alt="back-button"
          width={20}
          height={20}
          aria-hidden="true"
        />
        BACK
      </button>
    </div>
  );
}
