import { useState } from "react";
import "../styles/MapSearchView.css";

export default function MapSearchView() {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <div className="map-view-container">
      <div className="mb-8">
        <h2 className="text-[32px] font-bold text-[#1d1d1f] tracking-tight">
          지도 및 장소 검색
        </h2>
        <p className="text-[#86868b] mt-1 text-[15px]">
          검색한 장소를 일정에 바로 추가할 수 있습니다.
        </p>
      </div>

      <div className="flex flex-1 gap-6 h-[calc(100vh-180px)]">
        <div className="map-search-panel">
          <div className="map-search-box">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-[#86868b]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="검색 (예: 신주쿠 역)"
                className="map-search-input"
              />
            </div>
            <button className="map-search-btn">검색</button>
          </div>

          <div className="map-result-box">
            <div className="text-center">
              <svg
                className="w-12 h-12 text-[#d2d2d7] mx-auto mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="text-[#86868b] text-[14px] font-medium">
                검색 결과가 없습니다.
              </p>
            </div>
          </div>
        </div>

        <div className="map-render-area">
          <p className="text-[#86868b] text-[15px] font-medium z-10">
            카카오 맵 API 렌더링 대기 중...
          </p>
        </div>
      </div>
    </div>
  );
}
