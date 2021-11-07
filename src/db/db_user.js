const DB = require('./index');

class DBUser extends DB {
  async checkIfUsersExist() {
    try {
      const { rows } = await this.pool.query('SELECT COUNT(*) FROM "user"');
      return { success: true, count: rows[0].count };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async createUser(user) {
    const { login, password } = user;
    try {
      await this.pool.query('SELECT "Insert_User" ($1, $2)', [login, password]);
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async findUser(login) {
    try {
      const { rows } = await this.pool.query(
        'SELECT * from "user" WHERE "login" = ($1)',
        [login]
      );
      return { success: true, user: rows };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async deleteUser(id) {
    try {
      await this.pool.query('SELECT "Delete_User" ($1)', [id]);
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  }
}

module.exports = DBUser;
