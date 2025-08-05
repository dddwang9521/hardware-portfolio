const Projects = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          My Projects
        </h1>
        
        <div className="space-y-8">
          {/* Project 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="bg-gray-100 dark:bg-gray-700 h-48 rounded-lg flex items-center justify-center text-6xl">
                🗺️
              </div>
              <div className="lg:col-span-2">
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    3D Mapping System
                  </h2>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-semibold">
                    Complete
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Time-of-flight sensor with stepper motor control for 3D mapping applications.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                    Texas Instruments
                  </span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                    Python
                  </span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                    Stepper Motors
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="bg-gray-100 dark:bg-gray-700 h-48 rounded-lg flex items-center justify-center text-6xl">
                🚗
              </div>
              <div className="lg:col-span-2">
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Bluetooth-Controlled Car
                  </h2>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-semibold">
                    Complete
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  STM32-based wireless control system with four-wheel drive mechanism.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                    STM32
                  </span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                    C Programming
                  </span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                    Bluetooth
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Project 3 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="bg-gray-100 dark:bg-gray-700 h-48 rounded-lg flex items-center justify-center text-6xl">
                🚁
              </div>
              <div className="lg:col-span-2">
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Drone Project
                  </h2>
                  <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-sm font-semibold">
                    In Progress
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Flight control system in development with STM32-based architecture.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                    STM32
                  </span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                    Flight Control
                  </span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                    Motor Control
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects; 