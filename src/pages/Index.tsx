
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  FilePresentation, 
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
  X
} from 'lucide-react';

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    { 
      title: "Text to Slides", 
      description: "Enter text or copy-paste content to generate professional slides.", 
      icon: <FileText className="h-12 w-12 text-purple" /> 
    },
    { 
      title: "Voice to Presentation", 
      description: "Record voice and convert to structured presentation slides.", 
      icon: <Mic className="h-12 w-12 text-purple" /> 
    },
    { 
      title: "CSV Visualization", 
      description: "Upload CSV files and create data-driven charts automatically.", 
      icon: <Table className="h-12 w-12 text-purple" /> 
    },
    { 
      title: "Image to Content", 
      description: "Extract text from images and convert to presentation slides.", 
      icon: <Image className="h-12 w-12 text-purple" /> 
    },
    { 
      title: "Web Article Summarizer", 
      description: "Convert web articles into concise, informative slides.", 
      icon: <Globe className="h-12 w-12 text-purple" /> 
    },
    { 
      title: "Export Options", 
      description: "Download your presentations as PowerPoint or PDF files.", 
      icon: <Download className="h-12 w-12 text-purple" /> 
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header/Navigation */}
      <header className="bg-white shadow z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Sparkles className="text-purple h-6 w-6" />
            <span className="font-bold text-xl">SlideScribe AI</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-purple">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-purple">How It Works</a>
            <Link to="/login" className="text-gray-600 hover:text-purple">Log In</Link>
            <Link to="/login">
              <Button className="bg-purple hover:bg-purple-dark">
                Sign Up Free
              </Button>
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-600" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 py-4 bg-white border-t">
            <div className="flex flex-col space-y-4">
              <a 
                href="#features" 
                className="text-gray-600 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                className="text-gray-600 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <Link 
                to="/login" 
                className="text-gray-600 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log In
              </Link>
              <Link 
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button className="w-full bg-purple hover:bg-purple-dark">
                  Sign Up Free
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-light via-white to-slideBlue py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Transform Your Ideas Into Stunning Presentations
              </h1>
              <p className="text-xl mb-8 text-gray-700">
                The AI-powered presentation generator that turns your content into professional slides in seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                  <Button className="bg-purple hover:bg-purple-dark text-lg py-6 px-8">
                    Get Started Free
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="#how-it-works">
                  <Button variant="outline" className="text-lg py-6 px-8">
                    See How It Works
                  </Button>
                </a>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-lg">
                <div className="absolute top-0 left-0 w-72 h-72 bg-purple-light rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 right-0 w-72 h-72 bg-slideBlue rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                <div className="relative">
                  <div className="border border-gray-200 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4">
                    <div className="slide bg-white rounded-lg overflow-hidden">
                      <div className="bg-purple-dark text-white p-4">
                        <div className="flex items-center">
                          <FilePresentation className="mr-2" size={20} />
                          <h3 className="font-medium">AI Generated Slide</h3>
                        </div>
                      </div>
                      <div className="p-6">
                        <h2 className="text-2xl font-bold mb-4">Digital Transformation</h2>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <div className="mr-2 mt-1"><Sparkles size={16} className="text-purple" /></div>
                            <span>Streamline business operations</span>
                          </li>
                          <li className="flex items-start">
                            <div className="mr-2 mt-1"><Sparkles size={16} className="text-purple" /></div>
                            <span>Enhance customer experiences</span>
                          </li>
                          <li className="flex items-start">
                            <div className="mr-2 mt-1"><Sparkles size={16} className="text-purple" /></div>
                            <span>Drive innovation and growth</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Transform Your Content With AI</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple ways to create professional presentations from various input formats
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4 bg-purple-light inline-block p-3 rounded-lg">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How SlideScribe Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three simple steps to create professional presentations
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-purple rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">1</div>
              <h3 className="text-xl font-semibold mb-4">Input Your Content</h3>
              <p className="text-gray-600">Upload text, record voice, import CSV, upload images, or paste a URL.</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-purple rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">2</div>
              <h3 className="text-xl font-semibold mb-4">AI Processing</h3>
              <p className="text-gray-600">Our AI analyzes your content and generates professional slides with smart formatting.</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-purple rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">3</div>
              <h3 className="text-xl font-semibold mb-4">Export & Present</h3>
              <p className="text-gray-600">Review, edit if needed, and export your presentation as PowerPoint or PDF.</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/login">
              <Button className="bg-purple hover:bg-purple-dark">
                Start Creating Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2">
                <Sparkles className="text-purple h-6 w-6" />
                <span className="font-bold text-xl">SlideScribe AI</span>
              </div>
              <p className="mt-2 text-gray-400">AI-powered presentation generator</p>
            </div>
            
            <div className="flex flex-wrap gap-x-12 gap-y-4">
              <div>
                <h4 className="font-semibold mb-3">Product</h4>
                <ul className="space-y-2">
                  <li><a href="#features" className="text-gray-400 hover:text-white">Features</a></li>
                  <li><a href="#how-it-works" className="text-gray-400 hover:text-white">How it Works</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <hr className="border-gray-800 my-8" />
          
          <div className="text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} SlideScribe AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
