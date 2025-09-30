import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    onSignin: any,
    onSignout: any,
    onMenuToggle?: () => void,
    showMenuButton?: boolean
}

export const Appbar = ({
    user,
    onSignin,
    onSignout,
    onMenuToggle,
    showMenuButton = false
}: AppbarProps) => {
    return <header className="relative z-50 bg-[#D5CDCD] shadow-[0_4px_12px_rgba(0,0,0,0.15)] border-b border-slate-400">
      <div className="flex justify-between items-center px-6 py-2">
        <div className="flex items-center gap-3">

          {/* Hamburger button */}
          {showMenuButton && (
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-1 rounded-md hover:bg-slate-300 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
              </svg>
            </button>
          )}
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