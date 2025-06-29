import {toast} from "react-toastify";

export const handleSuccess = (msg) => {
  toast.success(msg, { positions: "top-right" });
};
export const handleError = (msg) => {
  toast.error(msg, { positions: "top-right" });
};
