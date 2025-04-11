
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Lock, 
  BellRing, 
  Layers, 
  PencilLine,
  CheckCircle
} from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  
  const handleSave = () => {
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Settings saved!",
        description: "Your settings have been updated successfully.",
      });
    }, 1000);
  };
  
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User size={16} />
              Account
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock size={16} />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <BellRing size={16} />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Layers size={16} />
              Preferences
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="account">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue="John Doe" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>
                    <div>
                      <Label htmlFor="company">Company/Organization</Label>
                      <Input id="company" defaultValue="Acme Inc." />
                    </div>
                    <div>
                      <Label htmlFor="role">Job Title</Label>
                      <Input id="role" defaultValue="Product Manager" />
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button 
                      onClick={handleSave}
                      disabled={saving}
                      className="bg-purple hover:bg-purple-dark"
                    >
                      {saving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Profile Picture</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center text-gray-400">
                      <User size={48} />
                    </div>
                    
                    <div className="flex-1">
                      <p className="text-gray-600 mb-4">
                        Upload a new profile picture. The image should be square and at least 200x200 pixels.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button variant="outline">Upload New Image</Button>
                        <Button variant="ghost" className="text-red-500 hover:text-red-700">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="security">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Button 
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-purple hover:bg-purple-dark"
                      >
                        {saving ? "Updating..." : "Update Password"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium mb-1">Enhance Your Account Security</h3>
                      <p className="text-gray-600">
                        Add an extra layer of security to your account by enabling two-factor authentication.
                      </p>
                    </div>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-gray-600">Receive updates about your presentations via email</p>
                    </div>
                    <div className="flex items-center h-6">
                      <input type="checkbox" id="email-notifications" className="h-4 w-4" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Presentation Reminders</h3>
                      <p className="text-gray-600">Get reminders before your scheduled presentations</p>
                    </div>
                    <div className="flex items-center h-6">
                      <input type="checkbox" id="presentation-reminders" className="h-4 w-4" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">New Feature Announcements</h3>
                      <p className="text-gray-600">Stay updated with new features and improvements</p>
                    </div>
                    <div className="flex items-center h-6">
                      <input type="checkbox" id="feature-announcements" className="h-4 w-4" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Marketing Communications</h3>
                      <p className="text-gray-600">Receive tips, product updates, and promotional offers</p>
                    </div>
                    <div className="flex items-center h-6">
                      <input type="checkbox" id="marketing-communications" className="h-4 w-4" />
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button 
                      onClick={handleSave}
                      disabled={saving}
                      className="bg-purple hover:bg-purple-dark"
                    >
                      {saving ? "Saving..." : "Save Preferences"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Default Presentation Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="default-template">Default Template</Label>
                      <select 
                        id="default-template" 
                        className="w-full p-2 border rounded-md mt-1"
                      >
                        <option value="professional">Professional</option>
                        <option value="creative">Creative</option>
                        <option value="minimal">Minimal</option>
                        <option value="corporate">Corporate</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="default-color-scheme">Default Color Scheme</Label>
                      <select 
                        id="default-color-scheme" 
                        className="w-full p-2 border rounded-md mt-1"
                      >
                        <option value="purple">Purple Theme</option>
                        <option value="blue">Blue Theme</option>
                        <option value="green">Green Theme</option>
                        <option value="orange">Orange Theme</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="default-transition">Default Transition</Label>
                      <select 
                        id="default-transition" 
                        className="w-full p-2 border rounded-md mt-1"
                      >
                        <option value="fade">Fade</option>
                        <option value="slide">Slide</option>
                        <option value="zoom">Zoom</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button 
                      onClick={handleSave}
                      disabled={saving}
                      className="bg-purple hover:bg-purple-dark"
                    >
                      {saving ? "Saving..." : "Save Defaults"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>AI Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Auto-Generate Images</h3>
                        <p className="text-gray-600">Automatically add relevant images to slides</p>
                      </div>
                      <div className="flex items-center h-6">
                        <input type="checkbox" id="auto-images" className="h-4 w-4" defaultChecked />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Auto-Generate Charts</h3>
                        <p className="text-gray-600">Create charts from numerical data in your content</p>
                      </div>
                      <div className="flex items-center h-6">
                        <input type="checkbox" id="auto-charts" className="h-4 w-4" defaultChecked />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Content Suggestions</h3>
                        <p className="text-gray-600">Receive AI-powered content improvement suggestions</p>
                      </div>
                      <div className="flex items-center h-6">
                        <input type="checkbox" id="content-suggestions" className="h-4 w-4" defaultChecked />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="ai-model">AI Model</Label>
                      <select 
                        id="ai-model" 
                        className="w-full p-2 border rounded-md mt-1"
                      >
                        <option value="gpt-4">GPT-4 (Recommended)</option>
                        <option value="gpt-3.5">GPT-3.5 (Faster)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button 
                      onClick={handleSave}
                      disabled={saving}
                      className="bg-purple hover:bg-purple-dark"
                    >
                      {saving ? "Saving..." : "Save AI Settings"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
