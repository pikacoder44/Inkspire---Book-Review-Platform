import React from "react";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-zinc-800/50 bg-zinc-950/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-500">
          <p className="text-center sm:text-left">
            &copy; 2025 <span className="text-zinc-400 font-medium">Syed Muhammad Hashir Ali</span>
          </p>
          <p className="text-center sm:text-right text-zinc-600">
            Built with Next.js & MongoDB
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
