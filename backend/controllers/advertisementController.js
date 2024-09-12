const mongoose = require("mongoose");
const Advertisement = require("../models/advertisementModel");

// POST: Create a new advertisement
exports.createAdvertisement = async (req, res) => {
  try {
    const { title, imageUrl, description } = req.body;
    const userId = req.user._id;

    const newAdvertisement = new Advertisement({
      title,
      imageUrl,
      description,
      postedBy: userId,
    });

    const savedAdvertisement = await newAdvertisement.save();
    res.status(201).json({
      message: "Advertisement posted successfully",
      data: savedAdvertisement,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating advertisement", error });
  }
};

// GET: Get all advertisements
exports.getAdvertisements = async (req, res) => {
  try {
    const advertisements = await Advertisement.find();
    res.status(200).json(advertisements);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving advertisements", error });
  }
};

// // GET: Get a single advertisement by ID
// exports.getAdvertisementById = async (req, res) => {
//   try {
//     const advertisement = await Advertisement.findById(req.params.id);

//     if (!advertisement) {
//       return res.status(404).json({ message: "Advertisement not found" });
//     }

//     res.status(200).json(advertisement);
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving advertisement", error });
//   }
// };

//GET: Get all advertisements posted by the authenticated user
exports.getUserAdvertisements = async (req, res) => {
  const userId = req.user._id;
  try {
    const advertisements = await Advertisement.find({ postedBy: userId });
    res.status(200).json({ data: advertisements });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// // PATCH: Update an advertisement by ID
// exports.updateAdvertisement = async (req, res) => {
//   try {
//     const updatedData = req.body;
//     const advertisement = await Advertisement.findByIdAndUpdate(
//       req.params.id,
//       updatedData,
//       { new: true } // This option ensures the updated document is returned
//     );

//     if (!advertisement) {
//       return res.status(404).json({ message: "Advertisement not found" });
//     }

//     res.status(200).json(advertisement);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating advertisement", error });
//   }
// };

// DELETE: Delete an advertisement by ID
exports.deleteAdvertisement = async (req, res) => {
  try {
    const advertisement = await Advertisement.findByIdAndDelete(req.params.id);

    if (!advertisement) {
      return res.status(404).json({ message: "Advertisement not found" });
    }

    res.status(200).json({ message: "Advertisement deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting advertisement", error });
  }
};
