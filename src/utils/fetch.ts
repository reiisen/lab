import { Lab, Reserve, Schedule, ScheduleWithSubject, Subject } from "./types";
const offset = 0;

export async function createLab(lab: Omit<Lab, 'id'>): Promise<boolean> {
  let response;
  try {
    response = await fetch('http://127.0.0.1:8000/lab/create', {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(lab)
    })
  } catch {

  }


  if (response!.status !== 200) {
    return false;
  }

  return true;
}

export async function createSubject(subject: Omit<Subject, 'id'>): Promise<boolean> {
  const response = await fetch('http://127.0.0.1:8000/subject/create', {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(subject)
  })

  if (response.status !== 200) {
    return false;
  }

  return true;
}

export async function createSchedule(schedule: Omit<Schedule, 'id'>): Promise<boolean> {
  const response = await fetch('http://127.0.0.1:8000/schedule/create', {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(schedule)
  })

  if (response.status !== 200) {
    return false;
  }

  return true;
}

export async function createReserve(reserve: Omit<Reserve, 'id'>): Promise<boolean> {
  const response = await fetch('http://127.0.0.1:8000/reserve/create', {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(reserve)
  })

  if (response.status !== 200) {
    return false;
  }

  return true;
}

export async function readLabs(): Promise<Lab[]> {
  const response = await fetch('http://127.0.0.1:8000/lab/', {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  return response.json();
}

export async function readSubjects(): Promise<Subject[]> {
  const response = await fetch('http://127.0.0.1:8000/subject/', {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  return response.json();
}

export async function readSchedules(source: { labId: number, day: number }): Promise<ScheduleWithSubject[]> {
  const filter = {
    labId: source.labId,
    day: source.day + offset,
    includeSubject: true
  }
  const response = await fetch('http://127.0.0.1:8000/schedule/filter', {

    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(filter)
  });
  return response.json();
}

export async function readReserves(source: { labId: number, day: number }): Promise<Reserve[]> {
  const filter = {
    labId: source.labId,
    day: source.day + offset,
    status: {
      in: ["PENDING", "ACTIVE"]
    }
  }
  const response = await fetch('http://127.0.0.1:8000/reserve/filter', {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(filter)
  });
  return response.json();
}
