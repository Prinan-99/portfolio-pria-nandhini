"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <a href={card.link} target="_blank" rel="noopener noreferrer">
      <div
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        className={cn(
          "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-96 w-80 shrink-0 snap-center transition-all duration-300 ease-out",
          hovered !== null && hovered !== index && "blur-sm scale-[0.98]",
          hovered === index && "scale-105 shadow-2xl"
        )}
      >
        <img
          src={card.src}
          alt={card.title}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6 transition-all duration-300 group-hover:bg-black/70">
          <h3 className="text-2xl font-bold text-white! mb-2">
            {card.title}
          </h3>
          <p className={cn(
            "text-white! text-sm transition-opacity duration-300",
            hovered === index ? "opacity-100" : "opacity-0"
          )}>
            {card.description}
          </p>
        </div>
      </div>
    </a>
  )
);

Card.displayName = "Card";

type Card = {
  title: string;
  src: string;
  description?: string;
  link?: string;
};

export function FocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex gap-8 min-w-max">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
