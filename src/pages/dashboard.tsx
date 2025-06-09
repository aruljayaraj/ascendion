import { useEffect, useState } from "react";

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const loggedIn =
      typeof window !== "undefined" &&
      localStorage.getItem("userLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    if (!loggedIn) {
      window.location.href = "/login";
    }
  }, []);

  if (isLoggedIn === null) {
    // Prevent rendering until we've checked login status
    return null;
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl">Login successful! Welcome to your dashboard.</h2>
    </div>
  );
}
