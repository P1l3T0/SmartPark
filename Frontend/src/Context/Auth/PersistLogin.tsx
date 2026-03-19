import { useState, useEffect } from "react";
import { Outlet } from 'react-router-dom';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  //const refresh = useRefreshToken();
  //const { auth, setAuth } = useAuth();

  //useEffect(() => {
  //  const verifyRefreshToken = async () => {
  //    try {
  //      const newAccessToken = await refresh();
  //      setAuth((prev) => ({ ...prev, accessToken: newAccessToken }));
  //    } catch (error) {
  //    } finally {
  //      setIsLoading(false);
  //    }
  //  };

  //  !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  //}, []);

  return <>{!isLoading ? "" : <Outlet />}</>; // Change isLoading to false to bypass the loading state for now, since we haven't implemented the refresh token logic yet
};

export default PersistLogin;
