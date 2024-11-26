export type Timeslot = {
  length: number
  day: number
  timeslot: number
}

export interface Lab {
  name: string;
  id: number;
  rate: number;
}

export interface Computer {
  name: string;
  id: number;
  labId: number;
  rate: number;
}

export interface Reserve {
  id: number;
  labId: number;
  computerId: number;
  nim: string;
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
