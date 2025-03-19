import { addDays, addHours, getMonth, getYear, startOfMonth } from "date-fns";

import { CalendarEvent } from "../model/types";

let mockEvents: CalendarEvent[] = [];

// NOTE: 모든 API에 적용되는 에러 발생 확률 0: 에러 없음, 1: 항상 에러 발생
const ERROR_PROBABILITY = 0;

// NOTE: 각 API 호출의 지연 시간 (밀리초)
const DELAY_TIMES = {
  FETCH_EVENTS: 0,
  FETCH_EVENT: 0,
  CREATE_EVENT: 0,
  UPDATE_EVENT: 0,
  DELETE_EVENT: 0,
};

const shouldThrowError = () => Math.random() < ERROR_PROBABILITY;

const simulateDelay = async (apiName: keyof typeof DELAY_TIMES) => {
  await new Promise((resolve) => setTimeout(resolve, DELAY_TIMES[apiName]));
};

const initializeMockEvents = () => {
  if (mockEvents.length === 0) {
    const now = new Date();
    const currentMonth = getMonth(now);
    const currentYear = getYear(now);

    // 현재 월의 시작일
    const monthStart = startOfMonth(now);

    // 수련 이벤트
    mockEvents.push(
      {
        id: "1",
        title: "아침 요가 수련",
        start: new Date(currentYear, currentMonth, 5, 7, 0),
        end: new Date(currentYear, currentMonth, 5, 8, 0),
        category: "수련",
        createdAt: new Date(),
        modifiedAt: null,
        location: "집",
        memo: "아침에 일어나서 하는 요가 수련",
      },
      {
        id: "2",
        title: "저녁 요가 수련",
        start: new Date(currentYear, currentMonth, 10, 19, 0),
        end: new Date(currentYear, currentMonth, 10, 20, 0),
        category: "수련",
        createdAt: new Date(),
        modifiedAt: null,
        location: "집",
      },
      {
        id: "3",
        title: "주말 집중 수련",
        start: new Date(currentYear, currentMonth, 15, 10, 0),
        end: new Date(currentYear, currentMonth, 15, 12, 0),
        category: "수련",
        createdAt: new Date(),
        modifiedAt: null,
        location: "요가 스튜디오",
        memo: "주말 집중 수련 프로그램",
      }
    );

    // 수업 이벤트
    mockEvents.push(
      {
        id: "4",
        title: "하타 요가 수업",
        start: new Date(currentYear, currentMonth, 7, 14, 0),
        end: new Date(currentYear, currentMonth, 7, 15, 30),
        category: "수업",
        createdAt: new Date(),
        modifiedAt: null,
        location: "요가 스튜디오",
        memo: "초보자를 위한 하타 요가 수업",
      },
      {
        id: "5",
        title: "아쉬탕가 요가 수업",
        start: new Date(currentYear, currentMonth, 12, 18, 0),
        end: new Date(currentYear, currentMonth, 12, 19, 30),
        category: "수업",
        createdAt: new Date(),
        modifiedAt: null,
        location: "요가 스튜디오",
      }
    );

    // 할 일 이벤트
    mockEvents.push(
      {
        id: "6",
        title: "요가 매트 구매",
        start: new Date(currentYear, currentMonth, 8, 13, 0),
        end: new Date(currentYear, currentMonth, 8, 14, 0),
        category: "할 일",
        createdAt: new Date(),
        modifiedAt: null,
        isCompleted: false,
      },
      {
        id: "7",
        title: "요가 책 읽기",
        start: new Date(currentYear, currentMonth, 20, 20, 0),
        end: new Date(currentYear, currentMonth, 20, 21, 0),
        category: "할 일",
        createdAt: new Date(),
        modifiedAt: null,
        isCompleted: true,
      }
    );

    // 기타 이벤트
    mockEvents.push(
      {
        id: "8",
        title: "요가 워크샵",
        start: new Date(currentYear, currentMonth, 25, 9, 0),
        end: new Date(currentYear, currentMonth, 25, 17, 0),
        category: "기타",
        createdAt: new Date(),
        modifiedAt: null,
        location: "요가 센터",
        memo: "전일 요가 워크샵",
      },
      {
        id: "9",
        title: "명상 모임",
        start: new Date(currentYear, currentMonth, 18, 19, 0),
        end: new Date(currentYear, currentMonth, 18, 20, 0),
        category: "기타",
        createdAt: new Date(),
        modifiedAt: null,
        location: "커뮤니티 센터",
      }
    );

    mockEvents.push({
      id: "10",
      title: "다음 달 요가 수련",
      start: addDays(monthStart, 35),
      end: addHours(addDays(monthStart, 35), 1),
      category: "수련",
      createdAt: new Date(),
      modifiedAt: null,
    });
  }
};

export const mockFetchMonthlyEvents = async (
  date: Date
): Promise<CalendarEvent[]> => {
  initializeMockEvents();

  await simulateDelay("FETCH_EVENTS");

  if (shouldThrowError()) {
    throw new Error("네트워크 오류가 발생했습니다.");
  }

  const targetYear = getYear(date);
  const targetMonth = getMonth(date);

  return mockEvents.filter((event) => {
    const eventYear = getYear(event.start);
    const eventMonth = getMonth(event.start);
    return eventYear === targetYear && eventMonth === targetMonth;
  });
};

export const mockFetchEvent = async (
  id: string
): Promise<CalendarEvent | null> => {
  initializeMockEvents();

  await simulateDelay("FETCH_EVENT");

  if (shouldThrowError()) {
    throw new Error("이벤트를 불러오는 중 오류가 발생했습니다.");
  }

  const event = mockEvents.find((event) => event.id === id);
  return event || null;
};

export const mockCreateEvent = async (
  eventData: Omit<CalendarEvent, "id" | "createdAt" | "modifiedAt">
): Promise<CalendarEvent> => {
  initializeMockEvents();

  await simulateDelay("CREATE_EVENT");

  if (shouldThrowError()) {
    throw new Error("이벤트를 생성하는 중 오류가 발생했습니다.");
  }

  const newEvent: CalendarEvent = {
    ...eventData,
    id: `mock-${Date.now()}`,
    createdAt: new Date(),
    modifiedAt: null,
  };

  mockEvents.push(newEvent);
  return newEvent;
};

export const mockUpdateEvent = async (
  id: string,
  eventData: Partial<CalendarEvent>
): Promise<CalendarEvent> => {
  initializeMockEvents();

  await simulateDelay("UPDATE_EVENT");

  if (shouldThrowError()) {
    throw new Error("이벤트를 수정하는 중 오류가 발생했습니다.");
  }

  const index = mockEvents.findIndex((event) => event.id === id);
  if (index === -1) {
    throw new Error("이벤트를 찾을 수 없습니다.");
  }

  const updatedEvent: CalendarEvent = {
    ...mockEvents[index],
    ...eventData,
    modifiedAt: new Date(),
  };

  mockEvents[index] = updatedEvent;
  return updatedEvent;
};

export const mockDeleteEvent = async (id: string): Promise<boolean> => {
  initializeMockEvents();

  await simulateDelay("DELETE_EVENT");

  if (shouldThrowError()) {
    throw new Error("이벤트를 삭제하는 중 오류가 발생했습니다.");
  }

  const initialLength = mockEvents.length;
  mockEvents = mockEvents.filter((event) => event.id !== id);

  return mockEvents.length < initialLength;
};
