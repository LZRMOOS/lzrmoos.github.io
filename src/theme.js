import { ref } from "vue";

const stored = typeof localStorage !== "undefined" ? localStorage.getItem("theme") : null;
export const theme = ref(stored === "dark" ? "dark" : "light");

function applyTheme(value) {
  theme.value = value;
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-theme", value);
  }
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("theme", value);
  }
}

export function initTheme() {
  applyTheme(theme.value);
}

export function toggleTheme() {
  applyTheme(theme.value === "light" ? "dark" : "light");
}
