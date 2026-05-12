import { useRef } from "react";
import useAuth from "../../Context/Auth/useAuth";
import api from "../../Utils/axiosInstance";
import { refreshTokenEndPoint } from "../../Utils/endpoints";

const REFRESH_BUFFER_MS = 10 * 1000; // refresh 10s before expiry

const useRefreshToken = () => {
  const { login, logout } = useAuth();
  const tokenRefreshTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getTokenFromCookie = (): string | undefined =>
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

  const getTokenExpiry = (token: string): number => {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000; // JWT exp is in seconds, convert to ms
  };

  const scheduleRefresh = (token: string) => {
    if (tokenRefreshTimeout.current) {
      clearTimeout(tokenRefreshTimeout.current);
    }
    const expiresAt = getTokenExpiry(token);
    const delay = expiresAt - Date.now() - REFRESH_BUFFER_MS;

    if (delay > 0) {
      tokenRefreshTimeout.current = setTimeout(() => refresh(), delay);
    }
  };

  const refresh = async (): Promise<string | undefined> => {
    const currentToken = getTokenFromCookie();
    if (!currentToken) {
      logout();
      return undefined;
    }

    try {
      const response = await api.post(refreshTokenEndPoint, null, {
        headers: { 
          Authorization: `Bearer ${currentToken}` 
        }
      });
      const { token, expiresIn } = response.data as { token: string; expiresIn: number };

      document.cookie = `token=${token}; path=/;`;
      login();
      scheduleRefresh(token);

      return token;
    } catch {
      logout();
      return undefined;
    }
  };

  return { refresh, scheduleRefresh, getTokenFromCookie };
};

export default useRefreshToken;
