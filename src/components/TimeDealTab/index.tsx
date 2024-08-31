import {
  isRandomServerErrorType,
  TimeDealData,
  TimeDealResponse,
  RandomServerError,
} from "@/types/responseDataTypes";
import { TimeDealCard } from "@/components/cards/TimeDealCard";
import { useEffect, useState } from "react";
import { useIntersect } from "@/components/InfiniteScroll";
import { Navigate } from "react-router-dom";

export type TimeDealNextTabProps = {
  tabNumber: 1 | 2;
  time: number;
};

export const TimeDealTab = ({ tabNumber, time }: TimeDealNextTabProps) => {
  const chkHour = () => new Date().getHours();
  const [pages, setPages] = useState<TimeDealData[]>([]);
  const [pageNo, setPageNo] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [stop, setStop] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchTimeNextDeals = async (
    pageParam: number
  ): Promise<TimeDealResponse | RandomServerError> => {
    const res = await fetch(
      `https://shopping-db-ori.vercel.app/api/time-deal-${tabNumber === 1 ? "current" : "next"}?_start=${pageParam}_limit=1`
    );
    return res.json();
  };

  useEffect(() => {
    if (isLoaded && !stop) {
      fetchTimeNextDeals(pageNo).then((res) => {
        if (isRandomServerErrorType(res)) {
          setIsError(true);
          return;
        }
        setPages((prev) => prev.concat(res[0].itemList));
        if (res[0].isLastPage) setStop(true);
        setPageNo(pageNo + 1);
        setIsLoaded(false);
      });
    }
  });

  const getMoreItem = () => {
    setIsLoaded(true);
  };

  const refNext = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      getMoreItem();

      observer.observe(entry.target);
    }
  });

  return (
    <>
      {isError && <Navigate to={"404"} replace />}
      {pages.map((ele) => (
        <TimeDealCard
          key={ele["id"]}
          title={ele["title"]}
          discountedPrice={ele["discountedPrice"]}
          originalPrice={ele["originalPrice"]}
          discountRate={ele["discountRate"]}
          image={ele["image"]}
          isOpen={
            tabNumber === 1 || (tabNumber === 2 && chkHour() - time === 1)
          }
        />
      ))}
      <div ref={refNext}></div>
    </>
  );
};
