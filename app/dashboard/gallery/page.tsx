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
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";
import { Textarea } from "../components/ui/textarea";
import { ConfirmDialog } from "../components/ui/confirm-dialog";
import { GalleryService } from "./gallery.service";
import {
  GallerySection,
  GalleryItem,
  UpdateGallerySectionPayload,
} from "./gallery";
import {
  Loader2,
  AlertCircle,
  CheckCircle2,
  Pencil,
  Trash2,
  Plus,
  Save,
  ImageIcon,
  Images,
  ArrowUpDown,
  LayoutGrid,
} from "lucide-react";

export default function GalleryPage() {
  const router = useRouter();

  // ── Section state ───────────────────────────────────────────────────────────
  const [section, setSection] = useState<GallerySection | null>(null);
  const [sectionId, setSectionId] = useState<number>(1);
  const [sectionForm, setSectionForm] = useState<UpdateGallerySectionPayload>({});
  const [isSavingSection, setIsSavingSection] = useState(false);

  // ── Items state ─────────────────────────────────────────────────────────────
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // ── Shared state ────────────────────────────────────────────────────────────
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const showSuccess = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(null), 3500);
  };

  // ── Initial load ────────────────────────────────────────────────────────────
  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        setError(null);
        const [sectionsRes, itemsRes] = await Promise.all([
          GalleryService.getGallerySections(),
          GalleryService.getGalleryItems(),
        ]);

        // Extract section from the nested response structure
        const rawSection =
          sectionsRes.data?.original?.data?.[0]?.gallery_section;
        if (rawSection) {
          // The GET response doesn't include an id, so we default to 1
          const s: GallerySection = {
            id: 1,
            hook: rawSection.hook,
            title: rawSection.title,
            description: rawSection.description,
            images: rawSection.images ?? [],
          };
          setSection(s);
          setSectionId(1);
          setSectionForm({
            hook: s.hook,
            title: s.title,
            description: s.description,
          });
        }

        if (itemsRes.success) {
          setItems(itemsRes.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // ── Refresh items ───────────────────────────────────────────────────────────
  const refreshItems = async () => {
    try {
      setLoadingItems(true);
      const res = await GalleryService.getGalleryItems();
      if (res.success) setItems(res.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to refresh items");
    } finally {
      setLoadingItems(false);
    }
  };

  // ── Section handlers ────────────────────────────────────────────────────────
  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSectionForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveSection = async () => {
    if (!sectionForm.hook?.trim() || !sectionForm.title?.trim() || !sectionForm.description?.trim()) {
      setError("Hook, Title, and Description are all required.");
      return;
    }
    try {
      setIsSavingSection(true);
      setError(null);
      const res = await GalleryService.updateGallerySection(sectionId, sectionForm);
      if (res.success) {
        setSection((prev) =>
          prev
            ? { ...prev, hook: res.data.hook, title: res.data.title, description: res.data.description }
            : prev
        );
        setSectionId(res.data.id);
        showSuccess("Gallery section updated successfully!");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update section");
    } finally {
      setIsSavingSection(false);
    }
  };

  // ── Delete item ─────────────────────────────────────────────────────────────
  const handleDeleteItem = async (id: number) => {
    try {
      setIsDeleting(true);
      setError(null);
      const res = await GalleryService.deleteGalleryItem(id);
      if (res.success) {
        showSuccess("Gallery item deleted successfully!");
        setDeletingId(null);
        await refreshItems();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete item");
    } finally {
      setIsDeleting(false);
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm font-medium">Loading Gallery section…</p>
        </div>
      </div>
    );
  }

  const sortedItems = [...items].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div className="min-h-screen bg-linear-to-br from-background to-secondary/10 p-4 md:p-8">
      <div className="max-w-full space-y-8">

        {/* ── Page Header ── */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Gallery Section</h1>
          <p className="text-muted-foreground">
            Manage the Gallery section headline and photo items.
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
            SECTION EDITOR
        ══════════════════════════════════════════════════ */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                <LayoutGrid className="h-4 w-4 text-primary" />
              </div>
              <div>
                <CardTitle>Section Details</CardTitle>
                <CardDescription>
                  Edit the hook, title, and description displayed in the Gallery section.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-5 md:grid-cols-2">
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
                  placeholder="e.g., artworks"
                  className="h-10"
                />
                <p className="text-xs text-muted-foreground">
                  Short tagline displayed above the main title.
                </p>
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
                  placeholder="e.g., Art Gallery"
                  className="h-10"
                />
                <p className="text-xs text-muted-foreground">
                  Main heading for the gallery section.
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
                value={sectionForm.description ?? ""}
                onChange={handleFieldChange}
                placeholder="e.g., This section showcases amazing moments from our team."
                className="min-h-22.5 resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Supporting text shown beneath the section title.
              </p>
            </div>

            <Separator />

            <div className="flex justify-end">
              <Button
                onClick={handleSaveSection}
                disabled={isSavingSection}
                className="min-w-36 gap-2"
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
            GALLERY ITEMS TABLE
        ══════════════════════════════════════════════════ */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                  <Images className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle>Gallery Items</CardTitle>
                  <CardDescription>
                    Manage the photos displayed in the gallery grid.
                  </CardDescription>
                </div>
              </div>
              <Button
                onClick={() =>
                  router.push(
                    `/dashboard/gallery/create?sectionId=${sectionId}`
                  )
                }
                className="gap-2"
                size="sm"
              >
                <Plus className="h-4 w-4" />
                Create Item
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {loadingItems ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : sortedItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
                <Images className="mb-3 h-10 w-10 text-muted-foreground/40" />
                <p className="text-sm font-medium text-muted-foreground">
                  No gallery items yet
                </p>
                <p className="mt-1 text-xs text-muted-foreground/70">
                  Click &ldquo;Create Item&rdquo; to add your first photo.
                </p>
              </div>
            ) : (
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/40">
                      <th className="w-16 px-4 py-3 text-left font-medium text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <ImageIcon className="h-3.5 w-3.5" />
                          Image
                        </span>
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        Title
                      </th>
                      <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell">
                        Description
                      </th>
                      <th className="w-32 px-4 py-3 text-left font-medium text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <ArrowUpDown className="h-3.5 w-3.5" />
                          Order
                        </span>
                      </th>
                      <th className="w-28 px-4 py-3 text-right font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {sortedItems.map((item) => (
                      <tr
                        key={item.id}
                        className="group transition-colors hover:bg-muted/30"
                      >
                        {/* Thumbnail */}
                        <td className="px-4 py-3">
                          {item.image?.url ? (
                            <div className="relative h-10 w-14 overflow-hidden rounded-md border bg-muted">
                              <Image
                                src={item.image.url}
                                alt={item.image.alt_text || item.title}
                                fill
                                className="object-cover"
                                sizes="56px"
                              />
                            </div>
                          ) : (
                            <div className="flex h-10 w-14 items-center justify-center rounded-md border bg-muted">
                              <ImageIcon className="h-4 w-4 text-muted-foreground/40" />
                            </div>
                          )}
                        </td>

                        {/* Title */}
                        <td className="px-4 py-3">
                          <span className="line-clamp-2 font-medium leading-snug">
                            {item.title}
                          </span>
                        </td>

                        {/* Description */}
                        <td className="hidden px-4 py-3 md:table-cell">
                          <span className="line-clamp-2 text-muted-foreground">
                            {item.description}
                          </span>
                        </td>

                        {/* Sort Order */}
                        <td className="px-4 py-3">
                          <Badge variant="secondary" className="tabular-nums">
                            {item.sort_order}
                          </Badge>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 opacity-60 transition-opacity group-hover:opacity-100"
                              onClick={() =>
                                router.push(
                                  `/dashboard/gallery/edit/${item.id}?title=${encodeURIComponent(item.title)}&description=${encodeURIComponent(item.description)}&sort_order=${item.sort_order}&sectionId=${item.gallery_section_id}&alt_text=${encodeURIComponent(item.image?.alt_text ?? "")}&image_title=${encodeURIComponent(item.image?.title ?? "")}&imageUrl=${encodeURIComponent(item.image?.url ?? "")}`
                                )
                              }
                              title="Edit"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive opacity-60 transition-opacity hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
                              onClick={() => setDeletingId(item.id)}
                              title="Delete"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ── Delete confirmation dialog ── */}
      {deletingId !== null && (
        <ConfirmDialog
          message="Are you sure you want to delete this gallery item? This action cannot be undone."
          onConfirm={() => handleDeleteItem(deletingId)}
          onCancel={() => setDeletingId(null)}
        />
      )}
    </div>
  );
}
