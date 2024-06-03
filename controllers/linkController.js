import Link from "../models/linkModel.js";

const LinkController = {
  redirect: async (req, res) => {
   

    try {
      // מצא את הקישור במסד הנתונים לפי ה-id שנשלח ב-request
      const link = await Link.findById(req.params.id);

      // בדוק אם הקישור נמצא במסד הנתונים
      if (!link) {
        return res.status(404).json({ message: "Link not found" });
      }
      const click = {
        ipAddress: req.ip,
        targetParamValue: req.query[link.targetParamName] || "unknown",
      };
      // עדכן את מספר ה-clicks של הקישור במסד הנתונים
      link.clicks.push(click);

      await link.save();

      // בצע את ההפניה (redirect) ל-originUrl של הקישור
      res.redirect(link.originalUrl);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
  getClick: async (req, res) => {
    try {
      const link = await Link.findById(req.params.id);
      if (!link) {
        return res.status(404).json({ message: "Link not found" });
      }
    
      const clicksByTarget = link.clicks.reduce((acc, click) => {
        const target = click.targetParamValue || "unknown";
        if (!acc[target]) {
          acc[target] = 0;
        }
        acc[target]++;
        return acc;
      }, {});

      res.status(200).send(clicksByTarget);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  getList: async (req, res) => {
    try {
      const links = await Link.find(); // Fetch all links
      res.json(links);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  getById: async (req, res) => {
    try {
      const link = await Link.findById(req.params.id); // Fetch link by ID
      res.json(link);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  add: async (req, res) => {
    const { originalUrl, clicks,targetValues } = req.body;
    try {
      const newLink = await Link.create({ originalUrl, clicks,targetValues }); // Add new link
      res.json(newLink);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { originalUrl, clicks,targetValues } = req.body;
    try {
      const updatedLink = await Link.findByIdAndUpdate(
        id,
        { originalUrl, clicks,targetValues },
        { new: true }
      ); // Update link by ID
      res.json(updatedLink);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await Link.findByIdAndDelete(id); // Delete link by ID
      res.json(deleted);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
};

export default LinkController;
