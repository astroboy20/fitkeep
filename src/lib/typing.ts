export type Doctor_Type = {
  id: string | any;
  full_name: string
  avatar: string;
  age: number | any;
  gender: string;
  contact_info: string;
  assigned_device_id: string;
};

export type Device_Type = {
  id: string | any;
  device_name: string
  device_type: string | any
  serial_number: string | any
  country_code: string | any
  avatar: string;
  assigned_patient_id: string;
};

export type AvailableDevice_Type = {
  id: string | any;
  device_name: string
  serial_number: string | any
};