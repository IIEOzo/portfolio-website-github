import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-16 px-4 md:px-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center">About Me</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center mb-12">
            <div className="w-48 h-48 rounded-full overflow-hidden mb-6 md:mb-0 md:mr-12">
              <img 
                src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20developer%20portrait&image_size=square" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">John Doe</h2>
              <p className="text-gray-600 mb-4">Full-Stack Developer</p>
              <p className="text-gray-700">
                I'm a passionate developer with over 5 years of experience building modern web applications and mobile apps.
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-bold mb-6">Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold mb-4">Frontend</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• React</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS</li>
                  <li>• JavaScript</li>
                  <li>• HTML/CSS</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold mb-4">Backend</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Node.js</li>
                  <li>• Express</li>
                  <li>• MongoDB</li>
                  <li>• PostgreSQL</li>
                  <li>• RESTful APIs</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Experience</h3>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-6">
                <h4 className="font-bold">Senior Developer at Tech Company</h4>
                <p className="text-gray-600 mb-2">2022 - Present</p>
                <p className="text-gray-700">
                  Lead developer for multiple web applications, responsible for architecture design and team coordination.
                </p>
              </div>
              <div className="border-l-4 border-blue-600 pl-6">
                <h4 className="font-bold">Full-Stack Developer at Startup</h4>
                <p className="text-gray-600 mb-2">2020 - 2022</p>
                <p className="text-gray-700">
                  Built and maintained web applications from scratch, including frontend and backend development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;