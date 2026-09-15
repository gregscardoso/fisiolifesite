"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function VideoTour() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const close = () => {
    videoRef.current?.pause();
    setOpen(false);
  };

  return <>
    <div className="video-poster">
      <Image src="/images/clinic/fachada-fisiolife-panabianco.png" fill sizes="(max-width: 760px) 92vw, 48vw" alt="Fachada da Fisiolife dentro da Academia Panabianco" />
      <div className="video-shade" /><span className="video-label">Conheça nossa estrutura</span>
      <button type="button" onClick={() => setOpen(true)} aria-label="Assistir ao tour em vídeo"><span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5-11-6.5Z" /></svg></span></button>
      <strong>Tour em vídeo · 1:32</strong>
    </div>
    <dialog ref={dialogRef} className="media-dialog" onClose={() => setOpen(false)} onCancel={(event) => { event.preventDefault(); close(); }} onClick={(event) => event.target === event.currentTarget && close()}>
      <div className="media-dialog-inner">
        <button className="dialog-close" type="button" onClick={close} aria-label="Fechar vídeo">×</button>
        <video ref={videoRef} controls playsInline preload="metadata" poster="/images/clinic/fachada-fisiolife-panabianco.png"><source src="/videos/tour-fisiolife.mp4" type="video/mp4" />Seu navegador não suporta a reprodução de vídeo.</video>
      </div>
    </dialog>
  </>;
}
