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
import { ConfirmDialog } from "../components/ui/confirm-dialog";
import { BenefitsService } from "./benefits.service";
import {
  BenefitsSection,
  BenefitsItem,
  UpdateBenefitsSectionPayload,
} from "./benefits";
import {
  Loader2,
  AlertCircle,
  CheckCircle2,
  Pencil,
  Trash2,
  Plus,
  Save,
  Gift,
  ListChecks,
  ArrowUpDown,
} from "lucide-react";

export default function BenefitsPage() {
  const router = useRouter();

  // ── Section state ───────────────────────────────────────────────────────────────
  const [section, setSection] = useState<BenefitsSection | null>(null);
  const [sectionForm, setSectionForm] = useState<UpdateBenefitsSectionPayload>({});
  const [isSavingSection, setIsSavingSection] = useState(false);

  // ── Items state ─────────────────────────────────────────────────────────────────
  const [items, setItems] = useState<BenefitsItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // ── Shared state ────────────────────────────────────────────────────────────────
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const showSuccess = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(null), 3500);
  };

  // ── Initial load ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        setError(null);
        const [sectionsRes, itemsRes] = await Promise.all([
          BenefitsService.getBenefitsSections(),
          BenefitsService.getBenefitsItems(),
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

  // ── Refresh items ──────────────────────────────────────────────────────────────
  const refreshItems = async () => {
    try {
      setLoadingItems(true);
      const res = await BenefitsService.getBenefitsItems();
      if (res.success) setItems(res.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to refresh items");
    } finally {
      setLoadingItems(false);
    }
  };

  // ── Section handlers ───────────────────────────────────────────────────────────
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSectionForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveSection = async () => {
    if (!section) return;
    if (!sectionForm.hook?.trim() || !sectionForm.title?.trim()) {
      setError("Hook and Title are required");
      return;
    }
    try {
      setIsSavingSection(true);
      setError(null);
      const res = await BenefitsService.updateBenefitsSection(section.id, sectionForm);
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

  // ── Delete item ───────────────────────────────────────────────────────────────────
  const handleDeleteItem = async (id: number) => {
    try {
      setIsDeleting(true);
      setError(null);
      const res = await BenefitsService.deleteBenefitsItem(id);
      if (res.success) {
        showSuccess("Benefit item deleted successfully!");
        setDeletingId(null);
        await refreshItems();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete item");
    } finally {
      setIsDeleting(false);
    }
  };

  // ── Render ───────────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm font-medium">Loading Benefits section…</p>
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
          <h1 className="text-3xl font-bold tracking-tight">Benefits Section</h1>
          <p className="text-muted-foreground">
            Manage the Benefits section content and benefit items list.
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
                <Gift className="h-4 w-4 text-primary" />
              </div>
              <div>
                <CardTitle>Section Details</CardTitle>
                <CardDescription>
                  Edit the headline and hook text displayed in the Benefits section.
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
                  placeholder="e.g., Why Drivers Love Us"
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
                  placeholder="e.g., Benefits That Make a Difference"
                  className="h-10"
                />
                <p className="text-xs text-muted-foreground">
                  Main heading for the benefits section.
                </p>
              </div>
            </div>

            <Separator />

            <div className="flex justify-end">
              <Button
                onClick={handleSaveSection}
                disabled={isSavingSection || !section}
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
                  <CardTitle>Benefit Items</CardTitle>
                  <CardDescription>
                    Manage the list of benefits displayed to drivers.
                  </CardDescription>
                </div>
              </div>
              <Button
                onClick={() =>
                  router.push(
                    `/dashboard/benefits/create?sectionId=${section?.id ?? 1}`
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
                <ListChecks className="mb-3 h-10 w-10 text-muted-foreground/40" />
                <p className="text-sm font-medium text-muted-foreground">No benefit items yet</p>
                <p className="mt-1 text-xs text-muted-foreground/70">
                  Click &ldquo;Create Item&rdquo; to add your first benefit.
                </p>
              </div>
            ) : (
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/40">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <ListChecks className="h-3.5 w-3.5" />
                          Benefit Text
                        </span>
                      </th>
                      <th className="w-32 px-4 py-3 text-left font-medium text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <ArrowUpDown className="h-3.5 w-3.5" />
                          Sort Order
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
                        <td className="px-4 py-3">
                          <span className="line-clamp-2 font-medium leading-snug">
                            {item.text}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="secondary" className="tabular-nums">
                            {item.sort_order}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 opacity-60 transition-opacity group-hover:opacity-100"
                              onClick={() =>
                                router.push(
                                  `/dashboard/benefits/edit/${item.id}?text=${encodeURIComponent(item.text)}&sort_order=${item.sort_order}&sectionId=${item.benefits_section_id}`
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
          message="Are you sure you want to delete this benefit item? This action cannot be undone."
          onConfirm={() => handleDeleteItem(deletingId)}
          onCancel={() => setDeletingId(null)}
        />
      )}
    </div>
  );
}
