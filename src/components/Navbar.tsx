import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function classNames(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const navigation = [
    { name: "Showcase", href: "/", current: router.pathname === "/" },
    { name: "Docs", href: "/docs", current: router.pathname === "/docs" },
    { name: "Blog", href: "/blog", current: router.pathname === "/blog" },
    {
      name: "Analytics",
      href: "/analytics",
      current: router.pathname === "/analytics",
    },
    {
      name: "Templates",
      href: "/templates",
      current: router.pathname === "/templates",
    },
    {
      name: "Enterprise",
      href: "/enterprise",
      current: router.pathname === "/enterprise",
    },
    {
      name: "Transaction History",
      href: "/transaction-history",
      current: router.pathname === "/transaction-history",
    },
    {
      name: "Login",
      href: "/login",
      current: router.pathname === "/login",
      classNames: "hidden md:hidden meow",
    },
  ];

  useEffect(() => {
    console.log("Meow from Login Navbar");
    const checkSession = () => {
      if (
        typeof window !== "undefined" &&
        localStorage.getItem("sessionToken")
      ) {
        console.log("Logged In");
        setIsLoggedIn(true);
      } else {
        console.log("Logged Out");
        setIsLoggedIn(false);
      }
    };

    checkSession();

    const handleStorage = (event: StorageEvent) => {
      if (event.key === "sessionToken") {
        checkSession();
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("username");
    router.push("/login").then(() => {
      // Force a reload to ensure Navbar updates (not ideal, but works)
      window.location.reload();
    });
    router.push("/login").then(() => {
      // Force a reload to ensure Navbar updates (not ideal, but works)
      window.location.reload();
    });
  };
  return (
    <Disclosure as="nav" className="bg-white-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link href="/">AEON</Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? `bg-gray-900 text-white `
                        : `text-gray-900 hover:bg-gray-700 hover:text-white`,
                      `rounded-md px-3 py-2 text-sm font-medium ${item.classNames}`
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 left-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            {isLoggedIn ? (
              <>
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                      <span className="absolute -inset-1.5"></span>
                      <span className="sr-only">Open user menu</span>
                      <img
                        alt=""
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        className="size-8 rounded-full"
                      />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    <MenuItem>
                      {({ focus }) => (
                        <button
                          onClick={handleLogout}
                          className={classNames(
                            focus ? "bg-gray-100" : "",
                            "block w-full text-left px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Sign out
                        </button>
                      )}
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </>
            ) : (
              <>
                <div className="hidden sm:block">
                  <input
                    placeholder="Search Document"
                    className="p-2 border rounded"
                    required
                  />
                </div>
                <Link href="/login" className="hidden sm:block">
                  <span className="bg-white text-gray-900 px-3 py-1 rounded cursor-pointer">
                    Login
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
