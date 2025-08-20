import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";

function App() {
  const [passengers, setPassengers] = useState([]);
  const [showMore, setShowMore] = useState(false);

  // Init AOS animations
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Load Titanic CSV
  useEffect(() => {
    Papa.parse("/data/titanic.csv", {
      download: true,
      header: true,
      complete: (result) => {
        setPassengers(result.data);
      },
    });
  }, []);

  const visiblePassengers = showMore ? passengers : passengers.slice(0, 10);

  // Scroll to dashboard
  const handleExplore = () => {
    document.getElementById("dashboard").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center shadow-lg">
        <h1 className="font-bold text-xl flex items-center">
          🚢 Titanic Dashboard
        </h1>
        <nav className="space-x-6">
          <a href="#dashboard" className="hover:underline transition">
            Dashboard
          </a>
          <a href="#dataset" className="hover:underline transition">
            Dataset
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section
        className="relative bg-gradient-to-r from-blue-600 to-blue-400 text-white flex flex-col justify-center items-center py-28 text-center"
        style={{
          backgroundImage: "url('/images/titanic-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-black bg-opacity-50 absolute inset-0"></div>
        <div className="relative z-10" data-aos="fade-up">
          <h2 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
            Titanic: The Ship of Dreams
          </h2>
          <p className="mb-6 text-lg">
            Explore the real Titanic passenger dataset with interactive visuals
          </p>
          <button
            onClick={handleExplore}
            className="bg-yellow-400 text-black px-8 py-3 rounded-lg shadow-lg hover:bg-yellow-500 transform transition hover:scale-105"
          >
            Explore Dashboard
          </button>
        </div>
      </section>

      {/* Dashboard */}
      <main className="flex-1 bg-gray-50 py-12 px-6" id="dashboard">
        <h3 className="text-3xl font-bold mb-10 flex items-center justify-center" data-aos="fade-down">
          📊 Titanic Dashboard
        </h3>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-blue-100 p-6 rounded-lg shadow text-center hover:scale-105 transition" data-aos="zoom-in">
            <p className="font-semibold">Total Passengers</p>
            <p className="text-2xl">{passengers.length}</p>
          </div>
          <div className="bg-green-100 p-6 rounded-lg shadow text-center hover:scale-105 transition" data-aos="zoom-in" data-aos-delay="200">
            <p className="font-semibold">Survived</p>
            <p className="text-2xl">
              {passengers.filter((p) => p.Survived === "1").length}
            </p>
          </div>
          <div className="bg-red-100 p-6 rounded-lg shadow text-center hover:scale-105 transition" data-aos="zoom-in" data-aos-delay="400">
            <p className="font-semibold">Not Survived</p>
            <p className="text-2xl">
              {passengers.filter((p) => p.Survived === "0").length}
            </p>
          </div>
          <div className="bg-yellow-100 p-6 rounded-lg shadow text-center hover:scale-105 transition" data-aos="zoom-in" data-aos-delay="600">
            <p className="font-semibold">Avg Age</p>
            <p className="text-2xl">
              {(
                passengers.reduce(
                  (sum, p) => sum + (parseFloat(p.Age) || 0),
                  0
                ) / passengers.filter((p) => p.Age).length
              ).toFixed(1)}
            </p>
          </div>
        </div>

        {/* Dataset */}
        <section id="dataset" data-aos="fade-up">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Passenger Dataset
          </h3>
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="w-full border border-gray-300 text-left text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2">PassengerId</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Age</th>
                  <th className="px-4 py-2">Sex</th>
                  <th className="px-4 py-2">Survived</th>
                </tr>
              </thead>
              <tbody>
                {visiblePassengers.map((p, index) => (
                  <tr key={index} className="border-t hover:bg-gray-100 transition">
                    <td className="px-4 py-2">{p.PassengerId}</td>
                    <td className="px-4 py-2">{p.Name}</td>
                    <td className="px-4 py-2">{p.Age}</td>
                    <td className="px-4 py-2 capitalize">{p.Sex}</td>
                    <td className="px-4 py-2">
                      {p.Survived === "1" ? (
                        <span className="text-green-600 font-bold">✅ Yes</span>
                      ) : (
                        <span className="text-red-600 font-bold">❌ No</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Show More Button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowMore(!showMore)}
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
            >
              {showMore ? "Show Less" : "Show More"}
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white text-center py-6 mt-8 shadow-inner">
        <p>© {new Date().getFullYear()} Titanic Dashboard | Built with ⚛️ React + Tailwind</p>
        <p className="text-sm mt-2">Dataset: Titanic (Kaggle)</p>
      </footer>
    </div>
  );
}

export default App;
