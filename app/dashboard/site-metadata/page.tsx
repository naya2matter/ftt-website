"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Separator } from "../components/ui/separator";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import { SiteMetadataService } from "./site-metadata.service";
import { SiteMetadata, SiteMetadataResponse, SiteMetadataUpdateResponse } from "./site-metadata";

export default function SiteMetadataPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<SiteMetadata | null>(null);

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);

  useEffect(() => {
    fetchMetadata();
  }, []);

  async function fetchMetadata() {
    try {
      setLoading(true);
      const res: any = await SiteMetadataService.get();
      // res is now the data object because SiteMetadataService.get returns res.data
      const metadata = res.original.data;
      setData({
        id: 1,
        name: metadata.name,
        description: metadata.description,
        keywords: metadata.keywords,
        logo: metadata.logo,
        favicon: metadata.favicon,
      });
    } catch (err: any) {
      toast.error(err?.message || "Failed to load site metadata");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate() {
    if (!data) return;

    try {
      setSaving(true);

      const fd = new FormData();
      fd.append("name", data.name);
      fd.append("description", data.description);
      fd.append("keywords", data.keywords);

      fd.append("logo_alt_text", data.logo_alt_text || "");
      fd.append("logo_title", data.logo_title || "");
      fd.append("favicon_alt_text", data.favicon_alt_text || "");
      fd.append("favicon_title", data.favicon_title || "");

      if (logoFile) fd.append("logo", logoFile);
      if (faviconFile) fd.append("favicon", faviconFile);

      const res: SiteMetadataUpdateResponse = await SiteMetadataService.update(data.id || 1, fd);

      toast.success(res.message || "Updated successfully");
      fetchMetadata();
    } catch (err: any) {
      toast.error(err?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading || !data) {
    return (
      <div className="p-6 max-w-full space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-48" />
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Skeleton className="h-10 w-1/3" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-10 w-1/4" />
            </div>
            <Separator />

            <div className="space-y-4">
              <Skeleton className="h-5 w-32" />
              <div className="flex items-center gap-4 mt-2">
                <Skeleton className="h-20 w-20 rounded" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-1/2" />
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <Skeleton className="h-12 w-full rounded-md" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-full space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Site Metadata</CardTitle>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <Label>Site Name</Label>
              <Input
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>
            {/* 
            <div>
              <Label>Title</Label>
              <Input
                value={data.title || ""}
                onChange={(e) =>
                  setData({ ...data, title: e.target.value })
                }
              />
            </div> */}

            <div>
              <Label>Description</Label>
              <Textarea
                value={data.description}
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Keywords</Label>
              <Input
                value={data.keywords}
                onChange={(e) => setData({ ...data, keywords: e.target.value })}
              />
            </div>
          </div>

          <Separator />

          
          {/* Logo */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Logo</h3>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-full md:w-1/3 space-y-2">
                <img
                  src={
                    logoFile
                      ? URL.createObjectURL(logoFile) // 🔥 preview selected file
                      : data.logo || "/placeholder.png"
                  }
                  alt={data.logo_alt_text || "Logo"}
                  className="h-32 w-full object-contain border rounded-lg bg-muted/50 p-4 transition-all hover:bg-muted"
                />
                <Input
                  type="file"
                  accept="image/*"
                  id="logo-upload"
                  className="hidden"
                  onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                />
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => document.getElementById('logo-upload')?.click()}
                >
                  Change Logo
                </Button>
              </div>
              
              <div className="flex-1 w-full space-y-4">
                <div className="space-y-2">
                  <Label>Alt Text</Label>
                  <Input
                    placeholder="Describe the logo for accessibility"
                    value={data.logo_alt_text || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        logo_alt_text: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    placeholder="Logo title attribute"
                    value={data.logo_title || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        logo_title: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Favicon */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Favicon</h3>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-full md:w-1/3 space-y-2">
                <div className="flex justify-center p-4 border rounded-lg bg-muted/50 hover:bg-muted transition-all">
                  <img
                    src={
                      faviconFile
                        ? URL.createObjectURL(faviconFile)
                        : data.favicon || "/placeholder.png"
                    }
                    alt={data.favicon_alt_text || "Favicon"}
                    className="h-12 w-12 object-contain"
                  />
                </div>
                <Input
                  type="file"
                  accept="image/x-icon,image/png,image/svg+xml"
                  id="favicon-upload"
                  className="hidden"
                  onChange={(e) => setFaviconFile(e.target.files?.[0] || null)}
                />
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => document.getElementById('favicon-upload')?.click()}
                >
                  Change Favicon
                </Button>
              </div>

              <div className="flex-1 w-full space-y-4">
                <div className="space-y-2">
                  <Label>Alt Text</Label>
                  <Input
                    placeholder="Favicon description"
                    value={data.favicon_alt_text || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        favicon_alt_text: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    placeholder="Favicon title attribute"
                    value={data.favicon_title || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        favicon_title: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <Button onClick={handleUpdate} disabled={saving} className="w-full">
            {saving ? "Saving..." : "Update Site Metadata"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
