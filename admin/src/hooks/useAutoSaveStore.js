import { useSyncExternalStore } from "react";

const initialState = { status: "idle", lastSavedAt: null, saveError: null };

let state = { ...initialState };
const listeners = new Set();

function notify() {
  listeners.forEach((fn) => fn());
}

export function setAutoSaveState(updates) {
  state = { ...state, ...updates };
  notify();
}

export function getAutoSaveState() {
  return state;
}

function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function useAutoSaveStore() {
  return useSyncExternalStore(subscribe, getAutoSaveState, getAutoSaveState);
}
