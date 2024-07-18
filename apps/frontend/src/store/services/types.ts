export interface ServicesState {
  services: Service[];
}

export interface Service {
  id: number;
  name: string;
  status: string;
  details: string;
}
