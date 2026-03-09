"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { BenefitsService } from "../benefits.service";
import { CreateBenefitsItemPayload } from "../benefits";
import {
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  ListChecks,
  Plus,
} from "lucide-react";

function CreateBenefitItemForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState<CreateBenefitsItemPayload>({
    benefits_section_id: parseInt(searchParams.get("sectionId") ?? "1") || 1,
    text: "",
    sort_order: 1,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "sort_order" || name === "benefits_section_id"
          ? parseInt(value) || 0
          : value,
    }));
  };

  const handleSave = async () => {
    if (!formData.text.trim()) {
      setError("Benefit text is required");
      return;
    }
    if (formData.sort_order < 1) {
      setError("Sort order must be at least 1");
      return;
    }
    try {
      setIsSaving(true);
      setError(null);
      const res = await BenefitsService.createBenefitsItem(formData);
      if (res.success) {
        setSuccess("Benefit item created successfully!");
        setTimeout(() => router.push("/dashboard/benefits"), 1500);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create benefit item"
      );
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
            <h1 className="text-2xl font-bold tracking-tight">Create Benefit Item</h1>
            <p className="text-sm text-muted-foreground">
              Add a new benefit item to the Benefits section.
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
                  Fill in the details below to create a new benefit item.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">

            {/* Text */}
            <div className="space-y-2">
              <Label htmlFor="text" className="text-sm font-medium">
                Benefit Text <span className="text-red-500">*</span>
              </Label>
              <Input
                id="text"
                name="text"
                value={formData.text}
                onChange={handleChange}
                placeholder="e.g., 24/7 Support and quick response time"
                className="h-10"
                autoFocus
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
                disabled={isSaving}
                className="min-w-36 gap-2"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4" />
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

export default function CreateBenefitItemPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <CreateBenefitItemForm />
    </Suspense>
  );
}
