import { useInfiniteQuery } from "@tanstack/react-query";
import { getOrderList } from "../../services/orders";

export default function useFetchOrderList() {
  const getOrdersList = async ({ pageParam = 0}) => {
    const res = getOrderList(pageParam)

    return {
      data: res,
      nextPage: pageParam + 1,
    };
  };

  return useInfiniteQuery(["order"], getOrdersList, {
    getNextPageParam: (lastPage) => {
      if (lastPage.data.length < 10) return undefined;

      return lastPage.nextPage;
    },
  });
}