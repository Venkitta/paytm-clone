import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    onSignin: any,
    onSignout: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    return <header className="bg-[#D5CDCD] shadow-[0_4px_12px_rgba(0,0,0,0.15)] border-b border-slate-400">
      <div className="flex justify-between items-center px-6 py-2">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-700 tracking-tight">
            PayTM
          </h1>
        </div>
        <Button 
          onClick={user ? onSignout : onSignin}
        >
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </header>
}