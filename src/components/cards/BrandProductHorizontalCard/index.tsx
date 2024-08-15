import { memo } from "react";
import styles from "./index.module.css";
import { ProgressBar } from "@/components/ProgressBar";

export type BrandProductHorizontalCardProps = {
  title: string;
  originalPrice: number;
  discountedPrice: number;
  stockPercentage: number;
  image: string;
  discountEndDate: string;
};

export const BrandProductHorizontalCard = memo(
  ({
    title,
    originalPrice,
    discountedPrice,
    stockPercentage,
    image,
  }: BrandProductHorizontalCardProps) => {
    return (
      <div className={styles.container}>
        <div className={styles.container_item}>
          <img src={image} alt={title} className={styles.product_img} />
        </div>
        <div className={styles.description}>
          <div className={styles.description__title}>{title}</div>
          <ProgressBar stockPercentage={stockPercentage} />
          <div className={styles.description__discount_price}>
            할인가{" "}
            {discountedPrice.toLocaleString("ko-KR", {
              style: "decimal",
            })}
            원
          </div>
          <div className={styles.description__original_price}>
            곧 정상가{" "}
            {originalPrice.toLocaleString("ko-KR", {
              style: "decimal",
            })}
            원 으로 돌아갑니다
          </div>
        </div>
      </div>
    );
  }
);
