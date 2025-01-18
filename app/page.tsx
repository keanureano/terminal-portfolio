"use client";
import { JSX, useState } from "react";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";
import { gpt } from "./lib/gpt";
import welcomeMessage from "./components/WelcomeMessage";
import HelpCommand from "./components/HelpCommand";
import ResumeCommand from "./components/ResumeCommand";
import AboutCommand from "./components/AboutCommand";
import ContactCommand from "./components/ContactCommand";

export default function Home() {
  const [terminalMessages, setTerminalMessages] = useState([welcomeMessage]);

  const processCommmand = async (input: string) => {
    const trimmedInput = input.trim().toLowerCase();

    switch (trimmedInput) {
      case "help":
        return <HelpCommand />;

      case "resume":
        return <ResumeCommand />;

      case "about":
        return <AboutCommand />;

      case "contact":
        return <ContactCommand />;

      case "clear":
        setTerminalMessages([welcomeMessage]);
        return;

      default:
        if (!trimmedInput) return;
        addSystemResponseToTerminal(
          <span className="animate-pulse">Thinking... Please wait.</span>
        );
        const response = await gpt(trimmedInput);
        setTerminalMessages((prevMessages) => prevMessages.slice(0, -1));
        return <span className="max-w-full text-balance">{response}</span>;
    }
  };

  // Function to add the user input to the terminal
  const addUserInputToTerminal = (input: string) => {
    setTerminalMessages((prevMessages) => {
      const maxMessages = 20;
      const trimmedMessages = prevMessages.slice(-maxMessages + 1);

      const userInputMessage = (
        <TerminalOutput key={`input-${Date.now()}`}>
          <span className="text-[#a2a2a2]">
            <span className="mr-[13.5px]">$</span>
            {input}
          </span>
        </TerminalOutput>
      );

      return [...trimmedMessages, userInputMessage];
    });
  };

  // Function to add the system response to the terminal
  const addSystemResponseToTerminal = (response: string | JSX.Element) => {
    setTerminalMessages((prevMessages) => {
      const maxMessages = 10;

      const trimmedMessages = prevMessages
        .filter((msg) => msg.key !== welcomeMessage.key)
        .slice(-maxMessages + 1);

      const systemResponseMessage = (
        <TerminalOutput key={`response-${Date.now()}`}>
          {response}
        </TerminalOutput>
      );

      return [welcomeMessage, ...trimmedMessages, systemResponseMessage];
    });
  };

  // Main function to handle terminal input
  const handleTerminalInput = async (input: string) => {
    addUserInputToTerminal(input);
    const response = await processCommmand(input);
    if (response !== undefined) {
      addSystemResponseToTerminal(response);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <Terminal
        name=""
        colorMode={ColorMode.Dark}
        onInput={(input) => handleTerminalInput(input)}
      >
        <span className="text-sm md:text-lg">{terminalMessages}</span>
      </Terminal>
    </div>
  );
}
