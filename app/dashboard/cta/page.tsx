"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CtaService } from "./cta.service";
import { Cta, CtaButton, CtaEditState } from "./cta";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { Switch } from "../components/ui/switch";
import { Skeleton } from "../components/ui/skeleton";
import {
  Plus,
  Trash2,
  Save,
  RefreshCw,
  AlertCircle,
  ExternalLink,
  Megaphone,
} from "lucide-react";


//  Constants

const ORDINAL_LABELS = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth"];
const MAX_CTAS = 6;
const MAX_BUTTONS = 4;

function getOrdinal(index: number): string {
  return ORDINAL_LABELS[index] ?? `#${index + 1}`;
}


//  Converters: API â†” local edit state

function apiToEdit(cta: Cta): CtaEditState {
  const buttons: CtaButton[] = [];
  if (cta.button1_text || cta.button1_link) {
    buttons.push({ text: cta.button1_text, link: cta.button1_link, is_active: 1 });
  }
  if (cta.button2_text || cta.button2_link) {
    buttons.push({ text: cta.button2_text ?? "", link: cta.button2_link ?? "", is_active: 1 });
  }
  return {
    id: cta.id,
    title: cta.title,
    description: cta.description,
    buttons,
    sort_order: cta.sort_order,
    is_active: cta.is_active,
  };
}

function editToPayload(state: CtaEditState): Record<string, any> {
  // Build payload and explicitly clear inactive button slots by sending
  // `null` so the server will remove stored fields. If a button slot does
  // not exist in the edit state we omit it (no change).
  const payload: Record<string, any> = {
    title: state.title,
    description: state.description,
    sort_order: state.sort_order,
    is_active: state.is_active,
  };

  // Button slot 1
  const btn1 = state.buttons[0];
  if (btn1) {
    if (btn1.is_active === 1) {
      payload.button1_text = btn1.text ?? "";
      payload.button1_link = btn1.link ?? "";
    } else {
      // explicit clear: use empty string instead of null to avoid DB NOT NULL constraints
      payload.button1_text = "";
      payload.button1_link = "";
    }
  }

  // Button slot 2
  const btn2 = state.buttons[1];
  if (btn2) {
    if (btn2.is_active === 1) {
      payload.button2_text = btn2.text ?? "";
      payload.button2_link = btn2.link ?? "";
    } else {
      // explicit clear: use empty string instead of null to avoid DB NOT NULL constraints
      payload.button2_text = "";
      payload.button2_link = "";
    }
  }

  return payload;
}

const EMPTY_BUTTON: CtaButton = { text: "", link: "", is_active: 1 };

const EMPTY_CTA: CtaEditState = {
  title: "",
  description: "",
  buttons: [{ ...EMPTY_BUTTON }],
  sort_order: 1,
  is_active: 1,
};

 
//  Button Editor Row

interface ButtonRowProps {
  button: CtaButton;
  index: number;
  ctaIndex: number;
  onChange: (updated: CtaButton) => void;
  onDelete: () => void;
  canDelete: boolean;
}

function ButtonRow({ button, index, ctaIndex, onChange, onDelete, canDelete }: ButtonRowProps) {
  const label = index === 0 ? "Primary" : index === 1 ? "Secondary" : `Button ${index + 1}`;

  return (
    <div
      className={`rounded-lg border p-4 space-y-3 transition-colors ${
        button.is_active === 1
          ? "bg-muted/20 border-border"
          : "bg-muted/5 border-dashed border-muted-foreground/30 opacity-60"
      }`}
    >
      {/* Row header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            {label}
          </span>
          {button.is_active === 0 && (
            <Badge variant="outline" className="text-[10px] text-muted-foreground border-muted-foreground/40 py-0">
              Inactive
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground hidden sm:block">
              {button.is_active ? "On" : "Off"}
            </span>
            <Switch
              checked={button.is_active === 1}
              onCheckedChange={(checked: boolean) =>
                onChange({ ...button, is_active: checked ? 1 : 0 })
              }
            />
          </div>

          {/* {canDelete && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onDelete}
              className="h-7 w-7 text-destructive hover:bg-destructive/10 hover:text-destructive"
              title="Remove this button"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          )} */}
        </div>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor={`btn-txt-${ctaIndex}-${index}`} className="text-xs">
            Button Label
          </Label>
          <Input
            id={`btn-txt-${ctaIndex}-${index}`}
            value={button.text}
            onChange={(e) => onChange({ ...button, text: e.target.value })}
            placeholder="e.g., Get Started"
            className="h-8 text-sm bg-background"
            disabled={button.is_active === 0}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor={`btn-lnk-${ctaIndex}-${index}`} className="text-xs">
            URL / Link
          </Label>
          <div className="relative">
            <ExternalLink className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
            <Input
              id={`btn-lnk-${ctaIndex}-${index}`}
              value={button.link}
              onChange={(e) => onChange({ ...button, link: e.target.value })}
              placeholder="https://example.com"
              className="h-8 text-sm bg-background pl-7"
              disabled={button.is_active === 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}


//  Single CTA Editor Card

interface CtaCardProps {
  cta: CtaEditState;
  index: number;
  onChange: (updated: CtaEditState) => void;
  onDelete: () => void;
  onSave: () => Promise<void>;
  saving: boolean;
}

function CtaCard({ cta, index, onChange, onDelete, onSave, saving }: CtaCardProps) {
  const hasId = typeof cta.id === "number";

  function updateButton(btnIdx: number, updated: CtaButton) {
    onChange({ ...cta, buttons: cta.buttons.map((b, i) => (i === btnIdx ? updated : b)) });
  }

  function removeButton(btnIdx: number) {
    onChange({ ...cta, buttons: cta.buttons.filter((_, i) => i !== btnIdx) });
  }

  function addButton() {
    if (cta.buttons.length >= MAX_BUTTONS) return;
    onChange({ ...cta, buttons: [...cta.buttons, { ...EMPTY_BUTTON }] });
  }

  const activeButtons = cta.buttons.filter((b) => b.is_active === 1).length;

  return (
    <Card className="border-2 transition-colors hover:border-primary/30">
      {/*  Header  */}
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
              <Megaphone className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">
                {getOrdinal(index)} CTA
              </CardTitle>
              <CardDescription className="text-xs">
                {hasId
                  ? `ID: ${cta.id} Â· Sort #${cta.sort_order} Â· ${activeButtons} active button${activeButtons !== 1 ? "s" : ""}`
                  : "New Â· Not yet saved to server"}
              </CardDescription>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Section active toggle */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground hidden sm:block">
                {cta.is_active ? "Visible" : "Hidden"}
              </span>
              <Switch
                checked={cta.is_active === 1}
                onCheckedChange={(checked: boolean) =>
                  onChange({ ...cta, is_active: checked ? 1 : 0 })
                }
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={onDelete}
              className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive shrink-0"
              title="Remove this CTA"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <Separator />

      {/*  Content  */}
      <CardContent className="pt-5 space-y-5">
        {/* Title + Sort Order */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-1.5">
            <Label htmlFor={`title-${index}`} className="text-sm font-medium">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id={`title-${index}`}
              value={cta.title}
              onChange={(e) => onChange({ ...cta, title: e.target.value })}
              placeholder="e.g., Start Your Free Trial"
              className="bg-muted/40"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor={`sort-${index}`} className="text-sm font-medium">
              Sort Order
            </Label>
            <Input
              id={`sort-${index}`}
              type="number"
              min={1}
              value={cta.sort_order}
              onChange={(e) =>
                onChange({ ...cta, sort_order: parseInt(e.target.value, 10) || 1 })
              }
              className="bg-muted/40"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <Label htmlFor={`desc-${index}`} className="text-sm font-medium">
            Description
          </Label>
          <Textarea
            id={`desc-${index}`}
            value={cta.description}
            onChange={(e) => onChange({ ...cta, description: e.target.value })}
            placeholder="Short supporting text shown below the title"
            className="bg-muted/40 resize-none min-h-18"
          />
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground/80">Buttons</p>
              <p className="text-xs text-muted-foreground">
                {cta.buttons.length} button{cta.buttons.length !== 1 ? "s" : ""} Â· {activeButtons} active
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={addButton}
              disabled={cta.buttons.length >= MAX_BUTTONS}
              className="h-7 gap-1.5 text-xs"
            >
              <Plus className="h-3 w-3" />
              Add Button
            </Button>
          </div>

          <div className="space-y-2">
            {cta.buttons.length === 0 ? (
              <div className="rounded-lg border-2 border-dashed border-muted-foreground/20 py-6 flex flex-col items-center gap-2 text-center">
                <p className="text-sm text-muted-foreground">No buttons added</p>
                <Button variant="ghost" size="sm" onClick={addButton} className="gap-1.5 text-xs h-7">
                  <Plus className="h-3 w-3" /> Add First Button
                </Button>
              </div>
            ) : (
              cta.buttons.map((btn, btnIdx) => (
                <ButtonRow
                  key={btnIdx}
                  button={btn}
                  index={btnIdx}
                  ctaIndex={index}
                  onChange={(updated) => updateButton(btnIdx, updated)}
                  onDelete={() => removeButton(btnIdx)}
                  canDelete={cta.buttons.length > 0}
                />
              ))
            )}
          </div>
        </div>
      </CardContent>

      {/*  Footer  */}
      <CardFooter className="pt-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant={cta.is_active ? "default" : "secondary"} className="text-xs">
            {cta.is_active ? "Visible on site" : "Hidden"}
          </Badge>
          {!hasId && (
            <Badge variant="outline" className="text-xs text-amber-600 border-amber-300">
              Local only
            </Badge>
          )}
        </div>

        <Button
          size="sm"
          onClick={onSave}
          disabled={saving || !hasId}
          className="gap-1.5 min-w-30 shrink-0"
          title={!hasId ? "No backend create endpoint available" : "Save changes to server"}
        >
          {saving ? (
            <>
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-3.5 w-3.5" />
              Save Changes
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}


//  Main Page

export default function CtaPage() {
  const [ctas, setCtas] = useState<CtaEditState[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingIndex, setSavingIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchCtas();
  }, []);

  async function fetchCtas() {
    try {
      setLoading(true);
      const res = await CtaService.getAll();
      if (res.success) {
        setCtas(res.data.slice(0, MAX_CTAS).map(apiToEdit));
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to load CTAs");
    } finally {
      setLoading(false);
    }
  }

  function addCta() {
    if (ctas.length >= MAX_CTAS) {
      toast.warning(`Maximum of ${MAX_CTAS} CTAs allowed.`);
      return;
    }
    setCtas((prev) => [...prev, { ...EMPTY_CTA, sort_order: prev.length + 1 }]);
  }

  function removeCta(index: number) {
    setCtas((prev) => prev.filter((_, i) => i !== index));
  }

  function updateCta(index: number, updated: CtaEditState) {
    setCtas((prev) => prev.map((c, i) => (i === index ? updated : c)));
  }

  async function saveCta(index: number) {
    const cta = ctas[index];
    if (typeof cta.id !== "number") {
      toast.info("This CTA has no server ID  it cannot be saved via the API.");
      return;
    }

    try {
      setSavingIndex(index);
      const res = await CtaService.update(cta.id, editToPayload(cta));

      if (res.success) {
        toast.success(`${getOrdinal(index)} CTA saved successfully`);
        setCtas((prev) => prev.map((c, i) => (i === index ? apiToEdit(res.data) : c)));
      } else {
        toast.error(res.message || "Update failed");
      }
    } catch (err: any) {
      const msg =
        err?.details?.message ||
        (typeof err?.details === "object" ? JSON.stringify(err.details) : null) ||
        err?.message ||
        "Update failed";
      toast.error(msg);
    } finally {
      setSavingIndex(null);
    }
  }

  //  Loading skeleton 
  if (loading) {
    return (
      <div className="p-4 md:p-8 space-y-6 max-w-full">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-9 w-52" />
            <Skeleton className="h-4 w-80" />
          </div>
          <Skeleton className="h-9 w-28" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-full" />
                <div className="space-y-1.5">
                  <Skeleton className="h-5 w-28" />
                  <Skeleton className="h-3 w-44" />
                </div>
              </div>
              <Skeleton className="h-px w-full" />
              <div className="grid grid-cols-3 gap-4">
                <Skeleton className="col-span-2 h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-18 w-full" />
              <div className="space-y-2">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-full">
      {/*  Page Header â”€ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Call-to-Action Manager</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage up to <strong>{MAX_CTAS}</strong> CTA sections. Each CTA supports up to{" "}
            <strong>{MAX_BUTTONS}</strong> buttons with individual active/inactive control.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchCtas}
            disabled={loading}
            className="gap-1.5"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          <Button
            size="sm"
            onClick={addCta}
            disabled={ctas.length >= MAX_CTAS}
            className="gap-1.5"
          >
            <Plus className="h-3.5 w-3.5" />
            Add CTA
          </Button>
        </div>
      </div>

      {/*  Status bar  */}
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="outline" className="gap-1.5 text-sm py-1 px-3">
          <span className="h-2 w-2 rounded-full bg-green-500 inline-block" />
          {ctas.filter((c) => c.is_active === 1).length} Visible
        </Badge>
        <Badge variant="outline" className="gap-1.5 text-sm py-1 px-3">
          <span className="h-2 w-2 rounded-full bg-slate-400 inline-block" />
          {ctas.filter((c) => c.is_active === 0).length} Hidden
        </Badge>
        <Badge variant="outline" className="gap-1.5 text-sm py-1 px-3">
          {ctas.length} / {MAX_CTAS} slots used
        </Badge>
      </div>

      {/*  CTA Cards â”€ */}
      <div className="space-y-5">
        {ctas.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-20 gap-4 text-center">
            <AlertCircle className="h-10 w-10 text-muted-foreground/50" />
            <div>
              <p className="font-semibold text-muted-foreground">No CTAs yet</p>
              <p className="text-sm text-muted-foreground/70 mt-1">
                Click "Add CTA" to create your first call-to-action section.
              </p>
            </div>
            <Button onClick={addCta} className="gap-1.5 mt-2">
              <Plus className="h-4 w-4" />
              Add First CTA
            </Button>
          </div>
        ) : (
          ctas.map((cta, index) => (
            <CtaCard
              key={index}
              cta={cta}
              index={index}
              onChange={(updated) => updateCta(index, updated)}
              onDelete={() => removeCta(index)}
              onSave={() => saveCta(index)}
              saving={savingIndex === index}
            />
          ))
        )}

        {/* Add CTA button at the bottom */}
        {ctas.length > 0 && ctas.length < MAX_CTAS && (
          <button
            onClick={addCta}
            className="
              w-full rounded-xl border-2 border-dashed border-muted-foreground/25
              py-5 flex items-center justify-center gap-2 text-muted-foreground
              text-sm font-medium transition-colors
              hover:border-primary/40 hover:text-primary hover:bg-primary/5
            "
          >
            <Plus className="h-4 w-4" />
            Add {getOrdinal(ctas.length)} CTA
          </button>
        )}
      </div>
    </div>
  );
}
