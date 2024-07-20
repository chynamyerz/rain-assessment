export interface User {
  id: number;
  email: string;
}

export interface UserState {
  user: User | undefined | null;
}
