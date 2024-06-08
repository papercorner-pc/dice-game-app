import "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MMKV } from "react-native-mmkv";
import ApplicationNavigator from "./navigators/Application";
import Toast from "react-native-toast-message";
import FlashMessage from "react-native-flash-message";
import { ErrorBoundary } from "./screens/Error/error-boundary";
import { ThemeProvider } from "./theme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});
export const storage = new MMKV();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider storage={storage}>
        <ErrorBoundary>
          {/* <ShowNotificationForeground /> */}
          <ApplicationNavigator />
        </ErrorBoundary>
        <FlashMessage position="top" />
      </ThemeProvider>
      <Toast />
    </QueryClientProvider>
  );
};
export default App;
