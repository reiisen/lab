import { Lab, Reserve, Course, Subject, CourseWithSubject } from "./types";
const offset = -2;

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

export async function createCourse(schedule: Omit<Course, 'id'>): Promise<boolean> {
  const response = await fetch('http://127.0.0.1:8000/course/create', {
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

export async function createReserve(reserve: Omit<Reserve, 'id' | 'status'>): Promise<boolean> {
  const date = new Date(reserve.date);
  date.setDate(date.getDate() - 2);
  const response = await fetch('http://127.0.0.1:8000/reserve/create', {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({ ...reserve, date: date })
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

export async function readCourses(source: { labId: number, day: number }): Promise<CourseWithSubject[]> {
  const filter = {
    labId: source.labId,
    day: source.day + offset < 0 ? source.day + offset + 7 : source.day + offset,
    includeSubject: true
  }
  const response = await fetch('http://127.0.0.1:8000/course/filter', {

    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(filter)
  });
  return response.json();
}

export async function readIncompleteReserves(source: { labId: number, date: Date }): Promise<Reserve[]> {
  const min = new Date(source.date);
  const max = new Date(source.date);
  min.setHours(0);
  min.setDate(min.getDate() + offset);
  max.setHours(17);
  max.setDate(max.getDate() + offset);
  const filter = {
    labId: source.labId,
    date: {
      gte: min,
      lte: max
    },
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

export async function readCompleteReserves(source: { labId: number, date: Date }): Promise<Reserve[]> {
  const min = new Date(source.date);
  const max = new Date(source.date);
  min.setHours(0);
  min.setDate(min.getDate() + offset);
  max.setHours(17);
  max.setDate(max.getDate() + offset);
  const filter = {
    labId: source.labId,
    date: {
      gte: min,
      lte: max
    },
    status: {
      in: ["CONCLUDED", "CANCELLED"]
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

export async function readReserves
  (
    source:
      {
        labId: number,
        date: Date,
      }
  ): Promise<Reserve[]> {
  const min = new Date(source.date);
  const max = new Date(source.date);
  min.setHours(0);
  min.setDate(min.getDate() + offset);
  max.setHours(17);
  max.setDate(max.getDate() + offset);
  const filter = {
    labId: source.labId,
    date: {
      gte: min,
      lte: max
    },
    status: {
      in: ["PENDING", "ACTIVE", "CONCLUDED", "CANCELLED"]
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
