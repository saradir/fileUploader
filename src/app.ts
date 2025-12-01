import 'dotenv/config';              
import express from "express";
import session from "express-session";
import passport from "passport";
import { prisma } from './lib/prisma'
import { fileURLToPath } from 'node:url';
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import "./config/passport";
import path from 'node:path';


import { userRouter } from './routers/userRouter';
import { folderRouter } from './routers/folderRouter';
import { fileRouter } from './routers/fileRouter';

import { ensureAuth } from './middleware/auth/ensureAuth';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "changeme",
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
})

// ROUTERS
app.use('/u', userRouter);
app.use('/f', ensureAuth, folderRouter);
app.use('/f/:folderId/file', ensureAuth, fileRouter);

app.get("/", (_req, res) => {
  res.render("homepage", {
    title: "Homepage"
  });
});

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});

export default app;
