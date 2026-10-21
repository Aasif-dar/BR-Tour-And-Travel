"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { images } from "@/config/images";
import { gallery } from "@/data/content";

const layoutClass = {
  tall: "row-span-2",
  wide: "col-span-2",
  square: "",
};

export function Gallery() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);

  const open = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
  };
  const close = useCallback(() => dialog.current?.close(), []);
  const step = useCallback(
    (delta: number) => setIndex((i) => (i === null ? i : (i + delta + gallery.length) % gallery.length)),
    [],
  );

  // Reset if Activity hides this page while the lightbox is open.
  useLayoutEffect(
    () => () => {
      dialog.current?.close();
      setIndex(null);
    },
    [],
  );

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const onClose = () => {
      setIndex((i) => {
        if (i !== null) triggers.current[i]?.focus();
        return null;
      });
    };
    d.addEventListener("keydown", onKey);
    d.addEventListener("close", onClose);
    return () => {
      d.removeEventListener("keydown", onKey);
      d.removeEventListener("close", onClose);
    };
  }, [step]);

  const current = index === null ? null : gallery[index];
  const currentImg = current ? images[current.image] : null;

  return (
    <section aria-labelledby="gallery-title" className="on-dark bg-ink-2 py-20 text-ivory lg:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2 id="gallery-title" className="display text-[2.3rem] sm:text-[2.8rem]">
            Makkah and Madinah, at different hours
          </h2>
          <p className="max-w-xs text-[0.85rem] text-mist">Select any photograph to view it larger.</p>
        </div>

        <ul className="mt-12 grid auto-rows-[9.5rem] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[13rem] lg:grid-cols-4 lg:gap-4">
          {gallery.map((item, i) => {
            const img = images[item.image];
            return (
              <li key={item.image} className={layoutClass[item.layout]}>
                <button
                  ref={(el) => {
                    triggers.current[i] = el;
                  }}
                  type="button"
                  onClick={() => open(i)}
                  className="group relative block h-full w-full overflow-hidden bg-ink-3 text-left"
                  aria-label={`View larger: ${item.caption}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-[1.2s] ease-(--ease-out-quint) group-hover:scale-[1.05]"
                  />
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-ink/85 to-transparent p-4 pt-10 text-[0.78rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    {item.caption}
                    <Expand className="size-4 shrink-0 text-gold" aria-hidden="true" />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <dialog
        ref={dialog}
        className="lightbox on-dark m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-ivory"
        aria-label="Image viewer"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        {current && currentImg && (
          <div className="flex h-full flex-col" onClick={(e) => e.target === e.currentTarget && close()}>
            <div className="flex items-center justify-between p-4 sm:p-6">
              <p className="text-xs tabular-nums tracking-[0.2em] text-mist">
                {String(index! + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
              </p>
              <button type="button" onClick={close} className="flex size-11 items-center justify-center" aria-label="Close viewer" autoFocus>
                <X className="size-6" strokeWidth={1.5} />
              </button>
            </div>
            <figure className="relative mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col px-4 sm:px-20">
              <div className="relative min-h-0 flex-1">
                <Image key={currentImg.src} src={currentImg.src} alt={currentImg.alt} fill sizes="100vw" className="object-contain" />
              </div>
              <figcaption className="py-5 text-center text-sm text-mist">
                {current.caption}
                {currentImg.credit && (
                  <span className="block text-xs text-mist/70">
                    Photo: {currentImg.credit.author} · {currentImg.credit.license}
                  </span>
                )}
              </figcaption>
            </figure>
            <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-2 sm:px-6">
              <button type="button" onClick={() => step(-1)} className="pointer-events-auto flex size-12 items-center justify-center bg-ink/60 backdrop-blur hover:bg-ink" aria-label="Previous image">
                <ChevronLeft className="size-6" strokeWidth={1.5} />
              </button>
              <button type="button" onClick={() => step(1)} className="pointer-events-auto flex size-12 items-center justify-center bg-ink/60 backdrop-blur hover:bg-ink" aria-label="Next image">
                <ChevronRight className="size-6" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
