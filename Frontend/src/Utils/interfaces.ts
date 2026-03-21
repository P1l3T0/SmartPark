interface Base {
  id: number;
  dateCreated: Date;
}

// Auth
export interface RegisterDto {
  email: string;
  username: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}