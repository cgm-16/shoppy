export type LureDealData = {
  id: number;
  title: string;
  originalPrice: number;
  discountedPrice: number;
  discountRate: number;
  image: string;
};

export type LureDealResponse = LureDealData[];

export type BrandDealData = {
  id: number;
  title: string;
  originalPrice: number;
  discountedPrice: number;
  discountRate: number;
  stockPercentage: number;
  image: string;
  discountEndDate: string;
};

export type BrandDealResponse = {
    itemList: BrandDealData[];
    isLastPage: boolean;
}

export type TimeDealData = {
    id: number;
    title: string;
    originalPrice: number;
    discountedPrice: number;
    discountRate: number;
    image: string;
}

export type TimeDealResponse = {
    itemList: TimeDealData[];
    isLastPage: boolean;
}

export type RandomServerError = {
  error: string;
}

export function isRandomServerErrorType<T>(obj: RandomServerError|T): obj is RandomServerError {
  return (obj as RandomServerError).error !== undefined;
}