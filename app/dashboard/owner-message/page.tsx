"use client";

import { useEffect, useState, useTransition } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/app/dashboard/components/ui/card";
import { Input } from "@/app/dashboard/components/ui/input";
import { Label } from "@/app/dashboard/components/ui/label";
import { Textarea } from "@/app/dashboard/components/ui/textarea";
import { Button } from "@/app/dashboard/components/ui/button";
import { Skeleton } from "@/app/dashboard/components/ui/skeleton";
import { ownerMessageService } from "./owner-message.service";
import { FounderSection } from "./owner-message";
import { toast } from "sonner";
import { Video, Save, RefreshCw, AlertCircle } from "lucide-react";

export default function OwnerMessagePage() {
  const [data, setData] = useState<FounderSection | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // Form states
  const [hookText, setHookText] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Video upload states
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await ownerMessageService.getFounderSection();
      if (res.success && res.data && res.data.length > 0) {
        const section = res.data[0];
        setData(section);
        setHookText(section.hook_text);
        setTitle(section.title);
        setDescription(section.description);
      }
    } catch (error) {
      console.error("Failed to fetch owner message data:", error);
      toast.error("Failed to load founder section data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;

    startTransition(async () => {
      try {
        const res = await ownerMessageService.updateFounderSection(data.id, {
          hook_text: hookText,
          title: title,
          description: description,
          video: selectedFile || undefined,
          title_video: selectedFile?.name,
          alt_text: data.video?.alt_text || "Founder video",
        });

        if (res.success) {
          toast.success("Founder section updated successfully");
          setData(res.data);
          setSelectedFile(null);
          setPreviewUrl(null);
        } else {
          toast.error(res.message || "Failed to update");
        }
      } catch (error) {
        console.error("Update failed:", error);
        toast.error("An error occurred while updating");
      }
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-6 p-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-[400px] w-full" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-[50vh] gap-4">
        <AlertCircle className="h-12 w-12 text-muted-foreground" />
        <h2 className="text-xl font-semibold">No founder section found</h2>
        <Button onClick={fetchData}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 max-w-full">
      <input id="video-upload-input" type="file" accept="video/*" onChange={handleFileChange} className="hidden" />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Owner Message</h1>
          <p className="text-muted-foreground">
            Manage the "Meet Our Founder" section of your website.
          </p>
        </div>
        <Button variant="outline" size="icon" onClick={fetchData} disabled={loading || isPending}>
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Section */}
        <Card className="lg:col-span-7 shadow-sm">
          <CardHeader>
            <CardTitle>Content Settings</CardTitle>
            <CardDescription>
              Update the text content shown in the founder section.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdate} className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="hook">Hook Text</Label>
                <Input
                  id="hook"
                  placeholder="e.g., Meet Our Founder"
                  value={hookText}
                  onChange={(e) => setHookText(e.target.value)}
                  className="bg-muted/50"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., A Visionary Leader"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-muted/50"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Tell your story..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[150px] bg-muted/50 resize-none"
                  required
                />
              </div>

              <Button type="submit" className="w-full md:w-max ml-auto" disabled={isPending}>
                {isPending ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Card className="overflow-hidden shadow-sm border-2 border-primary/10">
            <CardHeader className="bg-muted/50 pb-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-primary" />
                  <CardTitle className="text-sm font-medium uppercase tracking-wider">
                    Live Media Preview
                  </CardTitle>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => document.getElementById("video-upload-input")?.click()}
                >
                  Select Video
                </Button>
              </div>
            </CardHeader>
            <div className="relative aspect-video bg-black flex items-center justify-center">
              {previewUrl ? (
                <video src={previewUrl} controls className="w-full h-full object-cover" />
              ) : data.video?.url ? (
                <video 
                  src={data.video.url} 
                  controls 
                  className="w-full h-full object-cover"
                  poster={data.video?.path}
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground p-8 text-center">
                  <Video className="h-10 w-10 opacity-20" />
                  <p className="text-sm">No video available</p>
                </div>
              )}
            </div>
            <CardContent className="pt-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase">File info:</span>
                {selectedFile ? (
                  <>
                    <p className="text-sm font-medium truncate text-amber-600">{selectedFile.name} (New)</p>
                    <p className="text-xs text-muted-foreground">{selectedFile.type} • {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-medium truncate">{data.video?.title || "Default Video"}</p>
                    <p className="text-xs text-muted-foreground">{data.video?.mime_type} • {(data.video?.size_bytes / (1024 * 1024)).toFixed(2)} MB</p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20 shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Quick Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Last Updated</span>
                  <span className="font-mono text-xs">
                    {new Date(data.updated_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Status</span>
                  <span className="text-xs font-semibold text-green-600 flex items-center gap-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-600 animate-pulse" />
                    Active
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
