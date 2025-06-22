import React, { useState, useEffect, useRef } from 'react';
import { Github, Mail, Phone, MapPin, ExternalLink, Download, Menu, X, Code, Brain, Database, Wrench, GraduationCap, Briefcase, User, Home, FolderOpen, MessageSquare, ChevronDown, Star, Sparkles } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionsRef = useRef({});

  const sections = ['home', 'about', 'skills', 'projects', 'education', 'contact'];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      setIsScrolled(scrollTop > 50);
      setScrollProgress(progress);

      // Find the current section based on scroll position
      let currentSection = 'home';
      const offset = 100; // Offset for better section detection

      sections.forEach((section) => {
        const element = sectionsRef.current[section];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= offset && rect.bottom > offset) {
            currentSection = section;
          }
        }
      });

      setActiveSection(currentSection);
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
    const element = sectionsRef.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const NavItem = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => scrollToSection(id)}
      className={`relative flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-500 group ${
        activeSection === id
          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 scale-105'
          : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600'
      }`}
    >
      <Icon size={18} className={`transition-all duration-300 ${activeSection === id ? 'animate-pulse' : 'group-hover:scale-110'}`} />
      <span className="font-medium">{label}</span>
      {activeSection === id && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl opacity-20 animate-pulse"></div>
      )}
    </button>
  );

  const FloatingElements = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-x-hidden">
      <FloatingElements />
      
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-500 ${
        isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-2xl shadow-blue-500/10' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
              Hemanth Reddy
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-2">
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
              className="md:hidden p-2 rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-110"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-xl rounded-b-2xl">
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
      <section 
        id="home" 
        ref={(el) => (sectionsRef.current.home = el)}
        className="min-h-screen flex items-center justify-center relative pt-20 pb-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-8 relative">
            <div className="w-32 h-32 md:w-40 md:h-40 mx-auto bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl md:text-5xl font-bold shadow-2xl shadow-blue-500/25 relative overflow-hidden group">
              <span className="relative z-10">HR</span>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Sparkles className="absolute top-2 right-2 text-white/60 animate-pulse" size={16} />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 px-4 relative">
            <span className="inline-block hover:scale-105 transition-transform duration-300">Hemanth</span>{' '}
            <span className="inline-block hover:scale-105 transition-transform duration-300 delay-100">Reddy</span>{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent inline-block hover:scale-105 transition-transform duration-300 delay-200">
              Nalabolu
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed px-4">
            Final-year Computer Science student specializing in{' '}
            <span className="text-blue-600 font-semibold hover:text-blue-700 transition-colors cursor-default">AI/ML</span>, 
            <span className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors cursor-default"> Transformers</span>, and 
            <span className="text-purple-600 font-semibold hover:text-purple-700 transition-colors cursor-default"> LLM fine-tuning</span>
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 px-4">
            <button
              onClick={() => scrollToSection('projects')}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-xl shadow-blue-500/25 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>View My Work</span>
                <FolderOpen size={20} className="group-hover:rotate-12 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="group px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-2xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>Get In Touch</span>
                <MessageSquare size={20} className="group-hover:rotate-12 transition-transform duration-300" />
              </span>
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="text-gray-400" size={32} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about" 
        ref={(el) => (sectionsRef.current.about = el)}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white/60 backdrop-blur-sm relative"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-5xl font-bold text-center text-gray-900 mb-16 relative">
            About Me
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl shadow-blue-500/25 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                <h3 className="text-3xl font-bold mb-6 relative z-10">Profile</h3>
                <p className="text-lg leading-relaxed relative z-10">
                  Final-year Computer Science student with a strong foundation in AI/ML, Transformers, and LLM fine-tuning. 
                  Experienced in building real-world projects involving Retrieval-Augmented Generation (RAG) and Whisper-based speech processing.
                </p>
                <Star className="absolute top-4 right-4 text-white/40 animate-pulse" size={24} />
              </div>
            </div>
            
            <div className="space-y-6 order-1 md:order-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors duration-300">
                    <Brain className="text-blue-600" size={24} />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">Technical Expertise</h4>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Proficient in Python, PyTorch, and LangChain, with solid problem-solving skills backed by consistent DSA practice.
                </p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-indigo-100 rounded-xl group-hover:bg-indigo-200 transition-colors duration-300">
                    <Wrench className="text-indigo-600" size={24} />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">Currently Learning</h4>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  LangSmith and FastAPI to strengthen capabilities in LLMOps and backend deployment.
                </p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors duration-300">
                    <Briefcase className="text-purple-600" size={24} />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">Career Goals</h4>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Eager to contribute to cutting-edge AI projects in a fast-paced, learning-focused environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section 
        id="skills" 
        ref={(el) => (sectionsRef.current.skills = el)}
        className="py-20 px-4 sm:px-6 lg:px-8 relative"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-5xl font-bold text-center text-gray-900 mb-16 relative">
            Technical Skills
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList], index) => (
              <div 
                key={category} 
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 group hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center group-hover:text-blue-600 transition-colors duration-300">
                  <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl mr-3 group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300">
                    {category === 'Programming Languages' && <Code className="text-blue-600" size={18} />}
                    {category === 'Machine Learning & Deep Learning' && <Brain className="text-indigo-600" size={18} />}
                    {category === 'Databases' && <Database className="text-purple-600" size={18} />}
                    {!['Programming Languages', 'Machine Learning & Deep Learning', 'Databases'].includes(category) && <Wrench className="text-green-600" size={18} />}
                  </div>
                  <span className="leading-tight">{category}</span>
                </h3>
                <div className="space-y-3">
                  {skillList.map((skill, skillIndex) => (
                    <div key={skill} className="flex items-center group/item hover:translate-x-2 transition-transform duration-300">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-3 group-hover/item:scale-125 transition-transform duration-300"></div>
                      <span className="text-gray-700 group-hover/item:text-blue-600 transition-colors duration-300">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        id="projects" 
        ref={(el) => (sectionsRef.current.projects = el)}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white/60 backdrop-blur-sm relative"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-5xl font-bold text-center text-gray-900 mb-16 relative">
            Featured Projects
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
          </h2>
          
          <div className="space-y-12">
            {projects.map((project, index) => (
              <div key={project.title} className={`bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 overflow-hidden hover:shadow-3xl transition-all duration-500 group ${
                project.highlight ? 'ring-2 ring-blue-500/50 shadow-blue-500/20' : ''
              }`}>
                {project.highlight && (
                  <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-6 py-3 relative overflow-hidden">
                    <div className="flex items-center space-x-2">
                      <Star className="animate-spin" size={20} />
                      <span className="text-sm font-semibold">Featured Project</span>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  </div>
                )}
                
                <div className="p-8">
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{project.title}</h3>
                        <h4 className="text-lg text-blue-600 font-semibold mb-4">{project.subtitle}</h4>
                        <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span 
                            key={tech} 
                            className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 cursor-default"
                            style={{ animationDelay: `${techIndex * 50}ms` }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn flex items-center justify-center space-x-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                          <Github size={18} className="group-hover/btn:rotate-12 transition-transform duration-300" />
                          <span>View Code</span>
                        </a>
                        {project.liveUrl !== "#" && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn flex items-center justify-center space-x-2 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                          >
                            <ExternalLink size={18} className="group-hover/btn:rotate-12 transition-transform duration-300" />
                            <span>Live Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h5 className="text-lg font-semibold text-gray-900 flex items-center">
                        <Sparkles className="mr-2 text-blue-600" size={20} />
                        Key Features
                      </h5>
                      <ul className="space-y-3">
                        {project.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start group/feature hover:translate-x-2 transition-transform duration-300">
                            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-3 mt-2 group-hover/feature:scale-125 transition-transform duration-300"></div>
                            <span className="text-gray-700 leading-relaxed group-hover/feature:text-blue-600 transition-colors duration-300">{feature}</span>
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
      <section 
        id="education" 
        ref={(el) => (sectionsRef.current.education = el)}
        className="py-20 px-4 sm:px-6 lg:px-8 relative"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-5xl font-bold text-center text-gray-900 mb-16 relative">
            Education
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
          </h2>
          
          <div className="space-y-8">
            {education.map((edu, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-500 group hover:scale-[1.02]">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">{edu.degree}</h3>
                    <h4 className="text-lg text-blue-600 font-semibold mb-2">{edu.institution}</h4>
                    <p className="text-gray-600 mb-2">{edu.location}</p>
                    {edu.coursework && (
                                            <div className="mt-3">
                        <h5 className="text-gray-800 font-medium mb-1">Relevant Coursework:</h5>
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                          {edu.coursework.map((course, i) => (
                            <li key={i} className="hover:text-blue-600 transition-colors duration-300">{course}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center md:items-end text-right">
                    <span className="text-sm text-gray-500">{edu.period}</span>
                    {edu.gpa && (
                      <span className="text-sm font-semibold text-blue-600 mt-1">GPA: {edu.gpa}</span>
                    )}
                    {edu.percentage && (
                      <span className="text-sm font-semibold text-blue-600 mt-1">Percentage: {edu.percentage}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* Contact Section */}
      <section 
        id="contact" 
        ref={(el) => (sectionsRef.current.contact = el)}
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-indigo-700"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8 relative">
            Let's Connect
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-24 h-1 bg-white/30 rounded-full"></div>
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
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
          <div className="flex justify-center space-x-4 text-sm">
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
