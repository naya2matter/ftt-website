"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 as PageLoader } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { TestimonialSectionsService } from "../testimonials-sections.service";
import { CreateTestimonialPayload } from "../testimonials-sections";
import { Loader2, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";

function CreateTestimonialForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sectionId = searchParams.get("sectionId");

  const [formData, setFormData] = useState<CreateTestimonialPayload>({
    testimonials_section_id: parseInt(sectionId || "0"),
    text: "",
    name: "",
    position: "",
    duration_seconds: 0,
    sort_order: 0,
    is_active: 1,
    title: "",
    alt_text: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "duration_seconds" || name === "sort_order" || name === "is_active"
        ? parseInt(value) || 0
        : value,
    }));
  };

  // Handle video file change
  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        video: file,
      }));
    }
  };

  // Handle save
  const handleSave = async () => {
    if (!formData.text.trim() || !formData.name.trim() || !formData.position.trim()) {
      setError("Text, name, and position are required");
      return;
    }

    if (!formData.testimonials_section_id) {
      setError("Invalid section ID");
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      const response = await TestimonialSectionsService.createTestimonial(formData);
      if (response.success) {
        setSuccessMessage("Video added successfully!");
        setTimeout(() => {
          router.push(`/dashboard/testimonials`);
        }, 1500);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save testimonial");
    } finally {
      setIsSaving(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 p-4 md:p-8">
      <div className="max-w-full space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            onClick={handleCancel}
            variant="ghost"
            size="icon"
            className="h-9 w-9"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Add Video</h1>
            <p className="text-muted-foreground">
              Create a new testimonial video
            </p>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <p className="text-sm font-medium">{successMessage}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Form Card */}
        <Card className="border">
          <CardHeader>
            <CardTitle>Video Details</CardTitle>
            <CardDescription>
              Fill in the details for the new testimonial video
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., John Doe"
                className="h-10"
              />
            </div>

            {/* Position Field */}
            <div className="space-y-2">
              <Label htmlFor="position" className="text-sm font-medium">
                Position <span className="text-red-500">*</span>
              </Label>
              <Input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                placeholder="e.g., Driver"
                className="h-10"
              />
            </div>

            {/* Text/Testimonial Field */}
            <div className="space-y-2">
              <Label htmlFor="text" className="text-sm font-medium">
                Testimonial Text <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="text"
                name="text"
                value={formData.text}
                onChange={handleInputChange}
                placeholder="Enter the testimonial text..."
                className="min-h-24 resize-none"
              />
            </div>

            {/* Video File Field */}
            <div className="space-y-2">
              <Label htmlFor="video" className="text-sm font-medium">
                Video File
              </Label>
              <Input
                id="video"
                type="file"
                accept="video/*"
                onChange={handleVideoFileChange}
                className="h-10"
              />
              <p className="text-xs text-muted-foreground">
                MP4, WebM, or other video formats
              </p>
            </div>

            {/* Duration Field */}
            <div className="space-y-2">
              <Label htmlFor="duration_seconds" className="text-sm font-medium">
                Duration (seconds)
              </Label>
              <Input
                id="duration_seconds"
                type="number"
                name="duration_seconds"
                value={formData.duration_seconds}
                onChange={handleInputChange}
                placeholder="e.g., 30"
                className="h-10"
              />
            </div>

            {/* Sort Order Field */}
            <div className="space-y-2">
              <Label htmlFor="sort_order" className="text-sm font-medium">
                Sort Order
              </Label>
              <Input
                id="sort_order"
                type="number"
                name="sort_order"
                value={formData.sort_order}
                onChange={handleInputChange}
                placeholder="e.g., 1"
                className="h-10"
              />
            </div>

            {/* Title Field */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., John's Testimonial"
                className="h-10"
              />
            </div>

            {/* Alt Text Field */}
            <div className="space-y-2">
              <Label htmlFor="alt_text" className="text-sm font-medium">
                Alt Text
              </Label>
              <Input
                id="alt_text"
                name="alt_text"
                value={formData.alt_text}
                onChange={handleInputChange}
                placeholder="Describe the video for accessibility"
                className="h-10"
              />
            </div>

            {/* Active Toggle */}
            <div className="space-y-2">
              <Label htmlFor="is_active" className="text-sm font-medium">
                Status
              </Label>
              <select
                id="is_active"
                name="is_active"
                value={formData.is_active}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    is_active: parseInt(e.target.value),
                  }))
                }
                className="w-full h-10 px-3 rounded-md border border-input bg-background"
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 sm:flex-row pt-4 border-t">
              <Button
                onClick={handleSave}
                disabled={isSaving}
                variant="default"
                className="flex-1"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Video"
                )}
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="flex-1"
                disabled={isSaving}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function CreateTestimonialPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <PageLoader className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <CreateTestimonialForm />
    </Suspense>
  );
}
