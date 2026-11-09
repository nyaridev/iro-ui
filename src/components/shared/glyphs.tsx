// Glyphs: the small icons components draw themselves (checks, steppers, close, status), taken from the icon set so
// they follow the style's drawing (ADR-0009). Internal; apps pass their own icons through `icon` props.

// ── Dependencies ──────────────────────────
import type { IconData } from "../../icons/icon";
import { ArrowDownIcon, ArrowUpIcon, ExternalLinkIcon, UploadIcon } from "../../icons/set/arrows";
import { CheckIcon, CloseIcon, MinusIcon, MoreHorizontalIcon, PlusIcon } from "../../icons/set/basics";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
  ChevronUpIcon,
} from "../../icons/set/chevrons";
import { EyeIcon, EyeOffIcon, SearchIcon } from "../../icons/set/controls";
import { CopyIcon } from "../../icons/set/editing";
import { RefreshIcon } from "../../icons/set/history";
import { LightbulbIcon, StarIcon } from "../../icons/set/marks";
import { ImageIcon, MicIcon, PauseIcon, PlayIcon, StopIcon, VolumeIcon, VolumeOffIcon } from "../../icons/set/media";
import { AlertCircleIcon, AlertTriangleIcon, CheckCircleIcon, InfoIcon } from "../../icons/set/status";
import { WrenchIcon } from "../../icons/set/tools";
import { Icon } from "../icon/Icon";

// ── Private helpers ───────────────────────
/** An icon sized by the surrounding text; component CSS sizes `.iro-glyph` where it needs another size. */
const glyph = (icon: IconData) => () => <Icon icon={icon} size="1em" className="iro-glyph" />;

// ── Public API ────────────────────────────
export const CheckGlyph = glyph(CheckIcon);
export const MinusGlyph = glyph(MinusIcon);
export const PlusGlyph = glyph(PlusIcon);
export const ChevronDownGlyph = glyph(ChevronDownIcon);
export const ChevronRightGlyph = glyph(ChevronRightIcon);
export const ChevronLeftGlyph = glyph(ChevronLeftIcon);
export const ChevronUpGlyph = glyph(ChevronUpIcon);
export const ChevronsUpDownGlyph = glyph(ChevronsUpDownIcon);
export const CopyGlyph = glyph(CopyIcon);
export const CloseGlyph = glyph(CloseIcon);
export const InfoGlyph = glyph(InfoIcon);
export const SuccessGlyph = glyph(CheckCircleIcon);
export const WarningGlyph = glyph(AlertTriangleIcon);
export const DangerGlyph = glyph(AlertCircleIcon);
export const UploadGlyph = glyph(UploadIcon);
export const SearchGlyph = glyph(SearchIcon);
export const ArrowUpGlyph = glyph(ArrowUpIcon);
export const ArrowDownGlyph = glyph(ArrowDownIcon);
export const MoreHorizontalGlyph = glyph(MoreHorizontalIcon);
export const LightbulbGlyph = glyph(LightbulbIcon);
export const WrenchGlyph = glyph(WrenchIcon);
export const ExternalLinkGlyph = glyph(ExternalLinkIcon);
export const EyeGlyph = glyph(EyeIcon);
export const EyeOffGlyph = glyph(EyeOffIcon);
export const RefreshGlyph = glyph(RefreshIcon);
export const ImageGlyph = glyph(ImageIcon);
export const MicGlyph = glyph(MicIcon);
export const PauseGlyph = glyph(PauseIcon);
export const PlayGlyph = glyph(PlayIcon);
export const StopGlyph = glyph(StopIcon);
export const VolumeGlyph = glyph(VolumeIcon);
export const VolumeOffGlyph = glyph(VolumeOffIcon);
/** An outline in kon; CSS fills it when it's on. */
export const StarGlyph = glyph(StarIcon);
