import useGetUser from "../../Hooks/Home/useGetUser";
import { Card, CardBody } from "@progress/kendo-react-layout";
import { Loader } from "@progress/kendo-react-indicators";

const HomeContainer = () => {
  const { data: user, isLoading, isError } = useGetUser();

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4.05rem)] sm:min-h-[calc(100vh-4.55rem)] bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader size="large" type="converging-spinner" />
          <span className="text-text-secondary">Loading your profile...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[calc(100vh-4.05rem)] sm:min-h-[calc(100vh-4.55rem)] bg-background flex items-center justify-center">
        <Card className="shadow-lg">
          <CardBody>
            <div className="text-center p-8">
              <h2 className="text-xl text-text-primary font-semibold mb-2">
                Unable to load profile
              </h2>
              <p className="text-text-secondary">
                Please try refreshing the page
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <>
      {user && (
        <div className="min-h-[calc(100vh-4.05rem)] sm:min-h-[calc(100vh-4.55rem)] bg-background flex items-center justify-center">
          <Card className="shadow-lg">
            <CardBody>
              <div className="text-center p-8">
                <h2 className="text-2xl text-text-primary font-semibold mb-4">
                  Welcome, {user.username}!
                </h2>
                <p className="text-text-secondary">
                  ID: {user.id}
                  <br />
                  Email: {user.email}
                  <br />
                  Date Joined: {user.dateCreated.toLocaleDateString()}
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </>
  );
};

export default HomeContainer;