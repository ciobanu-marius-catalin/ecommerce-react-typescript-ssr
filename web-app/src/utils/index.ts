import { useMemo } from "react";

function useCurrentUser() {
  if (typeof window === "undefined") {
    return {
      isLoggedIn: false,
    };
  }

  const isLoggedIn = useMemo(() => {
    return !!localStorage.getItem("userId");
  }, []);

  return {
    isLoggedIn,
  };
}

export { useCurrentUser };
