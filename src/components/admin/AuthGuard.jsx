import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
// import { CheckToken } from "../lib/HandleToken";
// import axios from "./../lib/axios";

export default function AuthGuard(props) {
  const { children } = props;
  const router = useRouter();
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (ignore.current) {
      return;
    }

    ignore.current = true;

    // if (CheckToken()) {
    //   setChecked(true);
    //   const token = globalThis.localStorage?.getItem("token");
    //   //   axios.defaults.headers.common = {
    //   //     Authorization: `Bearer ${token}`,
    //   //   };
    // } else {
    //   console.log("Not authenticated, redirecting");
    //   router
    //     .replace({
    //       pathname: "/login",
    //       query:
    //         router.asPath !== "/" ? { continueUrl: router.asPath } : undefined,
    //     })
    //     .catch(console.error);
    // }
    if (router.pathname == "/login" && checked) {
      router
        .replace({
          pathname: "/",
        })
        .catch(console.error);
    }
  }, [router.isReady]);

  if (!checked) {
    return null;
  }

  return children;
}

AuthGuard.propTypes = {
  children: PropTypes.node,
};
