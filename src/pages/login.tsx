import { useState } from "react";
import { useRouter } from "next/router";
import Button from "@/components/Button";

export default function Login() {
  const [username, setUsername] = useState("");
  const [secureWord, setSecureWord] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<"username" | "secureword" | "password">(
    "username"
  );
  const router = useRouter();

  async function handleUsernameSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Set default username to "test" if not already set
    // if (!store.has("test")) {
    // store.set("test", { secureWord: "", issuedAt: Date.now() });
    // store.set(username, { secureWord: "", issuedAt: Date.now(), attempts: 0 });
    // }
    const res = await fetch("/api/getSecureWord", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    const data = await res.json();
    setSecureWord(data.secureWord);
    setStep("secureword");
    localStorage.setItem("sessionToken", data.secureWord);
    setTimeout(() => alert("Secure word expired"), 60000);
  }

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    const hashedPassword = btoa(password); // Replace with crypto-js hash
    console.log({ username, secureWord, hashedPassword });

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, secureWord, hashedPassword }),
    });
    if (res.ok) {
      localStorage.setItem("username", username);
      router.push("/mfa");
    } else alert("Login failed");
  }

  return (
    <div className="p-6">
      {step === "username" && (
        <form onSubmit={handleUsernameSubmit} className="space-y-4">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="p-2 border rounded"
            required
          />
          <Button className="bg-blue-600 text-white px-4 py-2 ml-2 rounded">
            Next
          </Button>
        </form>
      )}

      {step === "secureword" && (
        <div className="space-y-4">
          <p className="text-green-700">
            Secure Word: <strong>{secureWord}</strong> (valid 60s)
          </p>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="p-2 border rounded"
              required
            />
            <Button className="bg-blue-600 text-white px-4 py-2 ml-2 rounded">
              Login
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
