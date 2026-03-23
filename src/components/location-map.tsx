"use client";

import { Navigation } from "lucide-react";

export type LocationMapProps = {
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

export function LocationMap({
  latitude,
  longitude,
  label,
  zoom = 14,
  apiKey,
  width = 400,
  height = 400,
  directionsLabel = "Get Directions",
  directionsUrl,
  locale = "en",
  className,
}: LocationMapProps) {
  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${zoom}&size=${width}x${height}&scale=2&maptype=roadmap&markers=color:red%7C${latitude},${longitude}&key=${apiKey}&language=${locale}`;

  const mapsUrl =
    directionsUrl ??
    `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block overflow-hidden ${className ?? ""}`}
    >
      <img
        src={staticMapUrl}
        alt={label ?? "Map"}
        className="h-full w-full object-cover"
        loading="lazy"
      />

      {/* Directions overlay button */}
      <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-slate-700 shadow-md backdrop-blur-sm transition group-hover:bg-white group-hover:shadow-lg">
        <Navigation className="h-3 w-3" />
        {directionsLabel}
      </span>
    </a>
  );
}
