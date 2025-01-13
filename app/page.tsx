"use client";
import { JSX, useState } from "react";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";
import { gpt } from "./lib/gpt";

export default function Home() {
  const welcomeMessage = (
    <TerminalOutput key={0}>
      <span>
        <pre className="text-xs">
          {`
██   ██ ███████  █████  ███    ██ ██    ██     ██████  ███████  █████  ███    ██  ██████  
██  ██  ██      ██   ██ ████   ██ ██    ██     ██   ██ ██      ██   ██ ████   ██ ██    ██ 
█████   █████   ███████ ██ ██  ██ ██    ██     ██████  █████   ███████ ██ ██  ██ ██    ██ 
██  ██  ██      ██   ██ ██  ██ ██ ██    ██     ██   ██ ██      ██   ██ ██  ██ ██ ██    ██ 
██   ██ ███████ ██   ██ ██   ████  ██████      ██   ██ ███████ ██   ██ ██   ████  ██████  
`}
        </pre>
        <br />
        <span>
          Type <strong>'help'</strong> for more information.
        </span>
        <br />
        <span>
          Alternatively, type <strong>'ask &lt;question&gt;'</strong> to get an
          answer.
        </span>
        <br />
        <span>
          For example: <strong>ask who are you?</strong>
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
            contact - Get my contact information
            <br />
            clear - Clear the terminal
            <br />
            ask &lt;question&gt; - Ask me a question
          </span>
        );

      case trimmedInput === "about":
        return `Full Stack Developer with 2+ years of professional experience building modern web applications and automation solutions.
Currently working with US-based companies, consistently delivering high-quality results. I specialize in:
• Full-stack web development using Next.js, TypeScript, and Node.js
• AI development with expertise in GPT API fine-tuning and custom AI LLM apps
• Backend development with FastAPI, Express.js, and Spring Boot
• Automation and web scraping using Python, Playwright, and Puppeteer
• Database management (SQL, PostgreSQL, Firebase)
• Cloud deployment (AWS, Google Cloud)
• CI/CD implementation with GitHub Actions and Docker`;

      case trimmedInput === "contact":
        return "You can contact me at: reanokeanu@gmail.com";

      case trimmedInput === "clear":
        setTerminalMessages([welcomeMessage]); // Clear the terminal
        return; // No message needed for clear

      // Handle the "ask <question>" command
      case trimmedInput.startsWith("ask "): {
        const question = input.slice(4).trim(); // Extract the question after "ask "

        // Define an array of randomized "thinking" messages
        const thinkingMessages = [
          "Hang on, give me a few seconds to think...",
          "Hold on, this will just take a few seconds...",
          "Just a moment, this needs a few seconds...",
          "Hang tight, I'll have it in a few seconds...",
          "Let me think, this might take a few seconds...",
        ];

        // Pick a random message
        const randomThinkingMessage =
          thinkingMessages[Math.floor(Math.random() * thinkingMessages.length)];

        // Add a delayed random thinking message to the terminal
        setTimeout(() => {
          addSystemResponseToTerminal(randomThinkingMessage);
        }, 200);

        // Simulate the GPT processing (replace with your actual GPT function)
        const response = await gpt(question);

        // Add the GPT response to the terminal
        return response;
      }

      default:
        return `Command not found: ${input}`;
    }
  };

  // Function to add the user input to the terminal
  const addUserInputToTerminal = (input: string) => {
    setTerminalMessages((prevMessages) => {
      const maxMessages = 10;

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
    <div>
      <Terminal
        name="KEANU REAÑO"
        colorMode={ColorMode.Dark}
        onInput={(input) => handleTerminalInput(input)}
        height="100dvh"
      >
        {terminalMessages}
      </Terminal>
    </div>
  );
}
