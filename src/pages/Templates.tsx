import React, { useEffect, useState } from "react";

interface Template {
  id: string;
  name: string;
  category: string;
  slideCount: number;
}

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

const Templates: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Templates");
  const [templates, setTemplates] = useState<Template[]>([]);

  const API_KEY = "AIzaSyDogyHcYK-TDO6gIBU9kh6GWI6lS4wQNHs";
  const DRIVE_API_URL = `https://www.googleapis.com/drive/v3/files?q=mimeType='application/vnd.google-apps.presentation'&fields=files(id,name)&key=${API_KEY}`;

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch(DRIVE_API_URL);
        const data = await response.json();

        if (!data.files) {
          console.error("No files returned:", data);
          return;
        }

        const files: Template[] = data.files.map((file: any) => ({
          id: file.id,
          name: file.name,
          category: "Presentation",
          slideCount: Math.floor(Math.random() * 15 + 5), // Placeholder count
        }));

        setTemplates(files);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchTemplates();
  }, []);

  const filteredTemplates =
    selectedCategory === "All Templates"
      ? templates
      : templates.filter((t) => t.category === selectedCategory);

  return (
    <div className="flex p-6 bg-white min-h-screen">
      {/* Sidebar */}
      <div className="w-1/5 pr-6">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <ul>
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`cursor-pointer px-3 py-2 rounded-md mb-1 hover:bg-purple-100 ${
                selectedCategory === category ? "bg-purple-200 font-semibold" : ""
              }`}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Templates Grid */}
      <div className="w-4/5">
        <h1 className="text-3xl font-bold mb-6">Presentation Templates</h1>
        <div className="grid grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition duration-300"
            >
              <div className="w-full h-32 bg-purple-100 flex items-center justify-center rounded-md mb-3">
                <svg
                  className="w-12 h-12 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4h16v12H4zM4 16h16M12 16v4"
                  />
                </svg>
              </div>
              <div className="mb-2 font-semibold text-lg">{template.name}</div>
              <div className="text-sm text-gray-600 mb-2">
                {template.category} • {template.slideCount} slides
              </div>
              <a
                href={`https://docs.google.com/presentation/d/${template.id}/edit`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-purple-500 text-white text-sm px-4 py-1 rounded-md hover:bg-purple-600"
              >
                Use
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Templates;
