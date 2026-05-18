"use client";

import { ShareIcon } from "@heroicons/react/24/outline";

function ShareButton({ title, text }) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Compartilhamento cancelado", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copiado para a área de transferência!");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 text-primary-300 hover:text-accent-400 transition-colors font-medium border border-primary-700 px-4 py-2 rounded-lg hover:bg-primary-800"
    >
      <ShareIcon className="h-5 w-5" />
      <span>Compartilhar</span>
    </button>
  );
}

export default ShareButton;
