interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionHeading({ children, className = "" }: SectionHeadingProps) {
  return (
    <div className={`inline-block rounded-full bg-black/60 backdrop-blur-md border border-white/10 px-8 py-3 shadow-2xl ${className}`}>
      <h2 className="text-white uppercase tracking-widest font-bold text-lg sm:text-xl">
        {children}
      </h2>
    </div>
  );
}
