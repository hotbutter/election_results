import lockfile from 'lockfile';
import fs from 'fs';

function readDbWithLock(cb) {
  lockfile.lock('db-file.lock', { retries: 10, retryWait: 20 }, () => {
    const done = () => {
      lockfile.unlockSync('db-file.lock');
    };

    fs.readFile(__dirname + '/data.json', (err, data) => {
      cb(err, JSON.parse(data), done);
    });
  });
}

function updateResults() {
  readDbWithLock((err, data, done) => {
    const items = data.data;
    const item = items[Math.floor(Math.random()*items.length)];
    item.votes = item.votes + Math.floor(Math.random() * 1000) + 1;

    fs.writeFile(__dirname + '/data.json', JSON.stringify({ data: items }, null, 2), done);
  });

  const interval = Math.floor(Math.random() * 1000) + 1;

  setTimeout(updateResults, interval);
}

updateResults();
