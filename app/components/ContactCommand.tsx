import Link from "next/link";

const ContactCommand = () => (
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

export default ContactCommand;
