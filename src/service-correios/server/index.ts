import * as http from 'http';
import * as url from 'url';

const PORT = process.env.SERVER_HTTP_PORT!;
const CARRIER_NAME = process.env.CARRIER_NAME!;
const CARRIER_ECONOMIC_NAME = process.env.CARRIER_ECONOMIC_NAME!;
const CARRIER_EXPRESS_NAME = process.env.CARRIER_EXPRESS_NAME!;
const CARRIER_MARKUP = process.env.CARRIER_MARKUP!;

const status = {
  fail: false,
};

const server = http.createServer((req, res) => {
  if (status.fail) {
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end('Something wrong');
    return;
  }

  const { pathname, query } = url.parse(req.url!, true);

  switch (pathname) {
    case '/health':
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('Ok!');
      break;
    case '/v1/calculate':
      const weight = Number(query.weight);
      console.log('weight:', weight);

      const markup = Number(query.markup || CARRIER_MARKUP);
      console.log('markup:', markup);

      const ECONOMIC_COST = Math.round(Math.random() * weight * 10000) / 100;
      const ECONOMIC_PRICE = Math.round(ECONOMIC_COST * markup * 100) / 100;
      const ECONOMIC_DELIVERY_TIME = Math.floor(Math.random() * 14) + 1;
      
      const EXPRESS_COST = Math.round(ECONOMIC_COST * 150) / 100;
      const EXPRESS_PRICE = Math.round(EXPRESS_COST * markup * 100) / 100;
      const EXPRESS_DELIVERY_TIME = Math.floor(Math.random() * 6) + 1;

      const response = [
        {
          company: CARRIER_NAME,
          service: CARRIER_ECONOMIC_NAME,
          cost: ECONOMIC_COST,
          price: ECONOMIC_PRICE,
          delivery_time: ECONOMIC_DELIVERY_TIME,
        },
        {
          company: CARRIER_NAME,
          service: CARRIER_EXPRESS_NAME,
          cost: EXPRESS_COST,
          price: EXPRESS_PRICE,
          delivery_time: EXPRESS_DELIVERY_TIME,
        },
      ];

      console.log('response:', response);

      res.writeHead(200, { 'Content-Type': 'application/json' });

      res.end(JSON.stringify(response));
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

setTimeout(() => {
  console.log('status fail');
  status.fail = true;
}, Math.random() * 300000);
