import Link from "next/link";

const Confirmation = () => {
  return (
    <div className="space-y-6 mt-24">
      <div className="flex justify-center">
        <p className="text-4xl text-[#006FFF]">Let&#900;s work on it!</p>
      </div>
      <div className="flex justify-center">
        <p className="text-4xl text-[#006FFF]">
          You&#900;ll receive an email with the results soon
        </p>
      </div>
      <div className="flex justify-center">
        <Link
          href="/"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default Confirmation;
