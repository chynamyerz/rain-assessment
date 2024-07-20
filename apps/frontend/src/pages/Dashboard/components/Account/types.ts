export interface AccountProps {
  email: string;
  status: AccountStatus;
}

export type AccountStatus = "active" | "inactive";
