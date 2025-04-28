export const dynamic = "force-dynamic";
import StatsPage from "../stats/page";

function HomePage() {
  return (
    <>
      {/* <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4 rounded flex items-center justify-between">
        <div>
          <span className="font-semibold text-blue-700">
            Welcome to MaxWork Staffing!
          </span>
          <span className="ml-2 text-blue-600">
            Let’s help you get started. Complete your profile and add your first
            job to begin tracking your applications.
          </span>
        </div>
        <button className="text-blue-600 hover:underline ml-4">
          Take a Quick Tour
        </button>
      </div> */}

      <StatsPage />
    </>
  );
}

export default HomePage;
