import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Presentation,
  Search,
  Grid3x3,
  List,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

// Template categories
const categories = [
  "All Templates",
  "Business",
  "Marketing",
  "Education",
  "Project Management",
  "Creative",
  "Report",
  "Pitch Deck",
];

// Template data - in a real app this would come from an API
const templateData = [
  {
    id: 1,
    title: "Business Proposal",
    category: "Business",
    slides: 12,
    thumbnail: "bg-purple-light",
  },
  {
    id: 2,
    title: "Marketing Strategy",
    category: "Marketing",
    slides: 10,
    thumbnail: "bg-slideBlue",
  },
  {
    id: 3,
    title: "Quarterly Report",
    category: "Report",
    slides: 15,
    thumbnail: "bg-gray-200",
  },
  {
    id: 4,
    title: "Project Update",
    category: "Project Management",
    slides: 8,
    thumbnail: "bg-orange-100",
  },
  {
    id: 5,
    title: "Creative Portfolio",
    category: "Creative",
    slides: 14,
    thumbnail: "bg-green-100",
  },
  {
    id: 6,
    title: "Educational Course",
    category: "Education",
    slides: 20,
    thumbnail: "bg-yellow-100",
  },
  {
    id: 7,
    title: "Startup Pitch Deck",
    category: "Pitch Deck",
    slides: 12,
    thumbnail: "bg-red-100",
  },
  {
    id: 8,
    title: "Team Introduction",
    category: "Business",
    slides: 6,
    thumbnail: "bg-blue-100",
  },
];

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Templates");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter templates based on search and category
  const filteredTemplates = templateData.filter((template) => {
    const matchesSearch = template.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Templates" ||
      template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Presentation Templates</h1>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
            >
              <Grid3x3 size={16} />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
              aria-label="List view"
            >
              <List size={16} />
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="mb-6">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  type="text"
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <h2 className="font-semibold mb-3">Categories</h2>
            <div className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    selectedCategory === category
                      ? "bg-purple-light text-purple-dark font-medium"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Templates Grid/List */}
          <div className="w-full lg:w-3/4">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className="overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <Link to={`/editor?template=${template.id}`}>
                      <div
                        className={`aspect-video ${template.thumbnail} flex items-center justify-center`}
                      >
                        <Presentation
                          size={48}
                          className="text-gray-700 opacity-40"
                        />
                      </div>
                    </Link>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium mb-1">{template.title}</h3>
                          <div className="flex items-center text-sm text-gray-500">
                            <span>{template.category}</span>
                            <span className="mx-2">•</span>
                            <span>{template.slides} slides</span>
                          </div>
                        </div>
                        <Link to={`/editor?template=${template.id}`}>
                          <Button size="sm" className="bg-purple hover:bg-purple-dark">
                            Use
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className="overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center p-4">
                      <div
                        className={`h-16 w-28 ${template.thumbnail} flex items-center justify-center rounded-md mr-4`}
                      >
                        <Presentation
                          size={24}
                          className="text-gray-700 opacity-40"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium">{template.title}</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>{template.category}</span>
                          <span className="mx-2">•</span>
                          <span>{template.slides} slides</span>
                        </div>
                      </div>
                      <Link to={`/editor?template=${template.id}`}>
                        <Button className="bg-purple hover:bg-purple-dark">
                          Use Template
                          <ChevronRight size={16} className="ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {filteredTemplates.length === 0 && (
              <div className="text-center py-12">
                <div className="mb-4">
                  <Presentation
                    size={48}
                    className="text-gray-300 mx-auto"
                  />
                </div>
                <h3 className="text-xl font-medium mb-2">No templates found</h3>
                <p className="text-gray-500">
                  Try adjusting your search or category filter
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Templates;
