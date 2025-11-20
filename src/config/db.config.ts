import { Sequelize } from 'sequelize';
import {
    env
} from './app.config';

const sequelize = new Sequelize(String(env.DB_NAME), String(env.DB_USER), String(env.DB_PASS), {
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    dialect: env.DB_DIALECT as any,
    // logging: appConfig.nodeEnv === 'development' ? console.log : false,
});

export { sequelize };
export default sequelize;
