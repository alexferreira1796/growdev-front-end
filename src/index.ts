import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';

const app = express();
app.set('view engine', 'ejs');
app.use(cors());

app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, '/public')));

app.get("/", (req: Request, res: Response) => {
  res.render("index");
});

app.get("/cadastrar/:id?", (req: Request, res: Response) => {
  res.render("cadastrar");
});

app.get("/lista", (req: Request, res: Response) => {
  res.render("lista");
});

app.listen(process.env.PORT || 3000, () => {});