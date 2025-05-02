import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import {prisma} from "@/lib/prisma" 
import { openAPI } from "better-auth/plugins";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    socialProviders : {
        github : {
            clientId : process.env.GITHUB_CLIENT_ID as string,
            clientSecret : process.env.GITHUB_CLIENT_SECRET as string,
            enabled : true,
        },
    },
    emailAndPassword : {
        enabled : true,
        requireEmailVerification : true
    },
    emailVerification : {
        sendOnSignUp : true,
        autoSignInAfterVerification : true,
        sendVerificationEmail : async ({user, token}) => {
            const verificationUrl = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.EMAIL_VERIFICATION_CALLBACK_URL}`;
            console.log(user)
            console.log(verificationUrl);
            // TODO : send email in PRODCUTION
        },
    },
    plugins : [openAPI()]
});