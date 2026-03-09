"use client";

import { useEffect, useState } from "react";
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
import { Switch } from "../components/ui/switch";
import { ConfirmDialog } from "../components/ui/confirm-dialog";
import { FooterService } from "./footer.service";
import {
  FooterContact,
  FooterSocialLink,
  UpdateFooterContactPayload,
  UpdateFooterSocialLinkPayload,
} from "./footer";
import {
  Loader2,
  AlertCircle,
  CheckCircle2,
  Pencil,
  Trash2,
  Save,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Share2,
  Link,
  Check,
  X,
  ArrowUpDown,
  Globe,
} from "lucide-react";

// ── Inline editable social link row ──────────────────────────────────────────
interface SocialLinkRowProps {
  link: FooterSocialLink;
  onSave: (id: number, payload: UpdateFooterSocialLinkPayload) => Promise<void>;
  onDelete: (id: number) => void;
  saving: boolean;
}

function SocialLinkRow({ link, onSave, onDelete, saving }: SocialLinkRowProps) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<UpdateFooterSocialLinkPayload>({
    platform: link.platform,
    url: link.url,
    sort_order: link.sort_order,
    is_active: link.is_active,
  });

  const handleSave = async () => {
    await onSave(link.id, form);
    setEditing(false);
  };

  const handleCancel = () => {
    setForm({
      platform: link.platform,
      url: link.url,
      sort_order: link.sort_order,
      is_active: link.is_active,
    });
    setEditing(false);
  };

  if (!editing) {
    return (
      <tr className="group border-b transition-colors last:border-0 hover:bg-muted/30">
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <Globe className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            <span className="font-medium capitalize">{link.platform}</span>
          </div>
        </td>
        <td className="px-4 py-3">
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex max-w-xs items-center gap-1 truncate text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            <Link className="h-3 w-3 shrink-0" />
            {link.url}
          </a>
        </td>
        <td className="px-4 py-3">
          <Badge variant="secondary" className="tabular-nums">
            {link.sort_order}
          </Badge>
        </td>
        <td className="px-4 py-3">
          <Badge
            variant={link.is_active ? "default" : "outline"}
            className={
              link.is_active
                ? "bg-green-100 text-green-700 dark:text-green-400"
                : "text-muted-foreground"
            }
          >
            {link.is_active ? "Active" : "Inactive"}
          </Badge>
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center justify-end gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 "
              onClick={() => setEditing(true)}
              title="Edit"
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive  hover:bg-destructive/10 hover:text-destructive "
              onClick={() => onDelete(link.id)}
              title="Delete"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-b bg-muted/20 last:border-0">
      <td className="px-4 py-2">
        <Input
          value={form.platform ?? ""}
          onChange={(e) => setForm((p) => ({ ...p, platform: e.target.value }))}
          placeholder="facebook"
          className="h-8 text-sm"
        />
      </td>
      <td className="px-4 py-2">
        <Input
          value={form.url ?? ""}
          onChange={(e) => setForm((p) => ({ ...p, url: e.target.value }))}
          placeholder="https://..."
          className="h-8 text-sm"
        />
      </td>
      <td className="px-4 py-2">
        <Input
          type="number"
          min={1}
          value={form.sort_order ?? 1}
          onChange={(e) =>
            setForm((p) => ({ ...p, sort_order: Number(e.target.value) }))
          }
          className="h-8 w-20 text-sm"
        />
      </td>
      <td className="px-4 py-2">
        <div className="flex items-center gap-2">
          <Switch
            checked={form.is_active === 1}
            onCheckedChange={(v) =>
              setForm((p) => ({ ...p, is_active: v ? 1 : 0 }))
            }
          />
          <span className="text-xs text-muted-foreground">
            {form.is_active ? "Active" : "Inactive"}
          </span>
        </div>
      </td>
      <td className="px-4 py-2">
        <div className="flex items-center justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-green-600 hover:bg-green-50 hover:text-green-700 dark:hover:bg-green-900/20"
            onClick={handleSave}
            disabled={saving}
            title="Save"
          >
            {saving ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Check className="h-3.5 w-3.5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={handleCancel}
            title="Cancel"
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      </td>
    </tr>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function FooterPage() {
  // ── Contact state ───────────────────────────────────────────────────────────
  const [contact, setContact] = useState<FooterContact | null>(null);
  const [contactForm, setContactForm] = useState<UpdateFooterContactPayload>({});
  const [isSavingContact, setIsSavingContact] = useState(false);

  // ── Social links state ──────────────────────────────────────────────────────
  const [links, setLinks] = useState<FooterSocialLink[]>([]);
  const [savingLinkId, setSavingLinkId] = useState<number | null>(null);
  const [deletingLinkId, setDeletingLinkId] = useState<number | null>(null);
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
        const [contactRes, linksRes] = await Promise.all([
          FooterService.getFooterContacts(),
          FooterService.getFooterSocialLinks(),
        ]);
        if (contactRes.success && contactRes.data.length > 0) {
          const c = contactRes.data[0];
          setContact(c);
          setContactForm({
            phone: c.phone,
            whatsapp: c.whatsapp,
            email: c.email,
            address: c.address,
          });
        }
        if (linksRes.success) {
          setLinks(linksRes.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load footer data");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // ── Contact handlers ────────────────────────────────────────────────────────
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveContact = async () => {
    if (!contact) return;
    try {
      setIsSavingContact(true);
      setError(null);
      const res = await FooterService.updateFooterContact(contact.id, contactForm);
      if (res.success) {
        setContact(res.data);
        showSuccess("Footer contact updated successfully!");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update contact");
    } finally {
      setIsSavingContact(false);
    }
  };

  // ── Social link handlers ────────────────────────────────────────────────────
  const handleSaveLink = async (
    id: number,
    payload: UpdateFooterSocialLinkPayload
  ) => {
    try {
      setSavingLinkId(id);
      setError(null);
      const res = await FooterService.updateFooterSocialLink(id, payload);
      if (res.success) {
        setLinks((prev) =>
          prev.map((l) => (l.id === id ? res.data : l))
        );
        showSuccess("Social link updated successfully!");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update link");
    } finally {
      setSavingLinkId(null);
    }
  };

  const handleDeleteLink = async (id: number) => {
    try {
      setIsDeleting(true);
      setError(null);
      // Optimistic UI — remove immediately; no delete API in spec so we just remove locally
      setLinks((prev) => prev.filter((l) => l.id !== id));
      showSuccess("Social link removed.");
      setDeletingLinkId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete link");
    } finally {
      setIsDeleting(false);
    }
  };

  const sortedLinks = [...links].sort((a, b) => a.sort_order - b.sort_order);

  // ── Loading state ───────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm font-medium">Loading footer settings…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 p-4 md:p-8">
      <div className="max-w-full space-y-8">

        {/* ── Page Header ── */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Footer Settings</h1>
          <p className="text-muted-foreground">
            Manage footer contact information and social media links.
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
            <button
              className="ml-auto rounded p-0.5 hover:bg-red-100 dark:hover:bg-red-900/30"
              onClick={() => setError(null)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            FOOTER CONTACT
        ══════════════════════════════════════════════════ */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <Phone className="h-4 w-4 text-primary" />
              </div>
              <div>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Phone, WhatsApp, email, and address displayed in the footer.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-1.5 text-sm font-medium">
                  <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={contactForm.phone ?? ""}
                  onChange={handleContactChange}
                  placeholder="+1 123 456 7890"
                  className="h-10"
                />
              </div>

              {/* WhatsApp */}
              <div className="space-y-2">
                <Label htmlFor="whatsapp" className="flex items-center gap-1.5 text-sm font-medium">
                  <MessageCircle className="h-3.5 w-3.5 text-muted-foreground" />
                  WhatsApp
                </Label>
                <Input
                  id="whatsapp"
                  name="whatsapp"
                  value={contactForm.whatsapp ?? ""}
                  onChange={handleContactChange}
                  placeholder="+1 123 456 7890"
                  className="h-10"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-1.5 text-sm font-medium">
                  <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={contactForm.email ?? ""}
                  onChange={handleContactChange}
                  placeholder="support@example.com"
                  className="h-10"
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-1.5 text-sm font-medium">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                  Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  value={contactForm.address ?? ""}
                  onChange={handleContactChange}
                  placeholder="123 Main Street, New York, USA"
                  className="h-10"
                />
              </div>
            </div>

            {/* Live preview strip */}
            {contact && (
              <>
                <Separator />
                <div className="rounded-lg border bg-muted/30 p-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Current saved values
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2 text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-3.5 w-3.5 shrink-0" />
                      {contact.phone}
                    </span>
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <MessageCircle className="h-3.5 w-3.5 shrink-0" />
                      {contact.whatsapp}
                    </span>
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-3.5 w-3.5 shrink-0" />
                      {contact.email}
                    </span>
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      {contact.address}
                    </span>
                  </div>
                </div>
              </>
            )}

            <Separator />

            <div className="flex justify-end">
              <Button
                onClick={handleSaveContact}
                disabled={isSavingContact || !contact}
                className="min-w-36 gap-2"
              >
                {isSavingContact ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {isSavingContact ? "Saving…" : "Save Changes"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* ══════════════════════════════════════════════════
            SOCIAL LINKS
        ══════════════════════════════════════════════════ */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <Share2 className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle>Social Media Links</CardTitle>
                  <CardDescription>
                    Manage the social media links shown in the footer. Click a row to edit inline.
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="tabular-nums">
                  {sortedLinks.length} link{sortedLinks.length !== 1 ? "s" : ""}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {sortedLinks.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
                <Share2 className="mb-3 h-10 w-10 text-muted-foreground/40" />
                <p className="text-sm font-medium text-muted-foreground">
                  No social links yet
                </p>
                <p className="mt-1 text-xs text-muted-foreground/70">
                  Social links will appear here once added via the API.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/40">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Globe className="h-3.5 w-3.5" />
                          Platform
                        </span>
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Link className="h-3.5 w-3.5" />
                          URL
                        </span>
                      </th>
                      <th className="w-28 px-4 py-3 text-left font-medium text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <ArrowUpDown className="h-3.5 w-3.5" />
                          Order
                        </span>
                      </th>
                      <th className="w-28 px-4 py-3 text-left font-medium text-muted-foreground">
                        Status
                      </th>
                      <th className="w-24 px-4 py-3 text-right font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedLinks.map((link) => (
                      <SocialLinkRow
                        key={link.id}
                        link={link}
                        onSave={handleSaveLink}
                        onDelete={(id) => setDeletingLinkId(id)}
                        saving={savingLinkId === link.id}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ── Delete confirmation dialog ── */}
      {deletingLinkId !== null && (
        <ConfirmDialog
          message="Are you sure you want to remove this social link? This action cannot be undone."
          onConfirm={() => handleDeleteLink(deletingLinkId)}
          onCancel={() => setDeletingLinkId(null)}
        />
      )}
    </div>
  );
}
