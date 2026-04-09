import { useAutoSaveStore } from "../hooks/useAutoSaveStore.js";

export function createAutoSaveUpdateAction(originalUpdateAction) {
  function AutoSaveUpdateAction(props) {
    const { status } = useAutoSaveStore();

    const base = originalUpdateAction(props);
    if (!base) return null;

    const isSaving = status === "saving";
    const isSaved = status === "saved";
    const shouldDisable = isSaved || (base.disabled && status !== "unsaved");

    return {
      ...base,
      label: isSaving ? "Saving…" : (base.label ?? "Save"),
      loading: isSaving || !!base.loading,
      disabled: shouldDisable,
    };
  }

  AutoSaveUpdateAction.type = "update";
  AutoSaveUpdateAction.position = originalUpdateAction.position;

  return AutoSaveUpdateAction;
}
