type TranscriptBubbleProps = {
  transcript: string;
};

export function TranscriptBubble({ transcript }: TranscriptBubbleProps) {
  return (
    <div className="flex justify-end">
      <div
        className="max-w-[85%] rounded-2xl rounded-br-sm px-4 py-3"
        style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.2)" }}
      >
        <p className="text-[10px] text-blue-400/60 mb-1 uppercase tracking-widest">Você disse</p>
        <p className="text-sm text-white leading-relaxed">"{transcript}"</p>
      </div>
    </div>
  );
}
