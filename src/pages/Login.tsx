
import { useState } from "react";
import { SignIn } from "@clerk/clerk-react";
import { Layout } from "@/components/layout/Layout";
import { Sparkles } from "lucide-react";

const Login = () => {
  const [view, setView] = useState<"signIn" | "signUp">("signIn");
  
  return (
    <Layout showSidebar={false}>
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left side - Hero section */}
        <div className="flex-1 bg-purple p-8 flex flex-col justify-center items-center text-white">
          <div className="max-w-md text-center animate-slide-in">
            <div className="flex justify-center mb-6">
              <Sparkles size={48} />
            </div>
            <h1 className="text-4xl font-bold mb-6">SlideScribe AI</h1>
            <p className="text-xl mb-8">
              Transform your ideas into professional presentations with the power of AI
            </p>
            <div className="space-y-4 text-left bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="flex items-start">
                <div className="bg-white/20 p-1 rounded mr-3 mt-1">
                  <Sparkles size={16} />
                </div>
                <p>Input from text, voice, CSV files, images, or web articles</p>
              </div>
              <div className="flex items-start">
                <div className="bg-white/20 p-1 rounded mr-3 mt-1">
                  <Sparkles size={16} />
                </div>
                <p>AI-generated slides with beautiful layouts</p>
              </div>
              <div className="flex items-start">
                <div className="bg-white/20 p-1 rounded mr-3 mt-1">
                  <Sparkles size={16} />
                </div>
                <p>Export to PowerPoint or PDF in seconds</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - Auth form */}
        <div className="flex-1 p-8 flex justify-center items-center">
          <div className="w-full max-w-md">
            <SignIn path="/login" routing="path" signUpUrl="/login" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
