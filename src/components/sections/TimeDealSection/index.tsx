import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { TimeDealTab } from "@/components/TimeDealTab";

const TimeDealSection = () => {
  const chkHour = () => new Date().getHours();

  const [currentHour, setCurrentHour] = useState<number>(chkHour());
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHour((prevTime) => {
        if (chkHour() - prevTime) {
          return chkHour();
        }
        return prevTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const tabs = (time: number) => {
    if (time < 10 || time >= 7) return 2;
    else if (time === 10) return "11시에 끝나는 오늘의 마지막 타임특가!";
    else return "7시에 시작되는 오늘의 타임특가!";
  };

  const parseHour = (currentHour: number) => {
    if (currentHour === 12) return `오후 ${currentHour}시`;
    else if (currentHour > 12) return `오후 ${currentHour - 12}시`;
    else return `오전 ${currentHour}시`;
  };

  return (
    <>
      <div className={styles.heading}>
        {tabs(currentHour) === 2 ? (
          <>
            <div
              className={styles.heading__button}
              onClick={() => setActiveTab(1)}
            >
              {parseHour(currentHour)}
            </div>
            <div
              className={styles.heading__button}
              onClick={() => setActiveTab(2)}
            >
              {parseHour(currentHour + 1)}
            </div>
          </>
        ) : (
          tabs(currentHour)
        )}
      </div>
      {activeTab === 1 && (
        <div className={styles.container}>
          <TimeDealTab tabNumber={activeTab} time={currentHour} />
        </div>
      )}
      {activeTab === 2 && (
        <div className={styles.container}>
          <TimeDealTab tabNumber={activeTab} time={currentHour + 1} />
        </div>
      )}
    </>
  );
};

export default TimeDealSection;
