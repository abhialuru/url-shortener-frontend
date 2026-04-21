"use client";
import { ArrowRight, Check, Copy, Loader } from "lucide-react";
import { FormEvent, useState } from "react";

function ShortURL() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [error, setError] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<"short" | "original" | null>(null);

  async function handleURL(e: FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to shorten the URL");
      }

      const data = await response.json();

      setShortUrl(data.result.shortUrl);
    } catch (error: any) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy(text: string, type: "short" | "original") {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);

      setTimeout(() => {
        setCopied(null);
      }, 1500);
    } catch (err) {
      console.log("Copy failed", err);
    }
  }

  function handleReset() {
    setShortUrl("");
    setOriginalUrl("");
    setError("");
  }

  return (
    <section className="w-[90%] md:w-[80%] max-w-8xl   border-2 border-gray-100 bg-white rounded-2xl mx-auto mb-20 p-4 md:p-7">
      {shortUrl ? (
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <p>Short URL</p>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={shortUrl}
                readOnly
                className="p-4 w-full rounded-xl border-2 border-gray-700"
              />

              <button
                onClick={() => handleCopy(shortUrl, "short")}
                className="w-16 py-4 bg-zinc-950 text-white flex justify-center items-center rounded-lg"
              >
                {copied === "short" ? (
                  <Check className="size-5 md:size-8" />
                ) : (
                  <Copy className="size-5 md:size-8" />
                )}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p>Original URL</p>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={originalUrl}
                readOnly
                className="p-4 w-full rounded-xl border-2 border-gray-700"
              />

              <button
                onClick={() => handleCopy(originalUrl, "original")}
                className="w-16 py-4 bg-zinc-950 text-white rounded-lg flex justify-center items-center"
              >
                {copied === "original" ? (
                  <Check className="size-5 md:size-8" />
                ) : (
                  <Copy className="size-5 md:size-8" />
                )}
              </button>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="w-60 py-4 border font-semibold rounded-xl cursor-pointer flex justify-center items-center gap-2 bg-zinc-950 text-white transition-all duration-100 ease-in hover:scale-102"
          >
            Shorten Another Link
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h1 className="text-xl md:text-3xl ">Shorten your long link</h1>
            <p className="opacity-70">Free, fast and ready to use</p>
          </div>
          <form onSubmit={handleURL} className="flex flex-col gap-10">
            <input
              type="text"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              className="p-4 w-full rounded-xl placeholder:text-gray-500 border-2 border-gray-700"
              placeholder="https://example.com/my-long-url"
              required
            />
            <button
              disabled={loading}
              type="submit"
              className="w-60 disabled:cursor-wait py-4 border font-semibold rounded-xl cursor-pointer flex justify-center items-center gap-2 bg-zinc-950 text-white transition-all duration-100 ease-in hover:scale-102"
            >
              {loading ? (
                <Loader className="animate-spin" />
              ) : (
                <span className="flex justify-center items-center gap-2">
                  Get Short Link <ArrowRight />{" "}
                </span>
              )}
            </button>
            {error && <p className="text-sm text-red-400">{error}</p>}
          </form>
        </div>
      )}
    </section>
  );
}

export default ShortURL;
