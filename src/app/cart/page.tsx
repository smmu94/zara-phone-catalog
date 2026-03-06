"use client";

import { useCart } from "@/features/cart/CartContext";
import CartItemCard from "@/features/cart/components/cartItemCard";
import { ROUTES } from "@/lib/constants";
import Button from "@/shared/components/button";
import styles from "@/styles/cartPage.module.css";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, totalItems } = useCart();
  const total = items.reduce((acc, item) => acc + item.price, 0);
  const isEmpty = items.length === 0;

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h1 className={styles.title}>CART ({totalItems})</h1>
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.cartItemId}>
              <CartItemCard item={item} onRemove={() => removeItem(item.cartItemId)} />
            </li>
          ))}
        </ul>
      </div>

      <footer className={styles.footer}>
        <Link href={ROUTES.PHONES.LIST} className={styles.continueLink}>
          <Button variant="standard">CONTINUE SHOPPING</Button>
        </Link>
        {!isEmpty && (
          <>
            <div className={styles.total}>
              <span>TOTAL</span>
              <span>{total} EUR</span>
            </div>
            <div className={styles.payBtn}>
              <Button variant="primary">PAY</Button>
            </div>
          </>
        )}
      </footer>
    </main>
  );
}
