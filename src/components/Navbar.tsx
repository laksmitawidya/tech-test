import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { FavoriteItems } from "./FavoriteItems";
import { ShoppingCart } from "./ShoppingCart";
import { ThemeSwitcher } from "./ThemeSwitcher";

export default function NavbarItems() {
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Bomber</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <FavoriteItems />
        <ShoppingCart />
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
