import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { openAPI, username } from "better-auth/plugins";
import slugify from "@sindresorhus/slugify";

const generateRandomNumber = () => {
  return Math.floor(Math.random() * 10000) + 1;
};

const generateUsername = (format: string) => {
  return slugify(format) + generateRandomNumber();
};

export const auth = betterAuth({
  appName: "Spool",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  advanced : {
    cookiePrefix : "spool",
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // update active session every 1 day
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      enabled: true,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["github"],
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    autoSignIn: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      // TODO : send email in PROD
      console.log(`Reset password link : ${url} for`, user);
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 60 * 60, // 1 hour
    sendVerificationEmail: async ({ user, token }) => {
      const verificationUrl = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.EMAIL_VERIFICATION_CALLBACK_URL}`;
      console.log(user);
      console.log(verificationUrl);
      // TODO : send email in PROD
    },
  },
  rateLimit: {
    enabled: true,
  },
  databaseHooks: {
    user: {
      create: {
        // add username manually for social providers
        before: async (user, ctx) => {
          if (ctx?.request?.url.includes("github")) {
            // add username manually here
            const username = generateUsername(user.name);
            return {
              data: { ...user, username, displayUsername: username },
            };
          }
        },
      },
    },
  },
  plugins: [
    openAPI(),
    username({
      minUsernameLength: 5,
      maxUsernameLength: 30,
    }),
  ],
});
