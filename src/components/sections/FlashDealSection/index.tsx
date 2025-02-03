import styles from "./index.module.css";
import { useQuery } from "@tanstack/react-query";
import {
  isRandomServerErrorType,
  LureDealData,
  LureDealResponse,
  RandomServerError,
} from "@/types/responseDataTypes";
import { LureDealCard } from "@/components/cards/LureDealCard";

const FlashDealSection = () => {
  const fetchFlashDeals = async (): Promise<
    LureDealResponse | RandomServerError
  > => {
    const res = await fetch(
      "https://shopping-db-ori.vercel.app/lure-deal"
    );
    return res.json();
  };

  const { data, isError, isPending } = useQuery({
    queryKey: ["flashDeal"],
    queryFn: fetchFlashDeals,
  });

  return (
    <section>
      <div className={styles.heading}>
        <div className={styles.heading__title}>오늘만 이 가격, 순삭특가!</div>
      </div>
      <div className={styles.container}>
        {isPending ? (
          <div>로딩 중...</div>
        ) : isError || data === undefined || isRandomServerErrorType(data) ? (
          <div className={styles.error_text}>로딩을 하지 못했습니다.</div>
        ) : (
          data !== undefined &&
          data.map((ele: LureDealData) => (
            <LureDealCard
              key={ele["id"]}
              title={ele["title"]}
              discountedPrice={ele["discountedPrice"]}
              discountRate={ele["discountRate"]}
              image={ele["image"]}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default FlashDealSection;
