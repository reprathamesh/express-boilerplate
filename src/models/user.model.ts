import { DataTypes, Model, Optional, ModelStatic } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../config/db.config';

export interface UserAttributes {
    id: number;
    email: string;
    password: string;
    name?: string;
    role?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

type UserCreationAttributes = Optional<UserAttributes, 'id' | 'name' | 'role'>;

export interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
    checkPassword(password: string): Promise<boolean>;
}

const User = sequelize.define<UserInstance>('User',
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        role: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: 'user',
        },
    },
    {
        tableName: 'users',
        hooks: {
            beforeCreate: async (user: any) => {
                if (user.password) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            },
            beforeUpdate: async (user: any) => {
                // In Sequelize v6, changed is a function on Model instances
                if (typeof user.changed === 'function' ? user.changed('password') : false) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            },
        },
    }
) as ModelStatic<UserInstance>;

// attach instance method
(User.prototype as any).checkPassword = function (password: string) {
    return bcrypt.compare(password, (this as any).password);
};

export default User;
