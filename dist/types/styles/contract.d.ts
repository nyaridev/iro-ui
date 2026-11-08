/** Every token, without the `--iro-` prefix, grouped by purpose, with what it's for. */
export declare const TOKENS: {
    readonly surfaces: {
        readonly bg: "App background";
        readonly surface: "Panels on the background";
        readonly "surface-2": "Cards inside panels";
        readonly "surface-3": "Floating layers: menus, popovers, tooltips";
        readonly field: "Inputs, on surface or surface-2";
        readonly "field-hover": "Inputs under the pointer";
        readonly sunken: "Wells and tracks inside a field";
        readonly line: "Borders";
        readonly "line-strong": "Borders on hover and around floating layers";
        readonly overlay: "The scrim behind dialogs and sheets";
        readonly thumb: "Slider thumbs: a light knob in every theme";
    };
    readonly text: {
        readonly fg: "Body text";
        readonly "fg-2": "Labels";
        readonly "fg-3": "Muted text: the weakest anyone must read";
        readonly "fg-4": "Hints, counts and disabled text";
    };
    readonly accent: {
        readonly accent: "Accent fills: primary buttons, checked toggles, slider fills";
        readonly "accent-ink": "Accent text and icons on the background";
        readonly "on-accent": "Text and icons on an accent fill";
        readonly "accent-soft": "Tinted fills: selected rows, chips";
        readonly focus: "The focus ring";
    };
    readonly status: {
        readonly success: "Success text and icons";
        readonly warning: "Warning text and icons";
        readonly danger: "Danger text and icons, and the danger button";
        readonly info: "Info text and icons";
        readonly "success-soft": "Success tinted fill (notices, badges)";
        readonly "warning-soft": "Warning tinted fill";
        readonly "danger-soft": "Danger tinted fill";
        readonly "info-soft": "Info tinted fill";
        readonly disabled: "Fill of a disabled filled control";
        readonly "on-disabled": "Text on a disabled control";
        readonly track: "The empty part of slider and progress tracks";
    };
    readonly palette: {
        readonly red: "Palette fill";
        readonly "red-ink": "Palette text";
        readonly orange: "Palette fill";
        readonly "orange-ink": "Palette text";
        readonly yellow: "Palette fill";
        readonly "yellow-ink": "Palette text";
        readonly green: "Palette fill";
        readonly "green-ink": "Palette text";
        readonly cyan: "Palette fill";
        readonly "cyan-ink": "Palette text";
        readonly blue: "Palette fill";
        readonly "blue-ink": "Palette text";
        readonly purple: "Palette fill";
        readonly "purple-ink": "Palette text";
        readonly pink: "Palette fill";
        readonly "pink-ink": "Palette text";
    };
    readonly type: {
        readonly "font-ui": "UI text";
        readonly "font-mono": "Numbers, paths, code";
        readonly "font-display": "Page and window titles";
        readonly "text-2xs": "Badges, captions";
        readonly "text-xs": "Hints, dense rows";
        readonly "text-sm": "The UI base size";
        readonly "text-base": "Body copy";
        readonly "text-lg": "Section titles";
        readonly "text-xl": "Dialog titles";
        readonly "text-2xl": "Page titles";
        readonly "text-3xl": "Hero headings";
        readonly leading: "Line height for UI text";
        readonly "leading-tight": "Line height for headings";
    };
    readonly shape: {
        readonly "radius-xs": "Badges on images, kbd";
        readonly "radius-sm": "Small buttons, chips, tags";
        readonly "radius-md": "Buttons, inputs, selects";
        readonly "radius-lg": "Cards, menus, popovers, toasts";
        readonly "radius-xl": "Dialogs, sheets";
        readonly "radius-2xl": "The largest frames";
    };
    readonly size: {
        readonly "control-sm": "Height of small controls";
        readonly "control-md": "Height of controls";
        readonly "control-lg": "Height of large controls";
        readonly "space-1": "Gap inside a control group";
        readonly "space-2": "Gap between controls";
        readonly "space-3": "Padding inside cards";
        readonly "space-4": "Gap between cards";
        readonly "space-5": "Padding inside dialogs";
        readonly "space-6": "Gap between page sections";
    };
    readonly depth: {
        readonly "shadow-card": "Cards";
        readonly "shadow-pop": "Floating layers";
        readonly "shadow-thumb": "Slider thumbs and switch knobs";
    };
    readonly motion: {
        readonly ease: "Direct responses: hover, toggles, indicators";
        readonly "ease-pop": "Arrivals that deserve life: toasts, popovers";
        readonly "dur-fast": "Hover and state changes";
        readonly dur: "Menus, popovers, toggles";
        readonly "dur-slow": "Dialogs, sheets, large surfaces";
        readonly press: "Scale of a pressed button (1 for none)";
        readonly lift: "Lift of a hovered card (0px for none)";
    };
};
/** Every token as a CSS custom property: `--iro-bg`, `--iro-surface`… */
export declare const TOKEN_NAMES: string[];
