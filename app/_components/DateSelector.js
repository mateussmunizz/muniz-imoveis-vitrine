"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useContrato } from "./ContratoContext";
import { ptBR } from "date-fns/locale";

function DateSelector({ imovel }) {
  const { range, setRange } = useContrato();

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="single"
        onSelect={setRange}
        selected={range}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 1}
        captionLayout="dropdown"
        numberOfMonths={1}
        locale={ptBR}
        disabled={(date) => {
          // Bloqueia Domingos
          if (date.getDay() === 0) return true;

          // Bloqueia Feriados Nacionais (Exemplos)
          const diaMes = `${date.getDate()}/${date.getMonth() + 1}`;
          const feriados = [
            "1/1",
            "21/4",
            "1/5",
            "7/9",
            "12/10",
            "2/11",
            "15/11",
            "25/12",
          ];
          if (feriados.includes(diaMes)) return true;

          return false;
        }}
      />

      <div className="bg-accent-500 text-primary-800 p-4 text-center font-semibold">
        {range
          ? `Dia selecionado: ${range.toLocaleDateString("pt-BR")}`
          : "Selecione o dia da visita"}
      </div>
    </div>
  );
}

export default DateSelector;
