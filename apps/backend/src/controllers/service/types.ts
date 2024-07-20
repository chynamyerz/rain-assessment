import { Service } from "@prisma/client";

export interface CreateServiceProps extends Omit<Service, "id" | "accountId"> {}

export interface UpdateServiceProps {
  name?: string;
  status?: string;
  details?: string;
}
