"use client";

import { useContrato } from "./ContratoContext";
import { agendarVisita, getHorariosOcupados } from "../_lib/actions";
import { useState, useEffect } from "react";

function formatarDataParaBanco(data) {
  return data.toISOString().split("T")[0];
}

function ContratoForm({ imovel, user }) {
  const { range, resetRange } = useContrato();
  const { id } = imovel;
  const dataVisita = range;

  const [ocupados, setOcupados] = useState([]);
  const [carregandoHorarios, setCarregandoHorarios] = useState(false);

  useEffect(() => {
    if (dataVisita) {
      setCarregandoHorarios(true);
      const dataStr = formatarDataParaBanco(dataVisita);
      getHorariosOcupados(id, dataStr).then((horariosJaAgendados) => {
        setOcupados(horariosJaAgendados);
        setCarregandoHorarios(false);
      });
    } else {
      setOcupados([]);
    }
  }, [dataVisita, id]);

  let horariosDisponiveis = [];
  const isSabado = dataVisita && dataVisita.getDay() === 6;

  if (isSabado) {
    horariosDisponiveis = ["09:00", "10:00", "11:00"];
  } else {
    horariosDisponiveis = [
      "09:00",
      "10:00",
      "11:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
    ];
  }

  horariosDisponiveis = horariosDisponiveis.filter(
    (h) => !ocupados.includes(h),
  );

  const dadosVisita = { imovelId: id, dataVisita };
  const agendarVisitaComDados = agendarVisita.bind(null, dadosVisita);

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logado como</p>
        <div className="flex gap-4 items-center">
          <img
            className="h-8 rounded-full"
            src={user?.image}
            alt={user?.name}
          />
          <p>{user?.name}</p>
        </div>
      </div>

      <form
        action={(formData) => {
          agendarVisitaComDados(formData);
          resetRange();
        }}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col h-full"
      >
        <div className="space-y-2">
          <label htmlFor="horario">Qual o melhor horário?</label>
          <select
            name="horario"
            id="horario"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full disabled:opacity-50"
            required
            disabled={
              !dataVisita ||
              carregandoHorarios ||
              horariosDisponiveis.length === 0
            }
          >
            <option value="">
              {!dataVisita
                ? "Selecione um dia primeiro"
                : carregandoHorarios
                  ? "Checando agenda..."
                  : horariosDisponiveis.length === 0
                    ? "Sem horários neste dia"
                    : "Selecione..."}
            </option>
            {horariosDisponiveis.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="telefone">WhatsApp para contato</label>
          <input
            type="text"
            name="telefone"
            id="telefone"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full"
            required
            placeholder="(11) 99999-9999"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="observacoes">Deseja deixar uma mensagem?</label>
          <textarea
            name="observacoes"
            id="observacoes"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full"
            rows={2}
          />
        </div>

        <div className="flex justify-end items-center gap-6 mt-auto pt-4">
          {!dataVisita ? (
            <p className="text-primary-300 text-base">
              Selecione o dia no calendário
            </p>
          ) : horariosDisponiveis.length === 0 && !carregandoHorarios ? (
            <p className="text-red-400 font-semibold text-base">
              Agenda lotada neste dia
            </p>
          ) : (
            <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all">
              Solicitar Agendamento
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ContratoForm;
