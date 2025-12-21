interface CastleProps {
  onClick?: () => void;
}
export default function Castle({ onClick }: CastleProps) {
  return (
    <div className="relative w-full flex flex-col items-center mt-0">
      <img
        src="/assets/castle.png"
        alt="castle"
        className="w-3/4 max-w-[400px] h-auto -translate-x-5"
      />
      <h2
        onClick={onClick}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-4 -mt-2 sm:-mt-3 map-name text-[1rem] sm:text-[1.2rem] lg:text-[1.3rem] font-semibold cursor-pointer animate-pulse"
      >
        Pantaree's <br /> Magical Map
      </h2>
    </div>
  );
}
