import mediaSchema from "../Model/mediaSchema.js";


export const uploadMedia = async (req, res) => {
    try {
        const { url, type } = req.body;
        const uploader = req.user.id; // Assuming uploader is the authenticated user
    
        // Create a new media entry
        const media = new mediaSchema({
          url,
          type,
          uploader,
        });
    
        // Save the media to the database
        await media.save();
    
        res.status(201).json({ success: true, media });
      } catch (error) {
        next(error);
      }
  };