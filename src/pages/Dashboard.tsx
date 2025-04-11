import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Presentation,
  Search,
  Clock,
  Star,
  MoreHorizontal,
  Plus,
  FileText,
  Mic,
  Image,
  Globe,
  Upload,
  PanelRight,
  User,
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser, useClerk } from "@clerk/clerk-react";
import { CreatePresentationModal } from "@/components/dashboard/CreatePresentationModal";
import { RecentPresentations } from "@/components/dashboard/RecentPresentations";

const Dashboard = () => {
  const { user } = useUser();
  const { openUserProfile } = useClerk();
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("Dashboard");

  // Add cursor trail effect
  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.className = "cursor-trail";
    document.body.appendChild(cursor);

    const updateCursorPosition = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", updateCursorPosition);

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
      document.body.removeChild(cursor);
    };
  }, []);
  
  // Feature cards for creation methods
  const creationMethods = [
    { 
      id: "text", 
      title: "Text to Slides", 
      description: "Convert text into professional slides.",
      icon: <FileText className="h-6 w-6 text-white" />,
      action: () => setShowCreateModal(true)
    },
    { 
      id: "voice", 
      title: "Voice to Slides", 
      description: "Record or upload voice to generate slides.",
      icon: <Mic className="h-6 w-6 text-white" />,
      action: () => setShowCreateModal(true)
    },
    { 
      id: "image", 
      title: "Image to Slides", 
      description: "Extract text from images for presentations.",
      icon: <Image className="h-6 w-6 text-white" />,
      action: () => setShowCreateModal(true)
    },
    { 
      id: "web", 
      title: "Web to Slides", 
      description: "Turn web articles into organized slides.",
      icon: <Globe className="h-6 w-6 text-white" />,
      action: () => setShowCreateModal(true)
    },
    { 
      id: "import", 
      title: "Import Existing", 
      description: "Upload an existing presentation to enhance.",
      icon: <Upload className="h-6 w-6 text-white" />,
      action: () => setShowCreateModal(true)
    },
    { 
      id: "template", 
      title: "Start from Template", 
      description: "Choose from our template gallery.",
      icon: <PanelRight className="h-6 w-6 text-white" />,
      to: "/templates"
    },
  ];

  // Navigation items
  const navItems = [
    { name: "Dashboard", icon: <Presentation className="w-5 h-5" /> },
    { name: "Templates", icon: <PanelRight className="w-5 h-5" /> },
    { name: "Settings", icon: <Clock className="w-5 h-5" /> }
  ];

  // Recent presentations data
  const recentPresentations = [
    {
      id: 1,
      title: "Business Proposal",
      slides: 12,
      timeAgo: "2 hours ago",
      icon: <Presentation />,
      image: "https://readdy.ai/api/search-image?query=Professional%20business%20meeting%20scene%20with%20modern%20office%20interior%2C%20people%20discussing%20strategy%20around%20a%20conference%20table%20with%20holographic%20presentations%20and%20data%20visualizations%20floating%20in%20air%2C%20soft%20ambient%20lighting%20and%20minimalist%20design&width=400&height=300&seq=1001&orientation=landscape"
    },
    {
      id: 2,
      title: "Marketing Strategy",
      slides: 8,
      timeAgo: "Yesterday",
      icon: <Presentation />,
      image: "https://readdy.ai/api/search-image?query=Digital%20marketing%20concept%20visualization%20with%20floating%20social%20media%20icons%2C%20data%20analytics%20graphs%2C%20and%20creative%20campaign%20elements%20in%20a%20modern%20tech%20environment%20with%20blue%20and%20purple%20gradient%20lighting&width=400&height=300&seq=1002&orientation=landscape"
    },
    {
      id: 3,
      title: "Quarterly Report",
      slides: 15,
      timeAgo: "2 days ago",
      icon: <Presentation />,
      image: "https://readdy.ai/api/search-image?query=Financial%20district%20skyline%20with%20data%20visualization%20elements%2C%203D%20charts%20and%20graphs%20showing%20business%20growth%2C%20modern%20corporate%20aesthetic%20with%20glass%20buildings%20and%20dynamic%20lighting%20effects&width=400&height=300&seq=1003&orientation=landscape"
    }
  ];

  // Add global styles - using useEffect instead of style jsx
  useEffect(() => {
    // Create a style element
    const styleElement = document.createElement('style');
    
    // Add the CSS content
    styleElement.textContent = `
      body {
        margin: 0;
        font-family: 'Inter', sans-serif;
        overflow-x: hidden;
        background-color: #000;
        color: white;
      }
      
      .cursor-trail {
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255,46,136,0.5) 0%, rgba(0,240,255,0.3) 70%, transparent 100%);
        pointer-events: none;
        transform: translate(-50%, -50%);
        z-index: 9999;
        mix-blend-mode: screen;
        filter: blur(3px);
        transition: 0.1s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .shadow-glow-cyan {
        box-shadow: 0 0 20px rgba(0, 240, 255, 0.4);
      }
      
      .shadow-glow-pink {
        box-shadow: 0 0 20px rgba(255, 46, 136, 0.6);
      }
      
      .shadow-glow-purple {
        box-shadow: 0 0 15px rgba(157, 0, 255, 0.5);
      }
      
      .particles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 1;
      }
      
      .particles:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image:
          radial-gradient(circle, rgba(255,46,136,0.1) 1px, transparent 1px),
          radial-gradient(circle, rgba(0,240,255,0.1) 1px, transparent 1px);
        background-size: 40px 40px;
        background-position: 0 0, 20px 20px;
        animation: particlesDrift 20s linear infinite;
      }
      
      @keyframes particlesDrift {
        0% {
          background-position: 0 0, 20px 20px;
        }
        100% {
          background-position: 40px 40px, 60px 60px;
        }
      }
      
      .perspective-card {
        transform-style: preserve-3d;
        transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .perspective-card:hover {
        transform: perspective(1000px) rotateX(2deg) rotateY(5deg) scale3d(1.02, 1.02, 1.02);
      }
      
      .hover\\:scale-102:hover {
        transform: scale(1.02);
      }
    `;
    
    // Append the style element to the document head
    document.head.appendChild(styleElement);
    
    // Clean up function to remove the style element when component unmounts
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-cover bg-center bg-fixed relative overflow-hidden"
      style={{
        backgroundImage: "url('https://readdy.ai/api/search-image?query=Abstract%20digital%20landscape%20with%20flowing%20geometric%20patterns%20and%20waves%20of%20light%2C%20featuring%20deep%20purples%20and%20electric%20blues.%20Minimalist%20tech%20aesthetic%20with%20subtle%20grid%20patterns%20and%20glowing%20particles%20floating%20in%20space.%20Modern%20and%20sophisticated%20design%20with%20smooth%20gradients%20and%20dimensional%20depth&width=1440&height=1024&seq=12345&orientation=landscape')",
      }}>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-85 backdrop-blur-sm z-0"></div>
      
      {/* Animated particles */}
      <div className="particles"></div>
      
      {/* Main content */}
      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-opacity-20 bg-black backdrop-filter backdrop-blur-lg border-r border-opacity-20 border-cyan-400 flex flex-col h-screen sticky top-0">
          {/* Logo */}
          <div className="p-4 flex items-center space-x-2 border-b border-opacity-20 border-cyan-400">
            <div className="text-pink-500 text-2xl">
              <Star />
            </div>
            <h1 className="text-white text-xl font-bold tracking-wider">SlideScribe</h1>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 py-6 overflow-y-auto">
            <ul className="space-y-2 px-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <button
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-300 cursor-pointer ${
                      activeNavItem === item.name
                        ? 'bg-pink-500 bg-opacity-30 text-white'
                        : 'text-gray-300 hover:bg-white hover:bg-opacity-10 hover:text-cyan-400 hover:shadow-glow-cyan'
                    }`}
                    onClick={() => setActiveNavItem(item.name)}
                  >
                    <span className="w-5 text-center">{item.icon}</span>
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Bottom fixed elements */}
          <div className="fixed bottom-0 w-64 bg-opacity-20 bg-black backdrop-filter backdrop-blur-lg">
            {/* Bottom action button */}
            <div className="p-4 border-t border-opacity-20 border-cyan-400"> 
              <button 
                className="w-full bg-purple-600 hover:bg-opacity-80 text-white py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-glow-purple" 
                onClick={() => setShowCreateModal(true)} 
              > 
                <Plus size={18} /> 
                <span>New Presentation</span> 
              </button> 
            </div> 
            
            {/* Account */}
            <button 
              onClick={() => openUserProfile()} 
              className="w-full p-4 border-t border-opacity-20 border-cyan-400 flex items-center space-x-3 hover:bg-white hover:bg-opacity-5 transition-all duration-300"
            > 
              {user?.imageUrl ? (
                <img 
                  src={user.imageUrl} 
                  alt={user.fullName || 'User'} 
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-cyan-400 flex items-center justify-center text-white"> 
                  <User size={16} /> 
                </div>
              )}
              <div className="flex flex-col items-start">
                <span className="text-white text-sm font-medium">{user?.fullName || 'Account'}</span>
                <span className="text-gray-400 text-xs">{user?.primaryEmailAddress?.emailAddress || 'Sign in'}</span>
              </div>
            </button>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="flex-1 overflow-auto">
          {/* Header */}
          <header className="p-6 border-b border-opacity-20 border-cyan-400">
            <div className="flex flex-col space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold text-white">Welcome back, {user?.firstName || "MOKA"}!</h1>
                  <p className="text-gray-300 mt-1">Create AI-powered presentations from text, voice, images, and more.</p>
                </div>
                
                {/* Search */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search presentations..."
                    className="bg-black bg-opacity-30 text-white border border-cyan-400 border-opacity-30 rounded-lg py-2 pl-10 pr-4 w-64 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 focus:w-80 outline-none text-sm backdrop-blur-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>
              
              {/* New presentation button */}
              <button 
                className="self-start bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-500 hover:to-cyan-400 text-white py-2 px-6 rounded-lg transition-all duration-300 flex items-center space-x-2 hover:shadow-glow-pink"
                onClick={() => setShowCreateModal(true)}
              >
                <Plus size={16} />
                <span>New Presentation</span>
              </button>
            </div>
          </header>
          
          {/* Main content */}
          <main className="p-6">
            {/* Creation options */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-6">Create a Presentation</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {creationMethods.map((method) => (
                  <div
                    key={method.id}
                    className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 border border-transparent hover:border-cyan-400 transition-all duration-300 hover:shadow-glow-cyan hover:transform hover:translate-y-1 cursor-pointer group"
                    onClick={method.action}
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white mb-4 group-hover:from-purple-600 group-hover:to-cyan-400 transition-all duration-500">
                      {method.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{method.title}</h3>
                    <p className="text-gray-300 text-sm">{method.description}</p>
                    <div className="mt-4 flex items-center text-cyan-400 opacity-80 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-sm font-medium">Start Creating</span>
                      <MoreHorizontal size={16} className="ml-2" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Recent presentations */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Recent Presentations</h2>
                <button 
                  className="text-cyan-400 hover:text-white transition-all duration-300 flex items-center space-x-2"
                  onClick={() => setShowCreateModal(true)}
                >
                  <Plus size={16} />
                  <span>New</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {recentPresentations.map((presentation) => (
                  <div
                    key={presentation.id}
                    className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl overflow-hidden border border-transparent hover:border-pink-500 transition-all duration-300 hover:shadow-glow-pink hover:transform hover:scale-102 cursor-pointer perspective-card"
                  >
                    <div className="h-40 bg-black bg-opacity-30 relative overflow-hidden">
                      <img
                        src={presentation.image}
                        alt={presentation.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-white">{presentation.title}</h3>
                        <button className="text-gray-400 hover:text-white transition-all duration-300">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                        <div className="flex items-center">
                          <Presentation className="mr-1 h-4 w-4" />
                          <span>{presentation.slides} slides</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          <span>{presentation.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Create new presentation card */}
                <div 
                  className="bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg rounded-xl border border-dashed border-gray-500 hover:border-cyan-400 transition-all duration-300 flex flex-col items-center justify-center h-full cursor-pointer hover:shadow-glow-cyan"
                  onClick={() => setShowCreateModal(true)}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-cyan-400 bg-opacity-10 flex items-center justify-center mb-4">
                    <Plus className="text-2xl text-white" />
                  </div>
                  <p className="text-white font-medium">Create New Presentation</p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
      
      {/* Create Presentation Modal */}
      <CreatePresentationModal 
        open={showCreateModal} 
        onOpenChange={setShowCreateModal} 
      />
    </div>
  );
};

export default Dashboard;