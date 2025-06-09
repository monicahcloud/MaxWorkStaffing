import { env } from "@/env";
import Stripe from "stripe";

const stripe = new Stripe(env.STRIPE_SECRET_KEY as string, {
  typescript: true,
});

export default stripe;
