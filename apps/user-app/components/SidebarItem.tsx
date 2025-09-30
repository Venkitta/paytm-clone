"use client"
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({ href, title, icon, onClick }: { href: string; title: string; icon: React.ReactNode; onClick?: () => void; }) => {
    const router = useRouter();
    const pathname = usePathname()
    const selected = pathname === href

    const handleClick = () => {
        router.push(href);
        onClick?.();
    }

    return <div className={`flex ${selected ? "text-[#6a51a6]" : "text-slate-500"} 
                            cursor-pointer  p-2 pl-8 hover:bg-slate-100 transition-colors`} onClick={handleClick}>
        <div className="pr-2">
            {icon}
        </div>
        <div className={`font-bold ${selected ? "text-[#6a51a6]" : "text-slate-500"}`}>
            {title}
        </div>
    </div>
}