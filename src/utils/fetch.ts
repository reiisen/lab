import { Lab, Reserve, Schedule, Subject } from "./types";

export async function fetchLabs(): Promise<Lab[]> {
  const response = await fetch('http://127.0.0.1:8000/lab/', {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export async function fetchSubjects(): Promise<Subject[]> {
  const response = await fetch('http://127.0.0.1:8000/subject/', {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export async function fetchSchedules(source: Partial<{ id: number, day: number }>): Promise<Schedule[]> {
  const response = await fetch('http://127.0.0.1:8000/subject/', {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
    body: JSON.stringify(source)
  });
  return response.json();
}

export async function fetchReserves(): Promise<Reserve[]> {
  const response = await fetch('http://127.0.0.1:8000/subject/', {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}
