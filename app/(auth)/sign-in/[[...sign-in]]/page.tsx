import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="flex h-screen items=center justify-center p-3 max-auto mt-10">
      <SignIn forceRedirectUrl="/home" />
    </main>
  );
}
