// Lab page: AvatarGroup with everyone showing, with a "+N" count, with pictures missing, and in three sizes.

import { AvatarGroup, type AvatarGroupPerson } from "./AvatarGroup";

const TEAM: AvatarGroupPerson[] = [
  { name: "Maya Chen", color: "blue" },
  { name: "Leo Park", color: "green" },
  { name: "Sara Novak", color: "purple" },
  { name: "Tom Reyes", color: "orange" },
  { name: "Ines Ferreira", color: "pink" },
  { name: "Ravi Shah", color: "cyan" },
  { name: "Ana Lima", color: "yellow" },
  { name: "Jonas Berg", color: "red" },
];

export default function AvatarGroupLab() {
  return (
    <div className="lab-stack">
      <h3>Everyone fits</h3>
      <AvatarGroup people={TEAM.slice(0, 3)} />
      <h3>The rest as a count</h3>
      <AvatarGroup people={TEAM} label="Project members" />
      <h3>Sizes</h3>
      <div className="lab-row">
        <AvatarGroup people={TEAM} max={3} size={22} />
        <AvatarGroup people={TEAM} max={3} />
        <AvatarGroup people={TEAM} max={3} size={40} />
      </div>
    </div>
  );
}
