import { Header } from "@/components";
import { webPath } from "@/router";
import { useNavigate } from "react-router-dom";

import styles from "./index.module.css";

const TimeDeal = () => {
  const navigate = useNavigate();

  const handleClickGoToBrandDeal = () => {
    navigate(webPath.brandDeal());
  };

  return (
    <div>
      <Header title="타임딜" isBackButtonVisible={false} />
      <button className={styles.button} onClick={handleClickGoToBrandDeal}>
        브랜드딜 바로가기
      </button>
    </div>
  );
};

export default TimeDeal;
