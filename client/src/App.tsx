import AIRecommend from "./components/AIRecommend";
import BusinessForm from "./components/BusinessForm";
import BusinessProfile from "./components/BusinessProfile";


function App() {

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex  justify-center p-4">
        <div className="w-full max-w-8xl">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Business Insights
              </h1>
              <p className="text-gray-600">
                Discover competitor insights for your business
              </p>
            </div>
            <div className="flex flex-col md:flex-row space-x-8">
              <div className="w-full">
                <BusinessForm />
                <BusinessProfile />
              </div>
              <div className="w-full">
                <AIRecommend />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
