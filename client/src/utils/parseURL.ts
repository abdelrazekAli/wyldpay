export const parseURL = () => {
  const url = new URL(window.location.href);
  return url.pathname.split("/");
};
