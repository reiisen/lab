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

export interface Reserve {
  id: number;
  labId: number;
  name: string;
  reason: string;
  status: "PENDING" | "ACTIVE" | "CONCLUDED" | "CANCELLED";
  length: number
  date: Date;
}

export interface Timestamp {
  createdAt: Date
  updatedAt: Date
}

export type WithTimeslot<T> = T & Timeslot;
export type WithDate<T> = T & Date;
export type WithIndex<T> = T & { index: number };
export type WithTimestamp<T> = T & Timestamp
