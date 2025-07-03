const Member = require("../models/Member");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.add = async (req, res, next) => {
  try {
    const {
    name,
    email,
    phone,
    alternate_phone,
    dob,
    gender,
    address,
    idproofurl,
    addressproofurl,
    formurl,
    password,
    createdAt } = req.body;
    const existingMember = await Member.findOne({ email });
    if (existingMember) {
      return res.json({ message: "Member already exists" });
    }
    const member = await Member.create({ name,
    email,
    phone,
    alternate_phone,
    dob,
    gender,
    address,
    idproofurl,
    addressproofurl,
    formurl,
    password, createdAt });
    const token = createSecretToken(member._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "Member Created successfully", success: true, member });
    next();
  } catch (error) {
    console.error(error);
  }
};


module.exports.deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMember = await Member.findByIdAndDelete(id);

    if (!deletedMember) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json({ message: "Member deleted successfully", deletedMember });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while deleting user" });
  }
};


module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
        name,
        email,
        phone,
        alternate_phone,
        dob,
        gender,
        address,
        idproofurl,
        addressproofurl,
        formurl,
        password
    } = req.body;

    const updatedFields = {};
    if (email) updatedFields.email = email;
    if (username) updatedFields.username = username;
    if (password) {
      const bcrypt = require("bcryptjs");
      const hashedPassword = await bcrypt.hash(password, 12);
      updatedFields.password = hashedPassword;
    }

    const updatedMember = await Member.findByIdAndUpdate(id, updatedFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedMember) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json({ message: "Member updated successfully", updatedMember });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while updating Member" });
  }
};


module.exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json({ members });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching members" });
  }
};
module.exports.getMember = async (req, res) => {
  const { id } = req.params;
  try {
    // Replace this with real DB call or controller method
    const member = await Member.findById(id); // assuming Member is a Mongoose model
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
