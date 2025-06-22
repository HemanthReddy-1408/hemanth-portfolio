import React, { useState, useEffect } from 'react';
import { Github, Mail, Phone, MapPin, ExternalLink, Download, Menu, X, Code, Brain, Database, Wrench, GraduationCap, Briefcase, User, Home, FolderOpen, MessageSquare } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skills = {
    'Programming Languages': ['Python', 'Java'],
    'Data Science & Analytics': ['NumPy', 'Pandas', 'Matplotlib', 'Seaborn'],
    'Machine Learning & Deep Learning': ['Scikit-learn', 'PyTorch', 'HuggingFace Transformers', 'QLoRA', 'RAG', 'LangChain'],
    'Tools & Utilities': ['Jupyter', 'VSCode', 'FAISS'],
    'Databases': ['MySQL', 'SQLite'],
    'Web Frameworks / APIs': ['Streamlit', 'FastAPI'],
    'Computer Vision': ['OpenCV']
  };

  const projects = [
    {
      title: "LegalEase GPT",
      subtitle: "Indian Law Conversational Agent",
      description: "A domain-specific chatbot that makes Indian laws like IPC, CrPC, and Constitution easily understandable through natural language conversations.",
      technologies: ["Python", "LangChain", "HuggingFace Transformers", "QLoRA", "FAISS", "Streamlit"],
      features: [
        "RAG-based approach with QLoRA-fine-tuned Falcon model",
        "FAISS vector store for semantic retrieval",
        "Conversational memory and source traceability",
        "Metadata-rich legal document chunks"
      ],
      highlight: true,
      githubUrl: "https://github.com/HemanthReddy-1408/LegalEase",
      liveUrl: "#"
    },
    {
      title: "Chat with Author",
      subtitle: "RAG-Based Mahabharata Chatbot",
      description: "Domain-specific chatbot trained on the Mahabharata corpus using Retrieval-Augmented Generation for interactive mythological Q&A.",
      technologies: ["Python", "HuggingFace Transformers", "FAISS", "Streamlit"],
      features: [
        "Semantic chunk retrieval with FAISS",
        "HuggingFace embeddings and generation",
        "Interactive Streamlit interface",
        "Mythological knowledge base"
      ],
      githubUrl: "https://github.com/HemanthReddy-1408/Mahabharata_chatbot",
      liveUrl: "#"
    },
    {
      title: "Anomaly Transformer",
      subtitle: "Time Series Anomaly Detection",
      description: "Transformer-based model for detecting point anomalies in behavioral time-series data with 81.2% accuracy.",
      technologies: ["Python", "PyTorch", "Streamlit"],
      features: [
        "Association Discrepancy methodology",
        "Contextual sequence modeling",
        "Real-time anomaly visualization",
        "81.2% detection accuracy"
      ],
      githubUrl: "https://github.com/HemanthReddy-1408/Anomaly-Transformer",
      liveUrl: "#"
    }
  ];

  const education = [
    {
      degree: "Bachelor Of Engineering - Computer Science and Engineering",
      institution: "Neil Gogte Institute Of Technology",
      location: "Hyderabad, India",
      period: "11/2022 – present",
      gpa: "8.03/10",
      coursework: ["Data Structures and Algorithms", "AI/ML", "Operating Systems"]
    },
    {
      degree: "Intermediate",
      institution: "Narayana College",
      location: "Hyderabad, India",
      period: "2020 – 2022",
      percentage: "92.0%"
    },
    {
      degree: "All India Secondary School Certificate",
      institution: "Sri Prakash Residential School",
      location: "Miryalaguda, India",
      period: "2019 – 2020",
      percentage: "90.6%"
    }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const NavItem = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => scrollToSection(id)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
        activeSection === id
          ? 'bg-blue-600 text-white shadow-lg'
          : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
      }`}
    >
      <Icon size={18} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Hemanth Reddy
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1">
              <NavItem id="home" icon={Home} label="Home" />
              <NavItem id="about" icon={User} label="About" />
              <NavItem id="skills" icon={Code} label="Skills" />
              <NavItem id="projects" icon={FolderOpen} label="Projects" />
              <NavItem id="education" icon={GraduationCap} label="Education" />
              <NavItem id="contact" icon={MessageSquare} label="Contact" />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-md">
              <div className="flex flex-col space-y-2">
                <NavItem id="home" icon={Home} label="Home" />
                <NavItem id="about" icon={User} label="About" />
                <NavItem id="skills" icon={Code} label="Skills" />
                <NavItem id="projects" icon={FolderOpen} label="Projects" />
                <NavItem id="education" icon={GraduationCap} label="Education" />
                <NavItem id="contact" icon={MessageSquare} label="Contact" />
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-12 md:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="mb-6 md:mb-8">
              <div className="w-24 h-24 md:w-32 md:h-32 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl md:text-4xl font-bold shadow-2xl">
                HR
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 px-4">
              Hemanth Reddy <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Nalabolu</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              Final-year Computer Science student specializing in <span className="text-blue-600 font-semibold">AI/ML</span>, 
              <span className="text-indigo-600 font-semibold"> Transformers</span>, and 
              <span className="text-purple-600 font-semibold"> LLM fine-tuning</span>
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 px-4">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg text-sm md:text-base"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-6 md:px-8 py-3 md:py-4 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 text-sm md:text-base"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Profile</h3>
                <p className="text-lg leading-relaxed">
                  Final-year Computer Science student with a strong foundation in AI/ML, Transformers, and LLM fine-tuning. 
                  Experienced in building real-world projects involving Retrieval-Augmented Generation (RAG) and Whisper-based speech processing.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3 mb-3">
                  <Brain className="text-blue-600" size={24} />
                  <h4 className="text-lg font-semibold text-gray-900">Technical Expertise</h4>
                </div>
                <p className="text-gray-600">
                  Proficient in Python, PyTorch, and LangChain, with solid problem-solving skills backed by consistent DSA practice.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3 mb-3">
                  <Wrench className="text-indigo-600" size={24} />
                  <h4 className="text-lg font-semibold text-gray-900">Currently Learning</h4>
                </div>
                <p className="text-gray-600">
                  LangSmith and FastAPI to strengthen capabilities in LLMOps and backend deployment.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3 mb-3">
                  <Briefcase className="text-purple-600" size={24} />
                  <h4 className="text-lg font-semibold text-gray-900">Career Goals</h4>
                </div>
                <p className="text-gray-600">
                  Eager to contribute to cutting-edge AI projects in a fast-paced, learning-focused environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 md:mb-12">Technical Skills</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {Object.entries(skills).map(([category, skillList], index) => (
              <div key={category} className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4 flex items-center">
                  {category === 'Programming Languages' && <Code className="mr-2 text-blue-600 flex-shrink-0" size={18} />}
                  {category === 'Machine Learning & Deep Learning' && <Brain className="mr-2 text-indigo-600 flex-shrink-0" size={18} />}
                  {category === 'Databases' && <Database className="mr-2 text-purple-600 flex-shrink-0" size={18} />}
                  {!['Programming Languages', 'Machine Learning & Deep Learning', 'Databases'].includes(category) && <Wrench className="mr-2 text-green-600 flex-shrink-0" size={18} />}
                  <span className="leading-tight">{category}</span>
                </h3>
                <div className="space-y-2">
                  {skillList.map((skill, skillIndex) => (
                    <div key={skill} className="flex items-center">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-sm md:text-base text-gray-700">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Featured Projects</h2>
          <div className="space-y-8">
            {projects.map((project, index) => (
              <div key={project.title} className={`bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden ${
                project.highlight ? 'ring-2 ring-blue-500' : ''
              }`}>
                {project.highlight && (
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2">
                    <span className="text-sm font-semibold">⭐ Best Project</span>
                  </div>
                )}
                <div className="p-6 md:p-8">
                  <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-4 md:space-y-6">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{project.title}</h3>
                        <h4 className="text-base md:text-lg text-blue-600 font-semibold mb-3 md:mb-4">{project.subtitle}</h4>
                        <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 leading-relaxed">{project.description}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="px-2 md:px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs md:text-sm font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center space-x-2 px-4 md:px-6 py-2 md:py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm md:text-base"
                        >
                          <Github size={18} />
                          <span>View Code</span>
                        </a>
                        {project.liveUrl !== "#" && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center space-x-2 px-4 md:px-6 py-2 md:py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 text-sm md:text-base"
                          >
                            <ExternalLink size={18} />
                            <span>Live Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h5 className="text-base md:text-lg font-semibold text-gray-900">Key Features</h5>
                      <ul className="space-y-2 md:space-y-3">
                        {project.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-3 mt-1.5 md:mt-2 flex-shrink-0"></div>
                            <span className="text-sm md:text-base text-gray-700 leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Education</h2>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{edu.degree}</h3>
                    <h4 className="text-lg text-blue-600 font-semibold mb-1">{edu.institution}</h4>
                    <p className="text-gray-600 mb-2">{edu.location}</p>
                    {edu.coursework && (
                      <div className="mt-3">
                        <span className="text-sm font-semibold text-gray-700">Relevant Coursework: </span>
                        <span className="text-sm text-gray-600">{edu.coursework.join(', ')}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-2">{edu.period}</p>
                    {edu.gpa && (
                      <p className="text-lg font-bold text-green-600">CGPA: {edu.gpa}</p>
                    )}
                    {edu.percentage && (
                      <p className="text-lg font-bold text-green-600">{edu.percentage}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Let's Connect</h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            I'm always excited to discuss new opportunities, innovative projects, or just chat about AI and technology.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a
              href="mailto:hemanth901499@gmail.com"
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/20 transition-all duration-300 group"
            >
              <Mail className="mx-auto mb-4 text-white group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-white font-semibold mb-2">Email</h3>
              <p className="text-blue-100 text-sm">hemanth901499@gmail.com</p>
            </a>
            <a
              href="tel:+919014995824"
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/20 transition-all duration-300 group"
            >
              <Phone className="mx-auto mb-4 text-white group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-white font-semibold mb-2">Phone</h3>
              <p className="text-blue-100 text-sm">+91 9014995824</p>
            </a>
            <a
              href="https://github.com/HemanthReddy-1408"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/20 transition-all duration-300 group"
            >
              <Github className="mx-auto mb-4 text-white group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-white font-semibold mb-2">GitHub</h3>
              <p className="text-blue-100 text-sm">HemanthReddy-1408</p>
            </a>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
              <MapPin className="mx-auto mb-4 text-white" size={32} />
              <h3 className="text-white font-semibold mb-2">Location</h3>
              <p className="text-blue-100 text-sm">Nereducherla, Telangana</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 mb-4">
            © 2025 Hemanth Reddy Nalabolu. Built with React and Tailwind CSS.
          </p>
          <div className="flex justify-center space-x-4">
            <span className="text-gray-400">Interests:</span>
            <span className="text-blue-400">Music</span>
            <span className="text-gray-500">•</span>
            <span className="text-indigo-400">Gaming</span>
            <span className="text-gray-500">•</span>
            <span className="text-purple-400">Movies</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;