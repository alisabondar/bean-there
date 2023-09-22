import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="w-screen h-screen bg-primary flex justify-center items-center">
      <div className="text-5xl space-y-5 text-center">
        <div>Woops! You Shouldn&apos;t Be Here</div>
        <div>
          Click{" "}
          <Link to="/" className="underline inline-block hover:text-neutral">
            Here
          </Link>{" "}
          To Bean There
        </div>
      </div>
    </div>
  );
}
