import React, { useMemo } from "react";
import type { ScoreBoard, Character } from "../types";

interface ResultsViewProps {
  scores: ScoreBoard;
  characters: Character[];
}

const ResultsView: React.FC<ResultsViewProps> = ({ scores, characters }) => {
  const sorted = useMemo(() => {
    return [...characters].sort(
      (a, b) => (scores[b.id] || 0) - (scores[a.id] || 0),
    );
  }, [scores, characters]);

  const maxScore = sorted.length > 0 ? scores[sorted[0].id] : 0;

  // Categorize into tiers based on score percentile
  const tiers = useMemo(() => {
    if (sorted.length === 0) return { S: [], A: [], B: [], C: [], D: [] };

    const results: Record<string, Character[]> = {
      S: [],
      A: [],
      B: [],
      C: [],
      D: [],
    };
    const max = scores[sorted[0].id];
    const min = scores[sorted[sorted.length - 1].id];
    const range = max - min || 1;

    sorted.forEach((char) => {
      const score = scores[char.id];
      const normalized = (score - min) / range;

      if (normalized >= 0.8) results.S.push(char);
      else if (normalized >= 0.6) results.A.push(char);
      else if (normalized >= 0.4) results.B.push(char);
      else if (normalized >= 0.2) results.C.push(char);
      else results.D.push(char);
    });

    return results;
  }, [sorted, scores]);

  const tierColors: Record<string, string> = {
    S: "bg-red-600",
    A: "bg-orange-500",
    B: "bg-yellow-500",
    C: "bg-green-500",
    D: "bg-blue-500",
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-black uppercase tracking-tighter">
          Resultados del Análisis
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto">
          Basado en tus elecciones competitivas, este es el ranking definitivo
          de los personajes seleccionados.
        </p>
      </div>

      <div className="space-y-4">
        {/* Fix: Explicitly cast entries to avoid 'unknown' type for 'chars' */}
        {(Object.entries(tiers) as [string, Character[]][]).map(
          ([tier, chars]) => (
            <div
              key={tier}
              className="flex bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden min-h-[100px]"
            >
              <div
                className={`${tierColors[tier]} w-24 flex items-center justify-center text-4xl font-black text-black/80 shadow-inner`}
              >
                {tier}
              </div>
              <div className="flex-1 p-4 flex flex-wrap gap-4">
                {chars.length > 0 ? (
                  chars.map((char) => (
                    <div
                      key={char.id}
                      className="relative group flex flex-col items-center"
                    >
                      <div className="w-16 h-16 bg-slate-800 rounded-lg p-1 border border-slate-700 group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                        <img
                          src={char.image}
                          alt={char.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-[10px] mt-1 text-slate-400 font-bold uppercase truncate max-w-[64px]">
                        {char.name}
                      </span>
                      <div className="absolute -top-2 -right-2 bg-slate-950 border border-slate-700 rounded-full px-2 py-0.5 text-[8px] font-bold z-10">
                        {scores[char.id]}pts
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center text-slate-700 font-medium italic">
                    Sin personajes en esta categoría
                  </div>
                )}
              </div>
            </div>
          ),
        )}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <svg
            className="w-6 h-6 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          Ranking Detallado
        </h3>
        <div className="overflow-hidden rounded-2xl border border-slate-800">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 font-bold uppercase text-xs tracking-widest text-slate-400">
                  Puesto
                </th>
                <th className="px-6 py-4 font-bold uppercase text-xs tracking-widest text-slate-400">
                  Personaje
                </th>
                <th className="px-6 py-4 font-bold uppercase text-xs tracking-widest text-slate-400">
                  Puntuación
                </th>
                <th className="px-6 py-4 font-bold uppercase text-xs tracking-widest text-slate-400">
                  Desempeño
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {sorted.map((char, index) => (
                <tr
                  key={char.id}
                  className="hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4 font-black text-2xl text-slate-500">
                    #{index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-800 rounded-lg p-1">
                        <img
                          src={char.image}
                          alt={char.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="font-bold text-lg">{char.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-blue-400 font-bold">
                      {scores[char.id].toFixed(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 w-1/3">
                    <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{
                          width: `${(scores[char.id] / (maxScore || 1)) * 100}%`,
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResultsView;
