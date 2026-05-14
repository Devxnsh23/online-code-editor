const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const pool = require('../db');

const runCode = async (req, res) => {

  try {

    const {
      language,
      code,
      input,
      fileId,
    } = req.body;

    const jobId = Date.now();

    const dir = path.join(
      __dirname,
      `../temp/${jobId}`
    );

    fs.mkdirSync(dir, {
      recursive: true,
    });

    let filename;
    let command;

    if (language === 'python') {

      filename = 'main.py';

      fs.writeFileSync(
        path.join(dir, filename),
        code
      );

      command = `python ${filename}`;
    }

    if (language === 'cpp') {

      filename = 'main.cpp';

      fs.writeFileSync(
        path.join(dir, filename),
        code
      );

      command =
        `g++ main.cpp -o main && main.exe`;
    }

    if (language === 'java') {

      filename = 'Main.java';

      fs.writeFileSync(
        path.join(dir, filename),
        code
      );

      command =
        `javac Main.java && java Main`;
    }

    const process = exec(
      command,
      {
        cwd: dir,
        timeout: 5000,
      },

      async (
        error,
        stdout,
        stderr
      ) => {

        setTimeout(() => {

          fs.rmSync(dir, {
            recursive: true,
            force: true,
          });

        }, 2000);

        if (fileId) {

          await pool.query(
            `
            UPDATE files
            SET
              run_count = run_count + 1,
              last_run = NOW()
            WHERE id=$1
            `,
            [fileId]
          );
        }

        if (error) {

          return res.json({
            output:
              stderr ||
              error.message,
          });
        }

        res.json({
          output: stdout,
        });
      }
    );

    if (input) {

      process.stdin.write(input);

      process.stdin.end();
    }

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: 'Execution failed',
    });
  }
};

module.exports = {
  runCode,
};