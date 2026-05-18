"use client";

import { createContext, useContext, useState } from "react";

const ContratoContext = createContext();
const initialState = undefined;

function ContratoProvider({ children }) {
  const [range, setRange] = useState(initialState);
  const resetRange = () => setRange(initialState);

  return (
    <ContratoContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ContratoContext.Provider>
  );
}

function useContrato() {
  const context = useContext(ContratoContext);
  if (context === undefined) {
    throw new Error("Context was used outside provider");
  }
  return context;
}

export { ContratoProvider, useContrato };
