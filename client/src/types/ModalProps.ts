export type ModalPropsType = {
  status:
    | "success"
    | "error"
    | "loading"
    | "subscription-success"
    | "subscription-failed"
    | "no-subscription"
    | "password reset"
    | "send link";
  enableHide?: boolean;
};
