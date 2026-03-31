import React, { useState } from "react";
import type { Character } from "../types";

interface SelectionViewProps {
  characters: Character[];
  onStart: (ids: string[]) => void;
}

const SelectionView: React.FC<SelectionViewProps> = ({
  characters,
  onStart,
}) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const filtered = characters.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-4xl font-extrabold tracking-tight">
          Elige los contendientes
        </h2>
        <p className="text-slate-400">
          Selecciona los personajes que deseas incluir en tu tier list. Se
          realizarán comparaciones 1 vs 1 en 10 categorías distintas para
          generar el ranking final.
        </p>

        <div className="relative pt-4">
          <input
            type="text"
            placeholder="Buscar personaje..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {filtered.map((char) => {
          const isSelected = selected.includes(char.id);
          return (
            <button
              key={char.id}
              onClick={() => toggle(char.id)}
              className={`relative group rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                isSelected
                  ? "border-blue-500 ring-4 ring-blue-500/20 scale-105 z-10"
                  : "border-slate-800 hover:border-slate-600"
              }`}
            >
              <img
                src={char.image}
                alt={char.name}
                className={`w-full h-full object-contain p-2 transition-opacity ${isSelected ? "opacity-100" : "opacity-60 group-hover:opacity-100"}`}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100 transition-opacity`}
              >
                <span className="text-[10px] font-bold uppercase truncate px-1">
                  {char.name}
                </span>
              </div>
              {isSelected && (
                <div className="absolute top-1 right-1 bg-blue-500 text-white rounded-full p-1 shadow-lg">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="sticky bottom-8 flex justify-center pt-8">
        <button
          onClick={() => onStart(selected)}
          disabled={selected.length < 2}
          className={`px-12 py-4 rounded-2xl font-bold text-lg shadow-2xl transition-all ${
            selected.length >= 2
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 scale-105 hover:scale-110 active:scale-95"
              : "bg-slate-800 text-slate-500 cursor-not-allowed"
          }`}
        >
          {selected.length < 2
            ? "Selecciona al menos 2"
            : `Empezar análisis (${selected.length} personajes)`}
        </button>
      </div>
    </div>
  );
};

export default SelectionView;
