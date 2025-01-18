import Link from "next/link";

const ResumeCommand = () => (
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

export default ResumeCommand;
