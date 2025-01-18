import { TerminalOutput } from "react-terminal-ui";
import Image from "next/image";

const WelcomeMessage = (
  <TerminalOutput key={0}>
    <span>
      <Image src="/welcome.svg" alt="Welcome" width={500} height={500} />
      <br />
      <span>
        Type <strong>&apos;help&apos;</strong> for more information.
      </span>
      <br />
      <span>
        Type <strong>&apos;hello world!&apos;</strong> to talk to my chatbot.
      </span>
      <br />
    </span>
  </TerminalOutput>
);

export default WelcomeMessage;
