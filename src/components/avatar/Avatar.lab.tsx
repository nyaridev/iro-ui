// Lab page: Avatar initials in a few colors and sizes, ringed, and with a picture.

import { Avatar } from "./Avatar";

// A tiny generated picture, so the page needs no network.
const PICTURE =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'><rect width='40' height='40' fill='%23345'/><circle cx='20' cy='16' r='7' fill='%23cde'/><rect x='8' y='26' width='24' height='14' rx='7' fill='%23cde'/></svg>";

export default function AvatarLab() {
  return (
    <div className="lab-row" style={{ gap: 16 }}>
      <Avatar name="Alex Kim" />
      <Avatar name="Design Team" color="purple" ring />
      <Avatar name="Sam" color="green" size={40} />
      <Avatar name="Jordan Lee" color="pink" size={48} ring />
      <Avatar name="With picture" src={PICTURE} size={40} ring />
    </div>
  );
}
