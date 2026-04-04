import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useLogOut = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  //const { login } = useAuth();

  const logOutUser = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    //logout();
    navigate("/");
    queryClient.invalidateQueries({ queryKey: ["user"] });
  };

  const handleLogOut = async () => logOutUser();

  return { handleLogOut };
};

export default useLogOut;