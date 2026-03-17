import { Map as MapIcon } from "lucide-react";

export function MinimalMap() {
  return (
    <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pattern-dots opacity-10 bg-[radial-gradient(#1e40af_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center max-w-sm text-center z-10 border border-slate-200">
        <MapIcon className="w-12 h-12 text-primary mb-4" />
        <h3 className="text-lg font-bold text-secondary mb-2">Interactive Mapbox</h3>
        <p className="text-sm text-slate-500">
          This is a placeholder for the Mapbox integration. Provide a valid Mapbox API Token to activate full geospatial rendering.
        </p>
      </div>
    </div>
  );
}
