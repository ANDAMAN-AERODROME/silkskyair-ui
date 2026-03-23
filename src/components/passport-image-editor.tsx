"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X, RotateCcw, RotateCw, Check } from "lucide-react";
import { useEscapeClose } from "../hooks/use-escape-close";
import { applyPerspectiveWarp, type Point } from "../lib/perspective-warp";

/* ── Constants ── */
const HANDLE_RADIUS = 8;
const HIT_RADIUS = 24; // generous for tablet touch
const HANDLE_STROKE = "rgba(255,255,255,0.9)";
const HANDLE_FILL = "rgba(14,116,144,0.85)"; // teal-600-ish
const QUAD_STROKE = "rgba(14,116,144,0.6)";
const QUAD_FILL = "rgba(14,116,144,0.06)";
const INSET = 0; // corners start at image edges

export type PassportImageEditorProps = {
  file: File;
  i18n: (key: string) => string;
  onApply: (blob: Blob) => void;
  onCancel: () => void;
};

export function PassportImageEditor({ file, i18n, onApply, onCancel }: PassportImageEditorProps) {
  /** i18n with inline fallback — resolve() returns the raw key when untranslated */
  const t = (key: string, fallback: string) => {
    const val = i18n(key);
    return val === key ? fallback : val;
  };

  /* ── State ── */
  const [bitmap, setBitmap] = useState<ImageBitmap | null>(null);
  const [rotation, setRotation] = useState(0);
  const [corners, setCorners] = useState<[Point, Point, Point, Point] | null>(null);
  const [dragging, setDragging] = useState<number | null>(null);
  const [applying, setApplying] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ w: 800, h: 600 });

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEscapeClose(true, onCancel);

  /* ── Load image bitmap ── */
  useEffect(() => {
    let cancelled = false;
    createImageBitmap(file).then((bm) => {
      if (cancelled) return;
      setBitmap(bm);
      // Place initial corners at image edges
      const w = bm.width;
      const h = bm.height;
      const ix = w * INSET;
      const iy = h * INSET;
      setCorners([
        { x: ix, y: iy },               // top-left
        { x: w - ix, y: iy },           // top-right
        { x: w - ix, y: h - iy },       // bottom-right
        { x: ix, y: h - iy },           // bottom-left
      ]);
    });
    return () => { cancelled = true; };
  }, [file]);

  /* ── Track container size ── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) {
        setCanvasSize({ w: Math.floor(width), h: Math.floor(height) });
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* ── Coordinate transforms ── */
  const getTransform = useCallback(() => {
    if (!bitmap) return { scale: 1, offsetX: 0, offsetY: 0 };
    const rotRad = (rotation * Math.PI) / 180;
    const cos = Math.abs(Math.cos(rotRad));
    const sin = Math.abs(Math.sin(rotRad));
    const rotW = bitmap.width * cos + bitmap.height * sin;
    const rotH = bitmap.width * sin + bitmap.height * cos;

    const padding = 40; // px padding around image in canvas
    const availW = canvasSize.w - padding * 2;
    const availH = canvasSize.h - padding * 2;
    const scale = Math.min(availW / rotW, availH / rotH, 1);

    return {
      scale,
      offsetX: canvasSize.w / 2,
      offsetY: canvasSize.h / 2,
    };
  }, [bitmap, rotation, canvasSize]);

  /** Convert image-space point to canvas-space */
  const imageToCanvas = useCallback(
    (p: Point): Point => {
      if (!bitmap) return p;
      const { scale, offsetX, offsetY } = getTransform();
      const rotRad = (rotation * Math.PI) / 180;
      const cos = Math.cos(rotRad);
      const sin = Math.sin(rotRad);
      const cx = bitmap.width / 2;
      const cy = bitmap.height / 2;
      const rx = (p.x - cx) * cos - (p.y - cy) * sin;
      const ry = (p.x - cx) * sin + (p.y - cy) * cos;
      return { x: rx * scale + offsetX, y: ry * scale + offsetY };
    },
    [bitmap, rotation, getTransform]
  );

  /** Convert canvas-space point to image-space */
  const canvasToImage = useCallback(
    (cx: number, cy: number): Point => {
      if (!bitmap) return { x: cx, y: cy };
      const { scale, offsetX, offsetY } = getTransform();
      const rx = (cx - offsetX) / scale;
      const ry = (cy - offsetY) / scale;
      const rotRad = (-rotation * Math.PI) / 180; // inverse rotation
      const cos = Math.cos(rotRad);
      const sin = Math.sin(rotRad);
      const imgCx = bitmap.width / 2;
      const imgCy = bitmap.height / 2;
      return {
        x: rx * cos - ry * sin + imgCx,
        y: rx * sin + ry * cos + imgCy,
      };
    },
    [bitmap, rotation, getTransform]
  );

  /* ── Canvas drawing ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !bitmap || !corners) return;

    canvas.width = canvasSize.w;
    canvas.height = canvasSize.h;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvasSize.w, canvasSize.h);

    const { scale, offsetX, offsetY } = getTransform();

    // Draw rotated image
    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.drawImage(
      bitmap,
      (-bitmap.width / 2) * scale,
      (-bitmap.height / 2) * scale,
      bitmap.width * scale,
      bitmap.height * scale
    );
    ctx.restore();

    // Draw quad overlay
    const cp = corners.map((c) => imageToCanvas(c));
    ctx.beginPath();
    ctx.moveTo(cp[0].x, cp[0].y);
    for (let i = 1; i < 4; i++) ctx.lineTo(cp[i].x, cp[i].y);
    ctx.closePath();
    ctx.fillStyle = QUAD_FILL;
    ctx.fill();
    ctx.strokeStyle = QUAD_STROKE;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw corner handles
    for (const p of cp) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, HANDLE_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = HANDLE_FILL;
      ctx.fill();
      ctx.strokeStyle = HANDLE_STROKE;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }, [bitmap, corners, rotation, canvasSize, getTransform, imageToCanvas]);

  /* ── Pointer handlers ── */
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!corners || !canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const cp = corners.map((c) => imageToCanvas(c));
      const idx = cp.findIndex(
        (p) => Math.hypot(p.x - cx, p.y - cy) < HIT_RADIUS
      );
      if (idx >= 0) {
        setDragging(idx);
        (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
      }
    },
    [corners, imageToCanvas]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (dragging === null || !canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const imgPt = canvasToImage(
        e.clientX - rect.left,
        e.clientY - rect.top
      );
      setCorners((prev) => {
        if (!prev) return prev;
        const next = [...prev] as [Point, Point, Point, Point];
        next[dragging] = imgPt;
        return next;
      });
    },
    [dragging, canvasToImage]
  );

  const handlePointerUp = useCallback(() => {
    setDragging(null);
  }, []);

  /* ── Rotation helpers ── */
  const rotateCW = () => setRotation((r) => r + 90);
  const rotateCCW = () => setRotation((r) => r - 90);
  const coarseRotation = Math.round(rotation / 90) * 90;
  const fineRotation = rotation - coarseRotation;
  const handleFineChange = (val: number) => setRotation(coarseRotation + val);

  /* ── Apply ── */
  const handleApply = useCallback(async () => {
    if (!bitmap || !corners) return;
    setApplying(true);
    try {
      const outCanvas = applyPerspectiveWarp(bitmap, corners, rotation);
      const blob = await new Promise<Blob>((resolve, reject) => {
        outCanvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error("toBlob failed"))),
          "image/jpeg",
          0.92
        );
      });
      onApply(blob);
    } catch (err) {
      console.error("[passport-editor] Apply failed:", err);
    } finally {
      setApplying(false);
    }
  }, [bitmap, corners, rotation, onApply]);

  /* ── Render ── */
  const isLoading = !bitmap || !corners;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className="flex h-full max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-base border border-foreground/10 bg-background shadow-2xl">
        {/* ── Header ── */}
        <div className="flex items-center justify-between border-b border-foreground/10 px-5 py-3">
          <h3 className="text-sm font-semibold text-foreground">
            {t("editor.title", "Edit Passport Photo")}
          </h3>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-base px-3 py-1.5 text-xs font-medium text-foreground/60 transition hover:bg-foreground/5 hover:text-foreground"
            >
              {t("actions.cancel", "Cancel")}
            </button>
            <button
              type="button"
              onClick={() => void handleApply()}
              disabled={applying || isLoading}
              className="flex items-center gap-1.5 rounded-base bg-primary px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-primary/90 disabled:opacity-50"
            >
              {applying ? (
                <>
                  <div className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  {t("editor.applying", "Applying…")}
                </>
              ) : (
                <>
                  <Check className="h-3.5 w-3.5" />
                  {t("editor.apply", "Apply")}
                </>
              )}
            </button>
          </div>
        </div>

        {/* ── Canvas area ── */}
        <div ref={containerRef} className="relative min-h-0 flex-1 bg-foreground/[0.03]">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-foreground/20 border-t-primary" />
            </div>
          ) : (
            <>
              <canvas
                ref={canvasRef}
                className="h-full w-full"
                style={{ touchAction: "none" }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
              />
              {/* Instruction hint */}
              <p className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-[11px] text-white/70">
                {t("editor.hint", "Drag the handles to the passport corners")}
              </p>
            </>
          )}
        </div>

        {/* ── Rotation controls ── */}
        <div className="flex items-center justify-center gap-4 border-t border-foreground/10 px-5 py-3">
          <button
            type="button"
            onClick={rotateCCW}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-foreground/15 text-foreground/60 transition hover:border-foreground/30 hover:text-foreground"
            title={t("editor.rotateCCW", "Rotate 90° left")}
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2">
            <span className="w-8 text-right text-[10px] tabular-nums text-foreground/40">
              {fineRotation > 0 ? "+" : ""}
              {fineRotation.toFixed(1)}°
            </span>
            <input
              type="range"
              min={-45}
              max={45}
              step={0.5}
              value={fineRotation}
              onChange={(e) => handleFineChange(Number(e.target.value))}
              className="h-1 w-40 cursor-pointer appearance-none rounded-full bg-foreground/10 accent-primary"
            />
          </div>

          <button
            type="button"
            onClick={rotateCW}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-foreground/15 text-foreground/60 transition hover:border-foreground/30 hover:text-foreground"
            title={t("editor.rotateCW", "Rotate 90° right")}
          >
            <RotateCw className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
