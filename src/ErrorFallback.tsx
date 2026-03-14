import { AlertTriangleIcon, RefreshCwIcon } from "lucide-react";

export const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => {
  // When encountering an error in the development mode, rethrow it and don't display the boundary.
  // The parent UI will take care of showing a more helpful dialog.
  if (import.meta.env.DEV) throw error;

  return (
    <div className="min-h-screen bg-black text-zinc-50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4 text-emerald-400">
          <AlertTriangleIcon className="w-6 h-6" />
          <h2 className="text-xl font-bold tracking-tight">Erreur d'application</h2>
        </div>
        
        <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
          Une erreur inattendue s'est produite. Nos équipes techniques ont été notifiées.
        </p>
        
        <div className="bg-black border border-zinc-800 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-xs text-zinc-500 uppercase tracking-wide mb-2">Détails de l'erreur</h3>
          <pre className="text-xs text-zinc-300 overflow-auto max-h-32 whitespace-pre-wrap font-mono">
            {error.message}
          </pre>
        </div>
        
        <button 
          onClick={resetErrorBoundary} 
          className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-zinc-100 font-semibold tracking-tight transition-all duration-300 py-3 rounded-md"
        >
          <RefreshCwIcon className="w-4 h-4" />
          Relancer l'application
        </button>
      </div>
    </div>
  );
}
