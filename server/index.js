// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User.js");
const Place = require("./models/Places.js");
const Booking = require("./models/Booking.js");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

require("dotenv").config();

// Create an Express application
const app = express();
const bcryptSalt = bcrypt.genSaltSync(12);

// Middleware to parse JSON request bodies

app.use(bodyParser.json());
app.use(cookieParser());

const corsOption = {
  credentials: true,
  origin: process.env.APP_URL,
};
app.use(cors(corsOption));

app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose.connect(process.env.MONGO_URL);

// Example route to handle GET requests

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    try {
      const userData = jwt.verify(
        req.cookies.token,
        process.env.JWT_SECRET,
        {}
      );
      if (userData) {
        resolve(userData);
      }
    } catch (error) {
      console.log("error in get user from request", error);
      // res.status(403).json({error})
      reject("Auth error");
    }
  });
}

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json({
      userDoc,
    });
  } catch (e) {
    res.status(422).json(e);
    console.log(`error in register:${error}`);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (!userDoc) {
      return res.status(401).json({ message: "Invalid email or password" });
    } else {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign(
          {
            email: userDoc.email,
            id: userDoc._id,
          },
          process.env.JWT_SECRET,

          (err, token) => {
            if (err) throw err;
            res.cookie("token", token, { httpOnly: true }).json(userDoc);
          }
        );
      } else {
        res.status(422).json("pass not ok");
      }
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    try {
    } catch (error) {}
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.status(401).json({ error: "No token found" });
  }
});

app.use("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  try {
    const { link } = req.body;
    const newName = "Photo" + Date.now() + ".jpg";
    await imageDownloader.image({
      url: link,
      dest: __dirname + "/uploads/" + newName,
    });
    res.json(newName);
  } catch (error) {
    console.log(error);
  }
});

const photosMiddleware = multer({ dest: "uploads" });
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  try {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname } = req.files[i];
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);
      uploadedFiles.push(newPath.replace("uploads", ""));
    }
    res.json(uploadedFiles);
  } catch (error) {
    console.log(error);
  }
});

app.post("/places", (req, res) => {
  try {
    const { token } = req.cookies;
    const {
      title,
      address,
      addedPhotos,
      description,
      price,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    } = req.body;
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      if (err) throw err;
      const placeDoc = await Place.create({
        owner: userData.id,
        price,
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      });
      res.json(placeDoc);
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/user-places", (req, res) => {
  try {
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
        if (userData) {
          const { id } = userData;
          res.json(await Place.find({ owner: id }));
        }
      });
    }
  } catch (error) {
    console.log("Error in user-places api", error);
  }
});

app.get("/places/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await Place.findById(id));
  } catch (error) {
    console.log(error);
  }
});

app.put("/places", async (req, res) => {
  try {
    const { token } = req.cookies;
    const {
      id,
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      if (err) throw err;
      const placeDoc = await Place.findById(id);
      if (userData.id === placeDoc.owner.toString()) {
        placeDoc.set({
          title,
          address,
          photos: addedPhotos,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
          price,
        });
        await placeDoc.save();
        res.json("ok");
      }
    });
  } catch (error) {
    console.log(error);
  }
});
app.get("/places", async (req, res) => {
  try {
    res.json(await Place.find());
  } catch (error) {
    console.log(error);
  }
});

app.post("/bookings", async (req, res) => {
  try {
    const userData = await getUserDataFromReq(req);
    const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
      req.body;
    const doc = await Booking.create({
      place,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      price,
      user: userData.id,
    });

    res.status(200).json(doc);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.get("/bookings", async (req, res) => {
  try {
    const userData = await getUserDataFromReq(req);
    res
      .status(200)
      .json(await Booking.find({ user: userData.id }).populate("place"));
  } catch (error) {
    res.status(500).json(error);
  }
});
// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on ${process.env.APP_URL}:${PORT}`);
});
