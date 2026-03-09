"use client";

import { useEffect, useState } from "react";
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
import { WhyUsItemsService } from "./whyftt.service";
import { WhyUsItem } from "./whyftt";
import {
  Loader2,
  AlertCircle,
  CheckCircle2,
  Trash2,
  Pencil,
  Plus,
  ImageIcon,
  ArrowUpDown,
  LayoutList,
} from "lucide-react";

export default function WhyFTTPage() {
  const router = useRouter();

  const [items, setItems] = useState<WhyUsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const loadItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await WhyUsItemsService.getWhyUsItems();
      if (res.success && res.data) {
        setItems(res.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      setIsDeleting(true);
      const res = await WhyUsItemsService.deleteWhyUsItem(deletingId);
      if (res.success) {
        setItems((prev) => prev.filter((item) => item.id !== deletingId));
        showSuccess("Item deleted successfully.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete item");
    } finally {
      setIsDeleting(false);
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 p-4 md:p-8">
      <div className="max-w-full space-y-6">

        {/* ── Page Header ────────────────────────────────────────────── */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <LayoutList className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Why FTT</h1>
              <p className="text-sm text-muted-foreground">
                Manage the reasons drivers choose First Team Trucking
              </p>
            </div>
          </div>

          <Button
            onClick={() => router.push("/dashboard/whyftt/create")}
            className="flex w-full items-center gap-2 sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            Add New Item
          </Button>
        </div>

        {/* ── Feedback ────────────────────────────────────────────────── */}
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

        {/* ── Table Card ──────────────────────────────────────────────── */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Items</CardTitle>
                <CardDescription>
                  {loading ? "Loading…" : `${items.length} item${items.length !== 1 ? "s" : ""} total`}
                </CardDescription>
              </div>
              {!loading && items.length > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {items.filter((i) => i.is_active).length} active
                </Badge>
              )}
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : items.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
                  <LayoutList className="h-7 w-7 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-semibold">No items yet</p>
                  <p className="text-sm text-muted-foreground">
                    Click "Add New Item" to get started.
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => router.push("/dashboard/whyftt/create")}
                  className="mt-1 gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add New Item
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-16 text-center">#</TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">
                          <ImageIcon className="h-3.5 w-3.5" />
                          Icon
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">
                          Name
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">
                          <ArrowUpDown className="h-3.5 w-3.5" />
                          Sort
                        </div>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item, idx) => (
                      <TableRow key={item.id} className="group">
                        <TableCell className="text-center text-muted-foreground text-sm">
                          {idx + 1}
                        </TableCell>

                        {/* Icon */}
                        <TableCell>
                          {item.icon?.url ? (
                            <div className="relative h-12 w-12 overflow-hidden rounded-lg border bg-secondary/50 shadow-sm">
                              <Image
                                src={item.icon.url}
                                alt={item.icon.alt_text || item.name}
                                fill
                                className="object-cover"
                                sizes="48px"
                              />
                            </div>
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-secondary/50">
                              <ImageIcon className="h-5 w-5 text-muted-foreground" />
                            </div>
                          )}
                        </TableCell>

                        {/* Name */}
                        <TableCell>
                          <span className="font-medium">{item.name}</span>
                        </TableCell>

                        {/* Sort Order */}
                        <TableCell>
                          <Badge variant="outline" className="tabular-nums">
                            {item.sort_order}
                          </Badge>
                        </TableCell>

                        {/* Active / Inactive */}
                        <TableCell>
                          {item.is_active ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/40 dark:text-green-300">
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="text-muted-foreground">
                              Inactive
                            </Badge>
                          )}
                        </TableCell>

                        {/* Actions */}
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2 opacity-70 transition-opacity group-hover:opacity-100">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 gap-1.5 text-xs"
                              onClick={() =>
                                router.push(`/dashboard/whyftt/edit/${item.id}`)
                              }
                            >
                              <Pencil className="h-3.5 w-3.5" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 gap-1.5 border-red-200 text-xs text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
                              onClick={() => setDeletingId(item.id)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Delete
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

      {/* ── Delete Confirm Dialog ──────────────────────────────────────── */}
      {deletingId !== null && (
        <ConfirmDialog
          message="Are you sure you want to delete this item? This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeletingId(null)}
        />
      )}
    </div>
  );
}
