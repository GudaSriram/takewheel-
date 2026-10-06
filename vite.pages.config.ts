import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath} from 'node:url';
export default defineConfig({root:'pages',base:'/takewheel-/',publicDir:'../public',plugins:[react()],resolve:{alias:{'@':fileURLToPath(new URL('.',import.meta.url))}},define:{'process.env.NEXT_PUBLIC_PAGES_DEMO':JSON.stringify('true')},build:{outDir:'../dist-pages',emptyOutDir:true}});
