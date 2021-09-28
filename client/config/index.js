
export const httpHeaders = { headers: { 'Content-Type': 'application/json' } };

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

export const CLIENT_SERVER_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000';

export const PER_PAGE = 2;
