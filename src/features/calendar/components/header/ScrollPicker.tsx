"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

export interface ScrollPickerProps {
  items: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export function ScrollPicker({
  items,
  selectedValue,
  onSelect,
}: ScrollPickerProps) {
  // NOTE: 실제 값이 아닌 highlight date
  const [highlightedValue, setHighlightedValue] = useState(selectedValue);

  const listRef = useRef<HTMLDivElement>(null);
  const isInitialRenderRef = useRef<boolean>(true);

  // 스크롤 중인 항목 찾기 함수
  const findCenterItem = useCallback((container: HTMLElement) => {
    const containerRect = container.getBoundingClientRect();
    const containerMiddle = containerRect.top + containerRect.height / 2;

    let closestItem: Element | null = null;
    let minDistance = Infinity;

    container.querySelectorAll("[data-value]").forEach((element) => {
      const itemRect = element.getBoundingClientRect();
      const itemMiddle = itemRect.top + itemRect.height / 2;
      const distance = Math.abs(containerMiddle - itemMiddle);

      if (distance < minDistance) {
        minDistance = distance;
        closestItem = element;
      }
    });

    return closestItem;
  }, []);

  useLayoutEffect(() => {
    const currentRef = listRef.current;
    if (currentRef && isInitialRenderRef.current) {
      const selectedElement = currentRef.querySelector(
        `[data-value="${selectedValue}"]`
      );
      if (selectedElement) {
        const container = currentRef;
        const itemOffset = (selectedElement as HTMLElement).offsetTop;
        const containerHeight = container.clientHeight;
        const itemHeight = (selectedElement as HTMLElement).clientHeight;
        container.scrollTop = itemOffset - containerHeight / 2 + itemHeight / 2;
      }
      isInitialRenderRef.current = false;
    }
  }, [selectedValue]);

  useEffect(() => {
    const currentRef = listRef.current;
    if (!currentRef) return;

    const handleScroll = () => {
      const closestItem = findCenterItem(currentRef);
      if (closestItem) {
        const value = (closestItem as HTMLElement).getAttribute(
          "data-value"
        ) as string;
        setHighlightedValue(value);
      }
    };

    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      let target: Element | null = null;
      if (e.type === "mousedown") {
        target = (e as MouseEvent).target as Element;
      } else if (e.type === "touchstart") {
        target = (e as TouchEvent).touches[0].target as Element;
      }

      if (target) {
        const item = target.closest("[data-value]");
        if (item) {
          const value = item.getAttribute("data-value") as string;
          setHighlightedValue(value);
        }
      }

      const handleEnd = (e: MouseEvent | TouchEvent) => {
        const closestItem = findCenterItem(currentRef);
        if (closestItem) {
          const value = (closestItem as HTMLElement).getAttribute(
            "data-value"
          ) as string;

          setHighlightedValue(value);

          if (value !== selectedValue) {
            onSelect(value);
          }

          // 선택된 항목으로 부드럽게 스크롤
          (closestItem as HTMLElement).scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }

        // 이벤트 리스너 제거 (한 번만 실행)
        window.removeEventListener("mouseup", handleEnd);
        window.removeEventListener("touchend", handleEnd);
      };

      // window에 mouseup/touchend 이벤트 리스너 등록
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchend", handleEnd);
    };

    // 이벤트 리스너 등록
    currentRef.addEventListener("scroll", handleScroll);
    currentRef.addEventListener("mousedown", handleMouseDown);
    currentRef.addEventListener("touchstart", handleMouseDown);

    return () => {
      // 이벤트 리스너 제거
      currentRef.removeEventListener("scroll", handleScroll);
      currentRef.removeEventListener("mousedown", handleMouseDown);
      currentRef.removeEventListener("touchstart", handleMouseDown);
    };
  }, [findCenterItem, selectedValue, onSelect]);

  return (
    <div className="flex-1">
      <div
        ref={listRef}
        className="h-52 overflow-y-auto relative scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#D1D5DB #F3F4F6",
        }}
      >
        <div className="py-16">
          {items.map((item) => (
            <div
              key={item}
              data-value={item}
              className={`py-3 px-4 text-2xl font-light cursor-pointer transition-colors ${
                highlightedValue === item
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => {
                setHighlightedValue(item);
                onSelect(item);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
