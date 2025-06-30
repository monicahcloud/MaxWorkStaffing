// import prisma from "@/lib/prisma";
// import {
//   WebhookEvent,
//   UserJSON,
//   DeletedObjectJSON,
// } from "@clerk/nextjs/server";
// import { NextRequest, NextResponse } from "next/server";
// import { Webhook } from "svix";

// export async function POST(req: NextRequest) {
//   console.log("📩 Incoming webhook");
//   try {
//     // Read raw body as text
//     const payload = await req.text();

//     // Get Svix headers
//     const svixId = req.headers.get("svix-id");
//     const svixTimestamp = req.headers.get("svix-timestamp");
//     const svixSignature = req.headers.get("svix-signature");

//     if (!svixId || !svixTimestamp || !svixSignature) {
//       return new NextResponse("Missing required Svix headers", { status: 400 });
//     }

//     const svixHeaders = {
//       "svix-id": svixId,
//       "svix-timestamp": svixTimestamp,
//       "svix-signature": svixSignature,
//     };

//     const webhookSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
//     console.log("🔑 Secret exists:", !!webhookSecret);

//     // Validate required headers and secret
//     if (
//       !svixHeaders["svix-id"] ||
//       !svixHeaders["svix-timestamp"] ||
//       !svixHeaders["svix-signature"]
//     ) {
//       return new NextResponse("Missing required Svix headers", { status: 400 });
//     }

//     if (!webhookSecret) {
//       return new NextResponse("Webhook secret not configured", { status: 500 });
//     }

//     // Verify webhook signature
//     const wh = new Webhook(webhookSecret);
//     let event: WebhookEvent;

//     try {
//       event = wh.verify(payload, svixHeaders) as WebhookEvent;
//     } catch (err) {
//       console.error("⚠️ Webhook verification failed:", err);
//       return new NextResponse("Invalid signature", { status: 401 });
//     }

//     console.log(`📥 Clerk webhook received: ${event.type}`);
//     console.log("🧾 Payload:", payload);
//     console.log("📩 Headers:", svixHeaders);
//     console.log("🔑 Secret exists:", !!webhookSecret);

//     // Route the event
//     switch (event.type) {
//       case "user.created":
//         await handleUserCreated(event.data as UserJSON);
//         break;
//       case "user.updated":
//         await handleUserUpdated(event.data as UserJSON);
//         break;
//       case "user.deleted":
//         await handleUserDeleted(event.data as DeletedObjectJSON);
//         break;
//       default:
//         console.log(`⚠️ Unhandled Clerk event type: ${event.type}`);
//         break;
//     }

//     return new NextResponse("Event processed", { status: 200 });
//   } catch (error) {
//     console.error("❌ Clerk Webhook Error:", error);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// }

// // Rest of your handler functions remain the same...

// // Handles new user creation
// async function handleUserCreated(user: UserJSON) {
//   const newUser = await prisma.user.create({
//     data: {
//       clerkId: user.id,
//       email: user.email_addresses[0]?.email_address || "",
//       firstName: user.first_name || "",
//       lastName: user.last_name || "",
//       imageUrl: user.image_url || "",
//       isFirstTimeUser: true,
//     },
//   });

//   console.log("✅ User created in DB:", newUser);
// }

// // Handles user updates
// async function handleUserUpdated(user: UserJSON) {
//   await prisma.user.update({
//     where: { clerkId: user.id },
//     data: {
//       email: user.email_addresses[0]?.email_address || "",
//       firstName: user.first_name || "",
//       lastName: user.last_name || "",
//       imageUrl: user.image_url || "",
//       updatedAt: new Date(),
//     },
//   });

//   console.log(`🔄 User updated in DB: ${user.id}`);
// }

// // Handles user deletion
// async function handleUserDeleted(user: DeletedObjectJSON) {
//   await prisma.user.deleteMany({
//     where: { clerkId: user.id },
//   });

//   console.log(`🗑️ User deleted from DB: ${user.id}`);
// }
import prisma from "@/lib/prisma";
import {
  WebhookEvent,
  UserJSON,
  DeletedObjectJSON,
} from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req: NextRequest) {
  console.log("📩 Incoming webhook");

  try {
    const payload = await req.text();

    const svixId = req.headers.get("svix-id");
    const svixTimestamp = req.headers.get("svix-timestamp");
    const svixSignature = req.headers.get("svix-signature");

    if (!svixId || !svixTimestamp || !svixSignature) {
      return new NextResponse("Missing required Svix headers", { status: 400 });
    }

    const svixHeaders = {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    };

    const webhookSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
    console.log("🔑 Secret exists:", !!webhookSecret);

    if (!webhookSecret) {
      return new NextResponse("Webhook secret not configured", { status: 500 });
    }

    const wh = new Webhook(webhookSecret);
    let event: WebhookEvent;

    try {
      event = wh.verify(payload, svixHeaders) as WebhookEvent;
    } catch (err) {
      console.error("⚠️ Webhook verification failed:", err);
      return new NextResponse("Invalid signature", { status: 401 });
    }

    console.log(`📥 Clerk webhook received: ${event.type}`);
    console.log("🧾 Payload:", payload);
    console.log("📩 Headers:", svixHeaders);

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
        console.warn(`[Clerk Webhook] ⚠️ Unhandled event type: ${event.type}`);
        break;
    }

    return new NextResponse(`Processed event: ${event.type}`, { status: 200 });
  } catch (error) {
    console.error("❌ Clerk Webhook Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Handles new user creation
async function handleUserCreated(user: UserJSON) {
  try {
    if (!user.email_addresses?.length) {
      console.warn(`[Clerk Webhook] ⚠️ User ${user.id} has no email.`);
      return;
    }
    const existing = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });
    const newUser = await prisma.user.upsert({
      where: { clerkId: user.id },
      update: {
        email: user.email_addresses[0]?.email_address || "",
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        imageUrl: user.image_url || "",
        updatedAt: new Date(),
        isFirstTimeUser: existing?.isFirstTimeUser ?? true,
      },
      create: {
        clerkId: user.id,
        email: user.email_addresses[0]?.email_address || "",
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        imageUrl: user.image_url || "",
        isFirstTimeUser: true,
      },
    });

    console.log(`[Clerk Webhook] ✅ Upserted user:`, newUser);
  } catch (error) {
    console.error(
      `[Clerk Webhook] ❌ Failed to upsert user ${user.id}:`,
      error
    );
  }
}

// Handles user updates
async function handleUserUpdated(user: UserJSON) {
  try {
    const existing = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    if (!existing) {
      console.warn(
        `[Clerk Webhook] ⚠️ Tried to update missing user: ${user.id}`
      );
      return;
    }

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

    console.log(`[Clerk Webhook] 🔄 Updated user ${user.id}`);
  } catch (error) {
    console.error(
      `[Clerk Webhook] ❌ Failed to update user ${user.id}:`,
      error
    );
  }
}

// Handles user deletion
async function handleUserDeleted(user: DeletedObjectJSON) {
  try {
    const existing = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    if (!existing) {
      console.warn(
        `[Clerk Webhook] ⚠️ Tried to delete missing user: ${user.id}`
      );
      return;
    }

    await prisma.user.deleteMany({
      where: { clerkId: user.id },
    });

    console.log(`[Clerk Webhook] 🗑️ Deleted user ${user.id}`);
  } catch (error) {
    console.error(
      `[Clerk Webhook] ❌ Failed to delete user ${user.id}:`,
      error
    );
  }
}
