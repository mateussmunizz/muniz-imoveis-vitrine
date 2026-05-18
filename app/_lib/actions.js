"use server";

import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn, signOut } from "./auth";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function getHorariosOcupados() {
  try {
    const { data, error } = await supabase
      .from("visitas")
      .select("data_visita")
      .neq("status", "cancelada");

    if (error) {
      return [];
    }

    return data.map((visita) => visita.data_visita);
  } catch (error) {
    return [];
  }
}

export async function agendarVisita(formData) {
  const imovel_id = formData.get("imovel_id");
  const cliente_id = formData.get("cliente_id");
  const data_visita = formData.get("data_visita");
  const horario = formData.get("horario");
  const nome = formData.get("nome");
  const telefone = formData.get("telefone");

  const dataCompleta = `${data_visita} ${horario}`;

  const payload = {
    imovel_id: parseInt(imovel_id, 10),
    nome_cliente: nome,
    whatsapp: telefone,
    data_visita: dataCompleta,
    status: "pendente",
  };

  if (cliente_id) {
    payload.cliente_id = parseInt(cliente_id, 10);
  }

  const { error } = await supabase.from("visitas").insert([payload]);

  if (error) {
    throw new Error(
      `O BANCO RECUSOU: ${error.message} | Detalhes: ${error.details || "Nenhum"}`,
    );
  }

  revalidatePath("/account/contratos");
  revalidatePath("/admin");
  revalidatePath(`/imoveis/${imovel_id}`);

  redirect("/account/contratos");
}

export async function cancelarVisita(visitaId) {
  const { error } = await supabase
    .from("visitas")
    .update({ status: "cancelada" })
    .eq("id", visitaId);

  if (error) throw new Error("Não foi possível cancelar a visita");

  revalidatePath("/account/contratos");
  revalidatePath("/admin");
}

export async function confirmarVisita(visitaId) {
  const { error } = await supabase
    .from("visitas")
    .update({ status: "confirmado" })
    .eq("id", visitaId);

  if (error) throw new Error("Não foi possível confirmar a visita");

  revalidatePath("/account/contratos");
  revalidatePath("/admin");
}

export async function toggleFavorito(imovelId, clienteId, isFavorited) {
  if (!clienteId) {
    throw new Error("Você precisa estar logado para favoritar um imóvel.");
  }

  try {
    if (isFavorited) {
      const { error } = await supabase
        .from("favoritos")
        .delete()
        .eq("imovel_id", imovelId)
        .eq("cliente_id", clienteId);

      if (error) throw new Error("Erro ao remover favorito");
    } else {
      const { error } = await supabase
        .from("favoritos")
        .insert([{ imovel_id: imovelId, cliente_id: clienteId }]);

      if (error) throw new Error("Erro ao adicionar favorito");
    }

    revalidatePath(`/imoveis/${imovelId}`);
    revalidatePath("/account/favoritos");
  } catch (error) {
    throw new Error("Não foi possível atualizar os favoritos.");
  }
}

export async function atualizarPerfil(formData) {
  const email = formData.get("email");
  const whatsapp = formData.get("whatsapp");

  const { data, error } = await supabase
    .from("clientes")
    .update({ telefone: whatsapp })
    .eq("email", email)
    .select();

  if (error) {
    throw new Error(
      `O BANCO RECUSOU: ${error.message} | Detalhes: ${error.details || "Nenhum"}`,
    );
  }

  if (!data || data.length === 0) {
    throw new Error(`Nenhum cliente encontrado com o e-mail: ${email}`);
  }

  revalidatePath("/account/perfil");
  redirect("/account/perfil?success=true");
}

export async function enviarAnuncio(formData) {
  const nome = formData.get("nome");
  const telefone = formData.get("telefone");
  const endereco = formData.get("endereco");
  const tipo_negocio = formData.get("tipo_negocio"); // ex: "alugar"
  const tipo_imovel = formData.get("tipo_imovel"); // ex: "apartamento"

  // Junta o tipo de imóvel e o negócio no formato que o banco espera: "apartamento (Para alugar)"
  const tipoFormatado = `${tipo_imovel} (Para ${tipo_negocio})`;

  // Mapeamento exato com os nomes das colunas do seu print
  const payload = {
    nome_proprietario: nome,
    whatsapp: telefone,
    endereco_imovel: endereco,
    tipo_imovel: tipoFormatado,
    status: "novo",
  };

  const { error } = await supabase.from("captacoes").insert([payload]);

  if (error) {
    throw new Error(
      `O BANCO RECUSOU: ${error.message} | Detalhes: ${error.details || "Nenhum"}`,
    );
  }

  redirect("/anunciar?sucesso=true");
}
