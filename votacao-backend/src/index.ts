//console.log("Hello from the API");
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    res.status(200).send("Hello from the API");
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
