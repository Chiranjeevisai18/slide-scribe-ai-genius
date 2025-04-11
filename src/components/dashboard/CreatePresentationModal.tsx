
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { FileText, Mic, Image, Upload, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CreatePresentationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreatePresentationModal({ open, onOpenChange }: CreatePresentationModalProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("text");
  const [presentationTitle, setPresentationTitle] = useState("");
  const [presentationContent, setPresentationContent] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCreatePresentation = () => {
    if (!presentationTitle.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your presentation.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      setIsLoading(false);
      onOpenChange(false);
      
      // Reset the form
      setPresentationTitle("");
      setPresentationContent("");
      setUploadedImage(null);
      
      // Navigate to the editor
      navigate("/editor");
      
      toast({
        title: "Presentation created",
        description: "Your presentation has been created successfully.",
      });
    }, 2000);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateRecording = () => {
    setIsRecording(true);
    
    // Simulate recording for 3 seconds
    setTimeout(() => {
      setIsRecording(false);
      setPresentationContent("This is a transcription of your voice recording that would be used to create your presentation slides.");
      toast({
        title: "Recording completed",
        description: "Your voice has been recorded and transcribed.",
      });
    }, 3000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create New Presentation</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="mb-4">
            <label htmlFor="presentation-title" className="block text-sm font-medium mb-1">
              Presentation Title
            </label>
            <Input
              id="presentation-title"
              value={presentationTitle}
              onChange={(e) => setPresentationTitle(e.target.value)}
              placeholder="Enter a title for your presentation"
            />
          </div>
          
          <Tabs defaultValue="text" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="text" className="flex items-center gap-2">
                <FileText size={16} />
                <span className="hidden sm:inline">Text</span>
              </TabsTrigger>
              <TabsTrigger value="voice" className="flex items-center gap-2">
                <Mic size={16} />
                <span className="hidden sm:inline">Voice</span>
              </TabsTrigger>
              <TabsTrigger value="image" className="flex items-center gap-2">
                <Image size={16} />
                <span className="hidden sm:inline">Image</span>
              </TabsTrigger>
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload size={16} />
                <span className="hidden sm:inline">Upload</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="text" className="mt-4">
              <Textarea
                placeholder="Enter or paste your text content here. Our AI will transform it into beautiful slides..."
                className="min-h-[180px] resize-none"
                value={presentationContent}
                onChange={(e) => setPresentationContent(e.target.value)}
              />
            </TabsContent>
            
            <TabsContent value="voice" className="mt-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                {isRecording ? (
                  <div className="animate-pulse">
                    <Mic size={48} className="text-red-500 mx-auto mb-4" />
                    <p className="font-medium mb-2">Recording...</p>
                    <p className="text-sm text-gray-500 mb-4">Speak clearly into your microphone</p>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsRecording(false)}
                    >
                      Stop Recording
                    </Button>
                  </div>
                ) : (
                  <>
                    <Mic size={48} className="text-gray-400 mx-auto mb-4" />
                    <p className="font-medium mb-2">Record your voice</p>
                    <p className="text-sm text-gray-500 mb-4">
                      Speak your presentation content and we'll convert it to slides
                    </p>
                    <Button 
                      onClick={simulateRecording} 
                      className="bg-purple hover:bg-purple-dark"
                    >
                      Start Recording
                    </Button>
                  </>
                )}
              </div>
              
              {presentationContent && !isRecording && (
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">
                    Transcription
                  </label>
                  <Textarea
                    value={presentationContent}
                    onChange={(e) => setPresentationContent(e.target.value)}
                    className="min-h-[100px] resize-none"
                    readOnly
                  />
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="image" className="mt-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                {uploadedImage ? (
                  <div>
                    <div className="mb-4 relative aspect-video">
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded" 
                        className="rounded-lg object-contain w-full h-full"
                      />
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => setUploadedImage(null)}
                    >
                      Remove Image
                    </Button>
                  </div>
                ) : (
                  <>
                    <Image size={48} className="text-gray-400 mx-auto mb-4" />
                    <p className="font-medium mb-2">Upload an image</p>
                    <p className="text-sm text-gray-500 mb-4">
                      We'll extract text from your image and convert it to slides
                    </p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <Button 
                      onClick={() => fileInputRef.current?.click()} 
                      className="bg-purple hover:bg-purple-dark"
                    >
                      Select Image
                    </Button>
                  </>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="upload" className="mt-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                <Upload size={48} className="text-gray-400 mx-auto mb-4" />
                <p className="font-medium mb-2">Upload a presentation</p>
                <p className="text-sm text-gray-500 mb-4">
                  Upload an existing PowerPoint or PDF to enhance with AI
                </p>
                <Button 
                  onClick={() => {
                    toast({
                      title: "Feature coming soon",
                      description: "This feature will be available in the next update.",
                    });
                  }} 
                  className="bg-purple hover:bg-purple-dark"
                >
                  Select File
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            className="bg-purple hover:bg-purple-dark"
            onClick={handleCreatePresentation}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                Create Presentation
                <ArrowRight size={16} className="ml-2" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
