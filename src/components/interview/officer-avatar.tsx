"use client";

import Image from "next/image";

type OfficerAvatarProps = {
  name: string;
  isSpeaking: boolean;
};

export function OfficerAvatar({ name, isSpeaking }: OfficerAvatarProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        {isSpeaking && (
          <>
            <span
              className="absolute inset-0 rounded-full animate-ping"
              style={{ background: "rgba(59,130,246,0.2)" }}
            />
            <span
              className="absolute -inset-2 rounded-full animate-ping [animation-delay:150ms]"
              style={{ background: "rgba(59,130,246,0.1)" }}
            />
          </>
        )}
        <div
          className="relative w-24 h-24 rounded-full overflow-hidden transition-all duration-300"
          style={
            isSpeaking
              ? { boxShadow: "0 0 32px rgba(59,130,246,0.45)", outline: "2px solid rgba(59,130,246,0.5)" }
              : { outline: "2px solid rgba(255,255,255,0.08)" }
          }
        >
          <Image
            src="/officer.jpeg"
            alt="Agente de imigração"
            fill
            className="object-cover object-top"
            priority
          />
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-white">{name}</p>
        <p className="text-xs text-white/35">
          {isSpeaking ? "Perguntando..." : "Aguardando sua resposta"}
        </p>
      </div>
    </div>
  );
}
