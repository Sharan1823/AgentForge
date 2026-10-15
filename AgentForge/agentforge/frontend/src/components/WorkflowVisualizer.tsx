export function WorkflowVisualizer({ definition }: { definition: unknown }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="font-display text-lg">Workflow</div>
      <div className="text-white/60 text-sm mt-1">Basic visualizer placeholder (SVG nodes/arrows next).</div>
      <pre className="mt-4 text-xs bg-black/30 border border-white/10 rounded-2xl p-4 overflow-auto">
        {JSON.stringify(definition, null, 2)}
      </pre>
    </div>
  );
}

