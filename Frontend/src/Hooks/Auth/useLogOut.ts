import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Context/Auth/useAuth";

const useLogOut = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { logout } = useAuth();

  const logOutUser = () => {
    logout();
    navigate("/");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    queryClient.removeQueries({ queryKey: ["user"] });
  };

  const handleLogOut = async () => logOutUser();

  return { handleLogOut };
};

export default useLogOut;