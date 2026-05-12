import { Dialog } from "@progress/kendo-react-dialogs";

interface ErrorDialogProps {
  visible: boolean;
  error: string;
  toggleDialog: () => void;
}

const ErrorDialog = ({ visible, error, toggleDialog }: ErrorDialogProps) => {
  return (
    <>
      {visible && (
        <Dialog title={"An error has occurred"} onClose={toggleDialog}>
          <p className="m-5 text-center">{error}</p>
        </Dialog>
      )}
    </>
  );
};

export default ErrorDialog;