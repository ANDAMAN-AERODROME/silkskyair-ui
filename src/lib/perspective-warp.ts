export type Point = { x: number; y: number };

/**
 * Apply rotation + perspective correction to produce a clean rectangular
 * passport image from 4 user-placed corner points.
 *
 * The 4 corners define an arbitrary quadrilateral on the (possibly rotated)
 * source image.  We map that quad onto a rectangle using a subdivision
 * approach: break the quad into a grid of smaller quads, approximate each
 * with an affine transform, and draw via drawImage + setTransform.
 *
 * This is the standard "texture-mapped quad" technique for Canvas 2D which
 * lacks native perspective transforms.
 */

const GRID = 12; // 12×12 = 144 cells — visually seamless, fast

/* ── Helpers ── */

/** Bilinear interpolation on the 4 corners of a quad. */
function bilerp(
  tl: Point, tr: Point, br: Point, bl: Point,
  u: number, v: number
): Point {
  const top = { x: tl.x + (tr.x - tl.x) * u, y: tl.y + (tr.y - tl.y) * u };
  const bot = { x: bl.x + (br.x - bl.x) * u, y: bl.y + (br.y - bl.y) * u };
  return { x: top.x + (bot.x - top.x) * v, y: top.y + (bot.y - top.y) * v };
}

/**
 * Draw one sub-quad (src quadrilateral → dest rectangle) using two triangles.
 *
 * Each triangle maps 3 source points to 3 dest points via an affine transform
 * set with ctx.setTransform(), then clips to the triangle.
 */
function drawSubQuad(
  ctx: CanvasRenderingContext2D,
  img: HTMLCanvasElement | ImageBitmap,
  // Source quad corners (on the rotated source image)
  s0: Point, s1: Point, s2: Point, s3: Point,
  // Dest rectangle corners
  d0: Point, d1: Point, d2: Point, d3: Point
) {
  // Triangle A: s0-s1-s3 → d0-d1-d3  (top-left, top-right, bottom-left)
  drawTriangle(ctx, img, s0, s1, s3, d0, d1, d3);
  // Triangle B: s1-s2-s3 → d1-d2-d3  (top-right, bottom-right, bottom-left)
  drawTriangle(ctx, img, s1, s2, s3, d1, d2, d3);
}

function drawTriangle(
  ctx: CanvasRenderingContext2D,
  img: HTMLCanvasElement | ImageBitmap,
  s0: Point, s1: Point, s2: Point,
  d0: Point, d1: Point, d2: Point
) {
  // Solve affine: [a c e; b d f] maps s→d
  // s0→d0, s1→d1, s2→d2
  const denom = (s0.x - s2.x) * (s1.y - s2.y) - (s1.x - s2.x) * (s0.y - s2.y);
  if (Math.abs(denom) < 1e-6) return; // degenerate triangle

  const a = ((d0.x - d2.x) * (s1.y - s2.y) - (d1.x - d2.x) * (s0.y - s2.y)) / denom;
  const b = ((d0.y - d2.y) * (s1.y - s2.y) - (d1.y - d2.y) * (s0.y - s2.y)) / denom;
  const c = ((d1.x - d2.x) * (s0.x - s2.x) - (d0.x - d2.x) * (s1.x - s2.x)) / denom;
  const d = ((d1.y - d2.y) * (s0.x - s2.x) - (d0.y - d2.y) * (s1.x - s2.x)) / denom;
  const e = d2.x - a * s2.x - c * s2.y;
  const f = d2.y - b * s2.x - d * s2.y;

  ctx.save();

  // Clip to destination triangle
  ctx.beginPath();
  ctx.moveTo(d0.x, d0.y);
  ctx.lineTo(d1.x, d1.y);
  ctx.lineTo(d2.x, d2.y);
  ctx.closePath();
  ctx.clip();

  // Set the affine transform that maps source coords → dest coords,
  // then draw the entire source image. Only the clipped triangle is visible.
  ctx.setTransform(a, b, c, d, e, f);
  ctx.drawImage(img, 0, 0);

  ctx.restore();
}

/* ── Main export ── */

export function applyPerspectiveWarp(
  source: ImageBitmap,
  corners: [Point, Point, Point, Point],
  rotationDeg: number
): HTMLCanvasElement {
  // ── Step 1: Rotate the source image onto a temp canvas ──
  const rotRad = (rotationDeg * Math.PI) / 180;
  const cos = Math.cos(rotRad);
  const sin = Math.sin(rotRad);

  const rotW = Math.abs(source.width * cos) + Math.abs(source.height * sin);
  const rotH = Math.abs(source.width * sin) + Math.abs(source.height * cos);

  const srcCanvas = document.createElement("canvas");
  srcCanvas.width = Math.ceil(rotW);
  srcCanvas.height = Math.ceil(rotH);
  const srcCtx = srcCanvas.getContext("2d")!;
  srcCtx.translate(rotW / 2, rotH / 2);
  srcCtx.rotate(rotRad);
  srcCtx.drawImage(source, -source.width / 2, -source.height / 2);

  // ── Step 2: Transform corner points by the same rotation ──
  const cx = source.width / 2;
  const cy = source.height / 2;
  const rotatedPts = corners.map((p) => ({
    x: (p.x - cx) * cos - (p.y - cy) * sin + rotW / 2,
    y: (p.x - cx) * sin + (p.y - cy) * cos + rotH / 2,
  }));

  // After rotation the original TL/TR/BR/BL labels no longer match their
  // geometric positions.  Re-order so index 0=TL, 1=TR, 2=BR, 3=BL by
  // using the standard convex-quadrilateral trick:
  //   TL = smallest (x+y)   BR = largest (x+y)
  //   TR = largest  (x−y)   BL = smallest (x−y)
  const bySum  = [...rotatedPts].sort((a, b) => (a.x + a.y) - (b.x + b.y));
  const byDiff = [...rotatedPts].sort((a, b) => (a.x - a.y) - (b.x - b.y));
  const srcCorners: [Point, Point, Point, Point] = [
    bySum[0],  // TL
    byDiff[3], // TR
    bySum[3],  // BR
    byDiff[0], // BL
  ];

  // ── Step 3: Determine output size from the quad ──
  // Use average of top/bottom edge lengths for width, left/right for height
  const topLen = Math.hypot(srcCorners[1].x - srcCorners[0].x, srcCorners[1].y - srcCorners[0].y);
  const botLen = Math.hypot(srcCorners[2].x - srcCorners[3].x, srcCorners[2].y - srcCorners[3].y);
  const leftLen = Math.hypot(srcCorners[3].x - srcCorners[0].x, srcCorners[3].y - srcCorners[0].y);
  const rightLen = Math.hypot(srcCorners[2].x - srcCorners[1].x, srcCorners[2].y - srcCorners[1].y);

  const avgW = (topLen + botLen) / 2;
  const avgH = (leftLen + rightLen) / 2;

  const outW = Math.max(200, Math.min(Math.round(avgW), 2400));
  const outH = Math.max(140, Math.round(avgH * (outW / avgW)));

  // ── Step 4: Render perspective-corrected image via grid subdivision ──
  const outCanvas = document.createElement("canvas");
  outCanvas.width = outW;
  outCanvas.height = outH;
  const ctx = outCanvas.getContext("2d")!;

  const [tl, tr, br, bl] = srcCorners;

  for (let row = 0; row < GRID; row++) {
    for (let col = 0; col < GRID; col++) {
      const u0 = col / GRID;
      const u1 = (col + 1) / GRID;
      const v0 = row / GRID;
      const v1 = (row + 1) / GRID;

      // Source quad corners (bilinear interpolation on the user's 4 corners)
      const s0 = bilerp(tl, tr, br, bl, u0, v0);
      const s1 = bilerp(tl, tr, br, bl, u1, v0);
      const s2 = bilerp(tl, tr, br, bl, u1, v1);
      const s3 = bilerp(tl, tr, br, bl, u0, v1);

      // Dest rectangle corners
      const d0 = { x: u0 * outW, y: v0 * outH };
      const d1 = { x: u1 * outW, y: v0 * outH };
      const d2 = { x: u1 * outW, y: v1 * outH };
      const d3 = { x: u0 * outW, y: v1 * outH };

      drawSubQuad(ctx, srcCanvas, s0, s1, s2, s3, d0, d1, d2, d3);
    }
  }

  return outCanvas;
}
