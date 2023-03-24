import { FormEvent } from "react";
import { useRouter } from "next/router";

const AnalisysForm: React.FC = () => {
  const router = useRouter();

  const submitVideoHandler = (e: FormEvent) => {
    e.preventDefault();
    router.push("/confirmation");
  };

  return (
    <form onSubmit={submitVideoHandler}>
      <div className="mb-6">
        <label
          htmlFor="yt-url"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          URL Youtube video:
        </label>
        <input
          type="text"
          id="yt-url"
          placeholder="https://youtu.be/yBHA62SSJ0w"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          E-mail:
        </label>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="somebody@email.com"
          required
        />
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Start
        </button>
      </div>
    </form>
  );
};

export default AnalisysForm;
