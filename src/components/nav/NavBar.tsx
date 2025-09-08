"use client";

import { NavList } from "soridam-design-system";
import { navItems } from "./nav";
import { usePathname } from "next/navigation";

export default function NavBar() {
    const path = usePathname();

    return(
        <div className="fixed bottom-0 left-0 w-full">
            <NavList items={navItems} currentPath={path}/>
        </div>
    );
}