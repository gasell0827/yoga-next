import { CalendarEvent } from "../model/types";

// API 엔드포인트 기본 URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.yoplan.com";

/**
 * 특정 월의 이벤트를 가져옵니다.
 */
export const fetchEvents = async (date: Date): Promise<CalendarEvent[]> => {
  try {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // NOTE: JavaScript의 월은 0부터 시작하므로 +1

    const response = await fetch(
      `${API_BASE_URL}/events?year=${year}&month=${month}`
    );

    if (!response.ok) {
      throw new Error(`API 오류: ${response.status}`);
    }

    const data = await response.json();

    return data.map((event: CalendarEvent) => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
      createdAt: new Date(event.createdAt),
      modifiedAt: event.modifiedAt ? new Date(event.modifiedAt) : null,
    }));
  } catch (error) {
    console.error("캘린더를 불러오는 중 오류가 발생했습니다:", error);
    throw new Error("캘린더를 불러오는 중 오류가 발생했습니다.");
  }
};

/**
 * 특정 이벤트의 상세 정보를 가져옵니다.
 */
export const fetchEvent = async (id: string): Promise<CalendarEvent | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${id}`);

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`API 오류: ${response.status}`);
    }

    const event = await response.json();

    return {
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
      createdAt: new Date(event.createdAt),
      modifiedAt: event.modifiedAt ? new Date(event.modifiedAt) : null,
    };
  } catch (error) {
    console.error("이벤트 상세 정보를 불러오는 중 오류가 발생했습니다:", error);
    throw new Error("이벤트 상세 정보를 불러오는 중 오류가 발생했습니다.");
  }
};

/**
 * 새 이벤트를 생성합니다.
 */
export const createEvent = async (
  event: Omit<CalendarEvent, "id" | "createdAt" | "modifiedAt">
): Promise<CalendarEvent> => {
  try {
    const response = await fetch(`${API_BASE_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      throw new Error(`API 오류: ${response.status}`);
    }

    const createdEvent = await response.json();

    return {
      ...createdEvent,
      start: new Date(createdEvent.start),
      end: new Date(createdEvent.end),
      createdAt: new Date(createdEvent.createdAt),
      modifiedAt: createdEvent.modifiedAt
        ? new Date(createdEvent.modifiedAt)
        : null,
    };
  } catch (error) {
    console.error("이벤트를 생성하는 중 오류가 발생했습니다:", error);
    throw new Error("이벤트를 생성하는 중 오류가 발생했습니다.");
  }
};

/**
 * 기존 이벤트를 수정합니다.
 */
export const updateEvent = async (
  id: string,
  event: Partial<CalendarEvent>
): Promise<CalendarEvent> => {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      throw new Error(`API 오류: ${response.status}`);
    }

    const updatedEvent = await response.json();

    return {
      ...updatedEvent,
      start: new Date(updatedEvent.start),
      end: new Date(updatedEvent.end),
      createdAt: new Date(updatedEvent.createdAt),
      modifiedAt: updatedEvent.modifiedAt
        ? new Date(updatedEvent.modifiedAt)
        : null,
    };
  } catch (error) {
    console.error("이벤트를 수정하는 중 오류가 발생했습니다:", error);
    throw new Error("이벤트를 수정하는 중 오류가 발생했습니다.");
  }
};

/**
 * 이벤트를 삭제합니다.
 */
export const deleteEvent = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`API 오류: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("이벤트를 삭제하는 중 오류가 발생했습니다:", error);
    throw new Error("이벤트를 삭제하는 중 오류가 발생했습니다.");
  }
};
