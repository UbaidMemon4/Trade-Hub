"use client";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Login } from "./Redux/tradeSlice";

function AppWrapper({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.trade.isLogin);

  useEffect(() => {
    document.title = "Home Page || Trade Hub";

    if (user) {
      dispatch(Login());
      router.push("/Auth/UserView");
    }
  }, [dispatch, router]);

  return <>{children}</>;
}

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <AppWrapper>{children}</AppWrapper>
        </body>
      </html>
    </Provider>
  );
}
