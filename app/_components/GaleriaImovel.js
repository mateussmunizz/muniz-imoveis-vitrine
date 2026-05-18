"use client";

import { useState } from "react";
import Image from "next/image";
import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

function GaleriaImovel({ imagemPrincipal, galeria = [] }) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const imagens = Array.isArray(galeria) ? galeria : [];

  const todasImagens = [imagemPrincipal, ...imagens].filter(
    (img) =>
      typeof img === "string" &&
      (img.startsWith("http") || img.startsWith("/")),
  );

  if (todasImagens.length === 0) {
    todasImagens.push(
      "https://placehold.co/1200x800/1f2937/a3a8bf?text=Sem+Foto",
    );
  }

  const count = todasImagens.length;

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === count - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? count - 1 : prev - 1));
  };

  const renderOverlay = (indexVisible, maxVisible, totalImages) => {
    if (indexVisible === maxVisible - 1 && totalImages > maxVisible) {
      return (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-colors group-hover:bg-black/60">
          <span className="text-white font-bold text-xl drop-shadow-md">
            +{totalImages - maxVisible} fotos
          </span>
        </div>
      );
    }
    return (
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
    );
  };

  let gridContent;

  if (count === 1) {
    gridContent = (
      <div
        className="w-full h-full relative cursor-pointer group"
        onClick={() => openLightbox(0)}
      >
        <Image
          src={todasImagens[0]}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          alt="Vista Principal"
        />
        {renderOverlay(0, 1, count)}
      </div>
    );
  } else if (count === 2) {
    gridContent = (
      <div className="grid grid-cols-2 gap-4 h-full">
        {todasImagens.map((img, i) => (
          <div
            key={i}
            className="relative h-full cursor-pointer group overflow-hidden"
            onClick={() => openLightbox(i)}
          >
            <Image
              src={img}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              alt={`Vista ${i + 1}`}
            />
            {renderOverlay(i, 2, count)}
          </div>
        ))}
      </div>
    );
  } else if (count === 3 || count === 4) {
    gridContent = (
      <div className="grid grid-cols-2 grid-rows-2 gap-4 h-full">
        <div
          className="row-span-2 relative h-full cursor-pointer group overflow-hidden"
          onClick={() => openLightbox(0)}
        >
          <Image
            src={todasImagens[0]}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            alt="Vista 1"
          />
          {renderOverlay(0, 3, count)}
        </div>
        {todasImagens.slice(1, 3).map((img, i) => (
          <div
            key={i + 1}
            className="relative h-full cursor-pointer group overflow-hidden"
            onClick={() => openLightbox(i + 1)}
          >
            <Image
              src={img}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              alt={`Vista ${i + 2}`}
            />
            {renderOverlay(i + 1, 3, count)}
          </div>
        ))}
      </div>
    );
  } else {
    gridContent = (
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-full">
        <div
          className="md:col-span-2 row-span-2 relative h-full cursor-pointer group overflow-hidden"
          onClick={() => openLightbox(0)}
        >
          <Image
            src={todasImagens[0]}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            alt="Vista 1"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </div>
        {todasImagens.slice(1, 5).map((img, i) => (
          <div
            key={i + 1}
            className="relative h-full hidden md:block cursor-pointer group overflow-hidden"
            onClick={() => openLightbox(i + 1)}
          >
            <Image
              src={img}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              alt={`Vista ${i + 2}`}
            />
            {renderOverlay(i + 1, 5, count)}
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-[300px] md:h-[500px] mb-8 md:mb-12 rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl bg-primary-950">
        {gridContent}
      </div>

      {isLightboxOpen && (
        <Lightbox
          imagem={todasImagens[currentIndex]}
          onClose={() => setIsLightboxOpen(false)}
          onNext={nextImage}
          onPrev={prevImage}
          total={count}
          atual={currentIndex + 1}
        />
      )}
    </>
  );
}

function Lightbox({ imagem, onClose, onNext, onPrev, total, atual }) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm w-screen h-[100dvh] overflow-hidden"
      onClick={onClose}
    >
      {/* BARRA SUPERIOR: Contador e Botão Fechar fixos no topo */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center p-4 md:p-8 z-50">
        <div className="text-white font-medium text-sm md:text-lg tracking-widest bg-black/60 border border-white/10 px-4 py-2 rounded-full">
          {atual} / {total}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="text-white hover:text-red-400 bg-black/60 border border-white/10 transition-colors p-2 rounded-full"
        >
          <XMarkIcon className="h-6 w-6 md:h-10 md:w-10" />
        </button>
      </div>

      {/* ÁREA DA IMAGEM E SETAS */}
      <div
        className="relative w-full max-w-6xl h-[60vh] md:h-[80vh] flex items-center justify-center px-2 md:px-16 mt-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Seta Esquerda (Com fundo visível) */}
        <button
          onClick={onPrev}
          className="absolute left-2 md:left-4 z-50 text-white bg-black/60 border border-white/10 hover:bg-white hover:text-black transition-colors p-3 md:p-4 rounded-full shadow-lg"
        >
          <ChevronLeftIcon className="h-6 w-6 md:h-10 md:w-10" />
        </button>

        {/* Imagem (Presa estritamente dentro da tela) */}
        <div className="relative w-full h-full">
          <Image
            src={imagem}
            fill
            className="object-contain"
            alt="Imagem Ampliada"
            quality={100}
            priority
          />
        </div>

        {/* Seta Direita (Com fundo visível) */}
        <button
          onClick={onNext}
          className="absolute right-2 md:right-4 z-50 text-white bg-black/60 border border-white/10 hover:bg-white hover:text-black transition-colors p-3 md:p-4 rounded-full shadow-lg"
        >
          <ChevronRightIcon className="h-6 w-6 md:h-10 md:w-10" />
        </button>
      </div>
    </div>
  );
}

export default GaleriaImovel;
