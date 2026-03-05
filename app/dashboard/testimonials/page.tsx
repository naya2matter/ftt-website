"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { ConfirmDialog } from "../components/ui/confirm-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { TestimonialSectionsService } from "./testimonials-sections.service";
import {
  TestimonialSection,
  UpdateTestimonialSectionPayload,
  Testimonial,
} from "./testimonials-sections";
import {
  Loader2,
  AlertCircle,
  CheckCircle2,
  Trash2,
  Edit2,
  Plus,
  Save,
  Video,
  Settings2,
} from "lucide-react";

export default function TestimonialsSectionsPage() {
  const router = useRouter();

  // ── Section state ──────────────────────────────────────────────────────────
  const [sections, setSections] = useState<TestimonialSection[]>([]);
  const [loading, setLoading] = useState(true);
  // Map of sectionId → current form values (so each section is edited independently)
  const [sectionForms, setSectionForms] = useState<
    Record<number, UpdateTestimonialSectionPayload>
  >({});
  const [savingSection, setSavingSection] = useState<number | null>(null);

  // ── Testimonials state ─────────────────────────────────────────────────────
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(false);
  const [deletingTestimonialId, setDeletingTestimonialId] = useState<
    number | null
  >(null);
  const [isDeletingTestimonial, setIsDeletingTestimonial] = useState(false);

  // ── Shared feedback ────────────────────────────────────────────────────────
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // ── On mount: load sections + testimonials in parallel ─────────────────────
  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        setError(null);

        const [sectionsRes, testimonialsRes] = await Promise.all([
          TestimonialSectionsService.getTestimonialSections(),
          TestimonialSectionsService.getTestimonials(),
        ]);

        if (sectionsRes.success && sectionsRes.data) {
          setSections(sectionsRes.data);
          // Pre-populate every section form with its current values
          const forms: Record<number, UpdateTestimonialSectionPayload> = {};
          sectionsRes.data.forEach((s) => {
            forms[s.id] = { hook: s.hook, title: s.title, description: s.description };
          });
          setSectionForms(forms);
        }

        if (testimonialsRes.success && testimonialsRes.data) {
          const data = Array.isArray(testimonialsRes.data)
            ? testimonialsRes.data
            : [testimonialsRes.data];
          setTestimonials(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  // ── Refresh testimonials list ──────────────────────────────────────────────
  const refreshTestimonials = async () => {
    try {
      setLoadingTestimonials(true);
      const res = await TestimonialSectionsService.getTestimonials();
      if (res.success && res.data) {
        const data = Array.isArray(res.data) ? res.data : [res.data];
        setTestimonials(data);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to refresh testimonials"
      );
    } finally {
      setLoadingTestimonials(false);
    }
  };

  // ── Section form field change ──────────────────────────────────────────────
  const handleSectionFieldChange = (
    sectionId: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSectionForms((prev) => ({
      ...prev,
      [sectionId]: { ...prev[sectionId], [name]: value },
    }));
  };

  // ── Save section ───────────────────────────────────────────────────────────
  const handleSaveSection = async (sectionId: number) => {
    const formData = sectionForms[sectionId];
    if (!formData) return;

    if (
      !formData.hook.trim() ||
      !formData.title.trim() ||
      !formData.description.trim()
    ) {
      setError("All fields are required");
      return;
    }

    try {
      setSavingSection(sectionId);
      setError(null);

      const response =
        await TestimonialSectionsService.updateTestimonialSection(
          sectionId,
          formData
        );

      if (response.success) {
        // Refresh section list so displayed values stay in sync
        const refreshed =
          await TestimonialSectionsService.getTestimonialSections();
        if (refreshed.success && refreshed.data) {
          setSections(refreshed.data);
        }
        showSuccess("Section updated successfully!");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update section"
      );
    } finally {
      setSavingSection(null);
    }
  };

  // ── Delete testimonial ─────────────────────────────────────────────────────
  const handleDeleteTestimonial = async (id: number) => {
    try {
      setIsDeletingTestimonial(true);
      setError(null);

      const response = await TestimonialSectionsService.deleteTestimonial(id);
      if (response.success) {
        showSuccess("Video deleted successfully!");
        setDeletingTestimonialId(null);
        await refreshTestimonials();
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete testimonial"
      );
    } finally {
      setIsDeletingTestimonial(false);
    }
  };

  // ── Navigate to create / edit pages ───────────────────────────────────────
  const handleAddVideo = (sectionId: number) =>
    router.push(`/dashboard/testimonials/create?sectionId=${sectionId}`);

  const handleEditVideo = (testimonial: Testimonial) =>
    router.push(`/dashboard/testimonials/edit/${testimonial.id}`);

  // ── Loading skeleton ───────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            Loading testimonial sections...
          </p>
        </div>
      </div>
    );
  }

  // ── UI ─────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-linear-to-br from-background to-secondary/10 p-4 md:p-8">
      <div className="max-w-full space-y-8">

        {/* ── Page Header ── */}
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Testimonials
          </h1>
          <p className="text-muted-foreground">
            Manage your testimonials section content and videos
          </p>
        </div>

        {/* ── Feedback banners ── */}
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

        {/* ════════════════════════════════════════════════════════════════════
            PART 1 — SECTION FORMS (always visible, one card per section)
        ════════════════════════════════════════════════════════════════════ */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Settings2 className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Section Settings</h2>
          </div>

          {sections.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold">No Sections Found</h3>
                  <p className="text-sm text-muted-foreground">
                    There are currently no testimonials sections to manage.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {sections.map((section) => {
                const form = sectionForms[section.id] ?? {
                  hook: section.hook,
                  title: section.title,
                  description: section.description,
                };
                const isSaving = savingSection === section.id;

                return (
                  <Card
                    key={section.id}
                    className="overflow-hidden border transition-all hover:shadow-md"
                  >
                    <CardHeader className="pb-4 border-b bg-muted/30">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <CardTitle className="text-base font-semibold">
                            Section #{section.id}
                          </CardTitle>
                          <CardDescription className="text-xs mt-0.5">
                            Last updated:{" "}
                            {new Date(section.updated_at).toLocaleDateString()}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-6 space-y-5">
                      {/* Hook */}
                      <div className="space-y-1.5">
                        <Label
                          htmlFor={`hook-${section.id}`}
                          className="text-sm font-medium"
                        >
                          Hook
                        </Label>
                        <Input
                          id={`hook-${section.id}`}
                          name="hook"
                          value={form.hook}
                          onChange={(e) =>
                            handleSectionFieldChange(section.id, e)
                          }
                          placeholder="e.g., Our Happy Customers"
                          className="h-10"
                        />
                        <p className="text-xs text-muted-foreground">
                          A catchy tagline for this section
                        </p>
                      </div>

                      {/* Title */}
                      <div className="space-y-1.5">
                        <Label
                          htmlFor={`title-${section.id}`}
                          className="text-sm font-medium"
                        >
                          Title
                        </Label>
                        <Input
                          id={`title-${section.id}`}
                          name="title"
                          value={form.title}
                          onChange={(e) =>
                            handleSectionFieldChange(section.id, e)
                          }
                          placeholder="e.g., What People Are Saying"
                          className="h-10"
                        />
                        <p className="text-xs text-muted-foreground">
                          The main heading displayed on the website
                        </p>
                      </div>

                      {/* Description */}
                      <div className="space-y-1.5">
                        <Label
                          htmlFor={`description-${section.id}`}
                          className="text-sm font-medium"
                        >
                          Description
                        </Label>
                        <Textarea
                          id={`description-${section.id}`}
                          name="description"
                          value={form.description}
                          onChange={(e) =>
                            handleSectionFieldChange(section.id, e)
                          }
                          placeholder="Enter a detailed description..."
                          className="min-h-24 resize-none"
                        />
                        <p className="text-xs text-muted-foreground">
                          Supporting text shown below the title
                        </p>
                      </div>

                      {/* Save button */}
                      <div className="pt-2 border-t">
                        <Button
                          onClick={() => handleSaveSection(section.id)}
                          disabled={isSaving}
                          variant="default"
                          size="sm"
                          className="gap-2"
                        >
                          {isSaving ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="h-4 w-4" />
                              Save Section
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            PART 2 — TESTIMONIALS / VIDEOS TABLE (separate card)
        ════════════════════════════════════════════════════════════════════ */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Video className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Videos</h2>
              {!loadingTestimonials && (
                <span className="text-sm text-muted-foreground">
                  ({testimonials.length})
                </span>
              )}
            </div>
            {sections.length > 0 && (
              <Button
                onClick={() => handleAddVideo(sections[0].id)}
                variant="default"
                size="sm"
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Video
              </Button>
            )}
          </div>

          <Card className="border overflow-hidden">
            {loadingTestimonials ? (
              <div className="flex items-center justify-center p-10">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <span className="ml-2 text-sm text-muted-foreground">
                  Loading videos...
                </span>
              </div>
            ) : testimonials.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <Video className="h-10 w-10 text-muted-foreground/40" />
                <p className="text-sm text-muted-foreground">
                  No videos added yet. Click &ldquo;Add Video&rdquo; to get started.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40">
                    <TableHead className="w-12">ID</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Testimonial
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Video
                    </TableHead>
                    <TableHead className="hidden sm:table-cell w-20 text-center">
                      Order
                    </TableHead>
                    <TableHead className="hidden sm:table-cell w-20 text-center">
                      Status
                    </TableHead>
                    <TableHead className="w-24 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testimonials.map((testimonial) => (
                    <TableRow key={testimonial.id} className="group">
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        #{testimonial.id}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-0.5">
                          <p className="font-medium text-sm leading-none">
                            {testimonial.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {testimonial.position}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell max-w-xs">
                        <p className="text-sm truncate text-foreground/80">
                          {testimonial.text}
                        </p>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {testimonial.video ? (
                          <div className="text-xs space-y-0.5">
                            <p className="font-medium truncate max-w-40">
                              {testimonial.video.title || "Untitled"}
                            </p>
                            <p className="text-muted-foreground">
                              {(
                                testimonial.video.size_bytes /
                                1024 /
                                1024
                              ).toFixed(2)}{" "}
                              MB
                            </p>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground italic">
                            No video
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-center">
                        <span className="text-sm text-muted-foreground">
                          {testimonial.sort_order}
                        </span>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-center">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                            testimonial.is_active
                              ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                              : "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400"
                          }`}
                        >
                          {testimonial.is_active ? "Active" : "Inactive"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            onClick={() => handleEditVideo(testimonial)}
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 opacity-60 group-hover:opacity-100"
                            title="Edit video"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            onClick={() =>
                              setDeletingTestimonialId(testimonial.id)
                            }
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 opacity-60 group-hover:opacity-100 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                            title="Delete video"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>

                        {/* Delete confirmation dialog */}
                        {deletingTestimonialId === testimonial.id && (
                          <ConfirmDialog
                            message="Are you sure you want to delete this video? This action cannot be undone."
                            onConfirm={async () => {
                              await handleDeleteTestimonial(testimonial.id);
                            }}
                            onCancel={() => setDeletingTestimonialId(null)}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Card>
        </div>

      </div>
    </div>
  );
}
