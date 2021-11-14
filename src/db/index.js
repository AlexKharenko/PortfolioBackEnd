const pool = require('../config/database');

class DB {
  constructor() {
    this.pool = pool;
  }
}

module.exports = DB;
