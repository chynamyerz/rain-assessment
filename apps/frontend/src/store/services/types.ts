export interface ServicesState {
  services: Service[];
  selectedService: Service | undefined | null;
  actionType: ActionType;
}

export interface Service {
  id: number;
  name: string;
  status: string;
  details: string;
}

export type ActionType = "add" | "edit" | "delete" | undefined;
