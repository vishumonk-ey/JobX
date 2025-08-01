import React from "react";
import { Logo } from "../index";
import { Link } from "react-router-dom";
import { FacebookIcon, InstagramIcon, Linkedin, Twitter } from "lucide-react";

function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-400">
      <div className="px-5 py-15">
        <div className="w-full text-left text-indigo-500 mb-15">
          <Logo className="w-15 h-15" />
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8">
          <div>
            <p className="font-semibold text-white mb-3">Solutions</p>
            <div className="space-y-2 flex flex-col ">
              <Link
                className="text-gray-500 hover:text-white transition"
                to="#"
              >
                Marketing
              </Link>
              <Link
                className="text-gray-500 hover:text-white transition"
                to="#"
              >
                Analytics
              </Link>
              <Link
                className="text-gray-500 hover:text-white transition"
                to="#"
              >
                Commerce
              </Link>
              <Link
                className="text-gray-500 hover:text-white transition"
                to="#"
              >
                Insights
              </Link>
              <Link
                className="text-gray-500 hover:text-white transition"
                to="#"
              >
                Automation
              </Link>
            </div>
          </div>
          <div>
            <p className="font-semibold text-white mb-3">Company</p>
            <div className="space-y-2 flex flex-col">
              <Link
                className="text-gray-500 hover:text-white transition"
                to="#"
              >
                About Us
              </Link>
              <Link
                className="text-gray-500 hover:text-white transition"
                to="#"
              >
                Careers
              </Link>
              <Link
                className="text-gray-500 hover:text-white transition"
                to="#"
              >
                Blog
              </Link>
              <Link
                className="text-gray-500 hover:text-white transition"
                to="#"
              >
                Press
              </Link>
            </div>
          </div>
          <div>
            <p className="font-semibold text-white mb-3">Support</p>
            <div className="space-y-2 flex flex-col">
              <Link
                className="text-gray-500 hover:text-white transition"
                to="#"
              >
                Help Center
              </Link>
              <Link
                className="text-gray-500 hover:text-white transition"
                to="#"
              >
                Contact Us
              </Link>
              <Link
                className="text-gray-500 hover:text-white transition"
                to="#"
              >
                Terms of Service
              </Link>
              <Link
                className="text-gray-500 hover:text-white transition"
                to="#"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
          <div>
            <p className="font-semibold text-white mb-3">Social</p>
            <div className="flex flex-col space-y-2">
              <a
                className="text-gray-500 hover:text-white transition"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="flex items-center">
                  <Twitter className="w-4 h-4 mr-1" /> Twitter
                </span>
              </a>
              <a
                className="text-gray-500 hover:text-white transition"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="flex items-center">
                  {" "}
                  <Linkedin className="w-5 h-5 mr-1" />
                  LinkedIn
                </span>
              </a>
              <a
                className="text-gray-500 hover:text-white transition"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="flex items-center">
                  <FacebookIcon className="w-5 h-5 mr-1" /> Facebook
                </span>
              </a>
              <a
                className="text-gray-500 hover:text-white transition"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="flex items-center">
                  <InstagramIcon className="w-5 h-5 mr-1" /> Instagram
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} JobX. All rights reserved.
          <span className="block mt-2">
            Made with 🤍 by <a href="https://x.com/vishumonk_ey"
            target="_blank"
            rel="noopener noreferrer"
            >Vishal</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
