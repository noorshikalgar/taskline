import { Clock4 } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDuration, parseDuration } from "@/lib/duration";
import type { Visibility } from "@/lib/types";

interface Props {
  open: boolean;
  taskTitle: string;
  onOpenChange: (open: boolean) => void;
  onSubmit: (input: LogTimeInput) => Promise<void>;
}

export interface LogTimeInput {
  occurredAt: string;
  durationMinutes: number;
  contentMarkdown: string;
  visibility: Visibility;
}

function todayDate() {
  return new Date().toISOString().slice(0, 10);
}

export function LogTimeDialog({
  open,
  taskTitle,
  onOpenChange,
  onSubmit,
}: Props) {
  const [date, setDate] = useState(todayDate());
  const [duration, setDuration] = useState("");
  const [note, setNote] = useState("");
  const [visibility, setVisibility] = useState<Visibility>("private");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setDate(todayDate());
      setDuration("");
      setNote("");
      setVisibility("private");
      setError("");
    }
  }, [open]);

  const parsedMinutes = parseDuration(duration);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!parsedMinutes) {
      setError(
        "Enter a duration like 30m, 2h, 1d 30m, or 1w (1d = 8h, 1w = 5d).",
      );
      return;
    }
    if (!date) {
      setError("Pick the date the work was done.");
      return;
    }
    setError("");
    setSaving(true);
    try {
      const stamp = new Date(`${date}T12:00:00`).toISOString();
      const content =
        note.trim() ||
        `Logged ${formatDuration(parsedMinutes)} on ${taskTitle}.`;
      await onSubmit({
        occurredAt: stamp,
        durationMinutes: parsedMinutes,
        contentMarkdown: content,
        visibility,
      });
      onOpenChange(false);
    } catch (cause) {
      setError(String(cause));
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock4 className="size-4 text-muted-foreground" />
            Log time
          </DialogTitle>
          <DialogDescription>
            Record how long you spent on {taskTitle}. Press Enter to submit.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={submit}>
          <div className="grid grid-cols-[1fr_auto] gap-3">
            <div className="space-y-2">
              <Label htmlFor="log-date">Date</Label>
              <Input
                id="log-date"
                onChange={(event) => setDate(event.target.value)}
                type="date"
                value={date}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="log-duration">Time spent</Label>
              <Input
                aria-describedby="log-duration-hint"
                autoFocus
                className="w-32 font-mono"
                id="log-duration"
                onChange={(event) => {
                  setDuration(event.target.value);
                  if (error) setError("");
                }}
                placeholder="1d 3h"
                value={duration}
              />
            </div>
          </div>
          <p
            className="-mt-2 font-mono text-[10px] text-muted-foreground"
            id="log-duration-hint"
          >
            {parsedMinutes
              ? `= ${formatDuration(parsedMinutes)}`
              : "Units: 1d = 8h, 1w = 5d. Combine: 1w 3d 4h 30m."}
          </p>
          <div className="space-y-2">
            <Label htmlFor="log-note">Note (optional)</Label>
            <Input
              id="log-note"
              onChange={(event) => setNote(event.target.value)}
              placeholder="What did you work on?"
              value={note}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="log-visibility">Visibility</Label>
            <Select
              onValueChange={(value) => setVisibility(value as Visibility)}
              value={visibility}
            >
              <SelectTrigger className="h-8" id="log-visibility">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="report">Report eligible</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {error && (
            <p className="text-xs text-destructive" role="alert">
              {error}
            </p>
          )}
          <DialogFooter>
            <Button
              onClick={() => onOpenChange(false)}
              type="button"
              variant="ghost"
            >
              Cancel
            </Button>
            <Button disabled={saving} type="submit" variant="default">
              {saving ? "Logging…" : "Log time"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
