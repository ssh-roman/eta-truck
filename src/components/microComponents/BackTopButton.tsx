'use client';

import Image from "next/image";

interface BackTopButtonProps {
  text: string;
}

export default function BackTopButton({ text }: BackTopButtonProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <a onClick={scrollToTop} className="cursor-pointer">{text}</a>
  );
}