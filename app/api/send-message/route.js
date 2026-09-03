import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, message, token } = body;

        if (!name || !email || !message || !token) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const API_KEY = process.env.RECAPTCHA_ENTERPRISE_API_KEY;
        const PROJECT_ID = process.env.PROJECT_ID;
        const SITE_KEY = process.env.NEXT_PUBLIC_SITE_KEY; 

        const assessmentRes = await fetch(
            `https://recaptchaenterprise.googleapis.com/v1/projects/${PROJECT_ID}/assessments?key=${API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    event: {
                        token: token,
                        siteKey: SITE_KEY,
                        expectedAction: "submit",
                    },
                }),
            }
        );

        const assessmentJson = await assessmentRes.json();

        if (!assessmentJson.tokenProperties?.valid) {
            return NextResponse.json(
                {
                    error: "Invalid token",
                    reason: assessmentJson.tokenProperties?.invalidReason,
                },
                { status: 403 }
            );
        }

        const score = assessmentJson.riskAnalysis?.score;
        if (score < 0.5) {
            return NextResponse.json(
                { error: "High risk score", score },
                { status: 403 }
            );
        }

        await db.collection("messages").add({
            name,
            email,
            message,
            timestamp: new Date().toISOString(),
        });

        return NextResponse.json(
            { message: "Thank you for your kind feedback!" },
            { status: 200 }
        );

    } catch (error) {
        console.error("API Error:", error.message || "Unknown error");

        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
