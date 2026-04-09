import { useRef, useState, useEffect, useCallback } from "react";
import {
  unstable_useContentManagerContext,
  unstable_useDocumentActions,
} from "@strapi/content-manager/strapi-admin";
import { setAutoSaveState } from "./useAutoSaveStore.js";

const DEBOUNCE_MS = 2000;

const INTERNAL_FIELDS = [
  "id",
  "documentId",
  "createdAt",
  "updatedAt",
  "publishedAt",
  "createdBy",
  "updatedBy",
  "locale",
  "localizations",
  "__temp_key__",
  "strapi_assignee",
  "strapi_stage",
];

function hasUserContent(vals) {
  if (!vals || typeof vals !== "object") return false;

  const isFilled = (value) => {
    if (value === null || value === undefined) return false;
    if (typeof value === "string") return value.trim().length > 0;
    if (typeof value === "number" || typeof value === "boolean") return true;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "object") return Object.keys(value).length > 0;
    return false;
  };

  return Object.entries(vals).some(
    ([key, value]) => !INTERNAL_FIELDS.includes(key) && isFilled(value),
  );
}

export function useAutoSave() {
  const {
    form,
    model,
    id: documentId,
    collectionType,
    isCreatingEntry,
  } = unstable_useContentManagerContext();
  const { modified: isModified, values } = form;
  const { update, create } = unstable_useDocumentActions();

  const [status, setStatus] = useState("idle");
  const [lastSavedAt, setLastSavedAt] = useState(null);
  const [saveError, setSaveError] = useState(null);

  const ctxRef = useRef(null);
  ctxRef.current = {
    isModified,
    isCreatingEntry,
    values,
    model,
    documentId,
    collectionType,
  };

  const updateFnRef = useRef(update);
  const createFnRef = useRef(create);
  useEffect(() => {
    updateFnRef.current = update;
  }, [update]);
  useEffect(() => {
    createFnRef.current = create;
  }, [create]);

  const createdDocIdRef = useRef(null);

  useEffect(() => {
    if (documentId) {
      createdDocIdRef.current = documentId;
    } else if (!isCreatingEntry) {
      createdDocIdRef.current = null;
    }
  }, [documentId, isCreatingEntry]);

  const performSave = useCallback(async () => {
    const {
      isCreatingEntry: creating,
      isModified: modified,
      values: v,
      model: m,
      documentId: docId,
      collectionType: ct,
    } = ctxRef.current;

    if (!modified) return;

    const effectiveDocId = createdDocIdRef.current || docId;
    const isNewEntry = (creating || !docId) && !createdDocIdRef.current;

    if (isNewEntry && !hasUserContent(v)) return;

    setStatus("saving");
    setAutoSaveState({ status: "saving", saveError: null });
    setSaveError(null);

    try {
      let result;

      if (isNewEntry) {
        result = await createFnRef.current({ collectionType: ct, model: m }, v);

        const newId =
          result?.data?.documentId ?? result?.documentId ?? result?.id;

        if (newId) {
          createdDocIdRef.current = newId;
          const newPath = `/admin/content-manager/${ct}/${m}/${newId}`;
          window.history.replaceState(null, "", newPath);
        }
      } else {
        result = await updateFnRef.current(
          { collectionType: ct, model: m, documentId: effectiveDocId },
          v,
        );
      }

      if (result && "error" in result) {
        const msg = result.error?.message ?? "Auto-save failed";
        setSaveError(msg);
        setStatus("error");
        setAutoSaveState({ status: "error", saveError: msg });
      } else {
        const now = new Date();
        setLastSavedAt(now);
        setStatus("saved");
        setAutoSaveState({
          status: "saved",
          lastSavedAt: now,
          saveError: null,
        });
      }
    } catch (err) {
      const msg = err?.message ?? "Unexpected error during auto-save";
      setSaveError(msg);
      setStatus("error");
      setAutoSaveState({ status: "error", saveError: msg });
    }
  }, []);

  useEffect(() => {
    if (!isModified) return;

    const {
      isCreatingEntry: creating,
      documentId: docId,
      values: v,
    } = ctxRef.current;
    const isNewEntry = (creating || !docId) && !createdDocIdRef.current;
    if (isNewEntry && !hasUserContent(v)) return;

    setStatus("unsaved");
    setAutoSaveState({ status: "unsaved" });

    const timer = setTimeout(() => {
      performSave();
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [values, isModified, performSave]);

  useEffect(() => {
    if (!isModified && status !== "saving") {
      setStatus("idle");
      setAutoSaveState({ status: "idle" });
    }
  }, [isModified, status]);

  const saveNow = useCallback(() => {
    performSave();
  }, [performSave]);

  return { status, lastSavedAt, saveError, saveNow, isModified };
}
