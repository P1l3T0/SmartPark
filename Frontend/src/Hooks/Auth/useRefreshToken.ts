import { useRef } from "react";
import useAuth from "../../Context/Auth/useAuth";
import api from "../../Utils/axiosInstance";
import { refreshTokenEndPoint } from "../../Utils/endpoints";
import type { LoginResponse } from "../../Utils/interfaces";

const REFRESH_BUFFER_MS = 10 * 1000; // refresh 10s before expiry

const useRefreshToken = () => {
  const { login, logout, setAuth } = useAuth();
  const tokenRefreshTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getTokenFromCookie = (): string | undefined =>
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

  const getRefreshTokenFromCookie = (): string | undefined =>
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("refresh_token="))
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
    const refreshToken = getRefreshTokenFromCookie();
    if (!refreshToken) {
      logout();
      return undefined;
    }

    try {
      const response = await api.post<LoginResponse>(refreshTokenEndPoint, {
        refresh_token: refreshToken,
      });
      const { access_token, refresh_token } = response.data;

      document.cookie = `token=${access_token}; path=/;`;
      document.cookie = `refresh_token=${refresh_token}; path=/;`;

      setAuth((prev) => ({
        ...prev,
        accessToken: access_token,
        refreshToken: refresh_token,
      }));

      login();
      scheduleRefresh(access_token);

      return access_token;
    } catch {
      logout();
      return undefined;
    }
  };

  return { refresh, scheduleRefresh, getTokenFromCookie };
};

export default useRefreshToken;
