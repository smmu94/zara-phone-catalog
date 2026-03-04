"use client";

import { useCart } from "@/features/cart/CartContext";
import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.css";
import { ROUTES } from "@/lib/constants";

export default function Navbar() {
  const { totalItems } = useCart();
  const hasItems = totalItems > 0;

  return (
    <header className={styles.header}>
      <Link href={ROUTES.PHONES.LIST} aria-label="Go to phones list page">
        <Image src="/logo.svg" alt="MBST" width={77} height={29} priority />
      </Link>

      <Link href={ROUTES.CART} className={styles.cartLink} aria-label={`Cart with ${totalItems} items`}>
        <Image
          src={hasItems ? "/cart_active.svg" : "/cart_inactive.svg"}
          alt="Cart Icon"
          width={24}
          height={24}
          aria-hidden="true"
        />
        <span className={styles.cartCount}>{totalItems}</span>
      </Link>
    </header>
  );
}
