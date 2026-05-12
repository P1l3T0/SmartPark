import useGetUser from "../../Hooks/Home/useGetUser";
import { Card, CardBody } from "@progress/kendo-react-layout";
import { ErrorComponent, LoaderComponent } from "../Common/States";

const HomeContainer = () => {
  const { data: user, isLoading, isError } = useGetUser();

  if (isLoading) return <LoaderComponent />;
  if (isError) return <ErrorComponent />;

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