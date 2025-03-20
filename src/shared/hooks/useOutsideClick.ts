import { RefObject, useEffect } from "react";

/**
 * 지정된 요소 외부를 클릭했을 때 콜백 함수를 실행하는 훅
 * @param ref 감지할 요소의 ref
 * @param callback 외부 클릭 시 실행할 콜백 함수
 * @param enabled 훅 활성화 여부 (기본값: true)
 */
export function useOutsideClick<T extends HTMLElement | null>(
  ref: RefObject<T>,
  callback: () => void,
  enabled = true
): void {
  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback, enabled]);
}
