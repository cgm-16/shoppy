import { webPath } from "@/router";
import { useNavigate } from "react-router-dom";

import styles from "./index.module.css";
import { BrandProductVerticalCard } from "@/components/cards/BrandProductVerticalCard";
import { useQuery } from "@tanstack/react-query";
import { BrandDealData, BrandDealResponse, isRandomServerErrorType } from "@/types/responseDataTypes";

const BrandDealSection = () => {
  const navigate = useNavigate();

  const handleClickGoToBrandDeal = () => {
    navigate(webPath.brandDeal());
  };

  const fetchBrandDeals = async (): Promise<BrandDealResponse> => {
    const res = await fetch(
      "https://shopping-db-ori.vercel.app/brand-deal?_start=0&_limit=1"
    );
    return res.json();
  };

  const { data, isError, isPending } = useQuery({
    queryKey: ["brandDeal"],
    queryFn: fetchBrandDeals,
  });

  return (
    <section>
      <div className={styles.heading}>
        <div className={styles.heading__title}>오늘의 브랜드딜</div>
        <div
          className={styles.heading__to_brand}
          onClick={handleClickGoToBrandDeal}
        >
          브랜드딜 바로가기
        </div>
      </div>
      <div className={styles.container}>
      {isPending ? (
        <div>로딩 중...</div>
      ) : isError || data === undefined || isRandomServerErrorType(data)  ? (
        <div className={styles.error_text}>로딩을 하지 못했습니다.</div>
      ) : (
          data[0].itemList.map((ele: BrandDealData) => (
            <BrandProductVerticalCard
              key={ele["id"]}
              title={ele["title"]}
              discountedPrice={ele["discountedPrice"]}
              discountRate={ele["discountRate"]}
              image={ele["image"]}
              discountEndDate={new Date(Date.now() + Math.floor(2*60*60*1000 * Math.random())).toISOString()}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default BrandDealSection;
