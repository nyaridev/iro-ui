// Lab page: NativeSelect in a Field, with groups, in three sizes, wrong and turned off.

import { Field } from "../field/Field";
import { NativeSelect } from "./NativeSelect";

export default function NativeSelectLab() {
  return (
    <div className="lab-stack" style={{ maxWidth: 320 }}>
      <h3>In a Field</h3>
      <Field label="Country" className="lab-fill">
        <NativeSelect defaultValue="pt">
          <option value="de">Germany</option>
          <option value="nl">Netherlands</option>
          <option value="pt">Portugal</option>
          <option value="es">Spain</option>
        </NativeSelect>
      </Field>
      <h3>With groups</h3>
      <NativeSelect aria-label="Time zone" defaultValue="cet" className="lab-fill">
        <optgroup label="Europe">
          <option value="wet">Western European Time</option>
          <option value="cet">Central European Time</option>
        </optgroup>
        <optgroup label="Americas">
          <option value="est">Eastern Time</option>
          <option value="pst">Pacific Time</option>
        </optgroup>
      </NativeSelect>
      <h3>Sizes</h3>
      <NativeSelect aria-label="Small" size="sm" className="lab-fill">
        <option>Small</option>
      </NativeSelect>
      <NativeSelect aria-label="Large" size="lg" className="lab-fill">
        <option>Large</option>
      </NativeSelect>
      <h3>Wrong, and turned off</h3>
      <NativeSelect aria-label="Wrong" invalid className="lab-fill">
        <option>Pick one</option>
      </NativeSelect>
      <NativeSelect aria-label="Turned off" disabled className="lab-fill">
        <option>Locked</option>
      </NativeSelect>
    </div>
  );
}
