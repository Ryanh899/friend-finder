// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'express_hw'
      }
  },

  staging: {
    client: 'mysql',
    connection: {
      database: 'users',
      user:     'root',
      password: 'root'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      database: 'users',
      user:     'root',
      password: 'root'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
