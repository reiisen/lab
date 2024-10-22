export interface Lab {
  name: string;
  id: number;
  code: string;
  floor: number;
}

export interface Reserve {
  id: number;
  timeslot: number;
  day: number;
  length: number;
  labId: number;
  reason: string;
  status: "PENDING" | "ACTIVE" | "CONCLUDED" | "CANCELLED";
  userId: number;
}

export interface Subject {
  name: string;
  id: number;
  code: string;
  dosen: string;
}

export interface Schedule {
  id: number;
  timeslot: number;
  day: number;
  length: number;
  subjectId: number;
  labId: number;
}
