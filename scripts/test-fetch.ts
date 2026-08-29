import { getGalleryData } from "../lib/fetchGallery";
import mongoose from "mongoose";

async function run() {
  const data = await getGalleryData();
  console.log(JSON.stringify(data, null, 2));
  process.exit(0);
}
run();
