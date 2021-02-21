import axios from 'axios';
import * as http from 'http';
import * as url from 'url';

const PORT = process.env.SERVER_HTTP_PORT!;
const CARRIER_SERVICES = process.env.CARRIERS_SERVICES!;

let id = 0;

const calculate = async (query: any) => {
  return Promise.all(String(CARRIER_SERVICES).split(';').map((baseURL) => {
    const request = axios.create({
      baseURL,
      timeout: 3000,
      headers: {'X-User-Agent': 'Carries-Hub'},
    });

    return request.get(`/v1/calculate?weight=${query.weight}&markup=${query.markup}`);
  }));
};

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url!, true);
  switch (pathname) {
    case '/health':
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('Ok!');
      break;
    case '/v1/calculate':
      calculate(query)
        .then(responses => {
          ++id;
          const quotations = responses.map((response) => response.data).reduce((a, b) => a.concat(b));
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(
            JSON.stringify({data: {id, query, quotations}}),
          );
        })
        .catch(() => {
          res.writeHead(500, { 'Content-Type': 'text/html' });
          res.end('something wrong');
        });
      break;
    default:
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('Not Found');
      break;
  }
});

server.listen(PORT, (err: Error) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${PORT}`);
});
