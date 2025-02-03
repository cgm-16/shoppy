import { memo } from "react";
import styles from "./index.module.css";

export type TimeDealCardProps = {
  title: string;
  originalPrice: number;
  discountedPrice: number;
  discountRate: number;
  image: string;
  isOpen: boolean;
};

export const TimeDealCard = memo(
  ({
    title,
    originalPrice,
    discountRate,
    discountedPrice,
    image,
    isOpen,
  }: TimeDealCardProps) => {
    return (
      <div
        className={styles.container}
        style={{ cursor: isOpen ? "pointer" : "not-allowed" }}
      >
        <div className={styles.container_item}>
          <img src={image} alt={title} className={styles.product_img} />
          {!isOpen && (
            <div className={styles.overlay}>
              <div className={styles.overlay__text}>오픈 예정</div>
            </div>
          )}
        </div>
        <div className={styles.description}>
          <div className={styles.description__title}>{title}</div>
          <div className={styles.description__original_price}>
            {originalPrice.toLocaleString("ko-KR", {
              style: "decimal",
            })}
            원
          </div>
          <div className={styles.description__price_info}>
            <div className={styles.description__discount_rate}>
              {discountRate}%
            </div>
            <div className={styles.description__discount_price}>
              {discountedPrice.toLocaleString("ko-KR", {
                style: "decimal",
              })}
              원
            </div>
          </div>
        </div>
      </div>
    );
  }
);
