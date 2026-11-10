// Template data: Settings. The sections, the saved values the form starts from, and the lists it shows.

// ── Dependencies ──────────────────────────
import {
  AlertTriangleIcon,
  BellIcon,
  type IconData,
  KeyIcon,
  MonitorIcon,
  PaletteIcon,
  SmartphoneIcon,
  StoreIcon,
  UserIcon,
} from "../../../src/icons";

// ── Constants ─────────────────────────────
export const SECTIONS: { id: string; label: string; icon: IconData }[] = [
  { id: "profile", label: "Profile", icon: UserIcon },
  { id: "preferences", label: "Preferences", icon: PaletteIcon },
  { id: "notifications", label: "Notifications", icon: BellIcon },
  { id: "security", label: "Security", icon: KeyIcon },
  { id: "billing", label: "Billing", icon: StoreIcon },
  { id: "danger", label: "Danger zone", icon: AlertTriangleIcon },
];

export const THEMES = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
] as const;

export const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "de", label: "Deutsch" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "pl", label: "Polski" },
];

export const NOTIFICATIONS = [
  { id: "mentions", title: "Mentions", text: "When someone mentions you in a comment." },
  { id: "digest", title: "Weekly digest", text: "A summary of your projects every Monday." },
  { id: "updates", title: "Product updates", text: "New features and changes, about once a month." },
] as const;

export const SESSIONS = [
  { id: "this", device: "Windows · Firefox", place: "Kraków, Poland", when: "Now", icon: MonitorIcon, current: true },
  { id: "phone", device: "iPhone · Safari", place: "Kraków, Poland", when: "2 hours ago", icon: SmartphoneIcon },
  { id: "laptop", device: "macOS · Chrome", place: "Berlin, Germany", when: "Last week", icon: MonitorIcon },
];

export const INVOICES = [
  { id: "INV-1042", date: "Nov 2026", amount: 96, paid: false },
  { id: "INV-1041", date: "Oct 2026", amount: 96, paid: true },
  { id: "INV-1040", date: "Sep 2026", amount: 84, paid: true },
  { id: "INV-1039", date: "Aug 2026", amount: 84, paid: true },
];

/** What the form shows when nothing has been changed. */
export const SAVED = {
  name: "Maya Chen",
  email: "maya@example.com",
  bio: "Designer working on tools for small teams.",
  theme: "system" as (typeof THEMES)[number]["value"],
  language: "en" as string | null,
  textSize: 14,
  compact: true,
  notify: { mentions: true, digest: true, updates: false } as Record<(typeof NOTIFICATIONS)[number]["id"], boolean>,
  twoFactor: false,
};

// ── Types ─────────────────────────────────
export type Values = typeof SAVED;
