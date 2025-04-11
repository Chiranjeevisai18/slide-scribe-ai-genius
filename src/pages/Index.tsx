import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Presentation, 
  Sparkles, 
  FileText, 
  Mic, 
  Table, 
  Image, 
  Globe, 
  Download,
  ChevronRight,
  ArrowRight,
  Menu,
  X,
  Check,
  Brain
} from 'lucide-react';

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Set animation visibility on component mount

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    { 
      title: "Text to Slides", 
      description: "Enter text or copy-paste content to generate professional slides.", 
      icon: <FileText className="h-10 w-10 text-indigo-400" /> 
    },
    { 
      title: "Voice to Presentation", 
      description: "Record voice and convert to structured presentation slides.", 
      icon: <Mic className="h-10 w-10 text-indigo-400" /> 
    },
    { 
      title: "CSV Visualization", 
      description: "Upload CSV files and create data-driven charts automatically.", 
      icon: <Table className="h-10 w-10 text-indigo-400" /> 
    },
    { 
      title: "Image to Content", 
      description: "Extract text from images and convert to presentation slides.", 
      icon: <Image className="h-10 w-10 text-indigo-400" /> 
    },
    { 
      title: "Web Article Summarizer", 
      description: "Convert web articles into concise, informative slides.", 
      icon: <Globe className="h-10 w-10 text-indigo-400" /> 
    },
    { 
      title: "Export Options", 
      description: "Download your presentations as PowerPoint or PDF files.", 
      icon: <Download className="h-10 w-10 text-indigo-400" /> 
    },
  ];

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Marketing Director",
      text: "SlideScribe AI has revolutionized how I create presentations. What used to take hours now takes minutes, and the quality is consistently impressive.",
      stars: 5
    },
    {
      name: "Sarah Chen",
      role: "Data Scientist",
      text: "The CSV visualization feature is a game-changer. I can transform complex data into clear, visually appealing slides that my team can actually understand.",
      stars: 4.5
    },
    {
      name: "Michael Torres",
      role: "Education Consultant",
      text: "As someone who creates educational content daily, SlideScribe AI has been invaluable. The voice-to-presentation feature lets me talk through my ideas and get polished slides.",
      stars: 5
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 z-0 overflow-hidden">
     <img
          src="https://readdy.ai/api/search-image?query=Stunning%20futuristic%20cityscape%20at%20twilight%20with%20floating%20holographic%20displays%20and%20AI%20interfaces%2C%20bioluminescent%20trees%20and%20structures%20emitting%20soft%20purple%20and%20blue%20light%2C%20advanced%20architecture%20with%20clean%20lines%20and%20glass%20surfaces%20reflecting%20neon%20lights%2C%20ethereal%20atmosphere%20with%20aurora%20borealis%20in%20the%20sky&width=1440&height=1024&seq=bg002&orientation=landscape"
        alt="Background"
         className="w-full h-full object-cover opacity-40"
     />
<div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900/90"></div>
</div> 
      {/* Header/Navigation */}
      <header className="relative z-10 shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 group">
          <div className="relative w-10 h-10">
<img
src="https://public.readdy.ai/ai/img_res/18f9d9f5-ae06-4a9f-af73-3eb60beaa5a8.jpeg"
alt="Logo"
className="w-full h-full object-contain"
/>
</div>
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
              SlideScribe AI
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-all duration-300 relative hover:-translate-y-0.5">
              Features
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 hover:scale-x-100 transition-transform duration-300"></span>
            </a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-all duration-300 relative hover:-translate-y-0.5">
              How It Works
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 hover:scale-x-100 transition-transform duration-300"></span>
            </a>
            <Link to="/login" className="text-gray-300 hover:text-white transition-all duration-300 relative hover:-translate-y-0.5">
              Log In
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link to="/login">
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 hover:-translate-y-0.5">
                Sign Up Free
              </Button>
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-300" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 py-4 bg-gray-800/90 backdrop-blur-sm border-t border-gray-700 relative z-20">
            <div className="flex flex-col space-y-4">
              <a 
                href="#features" 
                className="text-gray-300 hover:text-white py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                className="text-gray-300 hover:text-white py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <Link 
                to="/login" 
                className="text-gray-300 hover:text-white py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log In
              </Link>
              <Link 
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500">
                  Sign Up Free
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className={`relative z-10 py-16 lg:py-24 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Transform Your Ideas Into
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
                  Stunning Presentations
                </span>
              </h1>
              <p className="text-xl mb-8 text-gray-300">
                The AI-powered presentation generator that turns your content into professional slides in seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                  <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/40 text-lg py-6 px-8">
                    Get Started Free
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="#how-it-works">
                  <Button variant="outline" className="text-lg py-6 px-8 border border-gray-600 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50">
                    See How It Works
                  </Button>
                </a>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative">
                <div className="bg-gradient-to-br from-indigo-900/80 to-purple-900/80 backdrop-blur-sm rounded-xl p-6 shadow-xl shadow-purple-900/20">
                  <div className="flex items-center mb-4">
                    <Presentation className="text-indigo-400 mr-3 h-5 w-5" />
                    <h3 className="text-xl font-semibold">AI Generated Slide</h3>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Digital Transformation</h2>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="text-indigo-400 mt-1 mr-3 h-5 w-5" />
                        <span>Streamline business operations</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-indigo-400 mt-1 mr-3 h-5 w-5" />
                        <span>Enhance customer experiences</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-indigo-400 mt-1 mr-3 h-5 w-5" />
                        <span>Drive innovation and growth</span>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Decorative effects */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-xl opacity-30"></div>
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-indigo-600 rounded-full blur-xl opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
              Transform Your Content With AI
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Multiple ways to create professional presentations from various input formats
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-indigo-500/50 transition-all duration-300 group hover:transform hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/20 hover:bg-gray-800/70"
              >
                <div className="w-14 h-14 bg-indigo-900/50 rounded-lg flex items-center justify-center mb-5 group-hover:bg-indigo-800/70 transition-all duration-300 group-hover:transform group-hover:rotate-12">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-400 transition-colors duration-300">{feature.title}</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How SlideScribe Works</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Three simple steps to create professional presentations
            </p>
          </div>
          
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600/0 via-indigo-600/50 to-indigo-600/0 transform -translate-y-1/2 z-0"></div>
            
            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-indigo-900/80 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 border-2 border-indigo-500 relative group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/30">1</div>
                <h3 className="text-xl font-semibold mb-4">Input Your Content</h3>
                <p className="text-gray-400">Upload text, record voice, import CSV, upload images, or paste a URL.</p>
              </div>
              
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-indigo-900/80 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 border-2 border-indigo-500 relative group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/30">2</div>
                <h3 className="text-xl font-semibold mb-4">AI Processing</h3>
                <p className="text-gray-400">Our AI analyzes your content and generates professional slides with smart formatting.</p>
              </div>
              
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-indigo-900/80 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 border-2 border-indigo-500 relative group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/30">3</div>
                <h3 className="text-xl font-semibold mb-4">Export & Present</h3>
                <p className="text-gray-400">Review, edit if needed, and export your presentation as PowerPoint or PDF.</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/login">
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-indigo-600/20">
                Start Creating Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">Join thousands of professionals who create stunning presentations with SlideScribe AI</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-indigo-500/50 hover:bg-gray-800/70 transition-all duration-300 hover:transform hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/20"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-900 flex items-center justify-center mr-4">
                    <div className="text-indigo-400 h-6 w-6">{index === 0 ? '👤' : index === 1 ? '👩‍💼' : '👨‍🏫'}</div>
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300">{testimonial.text}</p>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(Math.floor(testimonial.stars))].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                  {testimonial.stars % 1 === 0.5 && <span>½</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-16 my-8">
        <div className="relative mx-8 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
<img
src="https://readdy.ai/api/search-image?query=Mesmerizing%20abstract%20visualization%20of%20AI%20neural%20networks%20with%20flowing%20energy%20streams%20in%20vibrant%20purple%20and%20electric%20blue%2C%20crystalline%20geometric%20structures%20floating%20in%20space%20with%20glowing%20particles%2C%20dynamic%20light%20trails%20creating%20a%20sense%20of%20motion%20and%20innovation%2C%20hypermodern%20digital%20art%20style&width=1440&height=500&seq=cta002&orientation=landscape"
alt="CTA Background"
className="w-full h-full object-cover opacity-30"
/>
</div>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 transform -skew-y-2"></div>
          <div className="relative z-10 py-16 px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Transform Your Presentations?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">Join thousands of professionals who create stunning presentations in minutes with SlideScribe AI.</p>
            <Link to="/login">
              <Button className="bg-white text-indigo-900 hover:bg-gray-100 transition-all duration-300 shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-1 text-lg py-6 px-8">
                Get Started For Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="mt-4 text-gray-400">No credit card required. Free plan includes 5 presentations per month.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Brain className="text-indigo-400 h-6 w-6" />
                <span className="font-bold text-xl">SlideScribe AI</span>
              </div>
              <p className="mt-2 text-gray-400">Transform your ideas into stunning presentations with the power of AI.</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Use Cases</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GDPR</a></li>
              </ul>
            </div>
          </div>
          
          <div className="text-center text-gray-500 pt-8 border-t border-gray-800">
            <p>&copy; {new Date().getFullYear()} SlideScribe AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;