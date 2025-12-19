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
      {/*background of popup */}
      <div
        className="relative w-11/12 max-w-4xl h-5/6 rounded-lg shadow-xl p-6 overflow-auto flex flex-col"
        style={{
          backgroundImage: `url('/assets/popup.png')`,
          backgroundSize: "full",
          backgroundPosition: "center",
        }}
      >
        {/*display section content */}
        <h2 className="text-3xl font-bold mb-4">{section.name}</h2>
        {page.image && (
          <img
            src={page.image}
            alt={section.name}
            className="w-full max-h-96 object-contain mb-6"
          />
        )}
        <p>{page.text}</p>
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
