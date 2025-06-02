export interface Session {
  user: {
    id: number;
    full_name: string;
    email: string;
    role: string;
    avatar: string;
  } | null;
}
