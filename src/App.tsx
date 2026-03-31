import { useState, useMemo, useCallback, useEffect } from "react";
import { SSBU_CHARACTERS, QUESTIONS } from "./constants";
import { AppState } from "./types";
import type { ComparisonResult, Winner, ScoreBoard } from "./types";
import ComparisonView from "./components/ComparisonView";
import ResultsView from "./components/ResultsView";
import PairSelectionView from "./components/PairSelectionView";

export default function App() {
  // Start directly at PAIR_SELECTION with all characters selected by default
  const [state, setState] = useState<AppState>(AppState.PAIR_SELECTION);
  const selectedIds = useMemo(() => SSBU_CHARACTERS.map((c) => c.id), []);
  const [activePair, setActivePair] = useState<[string, string] | null>(null);
  const [results, setResults] = useState<ComparisonResult[]>(() => {
    const saved = localStorage.getItem("ssbu-tier-results");
    try {
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Error parsing saved results", e);
      return [];
    }
  });
  const [showInterim, setShowInterim] = useState(false);

  // Save results to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("ssbu-tier-results", JSON.stringify(results));
  }, [results]);

  const [isAutoMode, setIsAutoMode] = useState(false);

  // Generate all unique pairs from all characters
  const allPairs = useMemo(() => {
    const p: [string, string][] = [];
    for (let i = 0; i < selectedIds.length; i++) {
      for (let j = i + 1; j < selectedIds.length; j++) {
        p.push([selectedIds[i], selectedIds[j]]);
      }
    }
    return p;
  }, [selectedIds]);

  const handlePairSelect = useCallback(
    (pair: [string, string], auto: boolean = false) => {
      setActivePair(pair);
      setIsAutoMode(auto);
      setState(AppState.COMPARISON);
      setShowInterim(false);
    },
    [],
  );

  const handleComparisonComplete = useCallback(
    (answers: Record<string, Winner>) => {
      if (!activePair) return;

      const newResult: ComparisonResult = {
        charAId: activePair[0],
        charBId: activePair[1],
        answers,
      };

      setResults((prev) => {
        // Find index of existing result for this pair (order independent)
        const existingIndex = prev.findIndex(
          (r) =>
            (r.charAId === activePair[0] && r.charBId === activePair[1]) ||
            (r.charAId === activePair[1] && r.charBId === activePair[0]),
        );

        if (existingIndex !== -1) {
          const updated = [...prev];
          updated[existingIndex] = newResult;
          return updated;
        }
        return [...prev, newResult];
      });

      if (isAutoMode) {
        // Find the next incomplete pair (only skip if we're in auto mode and it's already done)
        // Actually, in auto mode we might want to skip completed ones OR just keep going.
        // Let's stick to skipping completed ones in auto-mode for efficiency.
        const nextPair = allPairs.find(
          (p) =>
            !results.some(
              (r) =>
                (r.charAId === p[0] && r.charBId === p[1]) ||
                (r.charAId === p[1] && r.charBId === p[0]),
            ),
        );

        if (nextPair) {
          setActivePair(nextPair);
          setState(AppState.COMPARISON);
        } else {
          setIsAutoMode(false);
          setActivePair(null);
          setState(AppState.RESULTS);
        }
      } else {
        setActivePair(null);
        setState(AppState.PAIR_SELECTION);
      }
    },
    [activePair, isAutoMode, allPairs, results],
  );

  // const reset = useCallback(() => {
  //   if (
  //     window.confirm("¿Estás seguro de que quieres reiniciar todo el progreso?")
  //   ) {
  //     setState(AppState.PAIR_SELECTION);
  //     setResults([]);
  //     localStorage.removeItem("ssbu-tier-results");
  //     setActivePair(null);
  //     setShowInterim(false);
  //     setIsAutoMode(false);
  //   }
  // }, []);

  const scoreBoard = useMemo(() => {
    const scores: ScoreBoard = {};
    selectedIds.forEach((id) => (scores[id] = 0));

    results.forEach((res) => {
      Object.values(res.answers).forEach((winner) => {
        if (winner === "A") scores[res.charAId] += 1;
        if (winner === "B") scores[res.charBId] += 1;
        if (winner === "Neutral") {
          scores[res.charAId] += 0.5;
          scores[res.charBId] += 0.5;
        }
      });
    });
    return scores;
  }, [results, selectedIds]);

  const currentPairResults = useMemo(() => {
    if (!activePair) return undefined;
    return results.find(
      (r) =>
        (r.charAId === activePair[0] && r.charBId === activePair[1]) ||
        (r.charAId === activePair[1] && r.charBId === activePair[0]),
    )?.answers;
  }, [activePair, results]);

  const isFullyComplete =
    results.length === allPairs.length && allPairs.length > 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="p-6 bg-slate-900 border-b border-slate-800 flex justify-between items-center sticky top-0 z-50 shadow-2xl">
        <div>
          <h1 className="text-2xl font-black bg-gradient-to-r from-red-500 via-orange-500 to-blue-500 bg-clip-text text-transparent italic tracking-tighter">
            SSBU TIER ANALYZER
          </h1>
          <p className="text-[10px] text-slate-500 mt-0.5 uppercase tracking-[0.2em] font-bold">
            Data-Driven Performance Rankings
          </p>
        </div>
        <div className="flex gap-2">
          {(state === AppState.PAIR_SELECTION ||
            (state === AppState.COMPARISON && !isAutoMode)) && (
            <button
              onClick={() => {
                if (state === AppState.COMPARISON)
                  setState(AppState.PAIR_SELECTION);
                setShowInterim(!showInterim);
              }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all border ${
                showInterim
                  ? "bg-blue-600 border-blue-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                  : "bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700"
              }`}
            >
              {showInterim ? "Cerrar Ranking" : "Ranking Temporal"}
            </button>
          )}
          {/* {results.length > 0 && (
            <button
              onClick={reset}
              className="px-4 py-2 bg-red-600/10 hover:bg-red-600/20 text-red-500 text-xs font-bold rounded-lg transition-all border border-red-500/30"
            >
              Reiniciar Todo
            </button>
          )} */}
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {state === AppState.PAIR_SELECTION && !showInterim && (
          <PairSelectionView
            pairs={allPairs}
            results={results}
            characters={SSBU_CHARACTERS}
            onSelectPair={(p) => handlePairSelect(p, false)}
            onStartAuto={() => {
              const firstIncomplete = allPairs.find(
                (p) =>
                  !results.some(
                    (r) =>
                      (r.charAId === p[0] && r.charBId === p[1]) ||
                      (r.charAId === p[1] && r.charBId === p[0]),
                  ),
              );
              if (firstIncomplete) handlePairSelect(firstIncomplete, true);
              else handlePairSelect(allPairs[0], true); // Fallback to first if all done
            }}
            onFinalize={() => setState(AppState.RESULTS)}
            isFullyComplete={isFullyComplete}
          />
        )}

        {state === AppState.COMPARISON && !showInterim && activePair && (
          <ComparisonView
            charA={SSBU_CHARACTERS.find((c) => c.id === activePair[0])!}
            charB={SSBU_CHARACTERS.find((c) => c.id === activePair[1])!}
            questions={QUESTIONS}
            initialAnswers={currentPairResults}
            onComplete={handleComparisonComplete}
            currentPair={results.length + 1}
            totalPairs={allPairs.length}
            isAutoMode={isAutoMode}
            onCancelAuto={() => {
              setIsAutoMode(false);
              setState(AppState.PAIR_SELECTION);
            }}
          />
        )}

        {(state === AppState.RESULTS || showInterim) && (
          <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
            {showInterim && (
              <div className="bg-slate-900 border border-blue-500/30 p-4 rounded-xl text-center mb-6 shadow-xl shadow-blue-500/5">
                <p className="text-blue-400 font-bold text-sm">
                  VISTA PREVIA DE RANKING ({results.length}/{allPairs.length})
                </p>
                <button
                  onClick={() => setShowInterim(false)}
                  className="mt-2 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Regresar al análisis anterior
                </button>
              </div>
            )}
            <ResultsView scores={scoreBoard} characters={SSBU_CHARACTERS} />
          </div>
        )}
      </main>

      <footer className="p-6 text-center text-slate-600 text-[10px] border-t border-slate-900 font-medium uppercase tracking-widest">
        Professional Tier List Generator &copy; {new Date().getFullYear()} •
        Smash Bros Analysis Tool
      </footer>
    </div>
  );
}
