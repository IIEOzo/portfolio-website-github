import React, { useState, useEffect } from 'react';
import ContactForm from '../components/ContactForm';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: '现代网页应用',
      description: '响应式现代网页应用设计与开发',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20web%20application%20interface%20design&image_size=landscape_16_9',
      category: 'web'
    },
    {
      id: 2,
      title: '移动应用原型',
      description: '用户友好的移动应用界面设计',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mobile%20app%20prototype%20design&image_size=landscape_16_9',
      category: 'mobile'
    },
    {
      id: 3,
      title: '数据可视化仪表盘',
      description: '交互式数据可视化仪表盘设计',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=data%20visualization%20dashboard&image_size=landscape_16_9',
      category: 'design'
    },
    {
      id: 4,
      title: '品牌标识设计',
      description: '现代简约品牌标识设计',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20brand%20logo%20design&image_size=landscape_16_9',
      category: 'design'
    },
    {
      id: 5,
      title: '电子商务网站',
      description: '功能完整的电子商务网站设计',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ecommerce%20website%20design&image_size=landscape_16_9',
      category: 'web'
    },
    {
      id: 6,
      title: '社交媒体应用',
      description: '社交互动移动应用设计',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=social%20media%20app%20design&image_size=landscape_16_9',
      category: 'mobile'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  // 筛选项目
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === selectedCategory));
    }
  }, [selectedCategory, projects]);

  // 平滑滚动效果
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId) {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', () => {});
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-4 md:px-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">你好，我是设计师</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            我创建现代、响应式的网站和应用程序
          </p>
          <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors transform hover:-translate-y-1 duration-300">
            查看我的作品
          </button>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">我的作品</h2>
          
          {/* 分类筛选 */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button 
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
            >
              全部
            </button>
            <button 
              onClick={() => setSelectedCategory('web')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === 'web' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
            >
              网页设计
            </button>
            <button 
              onClick={() => setSelectedCategory('mobile')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === 'mobile' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
            >
              移动应用
            </button>
            <button 
              onClick={() => setSelectedCategory('design')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === 'design' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
            >
              品牌设计
            </button>
          </div>

          {/* 项目网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                <div className="h-60 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                    查看详情
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 md:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">联系我</h2>
          <ContactForm />
        </div>
      </section>
    </div>
  );
};

export default Home;