function Footer() {
  return (
    <footer className="border-t border-primary-900 bg-primary-950 mt-12 py-16 text-primary-300 text-lg">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="space-y-4">
          <h4 className="text-3xl font-bold text-accent-400">Muniz Imóveis</h4>
          <p className="leading-relaxed">
            Avenida Um, 123
            <br />
            Santana, São Paulo - SP
            <br />
            CEP: 00000-000
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-xl font-bold text-primary-100">Atendimento</h4>
          <p className="leading-relaxed">
            Fixo: (11) 2222-2222
            <br />
            WhatsApp: (11) 99999-9999
            <br />
            contato@munizimoveis.com.br
          </p>
          <p className="text-xl text-primary-400 mt-2">
            Segunda a Sexta: 09h às 18h
            <br />
            Sábados: 09h às 12h
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-xl font-bold text-primary-100">
            Acompanhe nossas novidades
          </h4>

          <ul className="flex flex-row gap-6 mt-2">
            {/* Instagram */}
            <li>
              <a
                href="#"
                aria-label="Instagram da Muniz Imóveis"
                className="block text-primary-400 hover:text-accent-400 transform hover:scale-110 hover:-translate-y-1 transition-all duration-300"
              >
                <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </li>

            {/* Facebook */}
            <li>
              <a
                href="#"
                aria-label="Facebook da Muniz Imóveis"
                className="block text-primary-400 hover:text-accent-400 transform hover:scale-110 hover:-translate-y-1 transition-all duration-300"
              >
                <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </li>

            {/* LinkedIn */}
            <li>
              <a
                href="#"
                aria-label="LinkedIn da Muniz Imóveis"
                className="block text-primary-400 hover:text-accent-400 transform hover:scale-110 hover:-translate-y-1 transition-all duration-300"
              >
                <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-xl max-w-7xl mx-auto px-8 mt-12 pt-6 border-t border-primary-900 flex flex-col md:flex-row justify-between items-center text-primary-500">
        <p>
          &copy; {new Date().getFullYear()} Muniz Imóveis. Todos os direitos
          reservados.
        </p>
        <p className="text-xl mt-2 md:mt-0">CRECI-SP: 00000-J</p>
      </div>
    </footer>
  );
}

export default Footer;
