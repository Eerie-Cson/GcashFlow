import React from "react";
import Image from "next/image";
import logo from "../../app/images/icon2.png";

const Footer = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Image
                className="h-8 w-8 rounded-md"
                src={logo}
                alt="Logo"
                width={32}
              />
              <span className="text-lg font-bold ml-2">GCash Flow</span>
            </div>
            <p className="text-gray-400">
              Simplifying GCash transactions for businesses and individuals.
            </p>
          </div>

          {[
            {
              title: "Company",
              links: ["About Us", "Contact", "Careers", "Blog"],
            },
            {
              title: "Support",
              links: [
                "Help Center",
                "FAQs",
                "Terms of Service",
                "Privacy Policy",
              ],
            },
            {
              title: "Resources",
              links: ["Documentation", "Tutorials", "API", "Partners"],
            },
          ].map((column, index) => (
            <div key={index}>
              <h3 className="font-bold text-lg mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex justify-between items-center">
          <p className="text-gray-400">
            © 2024 GCash Flow. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              FB
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              TW
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              IG
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              LI
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
