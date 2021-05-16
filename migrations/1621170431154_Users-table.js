// yarn migrate create "Users table"
// export DATABASE_URL=postgres://postgres:postgres@localhost:5432/postgres
// yarn migrate up

exports.up = (pgm) => {
  pgm.createSequence('users_id_seq');
  pgm.createTable('users', {
    id: {
      type: 'integer',
      primaryKey: true,
      notNull: true,
      default: pgm.func(`nextval('users_id_seq')`),
    },
    name: {
      type: 'varchar(1000)',
      notNull: true
    },
    created_date: {
      type: "timestamp with time zone",
      default: pgm.func('current_timestamp'),
      notNull: true
    }
  });
  pgm.sql(`INSERT INTO users (name) VALUES ('Zafer AYAN');`)
}

exports.down = pgm => {
  pgm.dropTable('users');
  pgm.dropSequence('users_id_seq');
};
