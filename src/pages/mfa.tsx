import { useState } from "react";
import { useRouter } from "next/router";

export default function MFA() {
  const [code, setCode] = useState("");
  const router = useRouter();
  const username = "test"; // In real use, pull from session

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/verifyMfa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, code }),
    });
    if (res.ok) {
      localStorage.setItem("userLoggedIn", "true");
      router.push("/dashboard").then(() => {
        // Force a reload to ensure Navbar updates (not ideal, but works)
        window.location.reload();
      });
    } else alert("Invalid MFA");
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter MFA Code"
        className="p-2 border rounded"
        required
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Verify
      </button>
    </form>
  );
}
