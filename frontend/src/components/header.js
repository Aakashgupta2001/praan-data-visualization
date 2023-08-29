import { Navbar, Typography, IconButton, Button, Input } from "@material-tailwind/react";
import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";

function Header() {
  return (
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" class="flex items-center">
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Praan Weather</span>
        </a>
        <div class="flex md:order-2">
          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Toggle Dark Mode
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
