import { Redis } from "@upstash/redis";
import webpush from "web-push";

const redis = Redis.fromEnv();

webpush.setVapidDetails(
    process.env.VAPID_URL,
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

//subscription endpoint
export async function POST(req) {
    const subscription = await req.json();

    const id = crypto.randomUUID();

    await redis.set(
        `push:${id}`,
        JSON.stringify(subscription)
    );

    return Response.json({
        success: true,
        id
    });
}
//send-notification using cron job
export async function GET(req) {
    const auth = req.headers.get("authorization");

    if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response("Unauthorized", {
            status: 401
        });
    }

    const keys = await redis.keys("push:*");

    const payload = JSON.stringify({
        title: "Ethereal Dreams",
        body:
            "'Ethereal Dreams' collection isn't going to admire itself!",
        image: "/screenshots/mobile-gallery.png",
        url: "/car-canvas"
    });

    let sent = 0;

    await Promise.all(
        keys.map(async (key) => {
            const subscription = await redis.get(key);

            try {
                await webpush.sendNotification(
                    subscription,
                    payload
                );

                sent++;
            } catch (error) {
                console.error(error);

                await redis.del(key);
            }
        })
    );

    return Response.json({
        sent
    });
}
