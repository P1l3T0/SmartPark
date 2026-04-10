import { Loader } from "@progress/kendo-react-indicators";
import { Card, CardBody } from "@progress/kendo-react-layout";

const LoaderComponent = () => (
  <div className="min-h-[calc(100vh-4.05rem)] sm:min-h-[calc(100vh-4.55rem)] bg-background flex items-center justify-center">
    <div className="flex flex-col items-center space-y-4">
      <Loader size="large" type="converging-spinner" />
      <span className="text-text-secondary">Loading...</span>
    </div>
  </div>
);

const ErrorComponent = () => (
  <div className="min-h-[calc(100vh-4.05rem)] sm:min-h-[calc(100vh-4.55rem)] bg-background flex items-center justify-center">
    <Card className="shadow-lg">
      <CardBody>
        <div className="text-center p-8">
          <h2 className="text-xl text-text-primary font-semibold mb-2">
            Unable to load data
          </h2>
          <p className="text-text-secondary">Please try refreshing the page</p>
        </div>
      </CardBody>
    </Card>
  </div>
);

export { LoaderComponent, ErrorComponent };