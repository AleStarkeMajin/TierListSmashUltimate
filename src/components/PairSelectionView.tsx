import React, { useState, useMemo } from "react";
import type { Character, ComparisonResult } from "../types";

interface PairSelectionViewProps {
  pairs: [string, string][];
  results: ComparisonResult[];
  characters: Character[];
  onSelectPair: (pair: [string, string]) => void;
  onStartAuto: () => void;
  onFinalize: () => void;
  isFullyComplete: boolean;
}

const PairSelectionView: React.FC<PairSelectionViewProps> = ({
  pairs,
  results,
  characters,
  onSelectPair,
  onStartAuto,
  onFinalize,
  isFullyComplete,
}) => {
  const [filterCharIds, setFilterCharIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const isPairCompleted = (charAId: string, charBId: string) => {
    return results.some(
      (r) =>
        (r.charAId === charAId && r.charBId === charBId) ||
        (r.charAId === charBId && r.charBId === charAId),
    );
  };

  const toggleFilter = (id: string) => {
    setFilterCharIds((prev) => {
      if (prev.includes(id)) return prev.filter((i) => i !== id);
      if (prev.length >= 2) return [prev[1], id];
      return [...prev, id];
    });
  };

  const filteredPairs = useMemo(() => {
    if (filterCharIds.length === 0) return pairs;
    if (filterCharIds.length === 1) {
      const target = filterCharIds[0];
      return pairs.filter((p) => p[0] === target || p[1] === target);
    }
    // Filter for exact pair (order doesn't matter in the 'pairs' array generation logic)
    return pairs.filter(
      (p) =>
        (p[0] === filterCharIds[0] && p[1] === filterCharIds[1]) ||
        (p[0] === filterCharIds[1] && p[1] === filterCharIds[0]),
    );
  }, [pairs, filterCharIds]);

  const searchableCharacters = useMemo(() => {
    return characters.filter((c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [characters, searchTerm]);

  const completedCount = results.length;
  const totalCount = pairs.length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl text-center space-y-6 shadow-xl">
        <div className="space-y-2">
          <h2 className="text-4xl font-black tracking-tighter uppercase italic">
            Selección de Análisis
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Analiza los enfrentamientos uno por uno o selecciona manualmente los
            matchups que desees comparar. Puedes volver a entrar en un matchup
            completado para editarlo.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-widest bg-slate-800/50 px-4 py-1.5 rounded-full border border-slate-700">
            <span>Progreso:</span>
            <span className="text-blue-400">{completedCount}</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">{totalCount}</span>
          </div>
          <div className="w-full max-md bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-1000 ease-out"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            />
          </div>

          {!isFullyComplete && (
            <button
              onClick={onStartAuto}
              className="mt-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl font-black text-white text-xs shadow-lg shadow-blue-900/20 scale-100 hover:scale-105 active:scale-95 transition-all uppercase tracking-tight flex items-center gap-3"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
              Seguir secuencia automática
            </button>
          )}
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-black uppercase tracking-tight italic text-blue-400">
              Filtrar Matchups
            </h3>
            <p className="text-xs text-slate-500 font-bold uppercase">
              Selecciona hasta 2 personajes para buscar sus peleas
            </p>
          </div>
          <div className="flex items-center gap-2">
            {filterCharIds.length > 0 && (
              <button
                onClick={() => setFilterCharIds([])}
                className="text-[10px] font-black uppercase text-red-500 hover:text-red-400 transition-colors px-3 py-1 bg-red-500/10 rounded-lg border border-red-500/20"
              >
                Limpiar Filtro
              </button>
            )}
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-48"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 bg-slate-950/50 rounded-xl border border-slate-800 custom-scrollbar">
          {searchableCharacters.map((char) => {
            const isSelected = filterCharIds.includes(char.id);
            return (
              <button
                key={char.id}
                onClick={() => toggleFilter(char.id)}
                className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 transition-all ${
                  isSelected
                    ? "bg-blue-600 border-blue-400 text-white"
                    : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500"
                }`}
              >
                <div className="w-6 h-6 bg-slate-900 rounded border border-white/10 overflow-hidden">
                  <img
                    src={char.image}
                    alt={char.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[10px] font-black uppercase whitespace-nowrap">
                  {char.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="font-bold text-slate-400 uppercase text-xs tracking-[0.2em]">
            {filterCharIds.length > 0
              ? "Resultados del Filtro"
              : "Mapa de Enfrentamientos"}
          </h3>
          <span className="text-[10px] font-medium text-slate-600">
            MOSTRANDO {filteredPairs.length} MATCHUPS
          </span>
        </div>

        {filteredPairs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredPairs.map((pair) => {
              const charA = characters.find((c) => c.id === pair[0])!;
              const charB = characters.find((c) => c.id === pair[1])!;
              const completed = isPairCompleted(pair[0], pair[1]);

              return (
                <button
                  key={`${pair[0]}-${pair[1]}`}
                  onClick={() => onSelectPair(pair)}
                  className={`relative group p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-4 overflow-hidden bg-slate-900 border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/50 hover:shadow-xl hover:shadow-blue-500/5 ${
                    completed ? "border-green-500/30" : ""
                  }`}
                >
                  <div className="flex-1 flex flex-col items-center gap-1.5 z-10">
                    <div className="w-14 h-14 bg-slate-800 rounded-lg p-1.5 border border-slate-700/50 shadow-inner">
                      <img
                        src={charA.image}
                        alt={charA.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-[10px] font-black uppercase truncate w-full text-center text-slate-300 tracking-tighter">
                      {charA.name}
                    </span>
                  </div>

                  <div className="z-10 flex flex-col items-center">
                    {completed ? (
                      <div className="flex flex-col items-center gap-1">
                        <div className="text-green-500 scale-110">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="4"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-[8px] font-black text-green-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          EDITAR
                        </span>
                      </div>
                    ) : (
                      <div className="text-slate-800 font-black italic text-sm group-hover:text-blue-500 transition-colors uppercase">
                        VS
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col items-center gap-1.5 z-10">
                    <div className="w-14 h-14 bg-slate-800 rounded-lg p-1.5 border border-slate-700/50 shadow-inner">
                      <img
                        src={charB.image}
                        alt={charB.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-[10px] font-black uppercase truncate w-full text-center text-slate-300 tracking-tighter">
                      {charB.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="bg-slate-900/50 border-2 border-dashed border-slate-800 rounded-3xl py-20 text-center space-y-2">
            <p className="text-slate-500 font-bold uppercase tracking-widest italic">
              No se encontraron matchups con esos criterios
            </p>
            <button
              onClick={() => setFilterCharIds([])}
              className="text-blue-500 text-xs font-black underline hover:text-blue-400"
            >
              Limpiar todos los filtros
            </button>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0f172a;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `}</style>
    </div>
  );
};

export default PairSelectionView;
