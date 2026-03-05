"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { HeroService } from "./hero.service";
import { HeroSection, HeroResponse } from "./hero";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { Skeleton } from "../components/ui/skeleton";
import { Badge } from "../components/ui/badge";
import { Plus, Trash2, Image as ImageIcon, Video, UploadCloud, LinkIcon } from "lucide-react";

const MAX_VIDEO_SIZE_MB = 50;

export default function HeroPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<HeroSection | null>(null);
  const [newMedia, setNewMedia] = useState<File[]>([]);

  useEffect(() => {
    fetchHero();
  }, []);

  async function fetchHero() {
    try {
      setLoading(true);
      const res: HeroResponse = await HeroService.get();
      const heroData = Array.isArray(res.data.original.data) 
        ? res.data.original.data[0] 
        : res.data.original.data;
      if (heroData) {
        setData(heroData);
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to load hero section");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate() {
    if (!data) return;

    try {
      setSaving(true);

      // ✅ Validate video size before upload
      for (const file of newMedia) {
        if (file.type.startsWith("video")) {
          const sizeMB = file.size / 1024 / 1024;

          if (sizeMB > MAX_VIDEO_SIZE_MB) {
            toast.error(
              `Video "${file.name}" exceeds ${MAX_VIDEO_SIZE_MB}MB limit.`
            );
            setSaving(false);
            return;
          }
        }
      }

      const fd = new FormData();
      fd.append("subheader", data.subheader);
      fd.append("title", data.title);
      fd.append("description_html", data.description_html);
      fd.append("button1_text", data.button1_text);
      fd.append("button1_link", data.button1_link);
      fd.append("button2_text", data.button2_text);
      fd.append("button2_link", data.button2_link);

      // Append media files as flat arrays matching API format
      newMedia.forEach((file, index) => {
        fd.append("media_files[]", file);
        fd.append("alt_text[]", file.name);
        fd.append("title_text[]", file.name);
        fd.append("sort_orders[]", String(index + 1));
      });

      const res = await HeroService.update(data.id || 1, fd);
      
      // Extract message from nested response structure
      const successMessage = res.data?.original?.message || res.message || "Hero section updated successfully";
      toast.success(successMessage);
      fetchHero();
      setNewMedia([]);
    } catch (err: any) {
      console.error("Upload error:", err);

      const backendMessage =
        err?.details?.message ||
        err?.details?.error ||
        (typeof err?.details === "object"
          ? JSON.stringify(err.details)
          : null) ||
        err?.message ||
        "Update failed";

      toast.error(backendMessage);
    } finally {
      setSaving(false);
    }
  }

  const removeNewMedia = (idx: number) => {
    setNewMedia(prev => prev.filter((_, i) => i !== idx));
  };

  if (loading || !data) {
    return (
      <div className="p-4 md:p-8 space-y-6 max-w-full">
        <Skeleton className="h-10 w-48 mb-4" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-64 mt-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
            <Skeleton className="h-32 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-40 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Hero Section</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your website's main landing page content and media</p>
        </div>
        <Button
          onClick={handleUpdate}
          disabled={saving}
          size="lg"
          className="w-full md:w-auto"
        >
          {saving ? "Saving Changes..." : "Save Changes"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Content Management</CardTitle>
          <CardDescription>Edit hero section copy, buttons, and media</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Headline Section */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="subheader" className="text-base font-semibold">Subheader</Label>
              <p className="text-xs text-muted-foreground mb-2">Small text above main headline</p>
              <Input
                id="subheader"
                value={data.subheader}
                onChange={(e) => setData({ ...data, subheader: e.target.value })}
                placeholder="e.g., Welcome to First Team Trucking"
                className="text-sm"
              />
            </div>

            <div>
              <Label htmlFor="title" className="text-base font-semibold">Main Title</Label>
              <p className="text-xs text-muted-foreground mb-2">Primary headline for hero section</p>
              <Input
                id="title"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                placeholder="e.g., Your Trucking Journey Starts Here"
                className="text-sm"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-base font-semibold">Description (HTML)</Label>
              <p className="text-xs text-muted-foreground mb-2">Detailed description with HTML support</p>
              <Textarea
                id="description"
                value={data.description_html}
                onChange={(e) => setData({ ...data, description_html: e.target.value })}
                placeholder="Tell your compelling story..."
                className="min-h-[120px] text-sm"
              />
            </div>
          </div>

          <Separator className="my-6" />

          {/* Call-to-Action Buttons */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <LinkIcon className="h-5 w-5" /> Call-to-Action Buttons
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              {/* Primary Button */}
              <div className="space-y-3 p-4 border rounded-lg bg-gradient-to-br from-primary/5 to-primary/10">
                <Badge className="w-fit">Primary Button</Badge>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="btn1_text" className="text-sm font-medium">Button Label</Label>
                    <Input
                      id="btn1_text"
                      value={data.button1_text}
                      onChange={(e) => setData({ ...data, button1_text: e.target.value })}
                      placeholder="e.g., Apply Now"
                      className="text-sm mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="btn1_link" className="text-sm font-medium">Button URL</Label>
                    <Input
                      id="btn1_link"
                      type="url"
                      value={data.button1_link}
                      onChange={(e) => setData({ ...data, button1_link: e.target.value })}
                      placeholder="https://example.com/apply"
                      className="text-sm mt-1"
                    />
                  </div>
                </div>
              </div>

              
            </div>
          </div>

          <Separator className="my-6" />

          {/* Media Management */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <ImageIcon className="h-5 w-5" /> Media Assets
            </h3>

            {/* Live Media Display */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Current Media ({data.media.length})</h4>
              </div>
              {data.media.length === 0 ? (
                <div className="flex items-center justify-center p-8 border border-dashed rounded-lg bg-muted/30">
                  <p className="text-sm text-muted-foreground">No media uploaded yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.media.map((item) => {
                    const isVideo = item.type === "video" || item.mime_type?.startsWith("video");

                    return (
                      <div
                        key={item.id}
                        className="relative group rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
                      >
                        {isVideo ? (
                          <div className="aspect-video bg-black flex items-center justify-center">
                            <Video className="text-white h-8 w-8 opacity-50" />
                          </div>
                        ) : (
                          <img
                            src={item.url}
                            alt={item.alt_text || "Hero media"}
                            className="w-full aspect-video object-cover"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Badge variant="secondary" className="capitalize">
                            {item.type}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <Separator className="my-4" />

            {/* Upload Section */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <UploadCloud className="h-4 w-4" /> Upload New Media
              </h4>
              <Label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
                <span className="font-medium text-sm">Click to upload or drag & drop</span>
                <p className="text-xs text-muted-foreground mt-1">Images or Videos up to {MAX_VIDEO_SIZE_MB}MB</p>
                <Input
                  id="file-upload"
                  type="file"
                  multiple
                  className="hidden"
                  accept="image/*,video/*"
                  onChange={(e) => setNewMedia(prev => [...prev, ...Array.from(e.target.files || [])])}
                />
              </Label>

              {/* Pending Uploads */}
              {newMedia.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-primary flex items-center gap-2">
                    <Plus className="h-4 w-4" /> Pending Uploads ({newMedia.length})
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {newMedia.map((file, index) => {
                      const previewUrl = URL.createObjectURL(file);
                      const isVideo = file.type.startsWith("video");
                      const sizeMB = (file.size / 1024 / 1024).toFixed(2);

                      return (
                        <div
                          key={index}
                          className="flex gap-3 p-3 border rounded-lg bg-primary/5 border-primary/20 relative"
                        >
                          <div className="h-16 w-24 rounded overflow-hidden flex-shrink-0 bg-muted">
                            {isVideo ? (
                              <div className="h-full w-full flex items-center justify-center bg-black">
                                <Video className="h-6 w-6 text-white" />
                              </div>
                            ) : (
                              <img src={previewUrl} className="h-full w-full object-cover" alt="preview" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium truncate">{file.name}</p>
                            <p className="text-[10px] text-muted-foreground">{sizeMB} MB • {isVideo ? "Video" : "Image"}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                            onClick={() => removeNewMedia(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}