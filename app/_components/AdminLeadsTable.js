import { atualizarStatusLead } from "../_lib/actions";

function AdminLeadsTable({ leads }) {
  return (
    <div className="bg-primary-900 border border-primary-800 rounded-xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-primary-950 text-primary-200 border-b border-primary-800">
              <th className="p-4 font-semibold">Data</th>
              <th className="p-4 font-semibold">Proprietário</th>
              <th className="p-4 font-semibold">Contato</th>
              <th className="p-4 font-semibold">Imóvel / Intenção</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-center">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-800">
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="hover:bg-primary-800/50 transition-colors text-primary-100"
              >
                <td className="p-4 whitespace-nowrap">
                  {new Date(lead.created_at).toLocaleDateString("pt-BR")}
                </td>
                <td className="p-4 font-medium">{lead.nome}</td>
                <td className="p-4">{lead.telefone}</td>
                <td className="p-4">
                  <span className="block text-sm text-primary-300 capitalize">
                    {lead.tipo_negocio} - {lead.tipo_imovel}
                  </span>
                  <span
                    className="block truncate max-w-[200px] text-sm"
                    title={lead.endereco}
                  >
                    {lead.endereco}
                  </span>
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      lead.status === "pendente"
                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                        : lead.status === "em atendimento"
                          ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                          : "bg-green-500/20 text-green-400 border border-green-500/30"
                    }`}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="p-4 flex justify-center">
                  <form
                    action={atualizarStatusLead}
                    className="flex gap-2 items-center"
                  >
                    <input type="hidden" name="id" value={lead.id} />
                    <select
                      name="status"
                      defaultValue={lead.status}
                      className="bg-primary-950 border border-primary-700 text-sm rounded-lg px-2 py-1 text-primary-200 focus:outline-none focus:border-accent-400"
                    >
                      <option value="pendente">Pendente</option>
                      <option value="em atendimento">Em Atendimento</option>
                      <option value="concluido">Concluído</option>
                    </select>
                    <button
                      type="submit"
                      className="bg-primary-800 hover:bg-primary-700 text-accent-400 px-3 py-1 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Salvar
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminLeadsTable;
