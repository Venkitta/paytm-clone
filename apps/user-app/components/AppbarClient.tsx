"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";

export function AppbarClient({
  onMenuToggle,
  showMenuButton = false 
}: { 
  onMenuToggle?: () => void,
  showMenuButton?: boolean
}) {
  const session = useSession();
  const router = useRouter();

  return (
   <div>
      <Appbar onSignin={signIn} 
              onSignout={async () => {
                await signOut({redirect: false});
                router.push("/auth/signin")
              }} 
              user={session.data?.user} 
              onMenuToggle={onMenuToggle}
              showMenuButton={showMenuButton}/>
   </div>
  );
}
