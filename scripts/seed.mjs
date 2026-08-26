import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI = "mongodb://localhost:27017/dsreventplanner";

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
});

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
  const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);

  // Seed Admin
  const adminExists = await Admin.findOne({ email: "admin@dsreventplanner.com" });
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await Admin.create({ email: "admin@dsreventplanner.com", password: hashedPassword });
    console.log("Created admin user: admin@dsreventplanner.com / admin123");
  } else {
    console.log("Admin user already exists");
  }

  // Seed Categories
  const initialCategories = [
    { name: "Birthday & Rituals", slug: "birthday" },
    { name: "Central & State Government", slug: "government" },
    { name: "Cultural & Corporate", slug: "cultural" },
    { name: "Wedding", slug: "wedding" },
    { name: "Haldi & Mehendi", slug: "haldi" },
  ];

  for (const cat of initialCategories) {
    const exists = await Category.findOne({ slug: cat.slug });
    if (!exists) {
      await Category.create(cat);
      console.log(`Created category: ${cat.name}`);
    }
  }

  console.log("Seeding complete!");
  process.exit(0);
}

seed();
