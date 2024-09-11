import { memo } from "react";
import styles from "./index.module.css";
import { useTimer } from "@/components/Timer";

export type BrandProductVerticalCardProps = {
  title: string;
  discountedPrice: number;
  discountRate: number;
  image: string;
  discountEndDate: string;
};

export const BrandProductVerticalCard = memo(
  ({
    title,
    discountRate,
    discountedPrice,
    discountEndDate,
    image,
  }: BrandProductVerticalCardProps) => {
    const timeLeft = useTimer(discountEndDate) / 1000;
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = Math.floor(timeLeft % 60);

    return (
      <div
        className={styles.container}
        style={{ cursor: timeLeft <= 1 ? "not-allowed" : "pointer" }}
      >
        <div className={styles.container_item}>
          <img src={image} alt={title} className={styles.product_img} />
        </div>
        <div className={styles.description}>
          <div>
            {timeLeft <= 1 ? (
              <span className={styles.description__timer}>할인 종료</span>
            ) : (
              <span className={styles.description__timer}>
                {hours === 0 ? "" : hours + "시간 "}
                {minutes === 0 ? "" : minutes + "분 "}
                {seconds < 10 ? "0" + seconds : seconds}초
              </span>
            )}
          </div>
          <div className={styles.description__title}>{title}</div>
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
