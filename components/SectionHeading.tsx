interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionHeading({ children, className = "" }: SectionHeadingProps) {
  return (
    <div className={`inline-block rounded-full bg-black/60 backdrop-blur-md border border-white/10 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 shadow-2xl ${className}`}>
      <h2 className="text-white uppercase tracking-widest font-bold text-xs sm:text-sm lg:text-lg">
        {children}
      </h2>
    </div>
  );
}
