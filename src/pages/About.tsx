const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          About Me
        </h1>
        
        <div className="text-center mb-12">
          <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl">
            👨‍💻
          </div>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            I'm a 3rd year Electrical Engineering student passionate about hardware design 
            and embedded systems. While AI transforms software development, hardware remains 
            uniquely human - requiring physical intuition, hands-on skills, and real-world 
            problem solving.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Education
          </h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="mb-2">• 3rd Year Electrical Engineering</p>
            <p className="mb-2">• Focus: Hardware Design & Embedded Systems</p>
            <p className="mb-0">• GPA: [Your GPA]</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Hardware Philosophy
          </h2>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
            <p className="italic text-blue-800 text-lg">
              "While AI transforms software development, hardware remains uniquely human - 
              requiring physical intuition, hands-on skills, and real-world problem solving."
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Why Hardware Over Software?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Physical Problem Solving</h3>
              <p className="text-gray-600 text-sm">
                Real-world challenges that require hands-on expertise
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">AI-Resistant Skills</h3>
              <p className="text-gray-600 text-sm">
                Skills that AI cannot easily replicate
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Growing Demand</h3>
              <p className="text-gray-600 text-sm">
                High demand in IoT and embedded systems
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 