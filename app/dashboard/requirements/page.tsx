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
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { ConfirmDialog } from "../components/ui/confirm-dialog";
import { RequirementsService } from "./requirements.service";
import { NeedsSection, NeedsItem, UpdateNeedsSectionPayload } from "./requirements";
import {
  Loader2,
  AlertCircle,
  CheckCircle2,
  Save,
  Plus,
  Pencil,
  Trash2,
  FileText,
  ListChecks,
  ArrowUpDown,
} from "lucide-react";

export default function RequirementsPage() {
  const router = useRouter();

  // ── Section state ──────────────────────────────────────────────────────────
  const [section, setSection] = useState<NeedsSection | null>(null);
  const [sectionForm, setSectionForm] = useState<UpdateNeedsSectionPayload>({});
  const [isSavingSection, setIsSavingSection] = useState(false);

  // ── Items state ────────────────────────────────────────────────────────────
  const [items, setItems] = useState<NeedsItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);
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
        const [sectionsRes, itemsRes] = await Promise.all([
          RequirementsService.getNeedsSections(),
          RequirementsService.getNeedsItems(),
        ]);
        if (sectionsRes.success && sectionsRes.data.length > 0) {
          const s = sectionsRes.data[0];
          setSection(s);
          setSectionForm({ hook: s.hook, title: s.title });
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

  // ── Refresh items ──────────────────────────────────────────────────────────
  const refreshItems = async () => {
    try {
      setLoadingItems(true);
      const res = await RequirementsService.getNeedsItems();
      if (res.success) setItems(res.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to refresh items");
    } finally {
      setLoadingItems(false);
    }
  };

  // ── Section form handlers ──────────────────────────────────────────────────
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSectionForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveSection = async () => {
    if (!section) return;
    const { hook, title } = sectionForm;
    if (!hook?.trim() || !title?.trim()) {
      setError("Hook and title are required");
      return;
    }
    try {
      setIsSavingSection(true);
      setError(null);
      const res = await RequirementsService.updateNeedsSection(section.id, { hook, title });
      if (res.success) {
        setSection(res.data);
        showSuccess("Section updated successfully!");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update section");
    } finally {
      setIsSavingSection(false);
    }
  };

  // ── Delete item ────────────────────────────────────────────────────────────
  const handleDeleteItem = async (id: number) => {
    try {
      setIsDeleting(true);
      setError(null);
      const res = await RequirementsService.deleteNeedsItem(id);
      if (res.success) {
        showSuccess("Item deleted successfully!");
        setDeletingId(null);
        await refreshItems();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete item");
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
          <p className="text-sm font-medium">Loading Requirements section…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-background to-secondary/10 p-4 md:p-8">
      <div className="max-w-full space-y-8">

        {/* ── Page Header ── */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Requirements Section</h1>
          <p className="text-muted-foreground">
            Manage the &quot;Who Is This For?&quot; section heading and requirement items.
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
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <div>
                <CardTitle>Edit Section Heading</CardTitle>
                <CardDescription>
                  Update the hook and title displayed at the top of the Requirements section.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="hook" className="text-sm font-medium">
                  Hook <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="hook"
                  name="hook"
                  value={sectionForm.hook ?? ""}
                  onChange={handleFieldChange}
                  placeholder="e.g., Who Is This For?"
                  className="h-10"
                />
                <p className="text-xs text-muted-foreground">
                  Short attention-grabbing label above the title.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={sectionForm.title ?? ""}
                  onChange={handleFieldChange}
                  placeholder="e.g., Designed For Professionals"
                  className="h-10"
                />
                <p className="text-xs text-muted-foreground">
                  Main heading displayed in the section.
                </p>
              </div>
            </div>

            <Separator />

            <div className="flex justify-end">
              <Button
                onClick={handleSaveSection}
                disabled={isSavingSection || !section}
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
            ITEMS TABLE
        ══════════════════════════════════════════════════ */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                  <ListChecks className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle>Requirement Items</CardTitle>
                  <CardDescription>
                    Items displayed in the requirements checklist.
                  </CardDescription>
                </div>
              </div>
              <Button
                size="sm"
                className="gap-2"
                onClick={() =>
                  router.push(
                    `/dashboard/requirements/craete${section ? `?sectionId=${section.id}` : ""}`
                  )
                }
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
            ) : items.length === 0 ? (
              <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed py-14 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <ArrowUpDown className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">No items yet</p>
                  <p className="text-sm text-muted-foreground">
                    Click &quot;Create Item&quot; to add the first requirement.
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
                      <TableHead className="w-32 text-center">Sort Order</TableHead>
                      <TableHead className="w-28 text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...items]
                      .sort((a, b) => a.sort_order - b.sort_order)
                      .map((item, idx) => (
                        <TableRow
                          key={item.id}
                          className="group transition-colors hover:bg-muted/30"
                        >
                          <TableCell className="text-center text-sm text-muted-foreground">
                            {idx + 1}
                          </TableCell>
                          <TableCell className="font-medium">{item.text}</TableCell>
                          <TableCell className="text-center">
                            <Badge variant="secondary" className="tabular-nums">
                              {item.sort_order}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center gap-1">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 "
                                onClick={() =>
                                  router.push(
                                    `/dashboard/requirements/edit/${item.id}?text=${encodeURIComponent(item.text)}&sort_order=${item.sort_order}&sectionId=${item.needs_section_id}`
                                  )
                                }
                                title="Edit"
                              >
                                <Pencil className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8  text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                                onClick={() => setDeletingId(item.id)}
                                title="Delete"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
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
          message="Are you sure you want to delete this item? This action cannot be undone."
          onConfirm={() => handleDeleteItem(deletingId)}
          onCancel={() => setDeletingId(null)}
        />
      )}
    </div>
  );
}
