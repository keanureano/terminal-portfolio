"use client";
import { JSX, useState } from "react";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";
import { gpt } from "./lib/gpt";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const welcomeMessage = (
    <TerminalOutput key={0}>
      <span>
        <Image src="/welcome.svg" alt="Welcome" width={500} height={500} />
        <br />
        <span>
          Type <strong>&apos;help&apos;</strong> for more information.
        </span>
        <br />
        <span>
          Type <strong>&apos;ask &lt;question&gt;&apos;</strong> to talk to my
          chatbot.
        </span>
        <br />
      </span>
    </TerminalOutput>
  );

  const [terminalMessages, setTerminalMessages] = useState([welcomeMessage]);

  // Function to process commands
  const processCommmand = async (input: string) => {
    const trimmedInput = input.trim().toLowerCase();

    // Handle specific commands
    switch (true) {
      case trimmedInput === "help":
        return (
          <>
            <strong>ask &lt;question&gt;</strong> {"   "}Ask me a question
            <br />
            <strong>resume</strong> {"           "}View my resume
            <br />
            <strong>about</strong> {"            "}Learn more about me
            <br />
            <strong>contact</strong> {"          "}Get my contact information
            <br />
            <strong>clear</strong> {"            "}Clear the terminal
            <br />
          </>
        );

      // Handle the "ask <question>" command
      case trimmedInput.startsWith("ask "): {
        const question = input.slice(4).trim(); // Extract the question after "ask "

        // Add a thinking message to the terminal
        addSystemResponseToTerminal(<span className="animate-pulse">...</span>);

        // Process the question with GPT
        const response = await gpt(question);

        // Remove the thinking message
        setTerminalMessages((prevMessages) => prevMessages.slice(0, -1));

        // Add the GPT response to the terminal
        return <span className="max-w-full text-balance">{response}</span>;
      }

      // Process the "resume" command
      case trimmedInput === "resume":
        return (
          <span>
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              Resume
            </Link>
          </span>
        );

      case trimmedInput === "about":
        return (
          <span className="text-balance">
            Full Stack Developer with {new Date().getFullYear() - 2022} years of
            experience in building web apps and automation. Proven track record
            with US-based companies, delivering high-quality results.
          </span>
        );

      case trimmedInput === "contact":
        return (
          <>
            <Link
              href="mailto:reanokeanu@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              Email
            </Link>
            <br />
            <Link
              href="https://linkedin.com/in/keanureano"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              LinkedIn
            </Link>
            <br />
            <Link
              href="https://github.com/keanureano"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              GitHub
            </Link>
          </>
        );

      case trimmedInput === "clear":
        setTerminalMessages([welcomeMessage]); // Clear the terminal
        return; // No message needed for clear

      default:
        return `Command not found: ${input}`;
    }
  };

  // Function to add the user input to the terminal
  const addUserInputToTerminal = (input: string) => {
    setTerminalMessages((prevMessages) => {
      const maxMessages = 20;

      // Keep only the last `maxMessages - 1` messages
      const trimmedMessages = prevMessages.slice(-maxMessages + 1);

      // Add the user's input as a terminal message
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

      // Keep only the last `maxMessages - 1` messages (excluding the defaultMessage)
      const trimmedMessages = prevMessages
        .filter((msg) => msg.key !== welcomeMessage.key)
        .slice(-maxMessages + 1);

      // Add the system's response as a terminal message
      const systemResponseMessage = (
        <TerminalOutput key={`response-${Date.now()}`}>
          {response}
        </TerminalOutput>
      );

      // Always prepend the defaultMessage
      return [welcomeMessage, ...trimmedMessages, systemResponseMessage];
    });
  };

  // Main function to handle terminal input
  const handleTerminalInput = async (input: string) => {
    addUserInputToTerminal(input); // Step 1: Add user input
    const response = await processCommmand(input); // Step 2: Generate response
    if (response !== undefined) {
      addSystemResponseToTerminal(response); // Step 3: Add response to terminal
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
