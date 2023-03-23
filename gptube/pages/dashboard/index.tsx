import { FormEvent } from "react";

const Dashboard: React.FC = () => {
  const submitVideoHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <>
      <div className="flex justify-center">
        <h2 className="text-xl text-[#006FFF]">
          Let&#900;s check what your subscriber think about your video
        </h2>
      </div>
      <div className="mx-60 my-16">
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
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Start
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Dashboard;
