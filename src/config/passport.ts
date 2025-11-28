import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";


// -----------------------------------
// LocalStrategy
// -----------------------------------

passport.use(
  new LocalStrategy(
    { usernameField: "email" }, // tell Passport to use `email` instead of `username`
    async (email, password, done) => {
      try {
        // 1. Find user by email
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }

        // 2. Compare passwords
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: "Incorrect password." });
        }

        // 3. Success
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// -----------------------------------
// Serialize / Deserialize
// -----------------------------------

passport.serializeUser((user: any, done) => {
  done(null, user.id); // store user.id in the session
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
