import { env } from 'cloudflare:workers';
export function database(){ if(!env.DB) throw new Error('Booking storage unavailable'); return env.DB; }
