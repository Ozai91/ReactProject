import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className=" flex justify-between items-center p-4 bg-gray-800 text-white ">
      <div>
        <Link className=" flex items-center gap-3 " to="/">
          <img
            className=" w-15 "
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
            alt="Logo"
          />
          <h1 className=" text-3xl ">React</h1>
        </Link>
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className={"flex gap-2 "}>
            <NavigationMenuLink asChild>
              <Link to="/">Home</Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link to="/product">Products</Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link to="/about">About</Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link to="/contact">Contact</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navbar;
