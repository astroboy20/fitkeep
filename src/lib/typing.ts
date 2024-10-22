export type Appointment = {
    id: string;
    patient: {
      name: string;
      avatar: string;
      age: number;
      gender: string;
      contact: string;
    };
    ref: string;
    deviceId: string;
    status: "Ongoing" | "Due" | "Postponed" | "Completed";
  };