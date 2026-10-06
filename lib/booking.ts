import { z } from 'zod';
export const bookingSchema = z.object({
 id: z.string().uuid(), mode: z.enum(['now','scheduled','hourly','day']),
 pickup: z.string().trim().min(5, 'Enter a full pickup address.').max(250),
 destination: z.string().trim().min(5, 'Enter a full destination address.').max(250),
 start: z.string().max(40), hours: z.number().int().min(2).max(12),
 car: z.string().trim().min(2, 'Enter your car make and model.').max(80),
 transmission: z.enum(['automatic','manual']),
 name: z.string().trim().min(2, 'Enter your name.').max(80),
 phone: z.string().trim().regex(/^\+?[0-9 ()-]{8,20}$/, 'Enter a valid contact number.'),
 notes: z.string().trim().max(500),
}).superRefine((v,c)=>{
 if(v.pickup.toLowerCase()===v.destination.toLowerCase()) c.addIssue({code:'custom',message:'Pickup and destination must be different.',path:['destination']});
 if(v.mode!=='now' && (!Number.isFinite(Date.parse(v.start)) || Date.parse(v.start)<Date.now()+60000)) c.addIssue({code:'custom',message:'Choose a start time at least one minute in the future.',path:['start']});
});
export type BookingInput = z.infer<typeof bookingSchema>;
export type Booking = BookingInput & {created:string;status:string};
export const modes = {now:'Ride now',scheduled:'Schedule',hourly:'Hourly',day:'Full day'};
export function estimate(b:Pick<BookingInput,'mode'|'hours'>){return b.mode==='day'?1800:b.mode==='hourly'?b.hours*250:450;}
