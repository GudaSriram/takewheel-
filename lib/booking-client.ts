import {bookingSchema, type Booking} from './booking';
export const pagesDemo = process.env.NEXT_PUBLIC_PAGES_DEMO === 'true';
const key='takewheel-pages-bookings-v1';
export async function bookingRequest(url:string,options?:RequestInit):Promise<Response>{
 if(!pagesDemo)return fetch(url,options);
 try {
  const rows:Booking[]=JSON.parse(localStorage.getItem(key)||'[]');
  if(!Array.isArray(rows))throw Error('Saved data is unreadable.');
  if(!options?.method)return Response.json({bookings:rows});
  const data=JSON.parse(String(options.body||'{}'));
  if(options.method==='POST'){
   const parsed=bookingSchema.safeParse(data);if(!parsed.success)return Response.json({error:parsed.error.issues[0].message},{status:400});
   const existing=rows.find(x=>x.id===data.id);if(existing)return Response.json({booking:existing});
   const booking={...parsed.data,created:new Date().toISOString(),status:'demo_saved'};
   localStorage.setItem(key,JSON.stringify([booking,...rows]));return Response.json({booking});
  }
  if(options.method==='PATCH'){
   if(!rows.some(x=>x.id===data.id))return Response.json({error:'Booking not found.'},{status:404});
   localStorage.setItem(key,JSON.stringify(rows.map(x=>x.id===data.id?{...x,status:'cancelled'}:x)));return Response.json({ok:true});
  }
  return Response.json({error:'Unsupported action.'},{status:400});
 }catch{return Response.json({error:'Browser storage is unavailable or full. Enable site storage and retry. Your current details have not been cleared.'},{status:503});}
}
