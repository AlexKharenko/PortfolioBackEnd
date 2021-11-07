const pool = require('../config/database');

class DB {
  constructor() {
    this.pool = pool;
  }

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
      console.log(err);
      return { success: false, error: err };
    }
  }

  async deleteUser(id) {
    try {
      await this.pool.query('SELECT "Delete_User" ($1)', [id]);
      return { success: true };
    } catch (err) {
      console.log(err);
      return { success: false, error: err };
    }
  }
}

module.exports = DB;
