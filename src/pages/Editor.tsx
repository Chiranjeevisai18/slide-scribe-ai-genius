import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Mic, 
  Table, 
  Image, 
  Globe, 
  ChevronRight, 
  Download, 
  Presentation,
  Settings,
  Trash,
  Plus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

type InputType = "text" | "voice" | "csv" | "image" | "url";
type Slide = {
  id: number;
  title: string;
  bullets: string[];
  type: "title" | "bullets" | "image" | "chart";
};

const DUMMY_SLIDES: Slide[] = [
  {
    id: 1,
    title: "Digital Transformation",
    bullets: [],
    type: "title"
  },
  {
    id: 2,
    title: "Why Digital Transformation Matters",
    bullets: [
      "Streamlines business operations and reduces costs",
      "Enhances customer experiences and satisfaction",
      "Drives innovation and creates new business opportunities",
      "Provides competitive advantage in the market"
    ],
    type: "bullets"
  },
  {
    id: 3,
    title: "Key Implementation Steps",
    bullets: [
      "Assess current digital capabilities",
      "Develop a comprehensive strategy",
      "Build necessary technical infrastructure",
      "Train employees on new technologies",
      "Monitor progress and iterate"
    ],
    type: "bullets"
  }
];

const Editor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [inputType, setInputType] = useState<InputType>("text");
  const [textInput, setTextInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  
  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      setSlides(DUMMY_SLIDES);
      setShowPreview(true);
      setIsGenerating(false);
      
      toast({
        title: "Presentation generated!",
        description: "Your slides have been created successfully.",
      });
    }, 2000);
  };
  
  const handleExport = (format: "pptx" | "pdf") => {
    toast({
      title: `Exporting as ${format.toUpperCase()}`,
      description: "Your presentation will be downloaded shortly.",
    });
    
    // In a real app, this would trigger the actual export
    setTimeout(() => {
      toast({
        title: "Export complete!",
        description: `Your ${format.toUpperCase()} file has been downloaded.`,
      });
    }, 1500);
  };
  
  const handleSave = () => {
    toast({
      title: "Presentation saved!",
      description: "Your changes have been saved successfully.",
    });
    
    navigate("/dashboard");
  };
  
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      toast({
        title: "Recording started",
        description: "Speak clearly into your microphone.",
      });
    } else {
      toast({
        title: "Recording stopped",
        description: "Your speech is being processed.",
      });
      
      // Simulate speech processing
      setTimeout(() => {
        setTextInput("This is the transcribed text from your speech. In a real implementation, this would contain the actual transcription of what you said.");
      }, 1000);
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: "csv" | "image") => {
    const file = event.target.files?.[0];
    if (file) {
      if (type === "csv") {
        setCsvFile(file);
      } else {
        setImageFile(file);
      }
      
      toast({
        title: "File uploaded",
        description: `Your ${type.toUpperCase()} file has been uploaded.`,
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Input Panel */}
          {!showPreview && (
            <div className="w-full lg:w-7/12">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Create Presentation</h1>
                <Button 
                  onClick={handleGenerate} 
                  className="bg-purple hover:bg-purple-dark"
                  disabled={isGenerating}
                >
                  {isGenerating ? "Generating..." : "Generate Slides"}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              
              <Tabs defaultValue="text" className="mb-6" onValueChange={(value) => setInputType(value as InputType)}>
                <TabsList className="grid grid-cols-5">
                  <TabsTrigger value="text" className="flex gap-2 items-center">
                    <FileText size={16} />
                    <span className="hidden sm:inline">Text</span>
                  </TabsTrigger>
                  <TabsTrigger value="voice" className="flex gap-2 items-center">
                    <Mic size={16} />
                    <span className="hidden sm:inline">Voice</span>
                  </TabsTrigger>
                  <TabsTrigger value="csv" className="flex gap-2 items-center">
                    <Table size={16} />
                    <span className="hidden sm:inline">CSV</span>
                  </TabsTrigger>
                  <TabsTrigger value="image" className="flex gap-2 items-center">
                    <Image size={16} />
                    <span className="hidden sm:inline">Image</span>
                  </TabsTrigger>
                  <TabsTrigger value="url" className="flex gap-2 items-center">
                    <Globe size={16} />
                    <span className="hidden sm:inline">URL</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="text" className="py-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="presentation-title">Presentation Title</Label>
                      <Input
                        id="presentation-title" 
                        placeholder="Enter presentation title" 
                        className="mb-4"
                      />
                    </div>
                    <div>
                      <Label htmlFor="presentation-content">Content</Label>
                      <Textarea
                        id="presentation-content" 
                        placeholder="Enter your presentation content here. The AI will structure it into slides."
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        className="min-h-[300px]"
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="voice" className="py-4">
                  <div className="text-center space-y-6 py-8">
                    <div className="p-6 rounded-full bg-purple-light inline-block">
                      <Mic size={48} className={`${isRecording ? "text-red-500 animate-pulse" : "text-purple"}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">
                        {isRecording ? "Recording in progress..." : "Record Your Speech"}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {isRecording 
                          ? "Speak clearly. Recording will automatically stop after 2 minutes of silence." 
                          : "Click the button below to start recording your presentation content."}
                      </p>
                      <Button 
                        onClick={toggleRecording}
                        className={isRecording ? "bg-red-500 hover:bg-red-600" : "bg-purple hover:bg-purple-dark"}
                      >
                        {isRecording ? "Stop Recording" : "Start Recording"}
                      </Button>
                    </div>
                    
                    {textInput && (
                      <div className="mt-8 text-left p-4 bg-gray-50 rounded-lg border">
                        <h4 className="font-medium mb-2">Transcribed Text:</h4>
                        <p className="text-gray-700">{textInput}</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="csv" className="py-4">
                  <div className="text-center space-y-6 py-8">
                    <div className="p-6 rounded-full bg-purple-light inline-block">
                      <Table size={48} className="text-purple" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">Upload CSV Data</h3>
                      <p className="text-gray-600 mb-6">
                        Upload a CSV file to generate data-driven slides with charts and visualizations.
                      </p>
                      <div className="flex justify-center">
                        <label className="cursor-pointer">
                          <Input
                            type="file"
                            accept=".csv"
                            className="hidden"
                            onChange={(e) => handleFileChange(e, "csv")}
                          />
                          <div className="bg-purple hover:bg-purple-dark text-white font-medium py-2 px-4 rounded-md flex items-center">
                            Choose CSV File
                          </div>
                        </label>
                      </div>
                      {csvFile && (
                        <p className="mt-4 text-green-600">
                          Uploaded: {csvFile.name}
                        </p>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="image" className="py-4">
                  <div className="text-center space-y-6 py-8">
                    <div className="p-6 rounded-full bg-purple-light inline-block">
                      <Image size={48} className="text-purple" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">Upload Image with Text</h3>
                      <p className="text-gray-600 mb-6">
                        Upload an image containing text (like a document scan, whiteboard, or screenshot). The AI will extract the text and create slides.
                      </p>
                      <div className="flex justify-center">
                        <label className="cursor-pointer">
                          <Input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileChange(e, "image")}
                          />
                          <div className="bg-purple hover:bg-purple-dark text-white font-medium py-2 px-4 rounded-md flex items-center">
                            Choose Image
                          </div>
                        </label>
                      </div>
                      {imageFile && (
                        <p className="mt-4 text-green-600">
                          Uploaded: {imageFile.name}
                        </p>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="url" className="py-4">
                  <div className="space-y-6 py-4">
                    <div>
                      <Label htmlFor="article-url">Web Article URL</Label>
                      <Input
                        id="article-url"
                        type="url"
                        placeholder="https://example.com/article"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        className="mb-2"
                      />
                      <p className="text-sm text-gray-500">
                        Enter the URL of a web article or blog post to extract content.
                      </p>
                    </div>
                    
                    <Button
                      onClick={() => {
                        if (urlInput) {
                          toast({
                            title: "Processing URL",
                            description: "Extracting content from the provided URL...",
                          });
                          
                          // Simulate processing
                          setTimeout(() => {
                            setTextInput("This is the extracted content from the web article. In a real implementation, this would contain the actual extracted text from the URL.");
                            
                            toast({
                              title: "Content extracted!",
                              description: "The article has been processed successfully.",
                            });
                          }, 1500);
                        }
                      }}
                      disabled={!urlInput}
                      className="bg-purple hover:bg-purple-dark"
                    >
                      Extract Content
                    </Button>
                    
                    {textInput && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                        <h4 className="font-medium mb-2">Extracted Content:</h4>
                        <p className="text-gray-700">{textInput}</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
          
          {/* Preview Panel */}
          {showPreview && (
            <div className="w-full">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Presentation Preview</h1>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowPreview(false)}
                  >
                    Back to Editor
                  </Button>
                  <div className="relative group">
                    <Button className="bg-purple hover:bg-purple-dark">
                      <Download size={16} className="mr-2" />
                      Export
                    </Button>
                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border overflow-hidden z-10 hidden group-hover:block">
                      <button
                        onClick={() => handleExport("pptx")}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
                      >
                        PowerPoint (.pptx)
                      </button>
                      <button
                        onClick={() => handleExport("pdf")}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
                      >
                        PDF (.pdf)
                      </button>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {slides.map((slide, index) => (
                  <Card key={slide.id} className="overflow-hidden">
                    <div className="bg-gray-100 p-3 flex justify-between items-center border-b">
                      <div className="flex items-center">
                        <Presentation size={16} className="mr-2" />
                        <span className="font-medium">Slide {index + 1}</span>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Settings size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                          <Trash size={16} />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-0">
                      <div className="slide">
                        <div className="slide-content bg-white">
                          <h2 className="slide-title font-bold text-gray-900">{slide.title}</h2>
                          {slide.bullets.length > 0 && (
                            <ul className="slide-bullets list-disc pl-6 space-y-2">
                              {slide.bullets.map((bullet, i) => (
                                <li key={i}>{bullet}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {/* Add slide button */}
                <Button 
                  variant="outline" 
                  className="border-dashed h-16 flex items-center justify-center gap-2"
                >
                  <Plus size={18} />
                  Add New Slide
                </Button>
              </div>
            </div>
          )}
          
          {/* Right Panel - Settings or Templates */}
          {!showPreview && (
            <div className="w-full lg:w-5/12">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Presentation Settings</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="slide-template">Slide Template</Label>
                      <select 
                        id="slide-template" 
                        className="w-full p-2 border rounded-md mt-1"
                      >
                        <option value="professional">Professional</option>
                        <option value="creative">Creative</option>
                        <option value="minimal">Minimal</option>
                        <option value="corporate">Corporate</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="color-scheme">Color Scheme</Label>
                      <select 
                        id="color-scheme" 
                        className="w-full p-2 border rounded-md mt-1"
                      >
                        <option value="purple">Purple Theme</option>
                        <option value="blue">Blue Theme</option>
                        <option value="green">Green Theme</option>
                        <option value="orange">Orange Theme</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="transition">Transition Style</Label>
                      <select 
                        id="transition" 
                        className="w-full p-2 border rounded-md mt-1"
                      >
                        <option value="fade">Fade</option>
                        <option value="slide">Slide</option>
                        <option value="zoom">Zoom</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center gap-2 py-2">
                      <input type="checkbox" id="auto-images" className="h-4 w-4" />
                      <Label htmlFor="auto-images">Auto-insert relevant images</Label>
                    </div>
                    
                    <div className="flex items-center gap-2 py-2">
                      <input type="checkbox" id="auto-chart" className="h-4 w-4" />
                      <Label htmlFor="auto-chart">Generate charts from data</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">AI Assistant</h2>
                  <p className="text-gray-600 mb-4">
                    Let our AI suggest improvements to your content or answer questions about creating effective presentations.
                  </p>
                  
                  <div className="relative">
                    <Input
                      placeholder="Ask the AI assistant a question..."
                      className="pr-24"
                    />
                    <Button 
                      className="absolute right-0 top-0 bg-purple hover:bg-purple-dark rounded-l-none"
                    >
                      Ask AI
                    </Button>
                  </div>
                  
                  <div className="mt-4 text-sm text-gray-500">
                    Example: "How can I make my introduction more engaging?"
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Editor;
