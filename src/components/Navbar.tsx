"use client";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./ui/menubar";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="w-full max-w-full h-12 px-5 py-7 bg-eerie-black text-gray-300 flex items-center justify-between">
      <div>
        <Link href={"/"} className="flex items-center justify-center gap-2">
          <Icon icon="carbon:finance" width="25" height="25" color="#991ef9" />
          <h2 className="montserrat-alternates-semibold">Finalytics</h2>
        </Link>
      </div>
      <div>
        <ul className="hidden items-center gap-5  sm:flex">
          <Link
            href={"/dashboard"}
            className={`flex items-center justify-center px-3 py-2 rounded-sm  ${
              pathname === "/dashboard"
                ? "bg-[#fff] text-[#18181b] hover:"
                : "hover:bg-[#27272a]"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href={"/transactions"}
            className={`flex items-center justify-center px-3 py-2 rounded-sm  ${
              pathname === "/transactions"
                ? "bg-[#fff] text-[#18181b]"
                : "hover:bg-[#27272a]"
            }`}
          >
            Transactions
          </Link>
        </ul>
        <div className="flex sm:hidden">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>
                <Icon icon="marketeq:menu" width="1.2em" height="1.2em" color="#990ef9" />
              </MenubarTrigger>
              <MenubarContent className="bg-[#00000099] mr-2">
                <MenubarItem>
                  <Link
                    href={"/dashboard"}
                    className={`flex items-center justify-center px-3 py-2 rounded-sm  ${
                      pathname === "/dashboard"
                        ? "bg-[#990ef977] text-[#efefef]"
                        : "hover:bg-[#27272a]"
                    }`}
                  >
                    Dashboard
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <Link
                    href={"/transactions"}
                    className={`flex items-center justify-center px-3 py-2 rounded-sm  ${
                      pathname === "/transactions"
                        ? "bg-[#990ef977] text-[#efefef]"
                        : "hover:bg-[#27272a]"
                    }`}
                  >
                    Transactions
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <Link href={"/"} className={`flex items-center justify-center px-3 py-2 rounded-sm  ${
                      pathname === "/"
                        ? "bg-[#990ef977] text-[#efefef]"
                        : "hover:bg-[#27272a]"
                    }`}>Home</Link>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
