import { Card, CardBody, CardHeader } from "@progress/kendo-react-layout";
import useGetUser from "../../Hooks/User/useGetUser";
import ProfileData from "./ProfileData";
import { ErrorComponent, LoaderComponent } from "../Common/States";

const ProfileInfo = () => {
  const { data: user, isLoading, isError } = useGetUser();

  if (isLoading) return <LoaderComponent />;
  if (isError || !user) return <ErrorComponent />;

  const initials = `${user.firstName?.charAt(0) ?? ""}${user.lastName?.charAt(0) ?? ""}`.toUpperCase() || "U";

  return (
    <main className="bg-background">
      <div className="min-h-[calc(100vh-4.05rem)] sm:min-h-[calc(100vh-4.55rem)] flex items-center justify-center p-6">
        <div className="w-full max-w-lg space-y-6">
          <header className="flex flex-col items-center gap-3">
            <div className="w-20 h-20 rounded-full bg-primary/20 ring-4 ring-primary/30 flex items-center justify-center select-none">
              <span className="text-3xl font-bold text-primary">{initials}</span>
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-text-primary">{user.firstName} {user.lastName}</h1>
              <p className="text-sm text-text-secondary mt-1">@{user.login}</p>
            </div>
          </header>

          <Card className="border border-border shadow-md">
            <CardHeader className="border-b border-border">
              <h2 className="text-base font-semibold text-text-primary">Account Details</h2>
            </CardHeader>
            <CardBody>
              <ProfileData user={user} />
            </CardBody>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default ProfileInfo;
