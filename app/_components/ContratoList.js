"use client";

import ReservationCard from "./ContratoCard";
import { deleteContrato } from "../_lib/actions";

import { useOptimistic } from "react";

function ReservationList({ contratos }) {
  const [optimisticContratos, optimisticDelete] = useOptimistic(
    contratos,
    (curContratos, contratoId) => {
      return curContratos.filter((contrato) => contrato.id !== contratoId);
    },
  );

  async function handleDelete(contratoId) {
    optimisticDelete(contratoId);
    await deleteContrato(contratoId);
  }

  return (
    <ul className="space-y-6">
      {optimisticContratos.map((contrato) => (
        <ReservationCard
          contrato={contrato}
          onDelete={handleDelete}
          key={contrato.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
