// our fetcher function.
export default function fetcher(url: string, data = undefined) {
  return fetch(`${window.location.origin}/api${url}`, {
    method: data ? "POST" : "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    // for improper status throwing an error.
    if (res.status > 399 && res.status < 200) {
      throw new Error();
    }
    // resolving the response
    return res.json();
  });
}
