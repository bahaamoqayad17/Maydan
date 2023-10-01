import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import "../lang/i18";
import { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "../store";
import { Provider } from "react-redux";

export default function App({ Component }) {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(
    globalThis.localStorage?.getItem("i18nextLng")
  );

  useEffect(() => {
    if (lang === "ar") {
      document.documentElement.setAttribute("dir", "rtl");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
    }
    i18n.changeLanguage(lang);
  }, [lang]);

  let cacheRtl;

  if (lang === "ar") {
    cacheRtl = createCache({
      key: "muirtl",
      stylisPlugins: [prefixer, rtlPlugin],
    });
  } else {
    cacheRtl = createCache({
      key: "muirtl",
      stylisPlugins: [prefixer],
    });
  }

  if (lang === "ar") {
    import("../theme/DataTable-ar.css");
  }

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <CacheProvider value={cacheRtl}>
        <Head>
          <title>{`${process.env.APP_NAME}`}</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <ToastContainer />
          <CssBaseline />
          {getLayout(<Component />)}
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}
