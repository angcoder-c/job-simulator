const { fromPersistence } = require("../../domain/entities/task");

class PostgresTaskRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async findAll() {
    const query = "SELECT id, title, content, author, priority, rate, complete FROM tasks ORDER BY id ASC";
    const result = await this.pool.query(query);
    return result.rows.map(fromPersistence);
  }

  async findById(id) {
    const query = "SELECT id, title, content, author, priority, rate, complete FROM tasks WHERE id = $1";
    const result = await this.pool.query(query, [id]);
    if (result.rowCount === 0) return null;
    return fromPersistence(result.rows[0]);
  }

  async createOne(task) {
    const query = `
      INSERT INTO tasks (title, content, author, priority, rate, complete)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, title, content, author, priority, rate, complete
    `;

    const params = [task.title, task.content, task.author, task.priority, task.rate, task.complete];
    const result = await this.pool.query(query, params);
    return fromPersistence(result.rows[0]);
  }

  async createMany(tasks) {
    const client = await this.pool.connect();

    try {
      await client.query("BEGIN");
      const created = [];

      for (const task of tasks) {
        const query = `
          INSERT INTO tasks (title, content, author, priority, rate, complete)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING id, title, content, author, priority, rate, complete
        `;

        const params = [task.title, task.content, task.author, task.priority, task.rate, task.complete];
        const result = await client.query(query, params);
        created.push(fromPersistence(result.rows[0]));
      }

      await client.query("COMMIT");
      return created;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  async updateOne(id, task) {
    const query = `
      UPDATE tasks
      SET title = $2, content = $3, author = $4, priority = $5, rate = $6, complete = $7
      WHERE id = $1
      RETURNING id, title, content, author, priority, rate, complete
    `;

    const params = [id, task.title, task.content, task.author, task.priority, task.rate, task.complete];
    const result = await this.pool.query(query, params);
    if (result.rowCount === 0) return null;
    return fromPersistence(result.rows[0]);
  }

  async patchOne(id, changes) {
    const fields = Object.keys(changes);
    if (fields.length === 0) return null;

    const assignments = fields.map((field, index) => `${field} = $${index + 2}`).join(", ");
    const values = [id, ...fields.map((field) => changes[field])];

    const query = `
      UPDATE tasks
      SET ${assignments}
      WHERE id = $1
      RETURNING id, title, content, author, priority, rate, complete
    `;

    const result = await this.pool.query(query, values);
    if (result.rowCount === 0) return null;
    return fromPersistence(result.rows[0]);
  }

  async deleteOne(id) {
    const query = "DELETE FROM tasks WHERE id = $1";
    const result = await this.pool.query(query, [id]);
    return result.rowCount > 0;
  }
}

module.exports = { PostgresTaskRepository };
