export interface Lab {
  name: string;
  id: number;
  code: string;
  floor: number;
}

export type Timeslot = {
  length: number
  day: number
  timeslot: number
}

export type HasTimeslot<T> = T & Timeslot;
export type HasIndex<T> = T & { index: number };

export interface Reserve {
  id: number;
  labId: number;
  reason: string;
  status: "PENDING" | "ACTIVE" | "CONCLUDED" | "CANCELLED";
  userId: number;
  length: number
  day: number
  timeslot: number
}

export interface Schedule {
  id: number;
  subjectId: number;
  labId: number;
  length: number
  day: number
  timeslot: number
}

export interface Subject {
  name: string;
  id: number;
  code: string;
  dosen: string;
}


