import { Service } from "@store/services/types";

export interface ServiceCreateInput extends Omit<Service, "id"> {}
