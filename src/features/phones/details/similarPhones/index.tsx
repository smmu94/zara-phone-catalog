"use client";

import PhoneCard from "@/features/phones/components/phoneCard";
import type { Phone } from "@/lib/types";
import { useRef, useState } from "react";
import styles from "./similarPhones.module.css";

interface SimilarPhonesProps {
  phones: Phone[];
}

export default function SimilarPhones({ phones }: SimilarPhonesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [thumbLeft, setThumbLeft] = useState(0);
  const isDragging = useRef(false);
  const isDown = useRef(false);

  const handleScroll = () => {
    const el = ref.current;
    if (!el) return;
    setThumbLeft((el.scrollLeft / (el.scrollWidth - el.clientWidth)) * 70);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    isDown.current = true;
    isDragging.current = false;
    const startX = e.pageX;
    const startScroll = el.scrollLeft;

    const move = (ev: PointerEvent) => {
      if (!isDown.current) return;
      if (Math.abs(ev.pageX - startX) > 5) {
        isDragging.current = true;
        el.classList.add(styles.dragging);
      }
      if (!isDragging.current) return;
      el.scrollLeft = startScroll - (ev.pageX - startX);
    };

    const stop = () => {
      isDown.current = false;
      el.classList.remove(styles.dragging);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", stop);
      el.removeEventListener("pointercancel", stop);
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", stop);
    el.addEventListener("pointercancel", stop);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging.current) {
      e.preventDefault();
      e.stopPropagation();
      isDragging.current = false;
    }
  };

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>SIMILAR ITEMS</h2>
      <div
        ref={ref}
        className={styles.carousel}
        onPointerDown={handlePointerDown}
        onClick={handleClick}
        onScroll={handleScroll}
      >
        {phones.map((phone) => (
          <div key={phone.id} className={styles.item}>
            <PhoneCard phone={phone} />
          </div>
        ))}
      </div>
      <div className={styles.scrollbarTrack}>
        <div className={styles.scrollbarThumb} style={{ left: `${thumbLeft}%` }} />
      </div>
    </section>
  );
}
