// Template: an account's settings. A section list beside a form of panels (profile, preferences, notifications) and a
// danger zone whose button asks first in a dialog.

// ── Dependencies ──────────────────────────
import { useState } from "react";
import {
  Avatar,
  Button,
  Checkbox,
  Dialog,
  Field,
  Icon,
  Panel,
  SectionTitle,
  Segmented,
  Select,
  Slider,
  Switch,
  TextArea,
  TextField,
  TreeRow,
} from "../../../src";
import { BellIcon, type IconData, KeyIcon, PaletteIcon, StoreIcon, UserIcon } from "../../../src/icons";

// ── Constants ─────────────────────────────
const SECTIONS: { id: string; label: string; icon: IconData }[] = [
  { id: "profile", label: "Profile", icon: UserIcon },
  { id: "preferences", label: "Preferences", icon: PaletteIcon },
  { id: "notifications", label: "Notifications", icon: BellIcon },
  { id: "security", label: "Security", icon: KeyIcon },
  { id: "billing", label: "Billing", icon: StoreIcon },
];

const THEMES = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
] as const;

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "de", label: "Deutsch" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "pl", label: "Polski" },
];

const NOTIFICATIONS = [
  { id: "mentions", title: "Mentions", text: "When someone mentions you in a comment.", on: true },
  { id: "digest", title: "Weekly digest", text: "A summary of your projects every Monday.", on: true },
  { id: "updates", title: "Product updates", text: "New features and changes, about once a month.", on: false },
];

// ── Public API ────────────────────────────
/** The settings screen. */
export default function Settings() {
  const [section, setSection] = useState("profile");
  const [theme, setTheme] = useState<(typeof THEMES)[number]["value"]>("system");
  const [language, setLanguage] = useState<string | null>("en");
  const [deleting, setDeleting] = useState(false);

  return (
    <div className="tpl-settings">
      <nav className="tpl-settings-nav" aria-label="Settings">
        <h1>Settings</h1>
        {SECTIONS.map(({ id, label, icon }) => (
          <TreeRow
            key={id}
            size="lg"
            label={label}
            icon={<Icon icon={icon} />}
            selected={id === section}
            onClick={() => setSection(id)}
          />
        ))}
      </nav>

      <form className="tpl-settings-form" onSubmit={(event) => event.preventDefault()}>
        <Panel as="section" padded className="tpl-settings-panel">
          <SectionTitle level={2}>Profile</SectionTitle>
          <div className="tpl-settings-photo">
            <Avatar name="Maya Chen" color="blue" size={56} />
            <Button size="sm">Upload photo</Button>
            <Button size="sm" variant="ghost">
              Remove
            </Button>
          </div>
          <div className="tpl-settings-pair">
            <Field label="Name">
              <TextField defaultValue="Maya Chen" autoComplete="name" />
            </Field>
            <Field label="Email" hint="We send receipts and sign-in links here.">
              <TextField type="email" defaultValue="maya@example.com" autoComplete="email" />
            </Field>
          </div>
          <Field label="Bio">
            <TextArea defaultValue="Designer working on tools for small teams." rows={3} />
          </Field>
        </Panel>

        <Panel as="section" padded className="tpl-settings-panel">
          <SectionTitle level={2}>Preferences</SectionTitle>
          <div className="tpl-settings-pair">
            <Field label="Theme">
              <Segmented aria-label="Theme" options={[...THEMES]} value={theme} onValueChange={setTheme} full />
            </Field>
            <Field label="Language">
              <Select aria-label="Language" options={LANGUAGES} value={language} onValueChange={setLanguage} />
            </Field>
          </div>
          <Field label="Text size">
            <Slider aria-label="Text size" defaultValue={14} min={12} max={20} format={(value) => `${value} px`} />
          </Field>
          <Checkbox defaultChecked label="Compact lists" description="Show more rows on each screen." />
        </Panel>

        <Panel as="section" padded className="tpl-settings-panel">
          <SectionTitle level={2}>Notifications</SectionTitle>
          {NOTIFICATIONS.map(({ id, title, text, on }) => (
            <div key={id} className="tpl-settings-toggle">
              <div>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
              <Switch defaultChecked={on} aria-label={title} />
            </div>
          ))}
        </Panel>

        <Panel as="section" padded className="tpl-settings-panel tpl-settings-danger">
          <SectionTitle level={2}>Danger zone</SectionTitle>
          <div className="tpl-settings-toggle tpl-settings-delete">
            <div>
              <strong>Delete account</strong>
              <span>Removes your projects and files for good.</span>
            </div>
            <Dialog
              title="Delete your account?"
              description="Your projects, files and history are removed, and this can't be undone."
              size="sm"
              open={deleting}
              onOpenChange={setDeleting}
              trigger={<Button variant="danger">Delete account</Button>}
              footer={
                <>
                  <Button onClick={() => setDeleting(false)}>Cancel</Button>
                  <Button variant="danger" onClick={() => setDeleting(false)}>
                    Delete account
                  </Button>
                </>
              }
            />
          </div>
        </Panel>

        <footer className="tpl-settings-footer">
          <Button variant="ghost">Cancel</Button>
          <Button type="submit" variant="primary">
            Save changes
          </Button>
        </footer>
      </form>
    </div>
  );
}
