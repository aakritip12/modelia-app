import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

type Message = Record<"date" | "message", string>;

export const input: Message[] = [
  { date: '2014-07-27', message: 'Random Message 1' },
  { date: '2014-07-22', message: 'Random Message 2' },
  { date: '2014-12-10', message: 'Random Message 3' },
  { date: '2014-01-24', message: 'Random Message 4' },
  { date: '2015-08-02', message: 'Random Message 9.5' },
  { date: '2014-10-05', message: 'Random Message 5' },
  { date: '2014-09-27', message: 'Random Message 6' },
  { date: '2014-03-07', message: 'Random Message 7' },
  { date: '2014-06-03', message: 'Random Message 8' },
  { date: '2014-05-19', message: 'Random Message 9' },
  { date: '2015-09-22', message: 'Random Message 10' },
  { date: '2015-06-07', message: 'Random Message 11' },
  { date: '2015-08-17', message: 'Random Message 12' },
  { date: '2016-04-22', message: 'Random Message 13' },
  { date: '2016-01-07', message: 'Random Message 14' },
  { date: '2016-01-16', message: 'Random Message 15' },
  { date: '2016-11-25', message: 'Random Message 16' },
  { date: '2016-06-09', message: 'Random Message 17' },
  { date: '2016-05-18', message: 'Random Message 18' },
  { date: '2016-02-16', message: 'Random Message 19' },
  { date: '2016-07-28', message: 'Random Message 20' },
  { date: '2016-04-25', message: 'Random Message 21' },
  { date: '2017-08-17', message: 'Random Message 22' },
  { date: '2017-05-08', message: 'Random Message 23' },
  { date: '2017-02-27', message: 'Random Message 24' },
  { date: '2018-09-22', message: 'Random Message 25' },
  { date: '2018-01-10', message: 'Random Message 26' },
  { date: '2018-10-28', message: 'Random Message 27' },
  { date: '2019-04-22', message: 'Random Message 28' },
  { date: '2019-02-18', message: 'Random Message 29' },
  { date: '2019-02-12', message: 'Random Message 30' },
  { date: '2019-07-13', message: 'Random Message 31' },
  { date: '2019-03-08', message: 'Random Message 32' },
  { date: '2019-10-02', message: 'Random Message 33' },
  { date: '2020-08-14', message: 'Random Message 34' },
  { date: '2020-04-10', message: 'Random Message 35' },
  { date: '2020-10-26', message: 'Random Message 36' },
  { date: '2020-12-28', message: 'Random Message 37' },
  { date: '2020-01-12', message: 'Random Message 38' },
  { date: '2020-07-13', message: 'Random Message 39' },
  { date: '2020-01-23', message: 'Random Message 40' },
  { date: '2020-04-09', message: 'Random Message 41' },
  { date: '2020-01-17', message: 'Random Message 42' },
  { date: '2021-06-22', message: 'Random Message 43' },
  { date: '2021-02-08', message: 'Random Message 44' },
  { date: '2021-10-09', message: 'Random Message 45' },
  { date: '2021-10-17', message: 'Random Message 46' },
  { date: '2021-01-07', message: 'Random Message 47' },
  { date: '2021-05-09', message: 'Random Message 48' },
  { date: '2021-05-20', message: 'Random Message 49' },
  { date: '2021-07-25', message: 'Random Message 50' },
  { date: '2022-01-28', message: 'Random Message 51' },
  { date: '2022-01-02', message: 'Random Message 52' },
  { date: '2022-12-16', message: 'Random Message 53' },
  { date: '2022-02-25', message: 'Random Message 54' },
  { date: '2022-04-27', message: 'Random Message 55' },
  { date: '2022-07-09', message: 'Random Message 56' },
  { date: '2022-09-02', message: 'Random Message 57' },
  { date: '2022-10-05', message: 'Random Message 58' },
  { date: '2022-10-24', message: 'Random Message 59' },
  { date: '2023-04-24', message: 'Random Message 60' },
  { date: '2023-02-14', message: 'Random Message 61' },
  { date: '2023-10-01', message: 'Random Message 62' },
  { date: '2023-04-02', message: 'Random Message 63' },
  { date: '2023-03-10', message: 'Random Message 64' },
  { date: '2023-03-22', message: 'Random Message 65' },
  { date: '2023-08-21', message: 'Random Message 66' },
  { date: '2023-01-02', message: 'Random Message 67' },
];

app.use(cors());

app.get("/api/messages", (req, res) => {
  res.json(input);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
