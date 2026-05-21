import bcrypt from "bcryptjs";

import Admin from "../models/Admin.js";
import Nominee from "../models/Nominee.js";

const seedDatabase = async () => {
  try {
    // CHECK ADMIN
    const existingAdmin = await Admin.findOne({
      username: "admin",
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin123", 10);

      await Admin.create({
        username: "admin",
        password: hashedPassword,
        role: "admin",
      });

      console.log("Default admin created");
    }

    // CHECK NOMINEES
    const nomineeCount = await Nominee.countDocuments();

    if (nomineeCount === 0) {
      const nominees = [
        {
          name: "Candidate A",
          party: "Party A",
          image: "",
        },

        {
          name: "Candidate B",
          party: "Party B",
          image: "",
        },

        {
          name: "Candidate C",
          party: "Party C",
          image: "",
        },

        {
          name: "Candidate D",
          party: "Party D",
          image: "",
        },

        {
          name: "Candidate E",
          party: "Party E",
          image: "",
        },
      ];

      await Nominee.insertMany(nominees);

      console.log("Default nominees seeded");
    }
  } catch (error) {
    console.log(error);
  }
};

export default seedDatabase;