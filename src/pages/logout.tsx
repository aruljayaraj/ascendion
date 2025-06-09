import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Logout() {
  const router = useRouter();

  //   useEffect(() => {
  //     localStorage.removeItem("username");
  //     localStorage.removeItem("userLoggedIn");
  //     localStorage.removeItem("sessionToken");
  //   }, []);

  return <p className="p-4">Logging out...</p>;
}
