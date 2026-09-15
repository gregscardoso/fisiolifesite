"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "./icons";
import { gallery } from "@/lib/content";

export function GalleryLightbox() {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const active = index !== null;
  const move = (direction: number) => setIndex((value) => value === null ? 0 : (value + direction + gallery.length) % gallery.length);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active && !dialog.open) dialog.showModal();
    if (!active && dialog.open) dialog.close();
  }, [active]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!active) return;
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return <>
    <div className="gallery-grid reveal">{gallery.map((photo, photoIndex) => <button key={photo.src} type="button" onClick={() => setIndex(photoIndex)} aria-label={`Ampliar foto: ${photo.alt}`} style={{ aspectRatio: photo.ratio }}><Image src={photo.src} fill sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 24vw" alt={photo.alt} /></button>)}</div>
    <dialog ref={dialogRef} className="lightbox" onClose={() => setIndex(null)} onCancel={(event) => { event.preventDefault(); setIndex(null); }} onClick={(event) => event.target === event.currentTarget && setIndex(null)}>
      {index !== null && <div className="lightbox-inner"><Image src={gallery[index].src} width={1100} height={850} sizes="92vw" alt={gallery[index].alt} /><div className="lightbox-controls"><button type="button" onClick={() => move(-1)} aria-label="Foto anterior"><ArrowLeft /></button><button type="button" onClick={() => move(1)} aria-label="Próxima foto"><ArrowRight /></button><button type="button" onClick={() => setIndex(null)} aria-label="Fechar galeria">×</button></div></div>}
    </dialog>
  </>;
}
