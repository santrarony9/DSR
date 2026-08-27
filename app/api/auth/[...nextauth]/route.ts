import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "@/lib/db";
import Admin from "@/lib/models/Admin";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        
        await connectToDatabase();
        const admin = await Admin.findOne({ email: credentials.email });
        if (!admin) return null;
        
        const isMatch = await bcrypt.compare(credentials.password, admin.password);
        if (!isMatch) return null;
        
        return { id: admin._id.toString(), email: admin.email };
      }
    })
  ],
  session: { strategy: "jwt" as any },
  pages: { signIn: "/admin/login" },
  secret: process.env.NEXTAUTH_SECRET || "dsr_fallback_secret_2026_super_secure",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
