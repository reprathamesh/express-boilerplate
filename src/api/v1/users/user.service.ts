import models from '../../../models';

class UserService {
    async getById(id: number) {
        return models.User.findByPk(id, { attributes: { exclude: ['password'] } });
    }

    async list() {
        return models.User.findAll({ attributes: { exclude: ['password'] } });
    }
}

export default new UserService();
