import fetcher from "./fetcher";
// function that will make the API call.
export const auth = (
  mode: "signin" | "signup",
  body: { email: string; password: string }
) => {
  return fetcher(`/${mode}`, body);
};
