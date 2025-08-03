import { Link } from 'react-router-dom';

const TailwindTest = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Tailwind CSS Test Page
          </h1>
          <p className="text-lg text-gray-600">
            Testing various Tailwind CSS classes and components
          </p>
          <Link 
            to="/" 
            className="inline-block mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Color Test */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Color Classes Test</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-red-500 text-white p-4 rounded">Red 500</div>
            <div className="bg-green-500 text-white p-4 rounded">Green 500</div>
            <div className="bg-blue-500 text-white p-4 rounded">Blue 500</div>
            <div className="bg-yellow-500 text-white p-4 rounded">Yellow 500</div>
          </div>
        </div>

        {/* Typography Test */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Typography Test</h2>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">Heading 1 - Large</h1>
            <h2 className="text-3xl font-semibold text-gray-800">Heading 2 - Medium</h2>
            <h3 className="text-2xl font-medium text-gray-700">Heading 3 - Small</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              This is a paragraph with larger text and relaxed line height. It should be easy to read and well-spaced.
            </p>
            <p className="text-base text-gray-500">
              This is regular paragraph text with standard styling.
            </p>
            <p className="text-sm text-gray-400">
              This is small text, often used for captions or secondary information.
            </p>
          </div>
        </div>

        {/* Spacing Test */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Spacing Test</h2>
          <div className="space-y-4">
            <div className="bg-blue-100 p-2 rounded">Padding 2 (8px)</div>
            <div className="bg-blue-200 p-4 rounded">Padding 4 (16px)</div>
            <div className="bg-blue-300 p-6 rounded">Padding 6 (24px)</div>
            <div className="bg-blue-400 p-8 rounded">Padding 8 (32px)</div>
          </div>
        </div>

        {/* Flexbox Test */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Flexbox Test</h2>
          <div className="flex flex-wrap gap-4">
            <div className="bg-purple-100 p-4 rounded flex-1 min-w-0">Flex Item 1</div>
            <div className="bg-purple-200 p-4 rounded flex-1 min-w-0">Flex Item 2</div>
            <div className="bg-purple-300 p-4 rounded flex-1 min-w-0">Flex Item 3</div>
          </div>
        </div>

        {/* Grid Test */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Grid Test</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-green-100 p-4 rounded">Grid Item 1</div>
            <div className="bg-green-200 p-4 rounded">Grid Item 2</div>
            <div className="bg-green-300 p-4 rounded">Grid Item 3</div>
            <div className="bg-green-400 p-4 rounded">Grid Item 4</div>
            <div className="bg-green-500 p-4 rounded text-white">Grid Item 5</div>
            <div className="bg-green-600 p-4 rounded text-white">Grid Item 6</div>
          </div>
        </div>

        {/* Button Test */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Button Test</h2>
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
              Primary Button
            </button>
            <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors">
              Secondary Button
            </button>
            <button className="px-4 py-2 border-2 border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition-colors">
              Outline Button
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
              Danger Button
            </button>
          </div>
        </div>

        {/* Responsive Test */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Responsive Test</h2>
          <div className="text-center">
            <p className="text-sm md:text-base lg:text-lg xl:text-xl">
              This text changes size based on screen size:
            </p>
            <div className="mt-4 space-y-2">
              <div className="bg-yellow-100 p-2 text-xs md:text-sm lg:text-base">
                Small on mobile, larger on desktop
              </div>
              <div className="bg-yellow-200 p-2 hidden md:block">
                Hidden on mobile, visible on desktop
              </div>
              <div className="bg-yellow-300 p-2 md:hidden">
                Visible on mobile, hidden on desktop
              </div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-green-800 mb-2">
            ✅ Tailwind CSS is Working!
          </h3>
          <p className="text-green-700">
            If you can see this styled content, Tailwind CSS is properly configured and working.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TailwindTest; 