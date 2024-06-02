

import Link from "../links/linkModel.js";
import userModel from "./userModel.js";
import mongoose from "mongoose";
import crypto from "crypto";
import express from 'express';

// const generateShortUrl = (originalUrl) => {
//     return crypto.randomBytes(4).toString('hex'); // Generate a short URL
// };

const UsersController = {
  getList: async (req, res) => {
    try {
      const users = await userModel.find();
      res.json(users);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  getById: async (req, res) => {
    try {
      const user = await userModel.findById(req.params.id);
      console.log(user);
      res.json(user);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  // add: async (req, res) => {
  //     const { name, email, password, links } = req.body;
  //     try {
  //         const newUser = await userModel.create({ name, email, password, links });

  //         // Add links to the general collection
  //         for (const link of links) {
  //             // const shortUrl = generateShortUrl(link.originalUrl);
  //             await Link.create({ originalUrl: link.originalUrl, clicks: [] });
  //         }

  //         res.json(newUser);
  //     } catch (e) {
  //         res.status(400).json({ message: e.message });
  //     }
  // },
//   add: async (req, res) => {
//     const { name, email, password, links } = req.body;

//     console.log(typeof links); // נבדוק את סוג הנתונים של links
//     const linkId = [];
   
//     try {
      
//       // הוספת הקישורים לקולקציית הקישורים הכללית
//       for (const link of links) {
//         // const shortUrl = generateShortUrl(link.originalUrl);
//         await Link.create({ originalUrl: link.originalUrl, clicks: [] });
//       }
//       const newUser = await userModel.create({ name, email, password, linkId });
//       res.json(newUser);
//     } catch (e) {
//       res.status(400).json({ message: e.message });
//     }
//   },
add: async (req, res) => {
    const { name, email, password, links } = req.body;

    try {
        // יצירת המשתמש
        const user = await userModel.create({ name, email, password });

        // מערך של הקישורים שיצרנו
        const createdLinks = await Link.insertMany(links.map(link => ({ originalUrl: link.originalUrl })));

        // מעבר על כל הקישורים שנוצרו וקישורם למשתמש
        for (const link of createdLinks) {
            user.links.push(link._id);
            // link.users.push(user._id);
            await link.save();
        }

        // שמירת המשתמש במסד הנתונים
        await user.save();

        res.json(user);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
},

update: async (req, res) => {
    const { id } = req.params;
    const { name, email, password, links } = req.body;
    
    try {
        // מציאת המשתמש הקיים
        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // עדכון פרטי המשתמש
        user.name = name;
        user.email = email;
        user.password = password;

        // עדכון הקישורים של המשתמש
        user.links = [];  // ננקה את מערך הקישורים הקיים

        // עדכון/יצירת הקישורים החדשים והוספתם למשתמש
        for (const linkData of links) {
            let link = await Link.findOne({ originalUrl: linkData.originalUrl });

            if (!link) {
                link = await Link.create({ originalUrl: linkData.originalUrl, users: [user._id] });
            } else {
                if (!link.users) {
                    link.users = [];
                }
                if (!link.users.includes(user._id)) {
                    link.users.push(user._id);
                }
            }

            user.links.push(link._id);
            await link.save();
        }

        await user.save();

        res.json(user);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
},
//   update: async (req, res) => {
//     const { id } = req.params;
//     const { name, email, password, links } = req.body;
//     try {
//       const updatedUser = await userModel.findByIdAndUpdate(
//         id,
//         { name, email, password, links },
//         { new: true }
//       );

//       // Add links to the general collection
//       for (const link of links) {
//         const existingLink = await Link.findOne({
//           originalUrl: link.originalUrl,
//         });
//         if (!existingLink) {
//           // const shortUrl = generateShortUrl(link.originalUrl);
//           await Link.create({ originalUrl: link.originalUrl, clicks: [] });
//         }
//       }

//       res.json(updatedUser);
//     } catch (e) {
//       res.status(400).json({ message: e.message });
//     }
//   },
  // update: async (req, res) => {
  //     const { id } = req.params;
  //     const { name, email, password, links } = req.body;
  //     try {
  //         const updatedUser = await userModel.findByIdAndUpdate(id, { name, email, password, links }, { new: true });

  //         // עדכון הקישורים במקום ליצור קישור חדש
  //         for (const linkData of links) {
  //             const existingLink = updatedUser.links.find(link => link._id.toString() === linkData._id);
  //             if (existingLink) {
  //                 // עדכון הקישור באוסף הכללי של הקישורים
  //                 const generalLink = await Link.findOneAndUpdate(
  //                     { _id: existingLink._id },
  //                     { originalUrl: linkData.originalUrl },
  //                     { new: true }
  //                 );
  //                 if (!generalLink) {
  //                     throw new Error('Link not found in general collection');
  //                 }
  //             }
  //         }

  //         res.json(updatedUser);
  //     } catch (e) {
  //         res.status(400).json({ message: e.message });
  //     }
  // },

  // delete: async (req, res) => {
  //     const { id } = req.params;
  //     try {
  //         const deletedUser = await userModel.findByIdAndDelete(id);
  //         res.json(deletedUser);
  //     } catch (e) {
  //         res.status(400).json({ message: e.message });
  //     }
  // }
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      // מצא את המשתמש שיש למחוק
      const deletedUser = await userModel.findById(id);

      // שכפול רשימת ה-ObjectIds של הקישורים של המשתמש
      const linkIds = deletedUser.links.map((link) => link._id);

      // מחק את כל הקישורים שברשימה מהאוסף הכללי של הקישורים
      await Link.deleteMany({ _id: { $in: linkIds } });

      // מחק את המשתמש
      await userModel.findByIdAndDelete(id);

      res.json(deletedUser);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
};

export default UsersController;
