"use client";

import { useState, useEffect } from "react";
import { SectionHeading } from "@/components/SectionHeading";

export default function SettingsPage() {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch current settings on mount
  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/dashboard/settings");
        if (!res.ok) throw new Error("Failed to fetch settings");
        const data = await res.json();
        setBackgroundImage(data.backgroundImage || "");
      } catch (err) {
        setError("Failed to load current settings");
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.set("file", file);
      const res = await fetch("/api/dashboard/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Upload failed.");
        e.target.value = "";
        return;
      }

      const data = await res.json();
      setBackgroundImage(data.url);
      e.target.value = "";
    } catch {
      setError("Upload failed.");
      e.target.value = "";
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    if (!backgroundImage.trim()) {
      setError("Please upload or provide an image URL.");
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/dashboard/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ backgroundImage: backgroundImage.trim() }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Failed to save settings.");
        return;
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-base text-ink/70">Loading settings...</p>;
  }

  return (
    <div>
      <SectionHeading>Settings</SectionHeading>
      <p className="mt-2 text-base text-ink/70">Manage your website appearance.</p>

      <div className="mt-8 max-w-xl rounded-lg border border-stone/20 p-6 shadow-sm backdrop-blur-md bg-opacity-80" style={{ backgroundColor: 'var(--card-background)', color: 'var(--card-text-color)' }}>
        <h2 className="font-serif text-xl font-semibold text-white">Site Background Image</h2>
        <p className="mt-1 text-base text-white/80">
          Upload or provide a URL for the global background image that appears across the website.
        </p>

        {error && (
          <p className="mt-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-base text-red-700">
            {error}
          </p>
        )}

        {success && (
          <p className="mt-4 rounded border border-green-200 bg-green-50 px-3 py-2 text-base text-green-700">
            Background image saved successfully!
          </p>
        )}

        <div className="mt-4 space-y-4">
          {backgroundImage && (
            <div className="rounded border border-stone/20 bg-stone/5 p-3">
              <p className="text-sm font-medium text-ink/70">Current image</p>
              <p className="mt-1 break-all text-base text-ink">{backgroundImage}</p>
            </div>
          )}

          <div>
            <label className="block text-base font-medium text-ink">Image URL</label>
            <input
              type="text"
              value={backgroundImage}
              onChange={(e) => setBackgroundImage(e.target.value)}
              placeholder="https://… or /uploads/… from upload below"
              className="mt-1 w-full rounded border border-stone/30 bg-white px-3 py-2 text-base text-ink focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
            />
          </div>

          <div>
            <label className="block text-base font-medium text-ink">Or upload from device</label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              disabled={uploading}
              className="mt-1 block w-full text-base text-ink file:mr-3 file:rounded file:border-0 file:bg-ink file:px-3 file:py-1.5 file:text-cream file:hover:bg-ink/90"
              onChange={handleUpload}
            />
            {uploading && <p className="mt-1 text-base text-ink/70">Uploading…</p>}
          </div>

          <button
            onClick={handleSave}
            disabled={saving || !backgroundImage.trim()}
            className="w-full rounded bg-ink px-8 py-3 text-base font-semibold text-cream hover:bg-ink/90 disabled:opacity-50 shadow-2xl transition"
          >
            {saving ? "Saving…" : "Save background image"}
          </button>
        </div>
      </div>
    </div>
  );
}
