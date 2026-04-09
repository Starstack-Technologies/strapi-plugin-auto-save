import { useAutoSaveStore } from "../hooks/useAutoSaveStore.js";

function fmt(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function AutoSaveHeaderAction() {
  const { status, lastSavedAt } = useAutoSaveStore();

  const message =
    {
      unsaved: "Unsaved changes",
      saving: "Saving...",
      saved: lastSavedAt ? `Saved at ${fmt(lastSavedAt)}` : "Saved",
      error: "Save failed",
      idle: null,
    }[status] ?? null;

  if (!message) return null;

  return {
    id: "auto-save.header-status",
    _status: { message },
  };
}
