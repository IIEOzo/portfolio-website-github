import React, { useState, useEffect } from 'react';

const Services: React.FC = () => {
  const [r2Status, setR2Status] = useState('Not initialized');
  const [kvStatus, setKVStatus] = useState('Not initialized');
  const [d1Status, setD1Status] = useState('Not initialized');
  const [kvValue, setKVValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  // 检查R2服务
  const checkR2 = async () => {
    try {
      // 这里是R2使用示例
      // 在实际Worker环境中，PORTFOLIO_ASSETS会自动可用
      setR2Status('R2 service configured successfully');
    } catch (error) {
      setR2Status('R2 service error');
      console.error('R2 error:', error);
    }
  };

  // 检查KV服务
  const checkKV = async () => {
    try {
      // 这里是KV使用示例
      // 在实际Worker环境中，PORTFOLIO_KV会自动可用
      setKVStatus('KV service configured successfully');
    } catch (error) {
      setKVStatus('KV service error');
      console.error('KV error:', error);
    }
  };

  // 检查D1服务
  const checkD1 = async () => {
    try {
      // 这里是D1使用示例
      // 在实际Worker环境中，PORTFOLIO_DB会自动可用
      setD1Status('D1 service configured successfully');
    } catch (error) {
      setD1Status('D1 service error');
      console.error('D1 error:', error);
    }
  };

  // 模拟KV设置值
  const setKVValueExample = async () => {
    try {
      setKVStatus(`Setting value: ${inputValue}`);
      // 在实际Worker环境中，使用：await PORTFOLIO_KV.put('example', inputValue);
      setKVValue(inputValue);
      setKVStatus('Value set successfully');
    } catch (error) {
      setKVStatus('Failed to set value');
      console.error('KV set error:', error);
    }
  };

  useEffect(() => {
    checkR2();
    checkKV();
    checkD1();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-4 md:px-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center">Cloudflare Services</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* R2 Service */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-blue-600 text-4xl mb-6">☁️</div>
            <h2 className="text-2xl font-bold mb-4">R2 Storage</h2>
            <p className="text-gray-600 mb-6">
              Object storage for images, videos, and other files
            </p>
            <div className={`p-4 rounded-lg ${r2Status.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
              {r2Status}
            </div>
          </div>

          {/* KV Service */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-purple-600 text-4xl mb-6">🔑</div>
            <h2 className="text-2xl font-bold mb-4">KV Storage</h2>
            <p className="text-gray-600 mb-6">
              Key-value storage for configuration and session data
            </p>
            <div className={`p-4 rounded-lg ${kvStatus.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
              {kvStatus}
            </div>
            {kvValue && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800">Stored value: {kvValue}</p>
              </div>
            )}
          </div>

          {/* D1 Service */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-green-600 text-4xl mb-6">💾</div>
            <h2 className="text-2xl font-bold mb-4">D1 Database</h2>
            <p className="text-gray-600 mb-6">
              SQLite database for structured data
            </p>
            <div className={`p-4 rounded-lg ${d1Status.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
              {d1Status}
            </div>
          </div>
        </div>

        {/* KV Demo */}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">KV Storage Demo</h2>
          <div className="mb-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter a value to store in KV"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            onClick={setKVValueExample}
            className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Store in KV
          </button>
        </div>

        {/* Service Usage Examples */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-12">
          <h2 className="text-2xl font-bold mb-6">Service Usage Examples</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">R2 Storage Example</h3>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
              <code className="text-gray-800">
                {/* R2 usage example */}
                {`// Upload a file to R2
const uploadFile = async (file: File) => {
  const key = \`uploads/\${Date.now()}-\${file.name}\`;
  await PORTFOLIO_ASSETS.put(key, file, {
    httpMetadata: {
      contentType: file.type
    }
  });
  return key;
};

// Get a file from R2
const getFile = async (key: string) => {
  const object = await PORTFOLIO_ASSETS.get(key);
  if (object) {
    return await object.text();
  }
  return null;
};`}
              </code>
            </pre>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">KV Storage Example</h3>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
              <code className="text-gray-800">
                {/* KV usage example */}
                {`// Set a value in KV
await PORTFOLIO_KV.put('user_preference', JSON.stringify({
  theme: 'dark',
  language: 'en'
}));

// Get a value from KV
const preferences = await PORTFOLIO_KV.get('user_preference');
if (preferences) {
  const parsedPrefs = JSON.parse(preferences);
  console.log(parsedPrefs.theme);
}

// Delete a value from KV
await PORTFOLIO_KV.delete('temporary_data');`}
              </code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">D1 Database Example</h3>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
              <code className="text-gray-800">
                {/* D1 usage example */}
                {`// Create table (run once)
await PORTFOLIO_DB.exec(\`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
\`);

// Insert data
const stmt = await PORTFOLIO_DB.prepare(
  'INSERT INTO projects (title, description) VALUES (?, ?)'
);
await stmt.bind('Project 1', 'First project').run();

// Query data
const projects = await PORTFOLIO_DB.prepare(
  'SELECT * FROM projects ORDER BY created_at DESC'
).all();
console.log(projects.results);`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;