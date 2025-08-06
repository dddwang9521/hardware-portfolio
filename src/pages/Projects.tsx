import { useState } from 'react';
import ThreeDViewer from '../components/ThreeDViewer';
import ImageModal from '../components/ImageModal';
import { mappingXYZData } from '../data/xyzData';

const Projects = () => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState('');
  const [modalImageAlt, setModalImageAlt] = useState('');

  const handleImageClick = (src: string, alt: string) => {
    setModalImageSrc(src);
    setModalImageAlt(alt);
    setIsImageModalOpen(true);
  };

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
              <div 
                className="relative bg-gray-100 dark:bg-gray-700 h-48 rounded-lg overflow-hidden cursor-pointer"
                onClick={() => handleImageClick(
                  "/images/3d-mapping-prototype.jpg.png",
                  "3D Mapping System Prototype - MSP432E401Y microcontroller with VL53L1X ToF sensor mounted on custom 3D-printed bracket"
                )}
              >
                <img 
                  src="/images/3d-mapping-prototype.jpg.png" 
                  alt="3D Mapping System Prototype - MSP432E401Y microcontroller with VL53L1X ToF sensor mounted on custom 3D-printed bracket"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center">
                  <div className="opacity-0 hover:opacity-100 transition-opacity duration-200 bg-black bg-opacity-75 text-white px-3 py-1 rounded text-sm">
                    Click to enlarge
                  </div>
                </div>
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
                  Advanced 3D spatial mapping system using MSP432E401Y microcontroller and VL53L1X ToF sensor. 
                  Features 28BYJ-48 stepper motor with custom 3D-printed bracket for angular scanning at 11.25° increments. 
                  Data acquisition via I²C and UART communication, processed with Python 3.10 and Open3D for 3D visualization.
                </p>
                <div className="flex gap-2 flex-wrap mb-4">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                    MSP432E401Y
                  </span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                    VL53L1X ToF Sensor
                  </span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                    Python 3.10
                  </span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                    28BYJ-48 Stepper
                  </span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                    Open3D
                  </span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                    I²C/UART
                  </span>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Technical Specifications:</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• 360° scanning with 11.25° increments (32 readings/rotation)</li>
                    <li>• Custom 3D-printed bracket for sensor mounting</li>
                    <li>• UART communication at 115200 bps</li>
                    <li>• Manual X-axis increment (20cm per step)</li>
                    <li>• .xyz file output for 3D visualization</li>
                    <li>• Indoor mapping for hallways and small rooms</li>
                  </ul>
                </div>
                
                {/* 3D Visualization */}
                <div className="mt-6">
                  <ThreeDViewer 
                    xyzData={mappingXYZData}
                    title="3D Mapping System - Spatial Data Visualization"
                  />
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
      
      {/* Image Modal */}
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        imageSrc={modalImageSrc}
        imageAlt={modalImageAlt}
      />
    </div>
  );
};

export default Projects; 