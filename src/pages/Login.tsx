import { useState, useEffect, useRef } from "react";
import { SignIn } from "@clerk/clerk-react";
import { Layout } from "@/components/layout/Layout";
import { Sparkles } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const galleryRef = useRef(null);
  
  // Gallery images with AI-generated templates from the reference file
  const galleryImages = [
    {
      id: 1,
      url: "https://readdy.ai/api/search-image?query=modern%20digital%20design%20interface%20with%20dark%20theme%20showing%20analytics%20dashboard%20with%20colorful%20charts%20and%20data%20visualization%20on%20a%20sleek%20tablet%20device%20with%20minimalist%20aesthetic%20and%20professional%20layout&width=400&height=500&seq=1&orientation=portrait",
      alt: "Analytics Dashboard Template"
    },
    {
      id: 2,
      url: "https://readdy.ai/api/search-image?query=artistic%20digital%20poster%20with%20orange%20sunset%20gradient%20background%20featuring%20stylized%20mountain%20silhouettes%20with%20bold%20typography%20saying%20wild%20with%20modern%20minimalist%20design%20aesthetic%20perfect%20for%20creative%20showcase&width=400&height=500&seq=2&orientation=portrait",
      alt: "Wild Poster Template"
    },
    {
      id: 3,
      url: "https://readdy.ai/api/search-image?query=digital%20design%20conversion%20funnel%20infographic%20with%20purple%20and%20blue%20gradient%20background%20featuring%20form%20fields%20and%20analytics%20data%20visualization%20with%20professional%20modern%20UI%20design%20elements&width=400&height=500&seq=3&orientation=portrait",
      alt: "Conversion Funnel Template"
    },
    {
      id: 4,
      url: "https://readdy.ai/api/search-image?query=digital%20comparison%20chart%20showing%205%20different%20iPad%20models%20with%20pricing%20information%20on%20dark%20background%20with%20purple%20and%20blue%20accent%20colors%20featuring%20product%20specifications%20and%20visual%20comparison&width=400&height=500&seq=4&orientation=portrait",
      alt: "Product Comparison Template"
    },
    {
      id: 5,
      url: "https://readdy.ai/api/search-image?query=elegant%20jewelry%20photography%20close%20up%20of%20hands%20with%20gold%20rings%20against%20neutral%20background%20with%20soft%20lighting%20and%20luxury%20aesthetic%20perfect%20for%20fashion%20ecommerce&width=400&height=500&seq=5&orientation=portrait",
      alt: "Jewelry Showcase Template"
    },
    {
      id: 6,
      url: "https://readdy.ai/api/search-image?query=food%20menu%20layout%20with%20warm%20peach%20background%20featuring%20Filipino%20cuisine%20Salo-Salo%20with%20overhead%20photography%20of%20traditional%20dishes%20arranged%20on%20wooden%20table%20with%20typography%20and%20pricing%20details&width=400&height=500&seq=6&orientation=portrait",
      alt: "Food Menu Template"
    },
    {
      id: 7,
      url: "https://readdy.ai/api/search-image?query=book%20cover%20design%20with%20dramatic%20sunset%20and%20mountain%20silhouette%20featuring%20The%20Last%20Visitor%20title%20text%20with%20mysterious%20atmospheric%20sci-fi%20aesthetic%20and%20professional%20typography%20layout&width=400&height=500&seq=7&orientation=portrait",
      alt: "Book Cover Template"
    },
    {
      id: 8,
      url: "https://readdy.ai/api/search-image?query=mental%20wellbeing%20infographic%20with%20soft%20pink%20rounded%20background%20featuring%20mindfulness%20practices%20healthy%20habits%20and%20self-care%20tips%20with%20modern%20minimalist%20icons%20and%20professional%20layout%20design&width=400&height=500&seq=8&orientation=portrait",
      alt: "Wellbeing Infographic Template"
    },
    {
      id: 9,
      url: "https://readdy.ai/api/search-image?query=matcha%20tea%20product%20showcase%20with%20soft%20green%20background%20featuring%20traditional%20bamboo%20whisk%20and%20glass%20teaware%20with%20minimalist%20grid%20layout%20and%20elegant%20typography%20perfect%20for%20premium%20product%20marketing&width=400&height=500&seq=9&orientation=portrait",
      alt: "Matcha Product Template"
    },
    {
      id: 10,
      url: "https://readdy.ai/api/search-image?query=mountain%20landscape%20photography%20with%20source%20text%20overlay%20featuring%20misty%20peaks%20and%20blue%20atmospheric%20gradient%20perfect%20for%20inspirational%20quote%20or%20brand%20story%20with%20clean%20modern%20typography&width=400&height=500&seq=10&orientation=portrait",
      alt: "Inspirational Quote Template"
    },
    {
      id: 11,
      url: "https://readdy.ai/api/search-image?query=client%20testimonial%20layout%20with%20colorful%20sticky%20notes%20on%20dark%20background%20featuring%20quotes%20and%20ratings%20with%20playful%20modern%20design%20elements%20and%20professional%20typography%20layout&width=400&height=500&seq=11&orientation=portrait",
      alt: "Testimonial Layout Template"
    },
    {
      id: 12,
      url: "https://readdy.ai/api/search-image?query=curated%20content%20collection%20interface%20with%20light%20background%20featuring%20organized%20media%20thumbnails%20and%20minimal%20navigation%20elements%20with%20professional%20grid%20layout%20and%20subtle%20shadows&width=400&height=500&seq=12&orientation=portrait",
      alt: "Content Curation Template"
    }
  ];

  useEffect(() => {
    const animateGallery = () => {
      if (!galleryRef.current) return;
      const images = galleryRef.current.querySelectorAll('.gallery-image');
      images.forEach((img, index) => {
        const imgElement = img;
        imgElement.style.opacity = '0';
        imgElement.style.transform = 'translateY(50px)';
        setTimeout(() => {
          imgElement.style.opacity = '1';
          imgElement.style.transform = 'translateY(0)';
        }, index * 300);
      });
      
      // Reset animation after all images have appeared
      setTimeout(() => {
        images.forEach((img) => {
          const imgElement = img;
          imgElement.style.opacity = '0';
          imgElement.style.transform = 'translateY(50px)';
        });
        setTimeout(() => {
          animateGallery();
        }, 500);
      }, images.length * 300 + 3000);
    };
    
    animateGallery();
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  // Custom styles for Clerk
  const clerkAppearance = {
    elements: {
      formButtonPrimary:
        'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold transition-all duration-300 shadow-lg shadow-purple-800/40',
      formButtonSecondary:
        'bg-purple-900/30 text-purple-300 hover:bg-purple-800/50 border border-purple-600 transition-colors duration-200',
      card:
        'bg-gradient-to-br from-black/30 via-purple-900/30 to-black/10 backdrop-blur-md shadow-xl shadow-purple-900/40 border border-purple-700/50',
      header: 'text-purple-300 text-xl font-semibold',
      footer: 'text-purple-400',
      formFieldLabel: 'text-purple-300 font-medium',
      formFieldInput:
        'bg-black/20 border border-purple-700 focus:border-indigo-500 focus:ring-2 focus:ring-purple-600 text-purple-100 rounded-md placeholder-purple-400',
      formFieldAction: 'text-purple-400 hover:text-purple-300',
      dividerLine: 'bg-purple-700/50',
      dividerText: 'text-purple-400',
      socialButtonsBlockButton:
        'border border-purple-600 hover:bg-purple-900/40 transition-colors duration-200 text-purple-300',
      socialButtonsBlockButtonText: 'text-purple-200',
      identityPreviewText: 'text-purple-300',
      identityPreviewEditButton: 'text-purple-400 hover:text-purple-300',
      formResendCodeLink: 'text-purple-400 hover:text-purple-300',
      alert:
        'bg-purple-900/20 border border-purple-700 text-purple-200 backdrop-blur-md'
    }
  };
  

  return (
    <Layout showSidebar={false}>
      <div className="flex min-h-screen bg-white">
        {/* Left side - Sign in form */}
        <div className="w-full md:w-1/2 flex flex-col p-8 justify-between relative">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: "url('https://readdy.ai/api/search-image?query=futuristic%20black%20and%20dark%20purple%20abstract%20digital%20background%20with%20subtle%20geometric%20patterns%20and%20soft%20gradient%20lighting%20creating%20depth%20and%20sophistication%20perfect%20for%20modern%20tech%20interface&width=800&height=1024&seq=13&orientation=portrait')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              filter: 'brightness(0.7)',
            }}
          ></div>
          
          <div className="relative z-10 flex flex-col justify-center min-h-screen">
            <div className="max-w-md mx-auto w-full">
              <div className="flex items-center mb-8">
                <i className="fas fa-globe text-gray-300 mr-2 text-xs"></i>
                <span className="text-gray-300 text-sm">English</span>
              </div>
              
              <div className="flex items-center mb-8">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
                  <path d="M16 2L2 9.5L16 17L30 9.5L16 2Z" fill="#2563EB" />
                  <path d="M2 22.5L16 30L30 22.5V9.5L16 17L2 9.5V22.5Z" fill="#9333EA" />
                </svg>
                <span className="text-xl font-bold text-gray-300">SlideScribe AI</span>
              </div>
              
              <h1 className="text-5xl font-bold mb-8 pb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                Sign in
              </h1>
              
              <div className="w-full bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
                <SignIn 
                  path="/login" 
                  routing="path" 
                  signUpUrl="/signup" 
                  appearance={clerkAppearance}
                />
              </div>
              
             
            </div>
          </div>
          
          {/* Footer removed from this section as logo was moved to top */}
        </div>
        
        {/* Right side - Image gallery */}
        <div className="hidden md:block md:w-1/2 bg-black overflow-hidden relative">
          <div
            ref={galleryRef}
            className="grid grid-cols-3 gap-4 p-4 hover:scale-105 transition-transform duration-300 bg-black"
            style={{ height: '100%', overflow: 'hidden' }}
          >
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className="gallery-image rounded-lg overflow-hidden shadow-md transition-all duration-500 ease-in-out"
                style={{ opacity: 0, transform: 'translateY(50px)' }}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            ))}
          </div>
          
         
        </div>
        
        {/* reCAPTCHA badge */}
        <div className="absolute bottom-4 right-4">
          <div className="bg-white rounded-md shadow-sm p-2 flex items-center text-xs text-gray-500">
            <span>Privacy - Terms</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;