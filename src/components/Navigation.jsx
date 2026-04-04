export default function Navigation({ activeView, setActiveView }) {
  return (
    <nav className="fixed left-0 top-0 h-full w-20 bg-white border-r border-[#e5e5ea] flex flex-col items-center py-8 z-50">
      <div
        onClick={() => setActiveView("ai")}
        className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center cursor-pointer transition-colors ${
          activeView === "ai"
            ? "bg-[#007aff] text-white shadow-md"
            : "text-[#86868b] hover:bg-[#f5f5f7]"
        }`}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </div>

      <div
        onClick={() => setActiveView("timeline")}
        className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center cursor-pointer transition-colors ${
          activeView === "timeline"
            ? "bg-[#007aff] text-white shadow-md"
            : "text-[#86868b] hover:bg-[#f5f5f7]"
        }`}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      </div>

      <div
        onClick={() => setActiveView("map")}
        className={`w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer transition-colors ${
          activeView === "map"
            ? "bg-[#007aff] text-white shadow-md"
            : "text-[#86868b] hover:bg-[#f5f5f7]"
        }`}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
      </div>
    </nav>
  );
}
