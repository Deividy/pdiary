const http = require('http');
const url = require('url');
const { daoModels } = require('pdiary-core');

const util = require('util');
const jwt = require('jsonwebtoken');

const jwtVerifyPromise = util.promisify(jwt.verify);
const { JWT_SECRET } = process.env;

async function handleRequest (req, res) {
  try {
    const urlParts = url.parse(req.url);
    const link = urlParts.path.slice(1);
    const diary = await daoModels.Diary.where({ link }).fetch();

    if (!diary.get('public')) {
      const token = req.headers.authorization.replace('Bearer ', '');
      await jwtVerifyPromise(token, JWT_SECRET);
      const userId = jwt.decode(token).userId;

      if (userId !== diary.attributes.user_id) throw new Error('Unauthorized');
    }

    res.writeHead(200);
    res.end('ok');
  } catch (ex) {
    console.error(ex);

    res.writeHead(401);
    res.end('Unauthorized');
  }
}

const port = process.env.AUTH_SERVICE_PORT;
http.createServer(handleRequest).listen(port);
console.log(`auth service on ${port}`);
