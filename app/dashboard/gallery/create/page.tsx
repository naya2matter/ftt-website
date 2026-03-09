"use client";

import { useRef, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Separator } from "../../components/ui/separator";
import { Textarea } from "../../components/ui/textarea";
import { GalleryService } from "../gallery.service";
import { CreateGalleryItemPayload } from "../gallery";
import {
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  Images,
  Save,
  UploadCloud,
  X,
} from "lucide-react";

function CreateGalleryItemForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sectionId = parseInt(searchParams.get("sectionId") || "1") || 1;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    alt_text: "",
    image_title: "",
    sort_order: 1,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "sort_order" ? parseInt(value) || 1 : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!formData.description.trim()) {
      setError("Description is required.");
      return;
    }
    if (!imageFile) {
      setError("Please select an image to upload.");
      return;
    }
    if (formData.sort_order < 1) {
      setError("Sort order must be at least 1.");
      return;
    }

    try {
      setIsSaving(true);
      setError(null);
      const payload: CreateGalleryItemPayload = {
        gallery_section_id: sectionId,
        title: formData.title,
        description: formData.description,
        image: imageFile,
        alt_text: formData.alt_text,
        image_title: formData.image_title,
        sort_order: formData.sort_order,
      };
      const res = await GalleryService.createGalleryItem(payload);
      if (res.success) {
        setSuccess("Gallery item created successfully!");
        setTimeout(() => router.push("/dashboard/gallery"), 1500);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create gallery item");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background to-secondary/10 p-4 md:p-8">
      <div className="max-w-full space-y-6">

        {/* Header */}
        <div className="flex items-center gap-3">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            size="icon"
            className="h-9 w-9 shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="space-y-0.5">
            <h1 className="text-2xl font-bold tracking-tight">Create Gallery Item</h1>
            <p className="text-sm text-muted-foreground">
              Add a new photo to the gallery section.
            </p>
          </div>
        </div>

        {/* Feedback */}
        {success && (
          <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <p className="text-sm font-medium">{success}</p>
          </div>
        )}
        {error && (
          <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Form Card */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                <Images className="h-4 w-4 text-primary" />
              </div>
              <div>
                <CardTitle>Item Details</CardTitle>
                <CardDescription>
                  Fill in the fields below to add a new gallery photo.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">

            {/* Image Upload */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Image <span className="text-red-500">*</span>
              </Label>

              {imagePreview ? (
                <div className="relative w-full overflow-hidden rounded-lg border bg-muted">
                  <div className="relative h-56 w-full">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-contain"
                      sizes="100vw"
                    />
                  </div>
                  <div className="flex items-center justify-between border-t bg-background/80 px-3 py-2 backdrop-blur-xs">
                    <span className="truncate text-xs text-muted-foreground">
                      {imageFile?.name}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={handleRemoveImage}
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  className="flex w-full cursor-pointer flex-col items-center gap-3 rounded-lg border-2 border-dashed border-muted-foreground/25 px-6 py-10 transition-colors hover:border-primary/50 hover:bg-primary/5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <UploadCloud className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Click to upload image</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      PNG, JPG, WEBP up to 10 MB
                    </p>
                  </div>
                </button>
              )}

              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Team on the road"
                  className="h-10"
                />
              </div>

              {/* Sort Order */}
              <div className="space-y-2">
                <Label htmlFor="sort_order" className="text-sm font-medium">
                  Sort Order <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="sort_order"
                  name="sort_order"
                  type="number"
                  min={1}
                  value={formData.sort_order}
                  onChange={handleChange}
                  className="h-10 w-32"
                />
                <p className="text-xs text-muted-foreground">
                  Lower numbers appear first.
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="e.g., A photo of our drivers heading out on a long haul."
                className="min-h-20 resize-none"
              />
            </div>

            <Separator />

            {/* Image Meta */}
            <div>
              <p className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Image SEO
              </p>
              <div className="grid gap-5 md:grid-cols-2">
                {/* Alt Text */}
                <div className="space-y-2">
                  <Label htmlFor="alt_text" className="text-sm font-medium">
                    Alt Text<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="alt_text"
                    name="alt_text"
                    value={formData.alt_text}
                    onChange={handleChange}
                    placeholder="e.g., Driver smiling near truck"
                    className="h-10"
                  />
                  <p className="text-xs text-muted-foreground">
                    Describes the image for screen readers and search engines.
                  </p>
                </div>

                {/* Image Title */}
                <div className="space-y-2">
                  <Label htmlFor="image_title" className="text-sm font-medium">
                    Image Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="image_title"
                    name="image_title"
                    value={formData.image_title}
                    onChange={handleChange}
                    placeholder="e.g., On the open road"
                    className="h-10"
                  />
                  <p className="text-xs text-muted-foreground">
                    Shown on hover as a tooltip in most browsers.
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => router.back()}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="min-w-36 gap-2"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {isSaving ? "Creating…" : "Create Item"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function CreateGalleryItemPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <CreateGalleryItemForm />
    </Suspense>
  );
}
