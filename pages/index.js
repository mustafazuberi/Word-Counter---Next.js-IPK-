import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { MdOutlineDarkMode, MdDarkMode } from "react-icons/md";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [text, setText] = useState("");
  const [result, setResult] = useState({ showResult: false, val: "" });

  // ------count words
  const handleCountWords = () => {
    if (text === "") {
      setResult({
        showResult: true,
        val: `Your Text Contains 0 words.`,
      });
      return;
    }
    setResult({
      showResult: true,
      val: `Your Text Contains ${text.split(" ").length} words.`,
    });
  };

  // ------count sentences
  const handleCountSentences = () => {
    let sentences = text.split(".");
    sentences.map((s, index) => {
      if (s === "") {
        sentences.splice(index, 1);
      }
    });
    setResult({
      showResult: true,
      val: `Your Text Contains ${sentences.length} ${
        sentences.length > 1 ? "sentences" : "sentence"
      }.`,
    });
  };

  // ------count paragraphs
  const handleCountParagraphs = () => {
    const paragraphs = text.split(/\n\s*\n/);
    paragraphs.map((s, index) => {
      if (s === "") {
        paragraphs.splice(index, 1);
      }
    });
    setResult({
      showResult: true,
      val: `Your Text Contains ${paragraphs.length} ${
        paragraphs.length > 1 ? "paragraphs" : "paragraph"
      }.`,
    });
  };

  useEffect(() => {
    const hideResult = setTimeout(() => {
      setResult({ showResult: false, val: "" });
    }, 5000);

    return () => {
      clearTimeout(hideResult);
    };
  }, [result]);

  return (
    <main
      className={`flex min-h-screen flex-col p-6 ${
        darkMode ? "bg-[#03060b]" : "bg-[#ffffff]"
      } ${inter.className}`}
    >
      <nav className="w-full flex flex-row justify-between items-center">
        <h2
          className={`font-mono text-[45px] font-extrabold ${
            darkMode ? "text-white" : "text-[#03060b]"
          }`}
        >
          Word Counter
        </h2>
        <div className="cursor-pointer">
          {darkMode ? (
            <MdDarkMode
              className="text-white"
              size={30}
              onClick={() => setDarkMode((prev) => !prev)}
            />
          ) : (
            <MdOutlineDarkMode
              size={30}
              onClick={() => setDarkMode((prev) => !prev)}
            />
          )}
        </div>
      </nav>
      <div className="w-full max-w-[700px] mt-24">
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter Text Here."
            className="w-full outline-none h-[300px] text-[22px] px-3 py-3 rounded-[20px] border-2 border-black"
          ></textarea>
        </div>
        <div className="flex sm:flex-row flex-col gap-x-2 mt-6 gap-y-5">
          <button
            type="button"
            className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-800 text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-all text-sm dark:focus:ring-gray-900 dark:focus:ring-offset-gray-800"
            onClick={handleCountWords}
          >
            Count Words
          </button>
          <button
            type="button"
            className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
            onClick={handleCountSentences}
          >
            Count Sentences
          </button>
          <button
            type="button"
            className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
            onClick={handleCountParagraphs}
          >
            Count Paragraphs
          </button>
        </div>
        <div
          className={`font-mono text-[32px] font-extrabold mt-6 ${
            darkMode ? "text-white" : "text-[#03060b]"
          }`}
        >
          {result.showResult && `Result : ${result.val}`}
        </div>
      </div>
    </main>
  );
}
