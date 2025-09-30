"use client";

import { NavList } from "soridam-design-system";
import { navItems } from "./nav";
import { usePathname } from "next/navigation";

export default function NavBar() {
    const path = usePathname();

    return <NavList items={navItems} currentPath={path}/>;
}