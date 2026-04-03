import { useState, useEffect, useRef, useCallback } from "react";
import "../styles/MapSearchView.css";

export default function MapSearchView() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isServiceLoaded, setIsServiceLoaded] = useState(false); // 서비스 로드 상태 추가
  const mapContainer = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [markers, setMarkers] = useState([]);

  const initMap = useCallback(() => {
    if (!window.kakao || !window.kakao.maps) return;

    window.kakao.maps.load(() => {
      if (!mapContainer.current) return;

      const options = {
        center: new window.kakao.maps.LatLng(37.566826, 126.978656),
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapContainer.current, options);
      setMapInstance(map);

      // 서비스 라이브러리가 존재하는지 확인 후 상태 업데이트
      if (window.kakao.maps.services) {
        setIsServiceLoaded(true);
        console.log("카카오 맵 및 서비스 라이브러리 준비 완료");
      }
    });
  }, []);

  useEffect(() => {
    // 기존 스크립트가 있다면 제거 후 새로 생성 (캐시 문제 방지)
    const oldScript = document.getElementById("kakao-map-script");
    if (oldScript) oldScript.remove();

    const script = document.createElement("script");
    script.id = "kakao-map-script";
    // 파라미터에 libraries=services 가 정확히 포함되어야 함
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=614d7804ccdf491e881609d62667019d&libraries=services&autoload=false";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      initMap();
    };
  }, [initMap]);

  const handleSearch = () => {
    if (!searchKeyword.trim()) return;

    if (!isServiceLoaded) {
      alert("지도 서비스가 아직 준비되지 않았습니다. 잠시만 기다려주세요.");
      return;
    }

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(searchKeyword, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setSearchResults(data);
        displayMarkers(data);
      } else {
        setSearchResults([]);
        removeMarkers();
        console.log("📡 검색 실패 상태:", status);
      }
    });
  };

  const displayMarkers = (places) => {
    if (!mapInstance) return;
    removeMarkers();
    const bounds = new window.kakao.maps.LatLngBounds();
    const newMarkers = [];

    places.forEach((place) => {
      const position = new window.kakao.maps.LatLng(place.y, place.x);
      const marker = new window.kakao.maps.Marker({
        map: mapInstance,
        position: position,
      });
      newMarkers.push(marker);
      bounds.extend(position);
    });
    setMarkers(newMarkers);
    mapInstance.setBounds(bounds);
  };

  const removeMarkers = () => {
    markers.forEach((m) => m.setMap(null));
    setMarkers([]);
  };

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

      <div className="flex flex-1 gap-6 h-[calc(100vh-220px)] min-h-[500px]">
        <div className="map-search-panel">
          <div className="map-search-box">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder={
                isServiceLoaded ? "검색 (예: 합정역)" : "서비스 로딩 중..."
              }
              className="map-search-input"
              disabled={!isServiceLoaded}
            />
            <button
              onClick={handleSearch}
              className={`map-search-btn ${!isServiceLoaded ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={!isServiceLoaded}
            >
              {isServiceLoaded ? "검색" : "로딩 중..."}
            </button>
          </div>

          <div className="map-result-box flex flex-col overflow-y-auto">
            {searchResults.length > 0 ? (
              searchResults.map((place) => (
                <div
                  key={place.id}
                  className="p-4 border-b border-[#f5f5f7] hover:bg-[#f5f5f7] cursor-pointer w-full text-left"
                >
                  <h3 className="font-semibold text-[15px]">
                    {place.place_name}
                  </h3>
                  <p className="text-[12px] text-[#86868b]">
                    {place.address_name}
                  </p>
                </div>
              ))
            ) : (
              <div className="py-20 text-[#86868b] text-center font-medium">
                검색 결과가 없습니다.
              </div>
            )}
          </div>
        </div>

        <div className="map-render-area flex-1">
          <div
            ref={mapContainer}
            className="w-full h-full rounded-[24px]"
          ></div>
        </div>
      </div>
    </div>
  );
}
