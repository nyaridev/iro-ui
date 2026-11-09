// Lab page: Skeletons standing in for a card: an avatar circle, a title line and two text lines.

import { Skeleton } from "./Skeleton";

export default function SkeletonLab() {
  return (
    <div className="lab-row" style={{ alignItems: "flex-start", maxWidth: 360 }}>
      <Skeleton shape="circle" width={40} height={40} />
      <div className="lab-stack" style={{ flex: 1, gap: 8, alignItems: "stretch" }}>
        <Skeleton width="60%" height={16} />
        <Skeleton />
        <Skeleton width="80%" />
      </div>
    </div>
  );
}
