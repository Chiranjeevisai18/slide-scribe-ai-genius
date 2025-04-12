import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GoogleGenerativeAI } from '@google/generative-ai';
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
  Plus,
  Loader2
} from "lucide-react";
import html2pdf from "html2pdf.js";
import ReactMarkdown from 'react-markdown';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { getTopicImages } from '@/services/unsplash';
import { generateSlideContent, getAIAssistantSuggestions } from '@/services/gemini';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { saveAs } from "file-saver";
import PptxGenJS from "pptxgenjs";
import jsPDF from "jspdf";
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash', // FREE tier-supported fast model
});
type InputType = "text" | "voice" | "csv" | "image" | "url";
type Slide = {
  id: number;
  title: string;
  bullets: string[];
  type: "title" | "bullets" | "image" | "chart";
  image?:string;
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
  const [aiResponse, setAiResponse] = useState<string>("");
  const [aiQuestion, setAiQuestion] = useState<string>("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [presentationTitle, setPresentationTitle] = useState("");
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);


  interface SlideContent {
    title: string;
    content: string[];
    imagePrompt: string;
    slideType?: "title" | "bullets" | "split" | "quote" | "image-focus";
  }
  
  const handleGenerate = async () => {
    if (!presentationTitle.trim()) {
      toast({
        title: "Error",
        description: "Please enter a presentation title",
        variant: "destructive"
      });
      return;
    }
  
    setIsGenerating(true);
    try {
      // 1. Generate slide content using Gemini
      const generatedContent = await generateSlideContent(presentationTitle, textInput);
  
      // 2. Transform content into slides and generate relevant images
      const newSlides = await Promise.all(generatedContent.map(async (content, index) => {
        try {
          // Step A: Generate descriptive keywords using Gemini
          const keywordPrompt = await model.generateContent(
            `You are an expert at generating highly relevant image search keywords. 
            Based on the slide titled "${content.title}" and its key bullet points: ${content.content.join(', ')}, 
            generate the 5 to 7 most relevant and visually descriptive keywords that could return ideal images representing this slide. 
            Focus mainly on the title but enhance it using the bullet points. 
            Return only the keywords, comma-separated, with no extra text.`
          );
  
          const keywordQuery = keywordPrompt.response.text().trim().replace(/\n/g, '');
          console.log(`🔍 [${index}] Image keywords:`, keywordQuery);
  
          // Step B: Fetch image using Unsplash API
          const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
          const imageResponse = await fetch(
            `https://api.unsplash.com/search/photos?query=${encodeURIComponent(keywordQuery)}&client_id=${accessKey}&per_page=1&orientation=landscape&content_filter=high&order_by=relevant`
          );
          const imageData = await imageResponse.json();
  
          const imageUrl = imageData.results?.[0]?.urls?.regular;
  
          return {
            id: index + 1,
            title: content.title,
            bullets: content.content,
            type: content.slideType || (index === 0 ? "title" : "bullets"),
            image: imageUrl || undefined
          };
        } catch (imageError) {
          console.error(`❌ Image fetch failed for slide ${index}:`, imageError);
          return {
            id: index + 1,
            title: content.title,
            bullets: content.content,
            type: content.slideType || (index === 0 ? "title" : "bullets")
          };
        }
      }));
  
      // 3. Set slides and show preview
      setSlides(newSlides as Slide[]);
      setShowPreview(true);
  
      toast({
        title: "Presentation generated!",
        description: "Your AI-powered slides have been created successfully.",
      });
    } catch (error) {
      console.error('❌ Generation error:', error);
      toast({
        title: "Generation failed",
        description: "Failed to generate presentation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExport = async (format: "pptx" | "pdf") => {
    const title = "The Evolution of the Human Era";
    const points = [
      "A journey through the key stages of human development.",
      "Exploring technological advancements, societal structures, and environmental impact.",
    ];
    const imageUrl = "/image.png"; // Ensure this path is accessible in your `public` folder or use FileReader if uploaded
  
    const imageBlob = await fetch(imageUrl).then(res => res.blob());
    const imageBase64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(imageBlob);
    });
  
    if (format === "pptx") {
      const pptx = new PptxGenJS();
      const slide = pptx.addSlide();
  
      slide.addText(title, { x: 0.5, y: 0.5, fontSize: 24, bold: true });
      slide.addText(points.map(pt => `• ${pt}`).join("\n"), {
        x: 0.5, y: 1.3, fontSize: 18, color: "363636",
      });
  
      // Image with max dimensions
      slide.addImage({
        data: imageBase64,
        x: 0.5,
        y: 3,
        w: 6,
        h: 3.5,
      });
  
      pptx.writeFile({ fileName: "presentation.pptx" });
    } else if (format === "pdf") {
      const pdf = new jsPDF();
      pdf.setFontSize(16);
      pdf.setFont("helvetica", "bold");
      pdf.text(title, 20, 30);
  
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "normal");
      points.forEach((pt, i) => {
        pdf.text(`• ${pt}`, 20, 45 + i * 10);
      });

      // Create image element and convert base64 to Image object
      const img = document.createElement('img');
      img.src = imageBase64;
      img.onload = () => {
        pdf.addImage(img, "PNG", 20, 70, 160, 90); // Scale image appropriately
        pdf.save("presentation.pdf");
      };
    }
  };
 
  <div className="relative group">
    <button className="bg-purple-500 text-white px-4 py-2 rounded-md shadow hover:bg-purple-600 transition-colors">
      Export
    </button>
  
    <div className="absolute right-0 mt-2 w-64 bg-white border shadow-lg rounded-md z-10 hidden group-hover:block">
      <button
        onClick={() => handleExport("pptx")}
        className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
      >
        Download as PowerPoint (.pptx)
      </button>
      <button
        onClick={() => handleExport("pdf")}
        className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
      >
        Download as PDF (.pdf)
      </button>
    </div>
  </div>

  
  const handleSave = () => {
    toast({
      title: "Presentation saved!",
      description: "Your changes have been saved successfully.",
    });
    
    navigate("/dashboard");
  };
  
// Initialize speech recognition at component level
interface SpeechRecognition {
  onerror: (event: any) => void;
  continuous: boolean;
  interimResults: boolean;
  onstart: () => void;
  onresult: (event: any) => void;
  start: () => void;
  stop: () => void;
}

interface SpeechRecognitionConstructor {
  new(): SpeechRecognition;
}

const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
let recognition: SpeechRecognition | null = null;

// Try to create a speech recognition instance  
try {
  recognition = SpeechRecognition ? new SpeechRecognition() : null;
  if (recognition) {
    recognition.continuous = true;
    recognition.interimResults = true;
  }
} catch (e) {
  console.error("Speech recognition not supported in this browser");
}

// State for storing transcript
const [transcript, setTranscript] = useState<string>("");

const toggleRecording = () => {
  setIsRecording(!isRecording);
  
  if (!isRecording) {
    // Start recording
    if (!recognition) {
      toast({
        title: "Speech recognition not supported",
        description: "Your browser doesn't support voice recording. Please try another browser.",
        variant: "destructive"
      });
      setIsRecording(false);
      return;
    }
    
    // Clear previous transcript
    setTranscript("");
    
    // Set up recognition event handlers
    recognition.onstart = () => {
      toast({
        title: "Recording started",
        description: "Speak clearly into your microphone.",
      });
    };
    
    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }
      
      // Update text input with the transcript as it comes in
      setTranscript(prev => prev + finalTranscript);
      setTextInput(prev => prev + finalTranscript);
    };
    
    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      toast({
        title: "Recording error",
        description: `Error: ${event.error}. Please try again.`,
        variant: "destructive"
      });
      setIsRecording(false);
    };
    
    // Start recognition
    try {
      recognition.start();
    } catch (e) {
      console.error("Error starting speech recognition", e);
      toast({
        title: "Recording error",
        description: "Failed to start recording. Please try again.",
        variant: "destructive"
      });
      setIsRecording(false);
    }
  } else {
    // Stop recording
    if (recognition) {
      recognition.stop();
      toast({
        title: "Recording stopped",
        description: "Processing your speech...",
      });
      
      // Process the transcript and generate presentation
      processVoiceInput();
    }
  }
};

// Process the voice input and generate presentation
const processVoiceInput = async () => {
  if (!transcript.trim()) {
    toast({
      title: "Empty recording",
      description: "No speech was detected. Please try again.",
      variant: "destructive"
    });
    return;
  }
  
  // Extract presentation title from transcript or prompt for one
  let extractedTitle = "";
  
  try {
    // First, ask Gemini to extract a title from the transcript

   
    
    try {
      const titleResponse = await model.generateContent(
        `Extract a brief, engaging presentation title from this transcript: "${transcript}". 
        Return ONLY the title, no additional text or formatting.`
      );
    
      let extractedTitle = titleResponse.response.text().trim();
    
      // If no title set from the extraction, use a default
      if (!extractedTitle) {
        extractedTitle = "Voice-Generated Presentation";
      }
    
      // Update the presentation title
      setPresentationTitle(extractedTitle);
    
      toast({
        title: "Generating presentation",
        description: "Creating slides based on your speech...",
      });
    
      setIsGenerating(true);
    
      try {
        // Generate content using Gemini
        const generatedContent = await generateSlideContent(extractedTitle, transcript);
    
        // Fallback keyword map (optional)
        const fallbackKeywords: Record<string, string> = {
          "AI": "artificial intelligence, neural networks, futuristic tech",
          "Climate": "climate change, earth, global warming, sustainability",
          "Business": "business meeting, finance, corporate, growth strategy",
          // Add more keywords for known domains
        };
    
        // Generate enhanced slides with improved image prompts
        const newSlides = await Promise.all(generatedContent.map(async (content, index) => {
          try {
            // 1. Generate search-friendly keywords using GPT
            const keywordPrompt = await model.generateContent(
              `You are an expert at generating highly relevant image search keywords. 
              Based on the slide titled "${content.title}" and its key bullet points: ${content.content.join(', ')}, 
              generate the 5 to 7 most relevant and visually descriptive keywords that could return ideal images representing this slide. 
              Focus mainly on the title but enhance it using the bullet points. 
              Return only the keywords, comma-separated, with no extra text.`
            );
            
            const keywordQuery = keywordPrompt.response.text().trim().replace(/\n/g, '');
            console.log("🔍 Image Search Keywords:", keywordQuery);
        
            // 2. Construct Unsplash API URL with keywords
            const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
        
            const response = await fetch(
              `https://api.unsplash.com/search/photos?query=${encodeURIComponent(keywordQuery)}&client_id=${accessKey}&per_page=1&orientation=landscape&content_filter=high&order_by=relevant`
            );
            
        
            const data = await response.json();
            console.log(data);
            // 3. Handle case when no image found
            if (!data.results || data.results.length === 0) {
              throw new Error("No relevant images found");
            }
        
            // 4. Pick the first image (you can add logic to rank them later)
            const bestImage = data.results[0].urls?.regular;
            console.log(bestImage);
            // 5. Return the completed slide
            return {
              id: index + 1,
              title: content.title,
              bullets: content.content,
              type: content.slideType || (index === 0 ? "title" : "bullets"),
              image: bestImage
            };
        
          } catch (imageError) {
            console.error('❌ Image fetch error:', {
              error: imageError.message,
              fallback: `${content.title} ${content.content.join(' ')}`
            });
        
            // Return fallback slide without image
            return {
              id: index + 1,
              title: content.title,
              bullets: content.content,
              type: content.slideType || (index === 0 ? "title" : "bullets"),
              image: null // Or a default placeholder image URL
            };
          }
          
        }));
    
        setSlides(newSlides as Slide[]);
        setShowPreview(true);
    
        toast({
          title: "Presentation generated!",
          description: "Your voice-powered slides have been created successfully.",
        });
      } catch (error) {
        console.error('Generation error:', error);
        toast({
          title: "Generation failed",
          description: "Failed to generate presentation. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsGenerating(false);
      }
    } catch (error) {
      console.error('Error processing voice input:', error);
      toast({
        title: "Processing error",
        description: "Failed to process your speech. Please try again or type manually.",
        variant: "destructive"
      });
    }
    
  }catch (error) {
    console.error('Error fetching images:', error);
    return []; // Return an empty array so the slide can still render without image
  }  
} 
  
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

  const handleAIAssistant = async () => {
    if (!aiQuestion.trim()) {
      toast({
        title: "Error",
        description: "Please enter a question first",
        variant: "destructive"
      });
      return;
    }

    setIsAiLoading(true);
    try {
      const suggestion = await getAIAssistantSuggestions(aiQuestion);
      setAiResponse(suggestion);
      
      toast({
        title: "AI Response Received",
        description: "Got suggestions from AI assistant!",
      });
    } catch (error) {
      console.error('AI Assistant error:', error);
      toast({
        title: "Error",
        description: "Failed to get AI suggestions. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAiLoading(false);
    }
  };

  const renderSlideContent = (slide: Slide) => (
    <div className="slide-content bg-white p-6">
      <h2 className="slide-title font-bold text-gray-900 mb-4">{slide.title}</h2>
      
      {slide.image && (
        <div className="mb-4 relative aspect-video">
          <img 
            src={slide.image} 
            alt={slide.image}
            className="rounded-lg object-cover w-full h-full"
          />
         
        </div>
      )}
      
      {slide.bullets.length > 0 && (
        <ul className="slide-bullets list-disc pl-6 space-y-2">
          {slide.bullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
      )}
    </div>
  );

  const renderAIAssistantCard = () => (
    <>
      <div className="flex flex-col space-y-6">
        {/* AI Assistant Box */}
        <div className="rounded-md p-4 border border-purple/20 shadow-sm bg-purple/5">
          <h3 className="font-semibold text-purple mb-2">👋 Need help?</h3>
          <p className="text-sm text-gray-600">
            Use the AI Assistant to improve your content, suggest slide titles, or add interesting points.
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-500 text-sm">
            <li>Suggest slide outlines</li>
            <li>Fix grammar or improve clarity</li>
            <li>Make content more engaging</li>
          </ul>
          <Button
            className="mt-4 w-full bg-purple text-white hover:bg-purple-dark"
            onClick={() => setAiDialogOpen(true)}
          >
            🚀 Launch AI Assistant
          </Button>
        </div>
  
        {/* AI Assistant Dialog */}
        <Dialog open={aiDialogOpen} onOpenChange={setAiDialogOpen}>
          <DialogTrigger asChild>
            <div className="fixed bottom-4 right-4 z-50">
              <Button
                variant="ghost"
                className="bg-purple text-white rounded-full w-12 h-12 shadow-lg hover:bg-purple-dark"
              >
                ?
              </Button>
            </div>
          </DialogTrigger>
  
          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-purple">
                AI Assistant
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                Ask anything to improve your presentation content.
              </DialogDescription>
            </DialogHeader>
  
            <div className="space-y-4 mt-4">
              <div className="relative">
                <Input
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  placeholder="Ask the AI assistant a question..."
                  className="pr-24"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !isAiLoading) {
                      e.preventDefault();
                      handleAIAssistant();
                    }
                  }}
                />
                <Button
                  className="absolute right-0 top-0 bg-purple hover:bg-purple-dark rounded-l-none"
                  onClick={handleAIAssistant}
                  disabled={isAiLoading}
                >
                  {isAiLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>Ask AI</>
                  )}
                </Button>
              </div>
  
              {aiResponse ? (
                <div className="mt-4 p-4 bg-gray-100 rounded-md border prose prose-sm max-w-none whitespace-pre-wrap">
                  <h4 className="font-medium mb-2 text-purple">AI Suggestion:</h4>
                  <div className="prose dark:prose-invert max-w-none">
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <p className="mb-2">{children}</p>,
                      }}
                    >
                      {aiResponse}
                    </ReactMarkdown>
                  </div>
                </div>
              ) : (
                <div className="text-center text-sm text-gray-500 mt-6">
                  🤖 Ask a question above to get started with your presentation!
                </div>
              )}
  
              <div className="text-sm text-gray-500 pt-2 border-t">
                <p className="font-medium text-gray-600">Examples:</p>
                <ul className="mt-1 list-disc list-inside text-gray-500">
                  <li>How can I make my introduction more engaging?</li>
                  <li>Suggest better transitions between slides</li>
                  <li>How can I improve slide 2's content?</li>
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>
  
        {/* Tips Box at the bottom */}
        <div className="p-4 bg-gray-50 border rounded-md text-sm">
          <h4 className="font-semibold text-gray-700 mb-1">💡 Tips for Great Slides</h4>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Keep each slide to 3-4 bullet points</li>
            <li>Use clear titles for each section</li>
            <li>Tell a story — not just facts</li>
          </ul>
        </div>
      </div>
    </>
  );
  

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
                        value={presentationTitle}
                        onChange={(e) => setPresentationTitle(e.target.value)}
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
                  <div className="relative">
  <button
    className="bg-purple-500 text-white px-4 py-2 rounded-md shadow hover:bg-purple-600 transition-colors"
    onClick={() => setIsExportMenuOpen(prev => !prev)}
  >
    Export
  </button>

  {isExportMenuOpen && (
    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border overflow-hidden z-10">
      <button
        onClick={() => {
          handleExport("pptx");
          setIsExportMenuOpen(false); // close after click
        }}
        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors"
      >
        Download as PowerPoint (.pptx)
      </button>
      <button
        onClick={() => {
          handleExport("pdf");
          setIsExportMenuOpen(false); // close after click
        }}
        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors"
      >
        Download as PDF (.pdf)
      </button>
    </div>
  )}
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
                {slides.map((slide) => (
                  <Card key={slide.id} className="overflow-hidden">
                    <div className="bg-gray-100 p-3 flex justify-between items-center border-b">
                      <div className="flex items-center">
                        <Presentation size={16} className="mr-2" />
                        <span className="font-medium">Slide {slide.id}</span>
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
                      {renderSlideContent(slide)}
                    </CardContent>
                  </Card>
                ))}
                
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
          {!showPreview && renderAIAssistantCard()}
        </div>
      </div>
    </Layout>
  );
};

export default Editor;
