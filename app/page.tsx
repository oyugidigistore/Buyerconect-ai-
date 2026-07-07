"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");

  async function searchBuyer() {
    if (!query.trim()) return;

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      setResult(data.result || "No results found.");
    } catch {
      setResult("Something went wrong.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <h2 className="text-4xl font-bold md:text-6xl">
          AI Finds Buyers for Your Business
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-300">
          BuyerConnect AI helps businesses connect buyers and sellers faster using intelligent matching.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 md:flex-row">
          <button className="rounded-xl bg-green-500 px-8 py-4 font-semibold">
            Start Selling
          </button>

          <button className="rounded-xl bg-cyan-500 px-8 py-4 font-semibold">
            Find Buyers
          </button>
        </div>
      </section>

      <section className="bg-slate-900 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h3 className="text-3xl font-bold">
            AI Buyer Search
          </h3>

          <p className="mt-3 text-gray-300">
            Tell our AI what you need and we'll help you find the right match.
          </p>          <div className="mx-auto mt-8 flex w-full max-w-3xl flex-col gap-4 md:flex-row">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Example: Looking for maize buyers in Kisumu..."
              className="w-full flex-1 rounded-xl p-4 text-black"
            />

            <button
              onClick={searchBuyer}
              className="w-full rounded-xl bg-cyan-500 px-8 py-4 font-semibold md:w-auto"
            >
              Search
            </button>
          </div>

          {result && (
            <div className="mt-8 rounded-xl bg-slate-800 p-6 text-left">
              <h4 className="mb-2 text-xl font-bold">AI Result</h4>
              <p>{result}</p>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-20 md:grid-cols-3">
        <div className="rounded-xl bg-slate-900 p-6">
          <h3 className="text-xl font-bold">🤖 AI Matching</h3>
          <p className="mt-3 text-gray-300">
            Smart AI connects buyers with trusted sellers instantly.
          </p>
        </div>

        <div className="rounded-xl bg-slate-900 p-6">
          <h3 className="text-xl font-bold">💬 Real-Time Chat</h3>
          <p className="mt-3 text-gray-300">
            Chat instantly with potential buyers and sellers.
          </p>
        </div>

        <div className="rounded-xl bg-slate-900 p-6">
          <h3 className="text-xl font-bold">📈 Grow Your Business</h3>
          <p className="mt-3 text-gray-300">
            Reach more customers and increase your sales with AI.
          </p>
        </div>
      </section>

      <footer className="border-t border-slate-800 py-8 text-center text-gray-400">
        © 2026 BuyerConnect AI. All rights reserved.
      </footer>
    </main>
  );
}
