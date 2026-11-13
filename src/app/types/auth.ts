export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  name: string;
  email: string;
  bio?: string | null;
  avatar: {
    url: string;
    alt: string;
  };
  banner: {
    url: string;
    alt: string;
  };
  accessToken: string;
  venueManager?: boolean;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  venueManager: boolean;
}

export interface RegisterResponse {
  name: string;
  email: string;
  bio?: string | null;
  avatar: {
    url: string;
    alt: string;
  };
  banner: {
    url: string;
    alt: string;
  };
  venueManager: boolean;
}
