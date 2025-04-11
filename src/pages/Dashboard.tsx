
import { useState } from "react";
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
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/clerk-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CreatePresentationModal } from "@/components/dashboard/CreatePresentationModal";
import { RecentPresentations } from "@/components/dashboard/RecentPresentations";

const Dashboard = () => {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Feature cards for creation methods
  const creationMethods = [
    { 
      id: 1, 
      title: "Text to Slides", 
      description: "Convert text into professional slides.",
      icon: <FileText className="h-8 w-8 text-purple" />,
      action: () => setShowCreateModal(true)
    },
    { 
      id: 2, 
      title: "Voice to Slides", 
      description: "Record or upload voice to generate slides.",
      icon: <Mic className="h-8 w-8 text-purple" />,
      action: () => setShowCreateModal(true)
    },
    { 
      id: 3, 
      title: "Image to Slides", 
      description: "Extract text from images for presentations.",
      icon: <Image className="h-8 w-8 text-purple" />,
      action: () => setShowCreateModal(true)
    },
    { 
      id: 4, 
      title: "Web to Slides", 
      description: "Turn web articles into organized slides.",
      icon: <Globe className="h-8 w-8 text-purple" />,
      action: () => setShowCreateModal(true)
    },
    { 
      id: 5, 
      title: "Import Existing", 
      description: "Upload an existing presentation to enhance.",
      icon: <Upload className="h-8 w-8 text-purple" />,
      action: () => setShowCreateModal(true)
    },
    { 
      id: 6, 
      title: "Start from Template", 
      description: "Choose from our template gallery.",
      icon: <PanelRight className="h-8 w-8 text-purple" />,
      to: "/templates"
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto p-6">
        {/* Welcome Hero */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.firstName || "there"}!</h1>
              <p className="text-gray-600 mb-4">
                Create AI-powered presentations from text, voice, images, and more.
              </p>
              <Link to="/editor">
                <Button className="bg-purple hover:bg-purple-dark">
                  <Plus size={18} className="mr-2" />
                  New Presentation
                </Button>
              </Link>
            </div>
            <div className="mt-4 md:mt-0 w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="text"
                  placeholder="Search presentations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Creation Methods */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Create a Presentation</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {creationMethods.map((method) => (
              <Card 
                key={method.id} 
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={method.action}
              >
                <CardHeader className="pb-2">
                  <div className="bg-purple-light inline-block p-3 rounded-lg mb-2">
                    {method.icon}
                  </div>
                  <CardTitle className="text-lg">{method.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{method.description}</p>
                </CardContent>
                <CardFooter>
                  {method.to ? (
                    <Link to={method.to} className="text-purple font-medium flex items-center">
                      Explore Templates <MoreHorizontal size={16} className="ml-1" />
                    </Link>
                  ) : (
                    <Button 
                      variant="ghost" 
                      className="text-purple p-0 hover:bg-transparent hover:text-purple-dark"
                      onClick={method.action}
                    >
                      Start Creating <MoreHorizontal size={16} className="ml-1" />
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Recent Presentations */}
        <RecentPresentations searchTerm={searchTerm} />
        
        {/* Create Presentation Modal */}
        <CreatePresentationModal 
          open={showCreateModal} 
          onOpenChange={setShowCreateModal} 
        />
      </div>
    </Layout>
  );
};

export default Dashboard;
