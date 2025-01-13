"use client";
import { JSX, useState } from "react";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";
import { gpt } from "./lib/gpt";
import Image from "next/image";

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
          Alternatively, type <strong>&apos;ask &lt;question&gt;&apos;</strong>{" "}
          to get an answer.
        </span>
        <br />
        <span className="text-[#a2a2a2]">
          For example:
          <br />
          - ask who are you?
          <br />
          - ask what&apos;s your experience?
          <br />
          - ask how did your career start?
          <br />
          - ask what&apos;s your favorite project?
          <br />- ask how can i contact you?
        </span>
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
          <span>
            about - Learn more about me
            <br />
            ask &lt;question&gt; - Ask me a question
            <br />
            clear - Clear the terminal
            <br />
            contact - Get my contact information
          </span>
        );

      case trimmedInput === "about":
        return (
          <span className="text-balance">
            {`Full Stack Developer with 2+ years of professional experience building modern web applications and automation solutions.
Currently working with US-based companies, consistently delivering high-quality results.
I specialize in:
• Full-stack web development using Next.js, TypeScript, and Node.js
• AI development with expertise in GPT API fine-tuning and custom AI LLM apps
• Backend development with FastAPI, Express.js, and Spring Boot
• Automation and web scraping using Python, Playwright, and Puppeteer
• Database management (SQL, PostgreSQL, Firebase)
• Cloud deployment (AWS, Google Cloud)
• CI/CD implementation with GitHub Actions and Docker`}
          </span>
        );

      case trimmedInput === "contact":
        return "You can contact me at: reanokeanu@gmail.com";

      case trimmedInput === "clear":
        setTerminalMessages([welcomeMessage]); // Clear the terminal
        return; // No message needed for clear

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
