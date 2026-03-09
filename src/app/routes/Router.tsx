import { BrowserRouter, Route, Routes } from "react-router";

import {
  ErrorPage,
  MainPage,
  MyPage,
  UploadCompletePage,
  UploadLoadingPage,
  UploadPage,
  UploadStepPage,
} from "@/pages";
import { ROUTE_PATHS } from "@/shared";
import { RootLayout } from "@/widgets";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path={ROUTE_PATHS.MAIN} element={<MainPage />} />
          <Route path={ROUTE_PATHS.MYPAGE} element={<MyPage />} />
          <Route path={ROUTE_PATHS.FILE_UPLOAD} element={<UploadPage />} />
          <Route
            path={ROUTE_PATHS.UPLOAD_LOADING}
            element={<UploadLoadingPage />}
          />
          <Route path={ROUTE_PATHS.UPLOAD_STEP} element={<UploadStepPage />} />
          <Route
            path={ROUTE_PATHS.UPLOAD_COMPLETE}
            element={<UploadCompletePage />}
          />

          <Route path={ROUTE_PATHS.NOT_FOUND} element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
