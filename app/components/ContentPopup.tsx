import { motion, AnimatePresence } from "framer-motion";
interface SectionContent {
  text: string;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/*background */}
      <div
        className="
        relative w-11/12 max-w-4xl h-5/6  
        overflow-auto flex flex-col
        backdrop-blur-xl bg-[#f6e7c8]/60
        border border-[#d8c59a]/20
        shadow-[0_0_40px_rgba(210,180,80,0.25)]
        rounded-2xl p-8
        shadow-2xl
        "
      >
        <h2 className="text-3xl font-bold mb-4">{section.name}</h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={pageIndex}
            initial={{ opacity: 0, rotateY: -10, x: 40 }}
            animate={{ opacity: 1, rotateY: 0, x: 0 }}
            exit={{ opacity: 0, rotateY: 10, x: -40 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* display section content */}
            {page.image && (
              <img
                src={page.image}
                alt={section.name}
                className="w-full max-h-96 object-contain mb-6"
              />
            )}

            <p>{page.text}</p>
          </motion.div>
        </AnimatePresence>

        {/*nav buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={onPrev}
            disabled={pageIndex === 0}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={onNext}
            disabled={pageIndex === section.content.length - 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
          <button
            onClick={onExit}
            className="px-4 py-2 bg-red-400 text-white rounded"
          >
            Exit
          </button>
        </div>
        {/*current page */}
        <p className="mt-2 text-sm text-gray-600">
          Page {pageIndex + 1} / {section.content.length}
        </p>
      </div>
    </div>
  );
}
