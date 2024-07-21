export interface ServiceItem {
  name: ServiceType;
  price: number;
}

export enum ServiceType {
  FiveG = "5G",
  FourG = "4G Mobile",
  Internet = "Internet",
}
