"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { toast } from "sonner";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // We handle redirect manually for a smoother OLED feel
      });

      if (result?.error) {
        toast.error("Access Denied: Invalid credentials", {
          style: { background: "#000", border: "1px solid #ef4444", color: "#fff" }
        });
      } else {
        toast.success("Identity Verified. Syncing Pulse...", {
          style: { background: "#000", border: "1px solid #0ea5e9", color: "#fff" }
        });
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      toast.error("System sync failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center px-6">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 blur-[120px] rounded-full -z-10" />

      <div className="w-full max-w-md space-y-8 p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-3xl shadow-2xl">
        <div className="text-center space-y-2">
          <div className="inline-flex p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-500 mb-4">
          </div>
          <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">
            Hawassa <span className="text-sky-500">Pulse</span>
          </h1>
          <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.3em]">Identity Verification</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Email Input */}
            <div className="relative group">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-sky-500 transition-colors" />
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all font-bold text-sm tracking-widest"
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-sky-500 transition-colors" />
              <input
                type="password"
                placeholder="SECURE PASSWORD"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all font-bold text-sm tracking-widest"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-sky-500 hover:bg-sky-400 disabled:bg-sky-800 text-black font-black py-4 rounded-2xl transition-all uppercase italic tracking-widest shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]"
          >
            {isLoading ? "Synchronizing..." : "Initiate Access"}
          </button>
        </form>

        <div className="pt-6 border-t border-white/5 text-center">
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">
            New to the Grid?{" "}
            <Link href="/register" className="text-sky-500 hover:text-sky-400 transition-colors">
              Register Profile
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;