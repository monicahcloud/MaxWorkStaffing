import prisma from "@/lib/prisma";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { UserJSON, DeletedObjectJSON } from "@clerk/backend";

export async function POST(req: Request) {
  const rawBody = await req.text();
  const headerPayload = await headers();
  const signature = headerPayload.get("svix-signature") as string;
  const webhookSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET || "";

  const evt: WebhookEvent = JSON.parse(rawBody);

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log("🔔 Clerk Webhook received:", evt);

  try {
    switch (evt.type) {
      case "user.created":
        await handleUserCreated(evt.data);
        break;
      case "user.updated":
        await handleUserUpdated(evt.data);
        break;
      case "user.deleted":
        await handleUserDeleted(evt.data);
        break;
      default:
        console.log(`⚠️ Unhandled event type: ${evt.type}`);
        break;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error handling webhook:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Handles new user creation
async function handleUserCreated(user: UserJSON) {
  await prisma.user.create({
    data: {
      clerkId: user.id,
      email: user.email_addresses[0]?.email_address || "",
      firstName: user.first_name || "",
      lastName: user.last_name || "",
      imageUrl: user.image_url || "",
    },
  });

  console.log(`✅ User created in DB: ${user.id}`);
}

// Handles user updates
async function handleUserUpdated(user: UserJSON) {
  await prisma.user.update({
    where: { clerkId: user.id },
    data: {
      email: user.email_addresses[0]?.email_address || "",
      firstName: user.first_name || "",
      lastName: user.last_name || "",
      imageUrl: user.image_url || "",
      updatedAt: new Date(),
    },
  });

  console.log(`🔄 User updated in DB: ${user.id}`);
}

// Handles user deletion
async function handleUserDeleted(user: DeletedObjectJSON) {
  await prisma.user.deleteMany({
    where: { clerkId: user.id },
  });

  console.log(`🗑️ User deleted from DB: ${user.id}`);
}
