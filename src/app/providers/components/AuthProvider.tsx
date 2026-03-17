import { type ReactNode, useCallback } from "react";

import {
  AuthContext,
  USER_INFO_QUERY_KEY,
  useGetUserInfo,
  useUserInfoStore,
} from "@/entities";
import { queryClient } from "@/shared";

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const userInfo = useUserInfoStore((state) => state.userInfo);
  const clearUserInfo = useUserInfoStore((state) => state.clearUserInfo);
  const { isFetching, isPending, refetch } = useGetUserInfo({
    showErrorToast: false,
  });

  const checkAuth = useCallback(() => {
    void refetch();
  }, [refetch]);

  const login = useCallback(() => {
    void refetch();
  }, [refetch]);

  const logout = useCallback(() => {
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    clearUserInfo();
    queryClient.removeQueries({ queryKey: USER_INFO_QUERY_KEY });
  }, [clearUserInfo]);

  const isAuthenticated = Boolean(userInfo);
  const isLoading = isPending || (isFetching && !isAuthenticated);

  return (
    <AuthContext
      value={{ isAuthenticated, isLoading, login, logout, checkAuth }}
    >
      {children}
    </AuthContext>
  );
};
