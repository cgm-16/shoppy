import { Header } from "@/components";
import { BrandProductHorizontalCard } from "@/components/cards/BrandProductHorizontalCard";

import styles from "./index.module.css";
import {
  BrandDealData,
  BrandDealResponse,
  isRandomServerErrorType,
  RandomServerError,
} from "@/types/responseDataTypes";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useIntersect } from "@/components/InfiniteScroll";

const BrandDeal = () => {
  const queryClient = useQueryClient();
  const firstPageData = () => queryClient.getQueryState<BrandDealResponse>(["brandDeal"])?.data;

  const fetchBrandDeals = async ({
    pageParam,
  }: {
    pageParam: number;
  }): Promise<BrandDealResponse | RandomServerError> => {
    const res = await fetch(
      `https://shopping-db-ori.vercel.app/brand-deal?_start=${pageParam}&_limit=1`
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
    queryKey: ["brandDealInf"],
    queryFn: fetchBrandDeals,
    initialData: () => {
      const data = firstPageData();
      if (data) {
        return {
          pageParams: [0],
          pages: [data]
        }
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (isRandomServerErrorType(lastPage) || lastPage[0].isLastPage) {
        return undefined;
      }
      return (lastPageParam as number) + 1;
    },
    getPreviousPageParam: (firstPage, _allPages, firstPageParam) => {
      if (
        isRandomServerErrorType(firstPage) ||
        (firstPageParam as number) <= 1
      ) {
        return undefined;
      }
      return (firstPageParam as number) - 1;
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
      <Header title="오늘의 브랜드딜" isBackButtonVisible={true} />
      {isPending ? (
        <div>로딩 중...</div>
      ) : isError ? (
        <div className={styles.error_text}>로딩을 하지 못했습니다.</div>
      ) : (
        <>
          <div ref={refPrev}>
            {isFetching && !isFetchingPreviousPage ? "Fetching..." : null}
          </div>
          <div className={styles.container}>
            {data?.pages.map((group, i) => (
              <React.Fragment key={i}>
                {!isRandomServerErrorType(group) &&
                  (group as BrandDealResponse)[0].itemList.map(
                    (ele: BrandDealData) => (
                      <BrandProductHorizontalCard
                        key={ele["id"]}
                        title={ele["title"]}
                        discountedPrice={ele["discountedPrice"]}
                        originalPrice={ele["originalPrice"]}
                        stockPercentage={ele["stockPercentage"]}
                        image={ele["image"]}
                        discountEndDate={ele["discountEndDate"]}
                      />
                    )
                  )}
              </React.Fragment>
            ))}
          </div>
          <div ref={refNext}>
            {isFetching && !isFetchingNextPage ? "Fetching..." : null}
          </div>
        </>
      )}
    </>
  );
};

export default BrandDeal;
