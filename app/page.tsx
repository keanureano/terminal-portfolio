"use client";
import { ReactTerminal, TerminalContextProvider } from "react-terminal";
import { useState, useEffect } from "react";
import { gpt } from "./lib/gpt";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true); // Mark website as fully loaded
    }, 500); // Simulate a delay for loading (e.g., data fetching)

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  if (!isLoaded) {
    return <div className="h-screen bg-[#fdf6e4]"></div>;
  }

  return (
    <TerminalContextProvider>
      <div className="h-screen">
        <Terminal />
      </div>
    </TerminalContextProvider>
  );
}

function Terminal() {
  const commands = {
    help: () => `Available commands: about, career, ask <question>, clear`,
    ask: async (query: string) => await gpt(query),
  };

  const welcomeMessage = (
    <div>
      <h1 className="font-black text-5xl">KEANU REAÑO</h1>
      <br />
      <strong>Welcome!</strong> <br />
      Type 'help' to see commands. <br />
      Type {"'ask <question>'"} to learn more about me. <br />
      <br />
      <strong>Try typing these:</strong>
      <ul>
        <li>- ask who are you?</li>
        <li>- ask what are your skills?</li>
        <li>- ask how can I contact you?</li>
      </ul>
      <br />
    </div>
  );

  const prompt = "$";

  return (
    <ReactTerminal
      welcomeMessage={welcomeMessage}
      commands={commands}
      prompt={prompt}
    />
  );
}
