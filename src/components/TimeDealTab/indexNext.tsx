import styles from "./index.module.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  isRandomServerErrorType,
  TimeDealData,
  TimeDealResponse,
  RandomServerError,
} from "@/types/responseDataTypes";
import { TimeDealCard } from "@/components/cards/TimeDealCard";
import React from "react";
import { useIntersect } from "@/components/InfiniteScroll";

export type TimeDealNextTabProps = {
  tabNumber: 1 | 2;
  time: number;
};

export const TimeDealNextTab = ({ tabNumber, time }: TimeDealNextTabProps) => {
  const chkHour = () => new Date().getHours();

  const fetchTimeNextDeals = async (
    pa = 1
  ): Promise<TimeDealResponse | RandomServerError> => {
    const res = await fetch(
      `https://assignment-front.ilevit.com/deals/time-deal?page=${pageParam}&time=next`
    );
    return res.json();
  };


  const {
    data,
    isError,
    isPending,
    isFetching,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
  } = useInfiniteQuery({
    queryKey: ["timeDealNextInf"],
    queryFn: (pa: number) => fetchTimeNextDeals(pa),
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (isRandomServerErrorType(lastPage) || lastPage.isLastPage) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
      if (
        isRandomServerErrorType(firstPage) ||
        firstPageParam <= 1
      ) {
        return undefined;
      }
      return firstPageParam - 1;
    },
    maxPages: 3,
  });

  const refNext = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (!isPending && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });

  const refPrev = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (!isPending && hasPreviousPage && !isFetching) {
      fetchPreviousPage();
    }
  });

  return (
    <>
      {isPending ? (
        <div>로딩 중...</div>
      ) : isError ? (
        <div className={styles.error_text}>로딩을 하지 못했습니다.</div>
      ) : (
        <>
          <div ref={refPrev}>
            {isFetching && !isFetchingPreviousPage ? "Fetching..." : null}
          </div>
          {data?.pages.map((group, i) => (
            <React.Fragment key={i}>
              {!isRandomServerErrorType(group) &&
                (group as TimeDealResponse).itemList.map(
                  (ele: TimeDealData) => (
                    <TimeDealCard
                      key={ele["id"]}
                      title={ele["title"]}
                      discountedPrice={ele["discountedPrice"]}
                      originalPrice={ele["originalPrice"]}
                      discountRate={ele["discountRate"]}
                      image={ele["image"]}
                      isOpen={
                        tabNumber === 1 ||
                        (tabNumber === 2 && chkHour() - time === 1)
                      }
                    />
                  )
                )}
            </React.Fragment>
          ))}
          <div ref={refNext}>
            {isFetching && !isFetchingNextPage ? "Fetching..." : null}
          </div>
        </>
      )}
    </>
  );
};
