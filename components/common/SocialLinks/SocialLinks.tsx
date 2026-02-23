import React from "react";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import Link from "../Link";

const links = [
  {
    id: crypto.randomUUID(),
    title: "GitHub",
    href: `https://github.com/HassanGameill`,
    iconLink: <FaGithub />,
  },
  {
    id: crypto.randomUUID(),
    title: "Instagram",
    href: `https://www.instagram.com/hasan.gmeil/`,
    iconLink: <FaInstagram />,
  },

  {
    id: crypto.randomUUID(),
    title: "Linkedin",
    href: `https://www.linkedin.com/in/hassan-gameil-413251244/`,
    iconLink: <FaLinkedin />,
  },

  {
    id: crypto.randomUUID(),
    title: "Whatsapp",
    iconLink: <FaWhatsapp />,

    href: `https://wa.me/+201021432599`,
  },
];

function SocialLinks() {
  return (
    <div className="flex gap-4">
      {links.map((items) => (
        <Link href={`${items.href}`} key={items.id} target="_blank">
          <div className="bg-slate-800 dark:bg-white text-white dark:text-slate-800 hover:text-white  h-8 w-8 shadow-sm text-base rounded-md flex items-center justify-center footer-icons hover:bg-yellow-400 hover:-translate-y-1 hover:transition-all duration-300">
            <span className="text-sm">{items.iconLink}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default SocialLinks;
