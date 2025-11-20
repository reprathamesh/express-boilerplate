import dotenv from "dotenv";
dotenv.config();


// Dynamically export each key
Object.keys(process.env).forEach((key) => {
    // @ts-ignore
    exports[key] = process.env[key];
});

// Also export a single object for TS typing
export const env = process.env;