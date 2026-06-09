import { toast } from "sonner";

export const handleApiError = (error) => {
  console.error(error);

  if (typeof error === "string") {
    toast.error(error);
    return;
  }

  const message =
    error?.response?.data?.message || error?.message || "Something went wrong";

  toast.error(message);
};

export const handleSuccess = (message) => {
  toast.success(message);
};

export const handleWarning = (message) => {
  toast.warning(message);
};

export const handleInfo = (message) => {
  toast.info(message);
};
