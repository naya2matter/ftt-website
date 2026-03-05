"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
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
import { Separator } from "../../../components/ui/separator";
import { RequirementsService } from "../../requirements.service";
import { UpdateNeedsItemPayload } from "../../requirements";
import {
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  ListChecks,
  Save,
} from "lucide-react";

function EditItemForm() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const id = parseInt(params.id);

  const [formData, setFormData] = useState<UpdateNeedsItemPayload>({
    text: searchParams.get("text") ?? "",
    sort_order: parseInt(searchParams.get("sort_order") ?? "1") || 1,
    needs_section_id: parseInt(searchParams.get("sectionId") ?? "1") || 1,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isInvalid] = useState(isNaN(id));

  useEffect(() => {
    if (isInvalid) setError("Invalid item ID.");
  }, [isInvalid]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "sort_order" || name === "needs_section_id"
          ? parseInt(value) || 0
          : value,
    }));
  };

  const handleSave = async () => {
    if (!formData.text?.trim()) {
      setError("Requirement text is required");
      return;
    }
    if ((formData.sort_order ?? 0) < 1) {
      setError("Sort order must be at least 1");
      return;
    }
    try {
      setIsSaving(true);
      setError(null);
      const res = await RequirementsService.updateNeedsItem(id, formData);
      if (res.success) {
        setSuccess("Item updated successfully!");
        setTimeout(() => router.push("/dashboard/requirements"), 1500);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update item");
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
            <h1 className="text-2xl font-bold tracking-tight">Edit Requirement Item</h1>
            <p className="text-sm text-muted-foreground">
              Update an existing item in the Requirements checklist.
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
                <ListChecks className="h-4 w-4 text-primary" />
              </div>
              <div>
                <CardTitle>Item Details</CardTitle>
                <CardDescription>
                  Update the fields below and save your changes.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">

            {/* Text */}
            <div className="space-y-2">
              <Label htmlFor="text" className="text-sm font-medium">
                Requirement Text <span className="text-red-500">*</span>
              </Label>
              <Input
                id="text"
                name="text"
                value={formData.text ?? ""}
                onChange={handleChange}
                placeholder="e.g., Valid CDL Class A license"
                className="h-10"
                disabled={isInvalid}
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
                value={formData.sort_order ?? 1}
                onChange={handleChange}
                className="h-10 w-32"
                disabled={isInvalid}
              />
              <p className="text-xs text-muted-foreground">
                Lower numbers appear first in the list.
              </p>
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
                disabled={isSaving || isInvalid}
                className="min-w-32 gap-2"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {isSaving ? "Saving…" : "Save Changes"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function EditItemPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <EditItemForm />
    </Suspense>
  );
}
