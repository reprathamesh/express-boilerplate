import sequelize from '../config/db.config';
import User from './user.model';

const models: any = {};

models.User = User;

export default models;
export { sequelize, User };