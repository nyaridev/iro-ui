// Template: an account's settings. A section list beside a column of panels (profile, preferences, notifications,
// security, billing, a danger zone); the list scrolls to a section and follows the one in view. On a narrow column a
// select jumps between sections instead. Save is on once something changed; Cancel puts the saved values back.

// ── Dependencies ──────────────────────────
import { useEffect, useId, useRef, useState } from "react";
import {
  Avatar,
  Button,
  Checkbox,
  Field,
  Icon,
  NativeSelect,
  Panel,
  SectionTitle,
  Segmented,
  Select,
  Slider,
  Switch,
  TextArea,
  TextField,
  Toaster,
  TreeRow,
  toast,
} from "../../../src";
import { motionOf } from "../../../src/effects";
import { Billing } from "./Billing";
import { DangerZone } from "./DangerZone";
import { LANGUAGES, NOTIFICATIONS, SAVED, SECTIONS, THEMES, type Values } from "./data";
import { Security } from "./Security";

// ── Constants ─────────────────────────────
/** How long after a jump the list ignores what scrolls past, so it lands on the section picked. */
const SETTLE = 900;

// ── Public API ────────────────────────────
/** The settings screen. */
export default function Settings() {
  const root = useRef<HTMLDivElement>(null);
  const jumped = useRef(0);
  const uid = useId();
  const [saved, setSaved] = useState(SAVED);
  const [values, setValues] = useState(SAVED);
  const [active, setActive] = useState(SECTIONS[0].id);
  const dirty = JSON.stringify(values) !== JSON.stringify(saved);
  const idOf = (section: string) => `${uid}-${section}`;
  const set = <K extends keyof Values>(key: K, value: Values[K]) => setValues((all) => ({ ...all, [key]: value }));

  // The list follows the last section reaching into the top third of the screen, below the strip a sticky header
  // covers (the same strip the sections' scroll margin keeps clear), so a sliver of the one before doesn't win.
  useEffect(() => {
    const showing = new Map<string, boolean>();
    const first = document.getElementById(`${uid}-${SECTIONS[0].id}`);
    const covered = first ? getComputedStyle(first).scrollMarginTop : "0px";
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) showing.set(entry.target.id, entry.isIntersecting);
        const top = SECTIONS.filter(({ id }) => showing.get(`${uid}-${id}`)).at(-1);
        if (top && Date.now() - jumped.current > SETTLE) setActive(top.id);
      },
      { rootMargin: `-${covered} 0px -66% 0px` },
    );
    for (const { id } of SECTIONS) {
      const section = document.getElementById(`${uid}-${id}`);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [uid]);

  const jump = (section: string) => {
    const moves = ["full", "smooth"].includes(motionOf(root.current));
    jumped.current = Date.now();
    setActive(section);
    document.getElementById(idOf(section))?.scrollIntoView({ behavior: moves ? "smooth" : "auto", block: "start" });
  };
  const save = () => {
    setSaved(values);
    toast({ title: "Settings saved", tone: "success" });
  };

  return (
    <div ref={root} className="tpl-settings">
      <nav className="tpl-settings-nav" aria-label="Settings">
        <h1>Settings</h1>
        {SECTIONS.map(({ id, label, icon }) => (
          <TreeRow
            key={id}
            size="lg"
            label={label}
            icon={<Icon icon={icon} />}
            selected={id === active}
            onClick={() => jump(id)}
          />
        ))}
      </nav>

      <form
        className="tpl-settings-form"
        onSubmit={(event) => {
          event.preventDefault();
          if (dirty) save();
        }}
      >
        <div className="tpl-settings-jump">
          <h1>Settings</h1>
          <NativeSelect aria-label="Section" size="sm" value={active} onChange={(event) => jump(event.target.value)}>
            {SECTIONS.map(({ id, label }) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </NativeSelect>
        </div>

        <Panel as="section" padded id={idOf("profile")} className="tpl-settings-panel">
          <SectionTitle level={2}>Profile</SectionTitle>
          <div className="tpl-settings-photo">
            <Avatar name={values.name || "?"} color="blue" size={56} />
            <Button size="sm">Upload photo</Button>
            <Button size="sm" variant="ghost">
              Remove
            </Button>
          </div>
          <div className="tpl-settings-pair">
            <Field label="Name" error={values.name.trim() ? undefined : "Enter a name."}>
              <TextField
                value={values.name}
                onChange={(event) => set("name", event.target.value)}
                autoComplete="name"
              />
            </Field>
            <Field label="Email" hint="We send receipts and sign-in links here.">
              <TextField
                type="email"
                value={values.email}
                onChange={(event) => set("email", event.target.value)}
                autoComplete="email"
              />
            </Field>
          </div>
          <Field label="Bio">
            <TextArea value={values.bio} onChange={(event) => set("bio", event.target.value)} rows={3} />
          </Field>
        </Panel>

        <Panel as="section" padded id={idOf("preferences")} className="tpl-settings-panel">
          <SectionTitle level={2}>Preferences</SectionTitle>
          <div className="tpl-settings-pair">
            <Field label="Theme">
              <Segmented
                aria-label="Theme"
                options={[...THEMES]}
                value={values.theme}
                onValueChange={(theme) => set("theme", theme)}
                full
              />
            </Field>
            <Field label="Language">
              <Select
                aria-label="Language"
                options={LANGUAGES}
                value={values.language}
                onValueChange={(language) => set("language", language)}
              />
            </Field>
          </div>
          <Field label="Text size">
            <Slider
              aria-label="Text size"
              value={values.textSize}
              onValueChange={(size) => set("textSize", size)}
              min={12}
              max={20}
              format={(value) => `${value} px`}
            />
          </Field>
          <Checkbox
            checked={values.compact}
            onCheckedChange={(compact) => set("compact", compact)}
            label="Compact lists"
            description="Show more rows on each screen."
          />
        </Panel>

        <Panel as="section" padded id={idOf("notifications")} className="tpl-settings-panel">
          <SectionTitle level={2}>Notifications</SectionTitle>
          {NOTIFICATIONS.map(({ id, title, text }) => (
            <div key={id} className="tpl-settings-toggle">
              <div>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
              <Switch
                checked={values.notify[id]}
                onCheckedChange={(on) => set("notify", { ...values.notify, [id]: on })}
                aria-label={title}
              />
            </div>
          ))}
        </Panel>

        <Security id={idOf("security")} twoFactor={values.twoFactor} onTwoFactorChange={(on) => set("twoFactor", on)} />
        <Billing id={idOf("billing")} />
        <DangerZone id={idOf("danger")} email={saved.email} />

        <footer className="tpl-settings-footer" data-dirty={dirty || undefined}>
          {dirty ? <span>Unsaved changes</span> : null}
          <Button variant="ghost" disabled={!dirty} onClick={() => setValues(saved)}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={!dirty || !values.name.trim()}>
            Save changes
          </Button>
        </footer>
      </form>
      <Toaster />
    </div>
  );
}
