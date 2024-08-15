import { memo } from "react";
import styles from "./index.module.css";

export type LureDealCardProps = {
  title: string;
  discountRate: number;
  discountedPrice: number;
  image: string;
};

export const LureDealCard = memo(
  ({ title, discountRate, discountedPrice, image }: LureDealCardProps) => {
    return (
      <div className={styles.container}>
        <div className={styles.container_item}>
          <img src={image} alt={title} className={styles.product_img} />
        </div>
        <div className={styles.description}>
          <div className={styles.description__title}>{title}</div>
          <div className={styles.description__price_info}>
            <div className={styles.description__discount_rate}>
              {discountRate}%
            </div>
            <div className={styles.description__discount_price}>
              {discountedPrice.toLocaleString("ko-KR", {
                style: "decimal",
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
