import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Context/Auth/useAuth";

const useLogOut = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { logout, setAuth } = useAuth();

  const logOutUser = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setAuth({});
    queryClient.clear();
    logout();
    navigate("/");
  };

  const handleLogOut = async () => logOutUser();

  return { handleLogOut };
};

export default useLogOut;