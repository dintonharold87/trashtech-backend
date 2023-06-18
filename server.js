const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const {Admin} = require("./models/adminModel");
const {Client }= require("./models/clientModel");
const bcrypt = require("bcrypt");

const app = express();
dotenv.config();

// Configure the local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // The field name for the username/email
      passwordField: "password",
       passReqToCallback: true, // The field name for the password
    },
    async (req, email, password, done) => {
      try {
        // Find the user by email (either in the Admin or Client model)
        const user =
          (await Admin.findOne({ email })) || (await Client.findOne({ email }));

        if (!user) {
          return done(null, false, { message: "Invalid email or password" });
        }

        // Compare the provided password with the hashed password in the user record
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return done(null, false, { message: "Invalid email or password" });
        }
        // Check the user's role and pass it along with the user object
        let role;
        if (user instanceof Admin) {
          role = "admin";
        } else if (user instanceof Client) {
          role = "client";
        }

         // Return the user object with role
        return done(null, { user, role });
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Environment variables
const PORT = process.env.PORT || 2023;
const uri = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
// Database connection
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Error connecting to database", error);
  });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Set up serialization and deserialization functions in your entry file to store and retrieve user information from the session.
// Serialization: Store user ID in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialization: Retrieve user from the session based on the stored ID
passport.deserializeUser(async (id, done) => {
  try {
    const user = await Admin.findById(id) || await Client.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Import routes
const adminRoutes = require('./routes/adminRoutes');
const clientRoutes = require("./routes/clientRoutes");
const authRoutes = require("./routes/authRoutes");

// Admin Routes
app.use('/api', adminRoutes);
// Client Routes
app.use('/api', clientRoutes);
// Auth Routes
app.use('/api', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

module.exports = app;
