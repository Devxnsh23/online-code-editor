const pool = require('../db');

const getUserFiles = async (req, res) => {

  try {

    const result = await pool.query(
      `SELECT * FROM files
       WHERE user_id=$1
       ORDER BY updated_at DESC`,
      [req.params.id]
    );

    res.json(result.rows);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: 'Fetch failed',
    });
  }
};

const saveFile = async (req, res) => {

  try {

    const {
      user_id,
      filename,
      language,
      code,
      theoutput,
    } = req.body;

    const existing =
      await pool.query(

        `
        SELECT * FROM files
        WHERE
          user_id=$1
          AND filename=$2
        `,

        [user_id, filename]
      );

    if (existing.rows.length > 0) {

      const updated =
        await pool.query(

          `
          UPDATE files
SET
  code=$1,
  language=$2,
  theoutput=$3,
  updated_at=NOW()
WHERE id=$4
RETURNING *
          `,

          [
            code,
            language,
            theoutput,
            existing.rows[0].id,
          ]
        );

      return res.json({
        file: updated.rows[0],
      });
    }

    const result =
      await pool.query(

        `
        INSERT INTO files
        (
  user_id,
  filename,
  language,
  code,
  theoutput
)

VALUES ($1,$2,$3,$4,$5)

        RETURNING *
        `,

        [
          user_id,
          filename,
          language,
          code,
          theoutput,
        ]
      );

    res.json({
      file: result.rows[0],
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: 'Save failed',
    });
  }
};

const getFiles = async (req, res) => {
  try {
    const result = await pool.query(`
  SELECT
    files.*,
    users.name AS student_name
  FROM files
  JOIN users
  ON files.user_id = users.id
  ORDER BY files.updated_at DESC
`);

    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Fetch failed' });
  }
};

const deleteFile = async (req, res) => {
  try {
    await pool.query(
      'DELETE FROM files WHERE id=$1',
      [req.params.id]
    );

    res.json({ message: 'Deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Delete failed' });
  }
};

module.exports = {
  saveFile,
  getFiles,
  deleteFile,
  getUserFiles,
};