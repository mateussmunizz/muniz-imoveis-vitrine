export default function MapaImovel({ endereco }) {
  if (!endereco || endereco === "EMPTY") {
    return (
      <div className="w-full h-80 bg-primary-950 border border-primary-800 rounded-2xl flex items-center justify-center text-primary-400">
        Endereço não disponível no momento.
      </div>
    );
  }

  const enderecoCodificado = encodeURIComponent(endereco);

  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-primary-800 shadow-lg relative">
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src={`https://maps.google.com/maps?q=${enderecoCodificado}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
      ></iframe>
    </div>
  );
}
