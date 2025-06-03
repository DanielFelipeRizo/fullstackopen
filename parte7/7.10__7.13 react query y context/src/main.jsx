import ReactDOM from "react-dom/client";
import App from "./App";
import { NotificationContextProvider } from "./context/NotificationContext";
import { UserContextProvider } from "./context/userContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

//console.log("estado: ", store.getState());

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>,
);
