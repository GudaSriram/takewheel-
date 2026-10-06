import React from 'react';
import {createRoot} from 'react-dom/client';
import BookingApp from '../app/booking-app';
import '../app/globals.css';
createRoot(document.getElementById('root')!).render(<BookingApp/>);
