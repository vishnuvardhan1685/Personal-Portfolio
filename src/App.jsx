import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, Code2, ExternalLink, Send } from 'lucide-react';
import { useState, useMemo } from 'react';
import './App.css';

/* ------------------------------
   REUSABLE ANIMATED BACKGROUND COMPONENT
   ------------------------------ */
const AnimatedBackground = () => {
  // Generate random positions once on mount - safe use of Math.random in useMemo
  // eslint-disable-next-line react-compiler/react-compiler
  const floatingBlobs = useMemo(
    () =>
      [...Array(6)].map(() => ({
        size: 200 + Math.random() * 300,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 18 + Math.random() * 10,
      })),
    []
  );

  // eslint-disable-next-line react-compiler/react-compiler
  const gridParticles = useMemo(
    () =>
      [...Array(30)].map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 6 + Math.random() * 4,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Floating gradient blobs */}
      {floatingBlobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl pointer-events-none"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.x}%`,
            top: `${b.y}%`,
            background:
              i % 2 === 0
                ? 'radial-gradient(circle, rgba(139,92,246,0.3), transparent 70%)'
                : 'radial-gradient(circle, rgba(59,130,246,0.3), transparent 70%)',
          }}
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -50, 40, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Subtle floating particles */}
      {gridParticles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-purple-400/50 pointer-events-none"
          style={{ left: `${p.left}%`, top: `${p.top}%` }}
          animate={{ y: [0, -40, 0], opacity: [0, 1, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
        />
      ))}

      {/* Animated grid overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(139,92,246,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.08)_1px,transparent_1px)] bg-[size:120px_120px]"
        animate={{ backgroundPosition: ['0px 0px', '120px 120px'] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        style={{ maskImage: 'radial-gradient(circle at center, black 55%, transparent 100%)' }}
      />
    </div>
  );
};

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Using mailto link to send email
    const mailtoLink = `mailto:vishnuvardhan1685@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(formData.name)}&body=Name: ${encodeURIComponent(formData.name)}%0D%0AEmail: ${encodeURIComponent(formData.email)}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(formData.message)}`;
    window.location.href = mailtoLink;
    
    setFormStatus('sent');
    setFormData({ name: '', email: '', message: '' });
    
    setTimeout(() => setFormStatus(''), 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const projects = [
    {
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website featuring a dark theme with glassmorphism design elements. Built with React and TailwindCSS, showcasing projects, skills, and experience with smooth animations and an interactive contact form.",
      techStack: "React, TailwindCSS, Framer Motion, Vite, Lucide React",
      github: "https://github.com/vishnuvardhan1685/Personal-Portfolio.git",
      live: "https://vishnuvardhanportfolioo.netlify.app",
      type: "Github Repo"
    },
    {
      title: "Dynamic Weather Dashboard",
      description: "A responsive weather application featuring a modern glassmorphism UI. It provides real-time current weather, hourly, and 7-day forecasts. The application utilizes the Open-Meteo API for data fetching and features a dynamic background system that visually adapts the interface color scheme based on the current temperature.",
      techStack: "HTML5, CSS3, Vanilla JavaScript, Open-Meteo API",
      github: "https://github.com/vishnuvardhan1685/Weather-App.git",
      live: "https://weather-app-neptune.vercel.app",
      type: "Github Repo"
    },
    {
      title: "PubliShelf",
      description: "Developed a full-stack eCommerce platform for listing, selling, and auctioning antique books.",
      techStack: "React, Node.js, Express, MongoDB, TailwindCSS, Redux Toolkit, JWT, REST APIs",
      github: "https://github.com/vitesh-reddy/PubliShelf_Team.git",
      type: "Github Repo"
    },
    {
      title: "Real Time IOT Device Data Monitoring",
      description: "Developed a comprehensive real-time monitoring system for ingesting, storing, and visualizing data from a wide array of IoT devices, complete with a data simulator, a robust backend API, and a dynamic dashboard.",
      techStack: "Python, FastAPI, React.js, Chart.js, TimescaleDB, PostgreSQL, Docker, Docker Compose, WebSocket, Streamlit",
      github: "https://github.com/vsn20/REAL-TIME-MONITORING.git",
      type: "Github Repo"
    },
    {
      title: "Password Vault",
      description: "Developed a secure password manager featuring AES-256-GCM encryption for data protection and a glassmorphism UI. Implemented JWT-based authentication with JWT, secure password generation, and real-time vault management.",
      techStack: "React, Node.js, Express, MongoDB, TailwindCSS, React Hook Form",
      github: "https://github.com/vishnuvardhan1685/PasswordVault.git",
      live: "https://passwordvault-6jpg.onrender.com"
    },
    {
      title: "Finance Tracker",
      description: "Developed a full-stack expense tracking application featuring transaction management, dynamic financial insights, and persistent data storage. Implemented interactive data visualizations using Recharts to analyze spending patterns by category and time period.",
      techStack: "React, Node.js, Express, MongoDB, TailwindCSS, Zustand, Recharts",
      github: "https://github.com/vishnuvardhan1685/Finance-Tracker.git",
      live: "https://finance-tracker-vovo.onrender.com"
    },
    {
      title: "Swipe-Match",
      description: "Built a matchmaking app with swipe functionality for compatible user discovery.",
      techStack: "React, Zustand, TailwindCSS, JavaScript, Node.js, Express, MongoDB, Socket.IO",
      github: "https://github.com/vishnuvardhan1685/SwipeMatch.git",
      live: "https://swipematch.onrender.com/"
    }
  ];

  const skills = {
    "Frontend Development": ["React", "Redux.js", "Redux Toolkit", "Context API", "Zustand", "TailwindCSS", "HTML5", "CSS3", "JavaScript", "TypeScript", "Vite", "Framer Motion"],
    "Backend Development": ["Node.js", "Express.js", "REST APIs", "GraphQL", "JWT", "WebSocket", "Socket.IO"],
    "Databases & ORM": ["MongoDB", "Mongoose", "SQL", "MySQL", "TimescaleDB"],
    "Programming Languages": ["JavaScript", "TypeScript", "Python", "Java"],
    "Tools & Version Control": ["Git", "GitHub", "Vercel", "Axios", "Postman"],
    "Data Science & Soft Skills": ["NumPy", "Pandas", "Matplotlib", "MATLAB", "Problem Solving", "Algorithm Design", "Leadership", "Team Collaboration"]
  };

  const experience = [
    {
      title: "Senior Placement Coordinator — IIIT Sri City",
      period: "Oct 2025 - Present",
      description: "Leading placement coordination activities for the institute, facilitating communication between students and recruiting companies. Organizing pre-placement talks, coordinating interview schedules, and providing guidance to students on career opportunities and preparation strategies."
    },
    {
      title: "Gradient Club : Problem Setter Core Member",
      period: "Aug 2023 - Present",
      description: "Collaborated with other core members to organize coding challenges, enhancing peer learning and programming culture in the institute. Developed problem statements inspired by real-world applications, encouraging creative thinking and practical implementation skills."
    },
    {
      title: "Student Academic Council , IIIT Sri City",
      period: "Aug 2024 - May 2025",
      description: "Contributed to strategic discussions on academic management, policy improvement, and student support systems. Collaborated with faculty members and student leaders to improve curriculum delivery and overall academic experience."
    },
    {
      title: "Invitation Team, Abhisarga Festival 2025 — Core Member",
      period: "Feb 2025 - Mar 2025",
      description: "Designed and executed structured outreach strategies that boosted participation and visibility of the fest. Collaborated with cross-functional teams to manage logistics and formalities for dignitaries and special invitees."
    },
    {
      title: "Hospitality Team, Abhisarga Festival 2024 — Core Member",
      period: "Feb 2024 - Mar 2024",
      description: "Streamlined hospitality workflows by coordinating with transport, food, and logistics teams, ensuring smooth execution. Fostered a welcoming environment that enhanced the overall participant and guest experience."
    }
  ];

  const education = [
    {
      institution: "Indian Institute of Information Technology, Sri City",
      degree: "B.Tech, Computer Science and Engineering",
      gpa: "8.22/10.0",
      coursework: "Software Engineering, Operating Systems, Algorithms, AI, DBMS"
    },
    {
      institution: "Sri Chaitanya Junior College, Hyderabad",
      degree: "MPC (JIT)",
      percentage: "98.4%"
    }
  ];

  return (
    <div className="relative min-h-screen bg-dark-bg text-white overflow-hidden">
      {/* GLOBAL ANIMATED BACKGROUND */}
      <AnimatedBackground />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-dark-bg/70 backdrop-blur-lg z-50 border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold"
          >
            <Code2 className="inline-block mr-2" />
            VD
          </motion.div>
          <div className="hidden md:flex gap-8">
            <a href="#about" className="hover:text-gray-300 transition">About</a>
            <a href="#skills" className="hover:text-gray-300 transition">Skills</a>
            <a href="#projects" className="hover:text-gray-300 transition">Projects</a>
            <a href="#experience" className="hover:text-gray-300 transition">Experience</a>
            <a href="#contact" className="hover:text-gray-300 transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="max-w-7xl mx-auto px-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Profile Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="mb-8 flex justify-center"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-2 border-purple-500/30 flex items-center justify-center overflow-hidden">
                  {/* Placeholder - Replace with your image */}
                  <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">VD</div>
                  {/* Uncomment and use this when you add your image:
                  <img 
                    src="/path-to-your-image.jpg" 
                    alt="Vishnuvardhan Donthoji" 
                    className="w-full h-full object-cover"
                  />
                  */}
                </div>
              </div>
            </motion.div>

            <motion.p 
              className="text-gray-400 mb-4 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              👋 Hello, I'm
            </motion.p>
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Vishnuvardhan <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Donthoji</span>
            </motion.h1>
            <motion.p 
              className="text-2xl md:text-3xl text-gray-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Full Stack Developer & Computer Science Student
            </motion.p>
            <motion.p 
              className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Computer Science undergraduate with a strong foundation in software engineering, algorithms, and system design. 
              Passionate about building intelligent, user-centric web applications that combine innovative design with functional impact.
            </motion.p>
            <motion.div 
              className="flex gap-4 justify-center flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <a 
                href="#contact" 
                className="px-8 py-4 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition transform hover:scale-105"
              >
                Get In Touch
              </a>
              <a 
                href="#projects" 
                className="px-8 py-4 border border-white/20 rounded-lg font-semibold hover:bg-white/10 transition transform hover:scale-105"
              >
                View Projects
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex gap-6 justify-center mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition">
                <Github size={28} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition">
                <Linkedin size={28} />
              </a>
              <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition">
                <Code2 size={28} />
              </a>
              <a href="mailto:vishnuvardhan1685@gmail.com" className="hover:text-purple-400 transition">
                <Mail size={28} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold mb-4 text-center">Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Skills</span></h2>
            <p className="text-gray-400 text-center mb-16 text-lg">Technologies and tools I work with</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(skills).map(([category, skillList], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-purple-500/50 transition"
                >
                  <h3 className="text-xl font-semibold mb-4 text-purple-400">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill) => (
                      <span 
                        key={skill}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm hover:bg-white/10 transition"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 bg-dark-card/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold mb-4 text-center">Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Projects</span></h2>
            <p className="text-gray-400 text-center mb-16 text-lg">Some of my recent work</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-purple-500/50 transition group"
                >
                  <h3 className="text-2xl font-semibold mb-3 group-hover:text-purple-400 transition">{project.title}</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">{project.description}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    <span className="font-semibold text-purple-400">Tech Stack:</span> {project.techStack}
                  </p>
                  <div className="flex gap-3">
                    {project.github && (
                      <a 
                        href={project.github} 
                        className="flex items-center gap-2 text-sm hover:text-purple-400 transition"
                      >
                        <Github size={18} />
                        {project.type || "Code"}
                      </a>
                    )}
                    {project.live && (
                      <a 
                        href={project.live} 
                        className="flex items-center gap-2 text-sm hover:text-purple-400 transition"
                      >
                        <ExternalLink size={18} />
                        Live Preview
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold mb-4 text-center">Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Experience</span></h2>
            <p className="text-gray-400 text-center mb-16 text-lg">My professional journey</p>
            
            <div className="space-y-8 max-w-4xl mx-auto">
              {experience.map((exp, index) => (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-purple-500/50 transition relative pl-8"
                >
                  <div className="absolute left-0 top-6 w-1 h-full bg-gradient-to-b from-purple-400 to-blue-400 rounded"></div>
                  <h3 className="text-xl font-semibold mb-2">{exp.title}</h3>
                  <p className="text-purple-400 mb-3 text-sm">{exp.period}</p>
                  <p className="text-gray-400 leading-relaxed">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-24"
          >
            <h2 className="text-5xl font-bold mb-4 text-center">Education</h2>
            <p className="text-gray-400 text-center mb-16 text-lg">Academic background</p>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.institution}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-purple-500/50 transition"
                >
                  <h3 className="text-xl font-semibold mb-2">{edu.institution}</h3>
                  <p className="text-purple-400 mb-2">{edu.degree}</p>
                  <p className="text-gray-400 mb-2">{edu.gpa || edu.percentage}</p>
                  {edu.coursework && (
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Relevant Coursework:</span> {edu.coursework}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Technical Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-24"
          >
            <h2 className="text-5xl font-bold mb-4 text-center">Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Achievements</span></h2>
            <p className="text-gray-400 text-center mb-16 text-lg">Notable accomplishments</p>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl p-8 text-center"
              >
                <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">500+</div>
                <h3 className="text-xl font-semibold mb-2">LeetCode Problems</h3>
                <p className="text-gray-400">Solved consistently for a year, strengthening data structures and algorithms expertise across Easy, Medium, and Hard difficulty levels.</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-8 text-center"
              >
                <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">CodeChef</div>
                <h3 className="text-xl font-semibold mb-2">Contest Participant</h3>
                <p className="text-gray-400">Actively participating in competitive programming contests since Aug 2025, consistently improving problem-solving speed and algorithmic thinking.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-dark-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-5xl font-bold mb-4">Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Touch</span></h2>
            <p className="text-gray-400 mb-12 text-lg">Let's connect and build something amazing together</p>
            
            {/* Contact Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="bg-dark-card border border-dark-border rounded-xl p-8 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <div className="text-left">
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-purple-500 transition"
                    placeholder="Your name"
                  />
                </div>
                
                <div className="text-left">
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-purple-500 transition"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div className="text-left">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-purple-500 transition resize-none"
                    placeholder="Your message..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition transform hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Send Message
                </button>
                
                {formStatus === 'sent' && (
                  <p className="text-green-400 text-center">Message sent successfully!</p>
                )}
              </div>
            </motion.form>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <a 
                href="mailto:vishnuvardhan1685@gmail.com"
                className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-purple-500/50 transition flex items-center gap-4"
              >
                <Mail className="text-purple-400" size={32} />
                <div className="text-left">
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-gray-400 text-sm">vishnuvardhan1685@gmail.com</p>
                </div>
              </a>
              
              <a 
                href="tel:+917981513415"
                className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-purple-500/50 transition flex items-center gap-4"
              >
                <Phone className="text-purple-400" size={32} />
                <div className="text-left">
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-gray-400 text-sm">79815-13415</p>
                </div>
              </a>
            </div>

            <div className="flex gap-6 justify-center">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-dark-card border border-dark-border rounded-lg hover:border-purple-500/50 transition flex items-center gap-2"
              >
                <Github size={20} />
                GitHub
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-dark-card border border-dark-border rounded-lg hover:border-purple-500/50 transition flex items-center gap-2"
              >
                <Linkedin size={20} />
                LinkedIn
              </a>
              <a 
                href="https://leetcode.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-dark-card border border-dark-border rounded-lg hover:border-purple-500/50 transition flex items-center gap-2"
              >
                <Code2 size={20} />
                LeetCode
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-dark-border">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>© 2026 Vishnuvardhan Donthoji. Built with React & TailwindCSS</p>
          <p className="mt-2 text-sm">Designed with passion and attention to detail</p>
        </div>
      </footer>
    </div>
  );
}

export default App;