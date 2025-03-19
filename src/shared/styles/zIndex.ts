/**
 * 애플리케이션 전체에서 사용되는 z-index 값을 관리하는 객체
 * 일관된 레이어링을 위해 이 값들을 사용해야 합니다.
 * 사용되지 않는 것은 주석처리 되어있습니다. 사용되는 값을 제외하고 자유롭게 수정합니다.
 */
export const Z_INDEX = {
  // 기본 레이어
  base: 0,

  // 컨텐츠 위에 표시되는 요소들
  //   dropdown: 10,
  //   sticky: 20,

  // 플로팅 요소들
  floatingButton: 50,
  //   tooltip: 60,

  // 모달 관련
  modalBackdrop: 90,
  modal: 100,

  // 최상위 요소들
  //   toast: 200,
  //   popover: 300,

  // 개발용 요소들
  debugPanel: 9999,
} as const;
