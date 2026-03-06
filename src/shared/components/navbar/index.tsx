"use client";

import { useCart } from "@/features/cart/CartContext";
import { ROUTES } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";

export default function Navbar() {
  const { totalItems } = useCart();
  const pathname = usePathname();
  const hasItems = totalItems > 0;
  const isCartPage = pathname === ROUTES.CART;

  return (
    <header className={styles.header}>
      <Link href={ROUTES.PHONES.LIST} aria-label="Go to phones list page">
        <Image src="/logo.svg" alt="MBST" width={77} height={29} priority />
      </Link>

      {!isCartPage && (
        <Link
          href={ROUTES.CART}
          className={styles.cartLink}
          aria-label={`Cart with ${totalItems} items`}
        >
          <Image
            src={hasItems ? "/cart_active.svg" : "/cart_inactive.svg"}
            alt="Cart Icon"
            width={24}
            height={24}
            aria-hidden="true"
          />
          <span className={styles.cartCount}>{totalItems}</span>
        </Link>
      )}
    </header>
  );
}
