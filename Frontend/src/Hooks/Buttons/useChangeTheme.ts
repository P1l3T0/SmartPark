import type { MouseEvent } from "react";
import { useTheme } from "../../Context/Theme/useTheme";

const useChangeTheme = () => {
  const { theme, toggleTheme } = useTheme();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value === "light" ? "dark" : "light";
    toggleTheme(value);
  };

  return { theme, handleClick };
};

export default useChangeTheme;