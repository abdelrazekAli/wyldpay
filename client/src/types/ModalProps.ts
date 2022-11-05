export type ModalPropsType = {
  status:
    | "success"
    | "error"
    | "loading"
    | "subscription-success"
    | "subscription-failed"
    | "password reset"
    | "send link";
  enableHide?: boolean;
};
