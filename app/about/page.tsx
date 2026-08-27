import { Metadata } from "next";
import AboutClient from "./AboutClient";
import connectToDatabase from "@/lib/db";
import Settings from "@/lib/models/Settings";

export const metadata: Metadata = {
  title: "About Us | DSR Event Planner",
  description: "Learn about DSR Event Planner, 25 years of creating unforgettable moments in Kolkata.",
};

export const revalidate = 60; // Revalidate every minute

export default async function AboutPage() {
  let settingsData = null;
  try {
    await connectToDatabase();
    const settings = await Settings.findOne();
    if (settings) {
      settingsData = JSON.parse(JSON.stringify(settings));
    }
  } catch (error) {
    console.error("Failed to fetch settings for About page", error);
  }

  return <AboutClient settings={settingsData} />;
}
