import React, { useState, useEffect } from "react";
import type { Character, Question, Winner } from "../types";

interface ComparisonViewProps {
  charA: Character;
  charB: Character;
  questions: Question[];
  initialAnswers?: Record<string, Winner>;
  onComplete: (answers: Record<string, Winner>) => void;
  currentPair: number;
  totalPairs: number;
  isAutoMode: boolean;
  onCancelAuto: () => void;
}

const ComparisonView: React.FC<ComparisonViewProps> = ({
  charA,
  charB,
  questions,
  initialAnswers,
  onComplete,
  currentPair,
  totalPairs,
  isAutoMode,
  onCancelAuto,
}) => {
  const [answers, setAnswers] = useState<Record<string, Winner>>(
    initialAnswers || {},
  );

  useEffect(() => {
    // Reset or load initial answers when characters change
    setAnswers(initialAnswers || {});
  }, [charA.id, charB.id, initialAnswers]);

  const setAnswer = (questionId: string, winner: Winner) => {
    setAnswers((prev) => ({ ...prev, [questionId]: winner }));
  };

  const isComplete = Object.keys(answers).length === questions.length;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-300 pb-20">
      <div className="flex flex-col items-center space-y-3">
        <div className="flex items-center justify-between w-full px-2">
          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${isAutoMode ? "bg-indigo-600/20 border-indigo-500/50 text-indigo-400" : "bg-slate-800 border-slate-700 text-slate-500"}`}
            >
              {isAutoMode ? "Secuencia Automática" : "Análisis Manual"}
            </span>
          </div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            {currentPair} / {totalPairs} COMPLETADOS
          </span>
        </div>
        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-700 ease-out"
            style={{
              width: `${(Math.min(currentPair, totalPairs) / totalPairs) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-12 items-center bg-slate-900/40 p-6 md:p-10 rounded-3xl border border-slate-800 shadow-2xl relative">
        <div className="flex flex-col items-center space-y-5">
          <div className="w-28 h-28 md:w-52 md:h-52 rounded-2xl bg-slate-800 border-2 border-blue-500/30 p-5 relative group overflow-hidden shadow-2xl transition-transform hover:scale-105">
            <img
              src={charA.image}
              alt={charA.name}
              className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]"
            />
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-center text-blue-400 uppercase tracking-tighter italic">
            {charA.name}
          </h3>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-slate-950 border-2 border-slate-800 flex items-center justify-center font-black text-slate-600 italic text-xl shadow-xl">
            VS
          </div>
        </div>

        <div className="flex flex-col items-center space-y-5">
          <div className="w-28 h-28 md:w-52 md:h-52 rounded-2xl bg-slate-800 border-2 border-red-500/30 p-5 relative group overflow-hidden shadow-2xl transition-transform hover:scale-105">
            <img
              src={charB.image}
              alt={charB.name}
              className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]"
            />
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-center text-red-400 uppercase tracking-tighter italic">
            {charB.name}
          </h3>
        </div>
      </div>

      <div className="space-y-2">
        {questions.map((q) => (
          <div
            key={q.id}
            className="bg-slate-900 border border-slate-800/80 p-4 rounded-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-all hover:bg-slate-800/40"
          >
            <div className="flex items-center gap-3 pl-2">
              <div
                className={`w-1.5 h-6 rounded-full ${answers[q.id] ? "bg-green-500" : "bg-slate-700"}`}
              ></div>
              <p className="text-sm font-bold text-slate-300 uppercase tracking-tight">
                {q.text}
              </p>
            </div>
            {/* 
              Layout Strategy:
              Mobile (Portrait/Landscape Small): Grid 2x2. Character A (Order 1, Col 1), Character B (Order 2, Col 2), Empate (Order 3, Col-Span 2).
              Desktop (lg): Flex Row. Order A: 1, Neutral: 2, B: 3.
            */}
            <div className="grid grid-cols-2 lg:flex lg:flex-row gap-1.5 w-full lg:w-auto">
              <button
                onClick={() => setAnswer(q.id, "A")}
                className={`order-1 px-3 py-2 rounded-lg font-black transition-all border text-[10px] uppercase tracking-wider ${
                  answers[q.id] === "A"
                    ? "bg-blue-600 border-blue-400 text-white shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                    : "bg-slate-800 border-slate-700 text-slate-500 hover:bg-slate-700 hover:text-slate-300"
                } lg:min-w-[110px] lg:flex-1`}
              >
                {charA.name}
              </button>

              <button
                onClick={() => setAnswer(q.id, "B")}
                className={`order-2 px-3 py-2 rounded-lg font-black transition-all border text-[10px] uppercase tracking-wider ${
                  answers[q.id] === "B"
                    ? "bg-red-600 border-red-400 text-white shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                    : "bg-slate-800 border-slate-700 text-slate-500 hover:bg-slate-700 hover:text-slate-300"
                } lg:min-w-[110px] lg:flex-1 lg:order-3`}
              >
                {charB.name}
              </button>

              <button
                onClick={() => setAnswer(q.id, "Neutral")}
                className={`order-3 col-span-2 px-3 py-2 rounded-lg font-black transition-all border text-[10px] uppercase tracking-wider ${
                  answers[q.id] === "Neutral"
                    ? "bg-slate-700 border-slate-500 text-white"
                    : "bg-slate-800 border-slate-700 text-slate-500 hover:bg-slate-700 hover:text-slate-300"
                } lg:col-span-1 lg:order-2 lg:min-w-[80px] lg:flex-none`}
              >
                EMPATE
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-slate-950/80 backdrop-blur-md border-t border-slate-800 z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          {isAutoMode && (
            <button
              onClick={onCancelAuto}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 text-xs font-black uppercase rounded-xl transition-all"
            >
              Detener Secuencia
            </button>
          )}
          <button
            onClick={() => onComplete(answers)}
            disabled={!isComplete}
            className={`flex-1 py-4 rounded-xl font-black text-sm uppercase tracking-widest shadow-2xl transition-all ${
              isComplete
                ? "bg-green-600 hover:bg-green-500 scale-100 hover:scale-[1.02] text-white shadow-green-900/20"
                : "bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700"
            }`}
          >
            {isAutoMode ? "SIGUIENTE MATCHUP" : "GUARDAR Y VOLVER"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonView;
