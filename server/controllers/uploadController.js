// Route for uploading an Imag

exports.uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  res.status(200).json({
    message: "File uploaded successfully.",
    filePath: `/uploads/${req.file.filename}`,
  });
};

// Route for uploading an Image By Link

exports.uploadByLink = async (req, res) => {
  const { imageUrl } = req.body;
  if (!imageUrl) {
    return res.status(400).json({ message: "Image URL is required." });
  }

  try {
    const response = await axios.get(imageUrl, { responseType: "stream" });
    const filename = Date.now() + "-" + path.basename(imageUrl);
    const filepath = path.join(__dirname, "../uploads", filename);

    const writer = fs.createWriteStream(filepath);
    response.data.pipe(writer);

    writer.on("finish", () => {
      res.status(200).json({
        message: "File uploaded successfully.",
        filePath: `/uploads/${filename}`,
      });
    });

    writer.on("error", () => {
      res.status(500).json({ message: "Error saving the file." });
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching the image." });
  }
};
