// Onboarding's answers: what the wizard collects, the choices it offers and the checks that gate Continue.

// ── Constants ─────────────────────────────
export const EMAIL = "maya@example.com";

/** The code the fake server says is wrong; any other six digits pass. */
export const WRONG_CODE = "000000";

/** Workspace addresses someone already has. */
const TAKEN = ["acme", "harbor", "test", "admin"];

export const ROLES = [
  { value: "design", label: "Design" },
  { value: "engineering", label: "Engineering" },
  { value: "product", label: "Product" },
  { value: "marketing", label: "Marketing" },
  { value: "other", label: "Something else" },
];

export const USES = [
  { value: "docs", label: "Docs and notes", description: "Write specs, guides and meeting notes." },
  { value: "tasks", label: "Tasks and projects", description: "Plan work and track who does what." },
  { value: "files", label: "Files", description: "Keep designs, exports and assets together." },
];

export const SIZES = [
  { value: "solo", label: "Just me" },
  { value: "small", label: "2–10" },
  { value: "medium", label: "11–50" },
  { value: "large", label: "50+" },
] as const;

export const INVITE_ROLES = [
  { value: "admin", label: "Admin" },
  { value: "member", label: "Member" },
  { value: "viewer", label: "Viewer" },
];

export const SWATCHES = ["#2f6fdf", "#7c4ddb", "#d0457a", "#d9622b", "#2e9a5e", "#1f8a9e"];

// ── Types ─────────────────────────────────
export interface Setup {
  code: string;
  role: string | null;
  uses: string[];
  name: string;
  slug: string;
  /** Once the address is typed, it stops following the name. */
  slugEdited: boolean;
  size: (typeof SIZES)[number]["value"];
  color: string;
  invites: string[];
  inviteRole: string | null;
}

/** What every step gets: the answers and a way to change some of them. */
export interface StepProps {
  setup: Setup;
  update: (patch: Partial<Setup>) => void;
}

// ── Public API ────────────────────────────
/** The answers before the person gives any. */
export const START: Setup = {
  code: "",
  role: null,
  uses: [],
  name: "",
  slug: "",
  slugEdited: false,
  size: "small",
  color: SWATCHES[0],
  invites: [],
  inviteRole: "member",
};

/** An option's label by its value. */
export const labelOf = (options: readonly { value: string; label: string }[], value: string | null) =>
  options.find((option) => option.value === value)?.label;

/** An address from a name: "Maya's Studio" → "mayas-studio". */
export const slugFrom = (name: string) =>
  name
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 30);

/** What's wrong with a workspace name, or "" when it's fine (an empty one is only unfinished). */
export const nameError = (name: string) => (name.trim().length === 1 ? "Use at least 2 characters." : "");

/** What's wrong with an address, or "" (an empty one is only unfinished). */
export function slugError(slug: string): string {
  if (!slug) return "";
  if (!/^[a-z0-9-]+$/.test(slug)) return "Use lowercase letters, numbers and hyphens.";
  if (slug.length < 3) return "Use at least 3 characters.";
  if (TAKEN.includes(slug)) return `harbor.app/${slug} is taken.`;
  return "";
}

/** Whether text looks like an email address. */
export const isEmail = (text: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);

/** Whether a step's answers let Continue go. */
export function stepReady(step: number, setup: Setup): boolean {
  if (step === 0) return setup.code.length === 6;
  if (step === 1) return setup.role !== null && setup.uses.length > 0;
  if (step === 2) return setup.name.trim().length >= 2 && setup.slug !== "" && !slugError(setup.slug);
  if (step === 3) return setup.invites.length > 0 && setup.inviteRole !== null;
  return true;
}
