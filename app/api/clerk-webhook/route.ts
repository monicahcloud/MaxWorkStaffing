import prisma from "@/lib/prisma";
import {
  WebhookEvent,
  UserJSON,
  DeletedObjectJSON,
} from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    // Read raw body
    const rawBody = await req.text();

    // Headers & Signature
    const headerPayload = await headers();
    const signature = headerPayload.get("svix-signature");
    const webhookSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

    if (!signature || !webhookSecret) {
      return new NextResponse("Unauthorized: Missing signature or secret", {
        status: 401,
      });
    }

    // Parse event
    const event: WebhookEvent = JSON.parse(rawBody);
    console.log(`📥 Clerk webhook received: ${event.type}`);

    // Route the event
    switch (event.type) {
      case "user.created":
        await handleUserCreated(event.data as UserJSON);
        break;
      case "user.updated":
        await handleUserUpdated(event.data as UserJSON);
        break;
      case "user.deleted":
        await handleUserDeleted(event.data as DeletedObjectJSON);
        break;
      default:
        console.log(`⚠️ Unhandled Clerk event type: ${event.type}`);
        break;
    }

    return new NextResponse("Event processed", { status: 200 });
  } catch (error) {
    console.error("❌ Clerk Webhook Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
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
