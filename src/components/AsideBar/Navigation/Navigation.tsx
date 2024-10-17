import NavigationItem from "./NavigationItem";

import styles from "./Navigation.module.css";
import type { RouteInfo } from "@src/interfaces";

const arr:RouteInfo[] = [
  { href: "/home", label: "home", icon: "../home.svg" },
  { href: "/chat", label: "chat", icon: "../chat.svg" },
  { href: "/contact", label: "contact", icon: "../contact.svg" },
  {
    href: "/notifications",
    label: "notifications",
    icon: "../notifications.svg",
  },
  { href: "/calendar", label: "calendar", icon: "../calendar.svg" },
  { href: "/settings", label: "settings", icon: "../settings.svg" },
];
function Navigation() {
  return (
    <nav>
      <ul className={styles.list}>
        {arr.map(({ href, label, icon }) => (
          <li key={href} className={styles.li}>
            <NavigationItem href={href} label={label} icon={icon} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
