import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import {prisma} from "@/lib/prisma" 
import { openAPI } from "better-auth/plugins";

export const auth = betterAuth({
    appName : "Spool",

    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    session : {
        expiresIn : 60 * 60 * 24 * 7, // 7 days
        updateAge : 60 * 60 * 24 // update active session every 1 day
    },
    socialProviders : {
        github : {
            clientId : process.env.GITHUB_CLIENT_ID as string,
            clientSecret : process.env.GITHUB_CLIENT_SECRET as string,
            enabled : true,
        },
    },
    account : {
        accountLinking : {
            enabled : true,
            trustedProviders : ["github"]
        }
    },
    emailAndPassword : {
        enabled : true,
        minPasswordLength : 8,
        maxPasswordLength : 128,
        autoSignIn : true,
        requireEmailVerification : true,
        sendResetPassword : async ({user,url})=>{
            // TODO : send email in PROD
            console.log(`Reset password link : ${url} for`, user);
        }
    },
    emailVerification : {
        sendOnSignUp : true,
        autoSignInAfterVerification : true,
        expiresIn : 60 * 60, // 1 hour
        sendVerificationEmail : async ({user, token}) => {
            const verificationUrl = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.EMAIL_VERIFICATION_CALLBACK_URL}`;
            console.log(user)
            console.log(verificationUrl);
            // TODO : send email in PROD
        },
    },
    rateLimit : {
        enabled : true
    },
    plugins : [openAPI()]
});