import { useSyncExternalStore } from "react";

type ScrollNavState = {
  canGoLeft: boolean;
  canGoRight: boolean;
  goLeft: () => void;
  goRight: () => void;
};

const noop = () => {};

let state: ScrollNavState = {
  canGoLeft: false,
  canGoRight: true,
  goLeft: noop,
  goRight: noop,
};

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

export function setScrollNav(next: ScrollNavState) {
  state = next;
  notify();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot() {
  return state;
}

const serverSnapshot: ScrollNavState = {
  canGoLeft: false,
  canGoRight: true,
  goLeft: noop,
  goRight: noop,
};

export function useScrollNav() {
  return useSyncExternalStore(subscribe, getSnapshot, () => serverSnapshot);
}
