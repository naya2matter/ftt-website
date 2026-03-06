"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { ConfirmDialog } from "../components/ui/confirm-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Separator } from "../components/ui/separator";
import { signOnBonusService } from "./sign-on-bonus.service";
import {
  OfferSection,
  OfferRequirement,
  UpdateOfferSectionPayload,
} from "./sign-on-bonus";
import {
  Loader2,
  AlertCircle,
  CheckCircle2,
  Trash2,
  Edit2,
  Plus,
  Save,
  ImageIcon,
  ArrowUpDown,
  FileText,
} from "lucide-react";

export default function SignOnBonusPage() {
  const router = useRouter();

  // ── Offer Section state ────────────────────────────────────────────────────
  const [section, setSection] = useState<OfferSection | null>(null);
  const [sectionForm, setSectionForm] = useState<UpdateOfferSectionPayload>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [isSavingSection, setIsSavingSection] = useState(false);

  // ── Requirements state ─────────────────────────────────────────────────────
  const [requirements, setRequirements] = useState<OfferRequirement[]>([]);
  const [loadingReqs, setLoadingReqs] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // ── Shared state ───────────────────────────────────────────────────────────
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const showSuccess = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(null), 3500);
  };

  // ── Initial load ───────────────────────────────────────────────────────────
  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        setError(null);
        const [sectionsRes, reqsRes] = await Promise.all([
          signOnBonusService.getOfferSections(),
          signOnBonusService.getOfferRequirements(),
        ]);

        if (sectionsRes.success && sectionsRes.data.length > 0) {
          const s = sectionsRes.data[0];
          setSection(s);
          setSectionForm({
            hook: s.hook,
            title: s.title,
            description: s.description,
            button_text: s.button_text,
            button_link: s.button_link,
          });
          setImagePreview(s.image?.url ?? null);
        }

        if (reqsRes.success) {
          setRequirements(reqsRes.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // ── Requirements refresh ───────────────────────────────────────────────────
  const refreshRequirements = async () => {
    try {
      setLoadingReqs(true);
      const res = await signOnBonusService.getOfferRequirements();
      if (res.success) setRequirements(res.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to refresh requirements"
      );
    } finally {
      setLoadingReqs(false);
    }
  };

  // ── Section form handlers ──────────────────────────────────────────────────
  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSectionForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    setSectionForm((prev) => ({ ...prev, image: file }));
  };

  const handleSaveSection = async () => {
    if (!section) return;
    const { hook, title, description, button_text, button_link } = sectionForm;
    if (!hook?.trim() || !title?.trim() || !description?.trim() || !button_text?.trim() || !button_link?.trim()) {
      setError("All fields are required");
      return;
    }
    try {
      setIsSavingSection(true);
      setError(null);
      const payload: UpdateOfferSectionPayload = { ...sectionForm };
      if (imageFile) payload.image = imageFile;
      const res = await signOnBonusService.updateOfferSection(section.id, payload);
      if (res.success) {
        setSection((prev) =>
          prev ? { ...prev, ...res.data } : res.data
        );
        setImageFile(null);
        showSuccess("Offer section updated successfully!");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update section");
    } finally {
      setIsSavingSection(false);
    }
  };

  // ── Delete requirement ─────────────────────────────────────────────────────
  const handleDeleteRequirement = async (id: number) => {
    try {
      setIsDeleting(true);
      setError(null);
      const res = await signOnBonusService.deleteOfferRequirement(id);
      if (res.success) {
        showSuccess("Requirement deleted successfully!");
        setDeletingId(null);
        await refreshRequirements();
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete requirement"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm font-medium">Loading Sign-On Bonus section…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 p-4 md:p-8">
      <div className="max-w-full space-y-8">

        {/* ── Page Header ── */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Sign-On Bonus Section</h1>
          <p className="text-muted-foreground">
            Manage the Sign-On Bonus section content and requirement checklist.
          </p>
        </div>

        {/* ── Global feedback ── */}
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

        {/* ══════════════════════════════════════════════════
            Sign-On Bonus SECTION EDITOR
        ══════════════════════════════════════════════════ */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <div>
                <CardTitle>Edit Sign-On Bonus Section</CardTitle>
                <CardDescription>
                  Update the hero content and call-to-action for this Sign-On Bonus.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Hook */}
              <div className="space-y-2">
                <Label htmlFor="hook" className="text-sm font-medium">
                  Hook <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="hook"
                  name="hook"
                  value={sectionForm.hook ?? ""}
                  onChange={handleFieldChange}
                  placeholder="e.g., Limited Time Sign-On Bonus"
                  className="h-10"
                />
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={sectionForm.title ?? ""}
                  onChange={handleFieldChange}
                  placeholder="e.g., Special Discount"
                  className="h-10"
                />
              </div>

              {/* Button Text */}
              <div className="space-y-2">
                <Label htmlFor="button_text" className="text-sm font-medium">
                  Button Text <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="button_text"
                  name="button_text"
                  value={sectionForm.button_text ?? ""}
                  onChange={handleFieldChange}
                  placeholder="e.g., Claim Now"
                  className="h-10"
                />
              </div>

              {/* Button Link */}
              <div className="space-y-2">
                <Label htmlFor="button_link" className="text-sm font-medium">
                  Button Link <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="button_link"
                  name="button_link"
                  value={sectionForm.button_link ?? ""}
                  onChange={handleFieldChange}
                  placeholder="https://..."
                  className="h-10"
                />
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
                value={sectionForm.description ?? ""}
                onChange={handleFieldChange}
                placeholder="Write a compelling description for this Sign-On Bonus…"
                className="min-h-28 resize-none"
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Section Image
              </Label>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                {imagePreview && (
                  <div className="relative overflow-hidden rounded-lg border bg-muted/30 shadow-sm">
                    <Image
                      src={imagePreview}
                      alt="Sign-On Bonus section preview"
                      width={220}
                      height={160}
                      className="h-40 w-[220px] object-cover"
                      unoptimized
                    />
                    {imageFile && (
                      <Badge
                        variant="secondary"
                        className="absolute bottom-2 left-2 text-xs"
                      >
                        New image
                      </Badge>
                    )}
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-fit gap-2"
                    onClick={() => imageInputRef.current?.click()}
                  >
                    <ImageIcon className="h-4 w-4" />
                    {imagePreview ? "Change Image" : "Upload Image"}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG or WebP. Recommended: 800×600 px.
                  </p>
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex justify-end">
              <Button
                onClick={handleSaveSection}
                disabled={isSavingSection}
                className="min-w-32 gap-2"
              >
                {isSavingSection ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {isSavingSection ? "Saving…" : "Save Changes"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* ══════════════════════════════════════════════════
            Sign-On Bonus REQUIREMENTS TABLE
        ══════════════════════════════════════════════════ */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                  <ArrowUpDown className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle>Sign-On Bonus Requirements</CardTitle>
                  <CardDescription>
                    Checklist items displayed in the Sign-On Bonus section.
                  </CardDescription>
                </div>
              </div>
              <Button
                size="sm"
                className="gap-2"
                onClick={() =>
                  router.push(
                    `/dashboard/sign-on-bonus/create${section ? `?sectionId=${section.id}` : ""}`
                  )
                }
              >
                <Plus className="h-4 w-4" />
                Create Requirement
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {loadingReqs ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : requirements.length === 0 ? (
              <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed py-14 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <ArrowUpDown className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">
                    No requirements yet
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Click &quot;Create Requirement&quot; to add the first item.
                  </p>
                </div>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/40 hover:bg-muted/40">
                      <TableHead className="w-12 text-center">#</TableHead>
                      <TableHead>Requirement Text</TableHead>
                      <TableHead className="w-32 text-center">
                        Sort Order
                      </TableHead>
                      <TableHead className="w-28 text-center">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...requirements]
                      .sort((a, b) => a.sort_order - b.sort_order)
                      .map((req, idx) => (
                        <TableRow
                          key={req.id}
                          className="group transition-colors hover:bg-muted/30"
                        >
                          <TableCell className="text-center text-sm text-muted-foreground">
                            {idx + 1}
                          </TableCell>
                          <TableCell className="font-medium">
                            {req.text}
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant="secondary" className="tabular-nums">
                              {req.sort_order}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 opacity-70 transition-opacity hover:opacity-100"
                                title="Edit requirement"
                                onClick={() =>
                                  router.push(
                                    `/dashboard/sign-on-bonus/edit/${req.id}`
                                  )
                                }
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive opacity-70 transition-opacity hover:bg-destructive/10 hover:opacity-100"
                                title="Delete requirement"
                                onClick={() => setDeletingId(req.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ── Delete confirmation dialog ── */}
      {deletingId !== null && (
        <ConfirmDialog
          message="Are you sure you want to delete this requirement? This action cannot be undone."
          onConfirm={() => handleDeleteRequirement(deletingId)}
          onCancel={() => setDeletingId(null)}
        />
      )}
    </div>
  );
}
