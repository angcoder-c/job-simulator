async function waitForDatabase(pool, retries, delayMs) {
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      await pool.query("SELECT 1");
      return;
    } catch (error) {
      if (attempt === retries) {
        throw new Error(`Database unavailable after ${retries} attempts: ${error.message}`);
      }

      // Sleep between attempts to allow PostgreSQL startup in containers.
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
}

module.exports = { waitForDatabase };
