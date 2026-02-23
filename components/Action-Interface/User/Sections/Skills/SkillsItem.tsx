"use client";

import { TSkillsItem } from "@/types/skillsType";
import Image from "next/image";
import { useSkillsObserver } from "./useSkillsObserver";

interface SkillItemProps {
  skill: TSkillsItem;
  color: string;
  delay?: number;
  hovered?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
}

export default function SkillItem({
  skill,
  color,
  delay = 0,
  hovered = false,
  onHover = () => {},
  onLeave = () => {},
}: SkillItemProps) {
  const { ref, visible } = useSkillsObserver();

  return (
    <div
      ref={ref}
      aria-label={`${skill.name} skill level ${skill.level}%`}
      className={`
        group cursor-pointer rounded-lg p-3
        transform  duration-700 ease-out
        ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}
        hover:scale-[1.02] hover:bg-slate-50 dark:hover:bg-slate-800 text-shadow-xs
      `}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Header */}
      <div className="flex justify-between mb-2 items-center">
        <div className="flex items-center gap-2">
          {skill.imageUrl && (
            <Image
              src={skill.imageUrl}
              alt={skill.name}
              width={50}
              height={50}
              className="w-6 h-6 rounded-full object-cover"
            />
          )}
          <span className="font-medium tracking-wide">{skill.name}</span>
        </div>

        <span className="text-sm font-bold tabular-nums px-1 rounded">
          {skill.level}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-[width] duration-1000 ease-out`}
          style={{ width: visible ? `${skill.level}%` : "0%" }}
        />
      </div>

      {/* Description */}
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-out
          ${hovered ? "max-h-20 opacity-100 mt-2" : "max-h-0 opacity-0"}
        `}
      >
        <p className="text-xs text-slate-500 leading-relaxed">{skill.title}</p>
      </div>
    </div>
  );
}
