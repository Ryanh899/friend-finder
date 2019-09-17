// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
        host: 'us-cdbr-iron-east-02.cleardb.net',
        user: 'b2fee4fd1cb4cc',
        password: '8b6ecf20',
        database: 'heroku_bc045dbfeaec5f2'
      }
  },

  staging: {
    client: 'mysql',
    connection: {
      host: 'us-cdbr-iron-east-02.cleardb.net',
      user: 'b2fee4fd1cb4cc',
      password: '8b6ecf20',
      database: 'heroku_bc045dbfeaec5f2'
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
      host: 'us-cdbr-iron-east-02.cleardb.net',
      user: 'b2fee4fd1cb4cc',
      password: '8b6ecf20',
      database: 'heroku_bc045dbfeaec5f2'
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
