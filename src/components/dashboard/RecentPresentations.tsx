
import { Link } from "react-router-dom";
import { Presentation, Clock, MoreHorizontal, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface RecentPresentationsProps {
  searchTerm: string;
}

export function RecentPresentations({ searchTerm }: RecentPresentationsProps) {
  // Mock presentation data - in a real app, this would come from an API call
  const [presentations, setPresentations] = useState([
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
  ]);

  // Filter presentations based on search term
  const filteredPresentations = presentations.filter(presentation =>
    presentation.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setPresentations(presentations.filter(p => p.id !== id));
    toast({
      title: "Presentation deleted",
      description: "Your presentation has been successfully deleted.",
    });
  };

  const handleDuplicate = (presentation: typeof presentations[0]) => {
    const newPresentation = {
      ...presentation,
      id: Math.max(...presentations.map(p => p.id)) + 1,
      title: `${presentation.title} (Copy)`,
      lastEdited: "Just now"
    };
    setPresentations([newPresentation, ...presentations]);
    toast({
      title: "Presentation duplicated",
      description: "Your presentation has been successfully duplicated.",
    });
  };

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recent Presentations</h2>
        <Link to="/editor">
          <Button variant="outline" size="sm">
            <Plus size={16} className="mr-1" /> New
          </Button>
        </Link>
      </div>
      
      {filteredPresentations.length === 0 ? (
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-8 text-center">
          <Presentation size={48} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No presentations found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm ? `No results for "${searchTerm}"` : "You haven't created any presentations yet"}
          </p>
          <Link to="/editor">
            <Button className="bg-purple hover:bg-purple-dark">
              <Plus size={18} className="mr-2" />
              Create Your First Presentation
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredPresentations.map((presentation) => (
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        onClick={() => handleDuplicate(presentation)}
                      >
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-500"
                        onClick={() => handleDelete(presentation.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
      )}
    </section>
  );
}
