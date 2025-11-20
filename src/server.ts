import http from 'http';
import app from './app';
import { env } from './config/app.config';
import { sequelize } from './config/db.config';

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const CYAN = "\x1b[36m";
const RESET = "\x1b[0m";

const server = http.createServer(app);

async function start() {
    try {
        await sequelize.authenticate().catch((err) => {
            console.error(
                `${RED}✖ Database connection failed${RESET}`, err
            );
            process.exit(1);
        }).finally(() => {
            console.log(
                `${GREEN}✔ Database connected successfully${RESET}`
            );
        });

        server.listen(Number(env.PORT), () => {
            console.log(
                `${GREEN}✔ Server listening on port${RESET} ${CYAN}${env.PORT}${RESET}`
            );
        });
    } catch (err) {
        console.error(
            `${RED}✖ Failed to start server${RESET}`,
            err
        );
        process.exit(1);
    }
}

start();

export default server;
