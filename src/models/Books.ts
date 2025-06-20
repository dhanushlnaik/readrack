import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: [{ type: String }],
  description: String,
  coverImage: String, // URL or base64
  averageRating: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Book || mongoose.model("Book", BookSchema);
