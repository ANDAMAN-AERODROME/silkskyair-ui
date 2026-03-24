import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';

type PillOption<T extends string = string> = {
    value: T;
    label: string;
    icon?: ReactNode;
    disabled?: boolean;
};
type Props<T extends string = string> = {
    options: PillOption<T>[];
    value: T;
    onChange: (value: T) => void;
    /** When true, clicking the selected pill deselects it (sets value to "" as T) */
    allowDeselect?: boolean;
    size?: "sm" | "md";
};
declare function PillSelector<T extends string = string>({ options, value, onChange, allowDeselect, size, }: Props<T>): react_jsx_runtime.JSX.Element;

declare const variants: {
    readonly warning: {
        readonly band: "bg-amber-50";
        readonly icon: "text-amber-500";
        readonly title: "text-amber-900";
        readonly progressFilled: "bg-amber-400";
        readonly progressTrack: "bg-amber-100";
        readonly progressText: "text-amber-500";
        readonly calloutBg: "bg-amber-50/60";
        readonly calloutBorder: "border-amber-200/50";
        readonly calloutIcon: "text-amber-400";
        readonly calloutText: "text-amber-700/70";
    };
    readonly info: {
        readonly band: "bg-sky-50";
        readonly icon: "text-sky-500";
        readonly title: "text-sky-900";
        readonly progressFilled: "bg-sky-400";
        readonly progressTrack: "bg-sky-100";
        readonly progressText: "text-sky-500";
        readonly calloutBg: "bg-sky-50/60";
        readonly calloutBorder: "border-sky-200/50";
        readonly calloutIcon: "text-sky-400";
        readonly calloutText: "text-sky-700/70";
    };
    readonly success: {
        readonly band: "bg-emerald-50";
        readonly icon: "text-emerald-500";
        readonly title: "text-emerald-900";
        readonly progressFilled: "bg-emerald-400";
        readonly progressTrack: "bg-emerald-100";
        readonly progressText: "text-emerald-500";
        readonly calloutBg: "bg-emerald-50/60";
        readonly calloutBorder: "border-emerald-200/50";
        readonly calloutIcon: "text-emerald-400";
        readonly calloutText: "text-emerald-700/70";
    };
    readonly error: {
        readonly band: "bg-rose-50";
        readonly icon: "text-rose-500";
        readonly title: "text-rose-900";
        readonly progressFilled: "bg-rose-400";
        readonly progressTrack: "bg-rose-100";
        readonly progressText: "text-rose-500";
        readonly calloutBg: "bg-rose-50/60";
        readonly calloutBorder: "border-rose-200/50";
        readonly calloutIcon: "text-rose-400";
        readonly calloutText: "text-rose-700/70";
    };
};
type StatusCardVariant = keyof typeof variants;
type StatusCardProps = {
    /** Visual variant driving the colour scheme (default: "info") */
    variant?: StatusCardVariant;
    /** Icon rendered inside the header circle */
    icon: ReactNode;
    /** Title displayed next to the icon */
    title: string;
    /** Optional segmented progress bar below the title */
    progress?: {
        value: number;
        max: number;
    };
    /** Body content — the main explanation area */
    children: ReactNode;
    /** Optional brand-tinted callout at the bottom of the body */
    callout?: {
        icon: ReactNode;
        content: ReactNode;
    };
};
declare function StatusCard({ variant, icon, title, progress, children, callout, }: StatusCardProps): react_jsx_runtime.JSX.Element;

type EmailInputProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    error?: boolean;
    className?: string;
};
declare function EmailInput({ value, onChange, placeholder, disabled, error, className, }: EmailInputProps): react_jsx_runtime.JSX.Element;

type SideDrawerProps = {
    open: boolean;
    onClose: () => void;
    title: string;
    subtitle?: string;
    icon?: ReactNode;
    /** When true, closing (backdrop/X/Escape) shows confirm dialog before closing */
    isDirty?: boolean;
    /** Labels for the exit gate confirm dialog */
    exitGateLabels?: {
        title: string;
        description: string;
        body?: string;
        confirm: string;
        cancel: string;
    };
    /** Footer content — if omitted, no footer is rendered */
    footer?: ReactNode;
    /** Max width tailwind class (default: "max-w-md") */
    maxWidth?: string;
    children: ReactNode;
};
declare function SideDrawer({ open, onClose, title, subtitle, icon, isDirty, exitGateLabels, footer, maxWidth, children, }: SideDrawerProps): react_jsx_runtime.JSX.Element | null;

type SelectOption<T extends string = string> = {
    value: T;
    label: string;
    icon?: ReactNode;
    disabled?: boolean;
};

type SelectorProps<T extends string = string> = {
    options: SelectOption<T>[];
    value: T;
    onChange: (value: T) => void;
    placeholder?: string;
    /** When true, shows ✕ clear button and allows resetting to "" */
    allowDeselect?: boolean;
    disabled?: boolean;
    error?: boolean;
    /** Custom rendering for each option row in the dropdown */
    renderOption?: (option: SelectOption<T>) => ReactNode;
    /** Custom rendering for the selected value in the trigger */
    renderValue?: (option: SelectOption<T>) => ReactNode;
};
declare function Selector<T extends string = string>({ options, value, onChange, placeholder, allowDeselect, disabled, error, renderOption, renderValue, }: SelectorProps<T>): react_jsx_runtime.JSX.Element;

type SearchableSelectorProps<T extends string = string> = {
    options: SelectOption<T>[];
    value: T;
    onChange: (value: T) => void;
    placeholder?: string;
    /** Placeholder shown inside the search input when the dropdown is open */
    searchPlaceholder?: string;
    allowDeselect?: boolean;
    disabled?: boolean;
    error?: boolean;
    /** Custom match function. Defaults to case-insensitive label match. */
    filterFn?: (option: SelectOption<T>, query: string) => boolean;
    /** Show a spinner in the search input */
    loading?: boolean;
    /** Message when filter yields no results */
    emptyMessage?: string;
    renderOption?: (option: SelectOption<T>) => ReactNode;
    renderValue?: (option: SelectOption<T>) => ReactNode;
};
declare function SearchableSelector<T extends string = string>({ options, value, onChange, placeholder, searchPlaceholder, allowDeselect, disabled, error, filterFn, loading, emptyMessage, renderOption, renderValue, }: SearchableSelectorProps<T>): react_jsx_runtime.JSX.Element;

type ContactTitleSelectProps = {
    value: string;
    onChange: (value: string) => void;
    /** Title options from the database (localized) */
    options: SelectOption[];
    placeholder?: string;
    disabled?: boolean;
    error?: boolean;
};
declare function ContactTitleSelect({ value, onChange, options, placeholder, disabled, error, }: ContactTitleSelectProps): react_jsx_runtime.JSX.Element;

type PassportImageEditorProps = {
    file: File;
    i18n: (key: string) => string;
    onApply: (blob: Blob) => void;
    onCancel: () => void;
};
declare function PassportImageEditor({ file, i18n, onApply, onCancel }: PassportImageEditorProps): react_jsx_runtime.JSX.Element;

type NationalityOption = {
    code: string;
    flagEmoji: string;
    nationality: string;
    countryName?: string;
    /** Alternative country names for exact search (e.g., "England, Great Britain") */
    searchAliases?: string;
    /** Languages spoken — only used for fuzzy/suggestion search */
    languages?: string;
};
type NationalitySelectorProps = {
    options: NationalityOption[];
    prioritizedCodes?: string[];
    value: string;
    onChange: (code: string) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    suggestMessage?: string;
    disabled?: boolean;
    error?: boolean;
    allowDeselect?: boolean;
};
declare function NationalitySelector({ options, prioritizedCodes, value, onChange, placeholder, searchPlaceholder, suggestMessage, disabled, error, allowDeselect, }: NationalitySelectorProps): react_jsx_runtime.JSX.Element;

type GenderValue = "male" | "female" | "other" | "prefer_not_to_say";
type GenderOption = {
    id: string;
    label: string;
    icon?: string;
};
type GenderSelectorProps = {
    options: GenderOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    error?: boolean;
};
declare function GenderSelector({ options, value, onChange, placeholder, disabled, error, }: GenderSelectorProps): react_jsx_runtime.JSX.Element;

type TitleOption = {
    /** ID from contact_titles table (e.g., "mr", "mrs") */
    id: string;
    /** Display label (e.g., "Mr.", "Mrs.") — can be localized */
    label: string;
};
type TitleSelectorProps = {
    options: TitleOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    error?: boolean;
};
declare function TitleSelector({ options, value, onChange, placeholder, disabled, error, }: TitleSelectorProps): react_jsx_runtime.JSX.Element;

type WeightRangeOption = {
    id: string;
    label: string;
    icon?: string;
};
type WeightRangeSelectorProps = {
    options: WeightRangeOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    error?: boolean;
};
declare function WeightRangeSelector({ options, value, onChange, placeholder, disabled, error, }: WeightRangeSelectorProps): react_jsx_runtime.JSX.Element;

type TourOption = {
    slug: string;
    title: string;
};
type TourSelectorBaseProps = {
    options: TourOption[];
    placeholder?: string;
    searchPlaceholder?: string;
    emptyMessage?: string;
    disabled?: boolean;
    error?: boolean;
    loading?: boolean;
};
type TourSelectorSingleProps = TourSelectorBaseProps & {
    multiple?: false;
    value: string;
    onChange: (slug: string) => void;
    allowDeselect?: boolean;
};
type TourSelectorMultiProps = TourSelectorBaseProps & {
    multiple: true;
    value: string[];
    onChange: (slugs: string[]) => void;
};
type TourSelectorProps = TourSelectorSingleProps | TourSelectorMultiProps;
declare function TourSelector(props: TourSelectorProps): react_jsx_runtime.JSX.Element;

type ToastType = "success" | "error" | "info" | "warning";
type ToastMessage = {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
};
type ToastContainerProps = {
    toasts: ToastMessage[];
    onDismiss: (id: string) => void;
};
declare function ToastContainer({ toasts, onDismiss }: ToastContainerProps): react_jsx_runtime.JSX.Element | null;
declare function useToast(): {
    toasts: ToastMessage[];
    showToast: (type: ToastType, message: string, duration?: number) => void;
    dismissToast: (id: string) => void;
    success: (message: string, duration?: number) => void;
    error: (message: string, duration?: number) => void;
    info: (message: string, duration?: number) => void;
    warning: (message: string, duration?: number) => void;
};

type PaxCounterProps = {
    label: string;
    value: number;
    min: number;
    max: number;
    onChange: (n: number) => void;
    disabled?: boolean;
};
declare function PaxCounter({ label, value, min, max, onChange, disabled, }: PaxCounterProps): react_jsx_runtime.JSX.Element;

type LocationMapProps = {
    latitude: number;
    longitude: number;
    label?: string;
    zoom?: number;
    apiKey: string;
    /** Static map image width in pixels (default 400) */
    width?: number;
    /** Static map image height in pixels (default 400) */
    height?: number;
    directionsLabel?: string;
    directionsUrl?: string;
    locale?: string;
    className?: string;
};
declare function LocationMap({ latitude, longitude, label, zoom, apiKey, width, height, directionsLabel, directionsUrl, locale, className, }: LocationMapProps): react_jsx_runtime.JSX.Element;

interface Mark {
    type: string;
    attrs?: Record<string, unknown>;
}
interface TipTapNode {
    type: string;
    content?: TipTapNode[];
    text?: string;
    marks?: Mark[];
    attrs?: Record<string, unknown>;
}
interface RichTextContentProps {
    /** TipTap/Novel JSON — accepts a JSON string or a pre-parsed object */
    content: string | TipTapNode | null | undefined;
    /** Additional CSS class names for the wrapper */
    className?: string;
    /** Fallback text when content is empty / null */
    fallback?: string;
}
/**
 * Renders TipTap/Novel rich-text JSON as styled React elements.
 *
 * Zero external dependencies — pure React + Tailwind.
 *
 * @example
 * ```tsx
 * <RichTextContent content={tour.description_long} className="text-sm text-slate-600" />
 * ```
 */
declare function RichTextContent({ content, className, fallback }: RichTextContentProps): react_jsx_runtime.JSX.Element | null;

type Point = {
    x: number;
    y: number;
};
declare function applyPerspectiveWarp(source: ImageBitmap, corners: [Point, Point, Point, Point], rotationDeg: number): HTMLCanvasElement;

declare function useEscapeClose(enabled: boolean, onClose: () => void): void;

export { ContactTitleSelect, type ContactTitleSelectProps, EmailInput, type EmailInputProps, type GenderOption, GenderSelector, type GenderSelectorProps, type GenderValue, LocationMap, type LocationMapProps, type NationalityOption, NationalitySelector, type NationalitySelectorProps, PassportImageEditor, type PassportImageEditorProps, PaxCounter, type PaxCounterProps, type PillOption, PillSelector, type Point, RichTextContent, type RichTextContentProps, SearchableSelector, type SearchableSelectorProps, type SelectOption, Selector, type SelectorProps, SideDrawer, type SideDrawerProps, StatusCard, type StatusCardProps, type StatusCardVariant, type TitleOption, TitleSelector, type TitleSelectorProps, ToastContainer, type ToastMessage, type ToastType, type TourOption, TourSelector, type TourSelectorProps, type WeightRangeOption, WeightRangeSelector, type WeightRangeSelectorProps, applyPerspectiveWarp, useEscapeClose, useToast };
