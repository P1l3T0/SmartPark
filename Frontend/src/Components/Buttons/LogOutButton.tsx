//import useLogOut from "../../Hooks/Buttons/useLogOut";
import LinkButton from "./LinkButton";

const LogOutButton = () => {
  //const { handleLogOut } = useLogOut();
  const handleLogOut = () => console.log("Log out");

  return (
    <>
      <LinkButton to="/" label="Logout" onClick={handleLogOut} />
    </>
  );
};

export default LogOutButton;