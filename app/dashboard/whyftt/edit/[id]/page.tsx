"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Switch } from "../../../components/ui/switch";
import { WhyUsItemsService } from "../../whyftt.service";
import { UpdateWhyUsItemPayload } from "../../whyftt";
import {
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  UploadCloud,
  X,
} from "lucide-react";

export default function EditWhyUsItemPage() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id as string);

  const [formData, setFormData] = useState<UpdateWhyUsItemPayload>({
    name: "",
    sort_order: 0,
    is_active: 1,
    alt_text: "",
    title: "",
  });
  const [currentIconUrl, setCurrentIconUrl] = useState<string | null>(null);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await WhyUsItemsService.getWhyUsItem(id);
        if (res.success && res.data) {
          const item = res.data;
          setFormData({
            name: item.name,
            sort_order: item.sort_order,
            is_active: item.is_active,
            alt_text: item.icon?.alt_text || "",
            title: item.icon?.title || "",
          });
          if (item.icon?.url) setCurrentIconUrl(item.icon.url);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load item");
      } finally {
        setLoading(false);
      }
    };
    if (!isNaN(id)) load();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "sort_order" ? parseInt(value) || 0 : value,
    }));
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIconFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setIconPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleRemoveNewIcon = () => {
    setIconFile(null);
    setIconPreview(null);
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      setError("Name is required.");
      return;
    }

    try {
      setIsSaving(true);
      setError(null);
      const payload: UpdateWhyUsItemPayload = {
        ...formData,
        ...(iconFile ? { icon: iconFile } : {}),
      };
      const res = await WhyUsItemsService.updateWhyUsItem(id, payload);
      if (res.success) {
        setSuccessMessage("Item updated successfully!");
        if (res.data?.icon?.url) {
          setCurrentIconUrl(res.data.icon.url);
          setIconFile(null);
          setIconPreview(null);
        }
        setTimeout(() => router.push("/dashboard/whyftt"), 1500);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update item");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 p-4 md:p-8">
      <div className="max-w-full space-y-6">

        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            size="icon"
            className="h-9 w-9 shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Edit Item</h1>
            <p className="text-sm text-muted-foreground">
              Update item #{id}
            </p>
          </div>
        </div>

        {/* Feedback */}
        {successMessage && (
          <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <p className="text-sm font-medium">{successMessage}</p>
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
          <CardHeader>
            <CardTitle>Item Details</CardTitle>
            <CardDescription>Update the information for this item</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Home Weekly"
                className="h-10"
              />
            </div>

            {/* Sort Order */}
            <div className="space-y-2">
              <Label htmlFor="sort_order">Sort Order</Label>
              <Input
                id="sort_order"
                name="sort_order"
                type="number"
                min={0}
                value={formData.sort_order}
                onChange={handleInputChange}
                className="h-10"
              />
            </div>

            {/* Active Toggle */}
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="text-sm font-medium">Active</p>
                <p className="text-xs text-muted-foreground">
                  Show this item on the public website
                </p>
              </div>
              <Switch
                checked={formData.is_active === 1}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, is_active: checked ? 1 : 0 }))
                }
              />
            </div>

            {/* Current Icon */}
            <div className="space-y-2">
              <Label>Icon Image</Label>

              {/* New icon preview (overrides current) */}
              {iconPreview ? (
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground">New icon (not yet saved)</p>
                  <div className="relative inline-block">
                    <div className="relative h-32 w-32 overflow-hidden rounded-xl border shadow-sm">
                      <Image
                        src={iconPreview}
                        alt="New icon preview"
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
                      onClick={handleRemoveNewIcon}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ) : currentIconUrl ? (
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground">Current icon</p>
                  <div className="relative h-32 w-32 overflow-hidden rounded-xl border shadow-sm">
                    <Image
                      src={currentIconUrl}
                      alt="Current icon"
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  </div>
                </div>
              ) : null}

              {/* Upload area */}
              <label
                htmlFor="icon-upload"
                className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-muted-foreground/30 p-6 transition-colors hover:border-primary/50 hover:bg-secondary/50"
              >
                <UploadCloud className="h-6 w-6 text-muted-foreground" />
                <p className="text-sm font-medium">
                  {currentIconUrl || iconPreview ? "Replace icon" : "Upload icon"}
                </p>
                <p className="text-xs text-muted-foreground">SVG, PNG, JPG up to 10MB</p>
              </label>
              <Input
                id="icon-upload"
                type="file"
                accept=".svg,.jpg,.jpeg,.png,image/svg+xml"
                className="hidden"
                onChange={handleIconChange}
              />
            </div>

            {/* Alt Text */}
            <div className="space-y-2">
              <Label htmlFor="alt_text">Alt Text</Label>
              <Input
                id="alt_text"
                name="alt_text"
                value={formData.alt_text}
                onChange={handleInputChange}
                placeholder="Describe the icon for accessibility"
                className="h-10"
              />
            </div>

            {/* Title (media title) */}
            <div className="space-y-2">
              <Label htmlFor="title">Icon Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Media title"
                className="h-10"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => router.back()}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving} className="gap-2">
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving…
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
