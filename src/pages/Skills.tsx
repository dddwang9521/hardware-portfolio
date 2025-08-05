const Skills = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          Skills & Technologies
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Hardware Skills */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              🔧 Hardware Skills
            </h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">PCB Design</span>
                  <span className="text-gray-500 dark:text-gray-400">80%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Soldering</span>
                  <span className="text-gray-500 dark:text-gray-400">90%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Component Selection</span>
                  <span className="text-gray-500 dark:text-gray-400">85%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Programming Skills */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              💻 Programming
            </h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">C Language</span>
                  <span className="text-gray-500 dark:text-gray-400">95%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Python</span>
                  <span className="text-gray-500 dark:text-gray-400">80%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Microcontrollers */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              🖥️ Microcontrollers
            </h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">STM32</span>
                  <span className="text-gray-500 dark:text-gray-400">80%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Texas Instruments</span>
                  <span className="text-gray-500 dark:text-gray-400">75%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tools & Software */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            🛠️ Tools & Software
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              'KiCad', 'STM32CubeIDE', 'Arduino IDE', 'Multisim', 
              'Oscilloscope', 'Multimeter', 'Soldering Station'
            ].map((tool) => (
              <div key={tool} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">{tool}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills; 