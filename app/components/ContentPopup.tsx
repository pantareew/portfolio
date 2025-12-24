import { motion, AnimatePresence } from "framer-motion";
interface SectionContent {
  title?: string;
  description: string;
  tech?: string[];
  image?: string;
}
interface Section {
  name: string;
  x: number;
  y: number;
  content: SectionContent[];
}
interface ContentPopup {
  section: Section;
  pageIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onExit: () => void;
}

export default function ContentPopup({
  section,
  pageIndex,
  onNext,
  onPrev,
  onExit,
}: ContentPopup) {
  const page = section.content[pageIndex];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 map-content">
      {/*background */}
      <div
        className="
        relative w-11/12 max-w-4xl h-auto 
        overflow-auto flex flex-col
        backdrop-blur-xl bg-[#f6e7c8]/70
        border border-[#d8c59a]/20
        shadow-[0_0_40px_rgba(210,180,80,0.25)]
        rounded-2xl px-8 py-4
        shadow-2xl
        "
      >
        <h2 className="text-3xl font-bold mb-4 tracking-wide text-center">
          {section.name.toLocaleUpperCase()}
        </h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={pageIndex}
            initial={{ opacity: 0, rotateY: -20, x: 80 }}
            animate={{ opacity: 1, rotateY: 0, x: 0 }}
            exit={{ opacity: 0, rotateY: 20, x: -80 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ transformOrigin: "left center" }}
          >
            {/* display section content */}
            {page.image && (
              <img
                src={page.image}
                alt={section.name}
                className="w-full max-h-80 object-contain mb-4 rounded-md shadow-md border border-[#c2a96b]/40 bg-white/40 p-2"
              />
            )}
            {page.title && (
              <h3 className="text-lg font-semibold mb-2 tracking-wide">
                {page.title}
              </h3>
            )}

            <p className="mb-3 leading-relaxed whitespace-pre-line">
              {page.description}
            </p>

            {page.tech && (
              <p className="text-sm text-[#5a4a2a]">
                Built with: <strong>{page.tech.join(", ")}</strong>
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        {/*nav buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={onPrev}
            disabled={pageIndex === 0}
            className="text-xs sm:text-base px-4 sm:px-6 py-2 rounded-full bg-[#8b6b3f] text-[#fdf6e3]
        font-semibold
        hover:bg-[#7a5d36]
        transition
        disabled:opacity-40
        tracking-wide"
          >
            Previous Page
          </button>
          <button
            onClick={onNext}
            disabled={pageIndex === section.content.length - 1}
            className="
        text-xs sm:text-base px-4 sm:px-6 py-2 rounded-full bg-[#8b6b3f] text-[#fdf6e3]
        font-semibold
        hover:bg-[#7a5d36]
        transition
        disabled:opacity-40
        tracking-wide"
          >
            Next Page
          </button>
          <button
            onClick={onExit}
            className="text-xs sm:text-base px-4 py-2 rounded-full text-white bg-[#a2833c] text-[#3b2f1a] hover:bg-[#b89645] tracking-wide"
          >
            Close
          </button>
        </div>
        {/*current page */}
        <p className="mt-2 text-sm text-[#695332]">
          Page {pageIndex + 1} / {section.content.length}
        </p>
      </div>
    </div>
  );
}
