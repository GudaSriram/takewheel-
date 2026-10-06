import { getChatGPTUser } from '../../chatgpt-auth';
import { database } from '@/lib/storage';
import { bookingSchema } from '@/lib/booking';
export const dynamic='force-dynamic';
const json=(v:unknown,status=200)=>Response.json(v,{status,headers:{'Cache-Control':'no-store'}});
export async function GET(){
 const user=await getChatGPTUser(); if(!user) return json({error:'Please sign in to see your bookings.'},401);
 try {const data=await database().prepare('SELECT id, created, status, details FROM bookings WHERE owner = ? ORDER BY created DESC LIMIT 100').bind(user.userId).all();
 return json({bookings:data.results.map((r:any)=>({...JSON.parse(r.details),id:r.id,created:r.created,status:r.status}))});
 }catch(e){console.error(e);return json({error:'We could not load your bookings. Please retry.'},503);}
}
export async function POST(req:Request){
 const user=await getChatGPTUser();if(!user)return json({error:'Please sign in before saving a booking.'},401);
 if(req.headers.get('origin') && req.headers.get('origin')!==new URL(req.url).origin)return json({error:'Invalid request origin.'},403);
 try{const parsed=bookingSchema.safeParse(await req.json());if(!parsed.success)return json({error:parsed.error.issues[0].message},400);
 const b=parsed.data;const created=new Date().toISOString();const db=database();
 await db.prepare('INSERT INTO bookings (id, owner, created, status, details) VALUES (?, ?, ?, ?, ?) ON CONFLICT(id) DO NOTHING').bind(b.id,user.userId,created,'demo_saved',JSON.stringify(b)).run();
 const row:any=await db.prepare('SELECT details, created, status FROM bookings WHERE id = ? AND owner = ?').bind(b.id,user.userId).first();
 if(!row)return json({error:'Unable to save this booking.'},409);
 return json({booking:{...JSON.parse(row.details),created:row.created,status:row.status}},201);
 }catch(e){console.error(e);return json({error:'Your booking could not be saved. Your details are still here; please retry.'},503);}
}
export async function PATCH(req:Request){
 const user=await getChatGPTUser();if(!user)return json({error:'Please sign in.'},401);
 if(req.headers.get('origin') && req.headers.get('origin')!==new URL(req.url).origin)return json({error:'Invalid request origin.'},403);
 try{const {id}=await req.json() as {id?:unknown};if(typeof id!=='string')return json({error:'Invalid booking.'},400);
 const result=await database().prepare('UPDATE bookings SET status = ? WHERE id = ? AND owner = ?').bind('cancelled',id,user.userId).run();
 if(!result.meta.changes)return json({error:'Booking not found.'},404);return json({ok:true});
 }catch(e){console.error(e);return json({error:'Cancellation failed. Please retry.'},503);}
}

