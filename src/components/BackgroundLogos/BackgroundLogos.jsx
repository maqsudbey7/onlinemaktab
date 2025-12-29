import React from "react";
import { FaCalculator, FaAtom, FaBook, FaFlask, FaLeaf } from "react-icons/fa";
import { GiSpellBook } from "react-icons/gi";

export default function BackgroundLogos() {
  const positions = [
    { top: "5%", left: "5%" },
    { top: "15%", left: "80%" },
    { top: "25%", left: "40%" },
    { top: "35%", left: "10%" },
    { top: "45%", left: "70%" },
    { top: "55%", left: "20%" },
    { top: "65%", left: "50%" },
    { top: "75%", left: "85%" },
    { top: "80%", left: "30%" },
    { top: "85%", left: "60%" },
    { top: "90%", left: "15%" },
    { top: "95%", left: "75%" },
  ];

  const colorClasses = [
    "text-blue-400",
    "text-green-400",
    "text-purple-400",
    "text-pink-400",
    "text-yellow-400",
    "text-red-400",
  ];

  const icons = [FaCalculator, FaAtom, FaBook, FaFlask, FaLeaf, GiSpellBook];

  return (
    <div
      className="
        fixed inset-0 pointer-events-none z-0 overflow-hidden
        bg-gradient-to-br
        from-pink-200/20 via-gray-200/10 to-white
        dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
      "
    >
      {positions.map((pos, i) => {
        const Icon = icons[i % icons.length];
        return (
          <Icon
            key={i}
            className={`${colorClasses[i % colorClasses.length]} absolute`}
            style={{
              top: pos.top,
              left: pos.left,
              fontSize: "2.5rem",
              opacity: 0.18,
            }}
          />
        );
      })}
    </div>
  );
}
