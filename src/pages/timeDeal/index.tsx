import { Header } from "@/components";

import styles from "./index.module.css";

import BrandDealSection from "@/components/sections/BrandDealSection";
import FlashDealSection from "@/components/sections/FlashDealSection";
import TimeDealSection from "@/components/sections/TimeDealSection";

const TimeDeal = () => {
  return (
    <>
      <Header title="타임특가" isBackButtonVisible={false} />
      <div className={styles.container}>
        <div>
          <FlashDealSection />
          <BrandDealSection />
        </div>
        <TimeDealSection />
      </div>
    </>
  );
};

export default TimeDeal;
