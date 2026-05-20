import { supabase } from "./supabase";

export async function getCliente(email) {
  const { data, error } = await supabase
    .from("clientes")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    console.error("Erro ao buscar cliente no Supabase:", error);
    return null;
  }

  return data;
}

export async function createCliente(newCliente) {
  const { data, error } = await supabase
    .from("clientes")
    .insert([newCliente])
    .select()
    .single();

  if (error) throw new Error("Não foi possível criar o cliente");
  return data;
}

export async function getImoveis() {
  const { data, error } = await supabase.from("imoveis").select("*");
  if (error) throw new Error("Não foi possível carregar os imóveis");
  return data;
}

export async function getImovel(id) {
  const { data, error } = await supabase
    .from("imoveis")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

export async function getFavoritos(clienteId) {
  if (!clienteId) return [];
  const { data, error } = await supabase
    .from("favoritos")
    .select("imovel_id")
    .eq("cliente_id", clienteId);

  if (error) return [];
  return data.map((fav) => fav.imovel_id);
}

export async function getVisitas() {
  const { data, error } = await supabase
    .from("visitas")
    .select("id, data_visita, status, imoveis(name, image)")
    .neq("status", "cancelada")
    .order("data_visita", { ascending: false });

  if (error) throw new Error("Não foi possível carregar as visitas");
  return data;
}

export async function getVisitasCliente(userEmail) {
  if (!userEmail) return [];

  const cliente = await getCliente(userEmail);
  if (!cliente) return [];

  const { data, error } = await supabase
    .from("visitas")
    .select(
      `
      id, 
      data_visita, 
      status, 
      imovel:imoveis (id, name, endereco, image)
    `,
    )
    .eq("cliente_id", cliente.id)
    .neq("status", "cancelada")
    .order("data_visita", { ascending: true });

  if (error) return [];
  return data;
}

export async function atualizarStatusVisita(visitaId, novoStatus) {
  const { data, error } = await supabase
    .from("visitas")
    .update({ status: novoStatus })
    .eq("id", visitaId)
    .select();

  if (error) throw new Error("Erro ao atualizar status da visita");
  return data;
}
