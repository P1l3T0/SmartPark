import useLogOut from "../../Hooks/Auth/useLogOut";
import LinkButton from "./LinkButton";

const LogOutButton = () => {
  const { handleLogOut } = useLogOut();

  return (
    <>
      <LinkButton to="/" label="Logout" onClick={handleLogOut} />
    </>
  );
};

export default LogOutButton;