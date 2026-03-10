"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
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
import { signOnBonusService } from "../../sign-on-bonus.service";
import { UpdateOfferRequirementPayload } from "../../sign-on-bonus";
import {
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  ListChecks,
  Save,
} from "lucide-react";

export default function EditRequirementPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id);

  const [formData, setFormData] = useState<UpdateOfferRequirementPayload>({
    text: "",
    sort_order: 1,
  });
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Load requirement data
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await signOnBonusService.getOfferRequirement(id);
        if (res.success && res.data) {
          setFormData({
            text: res.data.text,
            sort_order: res.data.sort_order,
            offer_section_id: res.data.offer_section_id,
          });
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load requirement"
        );
      } finally {
        setLoading(false);
      }
    };
    if (!isNaN(id)) load();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "sort_order" || name === "offer_section_id"
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
      const res = await signOnBonusService.updateOfferRequirement(id, formData);
      if (res.success) {
        setSuccess("Requirement updated successfully!");
        setTimeout(() => router.push("/dashboard/sign-on-bonus"), 1500);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update requirement"
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm font-medium">Loading requirement…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-background to-secondary/10 p-4 md:p-8">
      <div className=" max-w-full space-y-6">
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
            <h1 className="text-2xl font-bold tracking-tight">
              Edit Requirement
            </h1>
            <p className="text-sm text-muted-foreground">
              Update an existing requirement in the checklist.
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
                <CardTitle>Requirement Details</CardTitle>
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
              />
              <p className="text-xs text-muted-foreground">
                Lower numbers appear first in the list.
              </p>
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex justify-end gap-3">
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
