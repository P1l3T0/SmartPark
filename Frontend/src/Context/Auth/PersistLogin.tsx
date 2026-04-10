import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../../Hooks/Auth/useRefreshToken";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { refresh, scheduleRefresh, getTokenFromCookie } = useRefreshToken();

  useEffect(() => {
    const initAuth = async () => {
      const token = getTokenFromCookie();

      if (token) {
        scheduleRefresh(token);
      } else {
        await refresh();
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  return <>{isLoading ? null : <Outlet />}</>;
};

export default PersistLogin;
