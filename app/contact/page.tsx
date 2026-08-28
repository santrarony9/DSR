import { Metadata } from "next";
import ContactClient from "./ContactClient";
import connectToDatabase from "@/lib/db";
import Settings from "@/lib/models/Settings";

export const metadata: Metadata = {
  title: "Contact Us | DSR Event Planner",
  description: "Get in touch with DSR Event Planner. Let's plan something extraordinary together.",
};

export const revalidate = 60; // Revalidate every minute

export default async function ContactPage() {
  let settingsData = null;
  try {
    await connectToDatabase();
    const settings = await Settings.findOne();
    if (settings) {
      settingsData = JSON.parse(JSON.stringify(settings));
    }
  } catch (error) {
    console.error("Failed to fetch settings for Contact page", error);
  }

  return <ContactClient settings={settingsData} />;
}
