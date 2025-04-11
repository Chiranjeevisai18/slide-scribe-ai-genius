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
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/clerk-react";

const Dashboard = () => {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock presentation data
  const recentPresentations = [
    { 
      id: 1, 
      title: "Business Proposal", 
      slides: 12, 
      lastEdited: "2 hours ago",
      thumbnail: "bg-purple-light" 
    },
    { 
      id: 2, 
      title: "Marketing Strategy", 
      slides: 8, 
      lastEdited: "Yesterday",
      thumbnail: "bg-slideBlue" 
    },
    { 
      id: 3, 
      title: "Quarterly Report", 
      slides: 15, 
      lastEdited: "2 days ago",
      thumbnail: "bg-gray-200" 
    },
  ];
  
  const templates = [
    { 
      id: 1, 
      title: "Business Pitch", 
      category: "Business",
      thumbnail: "bg-purple-light" 
    },
    { 
      id: 2, 
      title: "Marketing Plan", 
      category: "Marketing",
      thumbnail: "bg-slideBlue" 
    },
    { 
      id: 3, 
      title: "Project Update", 
      category: "Project Management",
      thumbnail: "bg-gray-200" 
    },
    { 
      id: 4, 
      title: "Education Slides", 
      category: "Education",
      thumbnail: "bg-orange-100" 
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-gray-600">
              Welcome back, {user?.firstName || "User"}!
            </p>
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
            <Link to="/editor">
              <Button className="bg-purple hover:bg-purple-dark w-full sm:w-auto">
                <Plus size={18} className="mr-2" />
                New Presentation
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Recent Presentations */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Presentations</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {recentPresentations.map((presentation) => (
              <Card key={presentation.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <Link to={`/editor?id=${presentation.id}`}>
                  <div className={`aspect-video ${presentation.thumbnail} flex items-center justify-center`}>
                    <Presentation size={48} className="text-gray-700 opacity-40" />
                  </div>
                </Link>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium mb-1 truncate">{presentation.title}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-3">{presentation.slides} slides</span>
                        <Clock size={14} className="mr-1" />
                        <span>{presentation.lastEdited}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Create new presentation card */}
            <Card className="overflow-hidden border-dashed hover:shadow-md transition-shadow">
              <Link to="/editor" className="block h-full">
                <div className="aspect-video bg-gray-50 flex items-center justify-center">
                  <Plus size={36} className="text-gray-400" />
                </div>
                <CardContent className="p-4 flex items-center justify-center">
                  <span className="text-gray-600 font-medium">Create New Presentation</span>
                </CardContent>
              </Link>
            </Card>
          </div>
        </section>
        
        {/* Template Gallery */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Templates</h2>
            <Link to="/templates">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {templates.map((template) => (
              <Card key={template.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <Link to={`/editor?template=${template.id}`}>
                  <div className={`aspect-video ${template.thumbnail} flex items-center justify-center`}>
                    <Presentation size={48} className="text-gray-700 opacity-40" />
                  </div>
                </Link>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium mb-1">{template.title}</h3>
                      <div className="text-sm text-gray-500">{template.category}</div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Star size={16} className="text-yellow-400" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Dashboard;
