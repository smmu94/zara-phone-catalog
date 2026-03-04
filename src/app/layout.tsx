import { CartProvider } from "@/features/cart/CartContext";
import Navbar from "@/shared/components/navbar/navbar";
import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zara Phone Catalog",
  description: "Browse and shop the latest mobile phones",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
