import dotenv from 'dotenv'
await dotenv.config();
console.log(process.env.PUBLIC_FIREBASE_PROJECT_ID);