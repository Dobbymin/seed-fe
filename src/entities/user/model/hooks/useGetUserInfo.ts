import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import { getUserInfoAPI } from "../apis";
import { useUserInfoStore } from "../store";

export const USER_INFO_QUERY_KEY = ["user-info", "user"] as const;

type UseGetUserInfoOptions = {
  enabled?: boolean;
  showErrorToast?: boolean;
};

export const useGetUserInfo = ({
  enabled = true,
  showErrorToast = false,
}: UseGetUserInfoOptions = {}) => {
  const userInfo = useUserInfoStore((state) => state.userInfo);
  const setUserInfo = useUserInfoStore((state) => state.setUserInfo);
  const clearUserInfo = useUserInfoStore((state) => state.clearUserInfo);

  const query = useQuery({
    queryKey: USER_INFO_QUERY_KEY,
    queryFn: () => getUserInfoAPI(),
    initialData: userInfo ?? undefined,
    enabled,
    retry: false,
    throwOnError: false,
    meta: {
      showErrorToast,
      errorMessage: "사용자 정보를 불러오지 못했습니다.",
    },
  });

  useEffect(() => {
    if (!query.data) {
      return;
    }

    setUserInfo(query.data);
  }, [query.data, setUserInfo]);

  useEffect(() => {
    if (!query.isError) {
      return;
    }

    clearUserInfo();
  }, [query.isError, clearUserInfo]);

  return query;
};
