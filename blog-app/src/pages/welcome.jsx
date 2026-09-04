import { Link } from "react-router-dom";
const Welcome = () => {
  return (
    <div className="p-10 flex items-center justify-center bg-white/40 px-4 font-sans text-gray-900 shadow-xl">
      <div className="text-center max-w-2xl">
        {/* Simple Heading */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to the Blog
        </h1>

        {/* Simple Description */}
        <p className="text-lg text-gray-600 mb-8">
          Read, write, and share stories on topics you care about. Join our
          community today.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/home"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200">
            Start Reading
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
