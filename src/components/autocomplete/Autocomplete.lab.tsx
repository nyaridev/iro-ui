// Lab page: Autocomplete with city suggestions, with a search icon and empty text, small, and in a Field.

import { useState } from "react";
import { SearchIcon } from "../../icons/set/controls";
import { Field } from "../field/Field";
import { Icon } from "../icon/Icon";
import { Autocomplete } from "./Autocomplete";

const CITIES = [
  "Amsterdam",
  "Barcelona",
  "Berlin",
  "Copenhagen",
  "Lisbon",
  "London",
  "Madrid",
  "Paris",
  "Prague",
  "Vienna",
];
const COMMANDS = ["Open file", "Open folder", "Open recent", "Save", "Save as", "Close window"];

export default function AutocompleteLab() {
  const [city, setCity] = useState("");
  const [command, setCommand] = useState("");
  return (
    <div className="lab-stack" style={{ maxWidth: 360 }}>
      <h3>In a Field (type "b")</h3>
      <Field label="City" hint="Pick one, or type another." className="lab-fill">
        <Autocomplete value={city} onValueChange={setCity} suggestions={CITIES} placeholder="Where to?" />
      </Field>
      <h3>With an icon and empty text</h3>
      <Autocomplete
        aria-label="Command"
        value={command}
        onValueChange={setCommand}
        suggestions={COMMANDS}
        start={<Icon icon={SearchIcon} />}
        emptyText="No command matches"
        placeholder="Type a command"
        className="lab-fill"
      />
      <h3>Small</h3>
      <Autocomplete aria-label="City" size="sm" value="" onValueChange={() => undefined} suggestions={CITIES} />
    </div>
  );
}
