import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-hisl-dark border-t border-primary/20 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-muted-foreground text-sm">
              &copy; {currentYear} Howard Integritas Solutions Limited. All rights reserved.
            </p>
          </div>
          
          <div className="flex gap-6">
            <Link to="/" className="text-muted-foreground hover:text-primary text-sm">
              Home
            </Link>
            <Link to="/projects" className="text-muted-foreground hover:text-primary text-sm">
              Projects Hub
            </Link>
            <Link to="/knowledge" className="text-muted-foreground hover:text-primary text-sm">
              Knowledge Base
            </Link>
            <Link to="/strategy-live" className="text-muted-foreground hover:text-primary text-sm">
              Strategy LIVE
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

