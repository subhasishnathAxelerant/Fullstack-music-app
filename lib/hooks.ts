import useSWR from "swr";
import fetcher from "./fetcher";
/*
 the useSWR hook accepts a key string and a fetcher function. key is a unique identifier of the data (normally the API URL) and will be passed to fetcher. fetcher can be any asynchronous function which returns the data, you can use the native fetch or tools like Axios.

 The useSWR hook returns 3 values: data, isLoading and error, based on the status of the request.
 */

// Our first custom hook
export const useMe = () => {
  const { data, error } = useSWR("/me", fetcher);
  // returning an object.
  return {
    user: data,
    isLoading: !data && !error,
    isError: error,
  };
};

// custom hook for playlist
// we will use the hook for bringing plalist.
export const usePlaylist = () => {
  const { data, error } = useSWR("/playlist", fetcher);
  return {
    playlists: data || [],
    isLoading: !data && !error,
    isError: error,
  };
};
