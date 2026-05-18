"use client";

import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ptBR } from "date-fns/locale";
import { format, parseISO } from "date-fns";
import { agendarVisita, getHorariosOcupados } from "../_lib/actions";

// Feriados Nacionais
const feriadosNacionais = [
  new Date(2026, 0, 1),
  new Date(2026, 1, 16),
  new Date(2026, 1, 17),
  new Date(2026, 3, 3),
  new Date(2026, 3, 21),
  new Date(2026, 4, 1),
  new Date(2026, 5, 4),
  new Date(2026, 8, 7),
  new Date(2026, 9, 12),
  new Date(2026, 10, 2),
  new Date(2026, 10, 15),
  new Date(2026, 11, 25),
];

function AgendamentoForm({ imovelId, clienteId }) {
  const [selectedDate, setSelectedDate] = useState();
  const [horario, setHorario] = useState("");
  const [horariosOcupados, setHorariosOcupados] = useState([]);

  useEffect(() => {
    async function carregarOcupados() {
      try {
        const datasIso = await getHorariosOcupados();

        if (datasIso && datasIso.length > 0) {
          const ocupados = datasIso.map((isoString) => {
            const dataObj = parseISO(isoString);
            return format(dataObj, "yyyy-MM-dd HH:mm");
          });
          setHorariosOcupados(ocupados);
        }
      } catch (error) {
        console.error("Erro ao carregar horários ocupados:", error);
      }
    }

    carregarOcupados();
  }, []);

  let availableTimes = [];
  if (selectedDate) {
    const isSabado = selectedDate.getDay() === 6;
    const todosHorarios = isSabado
      ? ["09:00", "10:00", "11:00", "12:00"]
      : ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];

    const dataFormatada = format(selectedDate, "yyyy-MM-dd");

    availableTimes = todosHorarios.filter((time) => {
      const slotSolicitado = `${dataFormatada} ${time}`;
      return !horariosOcupados.includes(slotSolicitado);
    });
  }

  const disabledDays = [
    { dayOfWeek: [0] },
    { before: new Date() },
    ...feriadosNacionais,
  ];

  return (
    <form action={agendarVisita} className="space-y-8">
      <input type="hidden" name="imovel_id" value={imovelId} />

      {clienteId && <input type="hidden" name="cliente_id" value={clienteId} />}

      {selectedDate && (
        <input
          type="hidden"
          name="data_visita"
          value={format(selectedDate, "yyyy-MM-dd")}
        />
      )}

      <div className="flex flex-col gap-3">
        <label htmlFor="nome" className="text-primary-200 font-medium text-xl">
          Seu Nome Completo
        </label>
        <input
          type="text"
          id="nome"
          name="nome"
          required
          className="bg-primary-950 border border-primary-800 px-6 py-5 rounded-xl text-primary-100 focus:outline-none focus:ring-2 focus:ring-accent-400/50 transition-all text-xl"
        />
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-primary-200 font-medium text-xl">
          Data da Visita
        </label>
        <div className="bg-primary-950 border border-primary-800 rounded-xl p-4 flex justify-center text-primary-100">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              setSelectedDate(date);
              setHorario("");
            }}
            locale={ptBR}
            disabled={disabledDays}
            className="rdp-custom"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-3">
          <label
            htmlFor="horario"
            className="text-primary-200 font-medium text-xl"
          >
            Horário
          </label>
          <select
            id="horario"
            name="horario"
            required
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
            disabled={!selectedDate || availableTimes.length === 0}
            className="bg-primary-950 border border-primary-800 px-6 py-5 rounded-xl text-primary-100 focus:outline-none focus:ring-2 focus:ring-accent-400/50 transition-all text-xl appearance-none disabled:opacity-50"
          >
            <option value="">
              {!selectedDate
                ? "Escolha uma data primeiro"
                : availableTimes.length === 0
                  ? "Indisponível (Já agendado)"
                  : "Selecione o horário"}
            </option>
            {availableTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-3">
          <label
            htmlFor="telefone"
            className="text-primary-200 font-medium text-xl"
          >
            Seu WhatsApp
          </label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            required
            placeholder="(11) 99999-9999"
            className="bg-primary-950 border border-primary-800 px-6 py-5 rounded-xl text-primary-100 focus:outline-none focus:ring-2 focus:ring-accent-400/50 transition-all text-xl"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!selectedDate || !horario || !clienteId}
        className="w-full bg-accent-500 hover:bg-accent-600 disabled:bg-primary-800 disabled:text-primary-600 text-primary-900 font-bold px-8 py-5 rounded-xl text-xl mt-4 transition-all shadow-lg active:scale-95"
      >
        {!clienteId ? "Faça login para agendar" : "Confirmar Agendamento"}
      </button>
    </form>
  );
}

export default AgendamentoForm;
