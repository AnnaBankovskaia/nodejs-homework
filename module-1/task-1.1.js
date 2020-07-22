const stream = require('stream');

const reverse = stream.Transform({
  transform: function(chunk, enc, next) {
    const data = chunk.toString('utf8');
    this.push(`${data.trim().split('').reverse().join('')}\n\n`);
    next();
  },
})

stream.pipeline(
  process.stdin,
  reverse,
  process.stdout,
  error => {
    if (error) console.log(error);
  }
)