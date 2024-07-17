export interface AccountProps {
  name: string;
  status: AccountStatus;
}

export type AccountStatus = 'active' | 'inactive';
