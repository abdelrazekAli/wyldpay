export type ModalPropsType = {
  status:
    | "success"
    | "error"
    | "loading"
    | "signup"
    | "password reset"
    | "send link";
  enableHide?: boolean;
};
