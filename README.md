# 🏢 Muniz Imóveis - Vitrine & Área do Cliente

Esta é a aplicação frontend voltada para o cliente final da **Muniz Imóveis**, uma consultoria imobiliária. O projeto foi desenvolvido com foco em SEO, performance e experiência do utilizador para visualização de anúncios, captação de leads e gestão de agendamentos.

Este projeto é parte de um ecossistema maior e funciona em conjunto com o **Painel Administrativo** para a gestão completa da imobiliária.

---

## 🔗 Links Importantes

* 🌍 **Acesse a Vitrine (Live Demo):** [https://muniz-imoveis-vitrine.vercel.app](https://muniz-imoveis-vitrine.vercel.app)
* ⚙️ **Repositório do Painel Administrativo:** https://admin-imob-omega.vercel.app/imoveis

---

## 🏗️ Tecnologias Utilizadas

A aplicação foi construída com as tecnologias mais modernas do ecossistema React, garantindo renderização rápida e segurança:

* **Framework:** React com Next.js (App Router)
* **Estilização:** Tailwind CSS (Design 100% responsivo)
* **Autenticação:** Auth.js / NextAuth v5 (Login via Google OAuth)
* **Banco de Dados & Storage:** Supabase (PostgreSQL)
* **Ícones:** Heroicons

---

## 🚀 Como testar localmente

Siga os passos abaixo para rodar a aplicação na sua máquina:

1. Clone este repositório e acesse a pasta:
   ```bash
   git clone <link-deste-repositorio>
   cd vitrine-imob
Instale as dependências:

Bash
npm install
Crie um arquivo .env.local na raiz do projeto e preencha com as suas credenciais:

Snippet de código
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
AUTH_GOOGLE_ID=seu_client_id_do_google
AUTH_GOOGLE_SECRET=seu_client_secret_do_google
AUTH_SECRET=uma_senha_aleatoria_para_criptografia
Inicie o servidor de desenvolvimento:

Bash
npm run dev
A Vitrine estará disponível no seu navegador em http://localhost:3000.

👨‍💻 Sobre o Projeto
Desenvolvido por Mateus Muniz, concluinte de Sistemas de Informação na FAM (Centro Universitário das Américas). Este projeto integra o portfólio acadêmico e profissional, simulando uma infraestrutura de software real do mercado imobiliário.

As imagens de imóveis utilizadas neste sistema são geradas por Inteligência Artificial exclusivamente para fins de demonstração.
