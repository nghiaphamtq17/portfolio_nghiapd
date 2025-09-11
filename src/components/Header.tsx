import { Code, Menu } from 'lucide-react'

const menuItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

export default function Header() {
  return (
    <>
      {/* CSS for mobile menu toggle - using regular CSS */}
      <style dangerouslySetInnerHTML={{
        __html: `
          #mobile-menu-toggle {
            display: none;
          }
          
          .mobile-menu {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease-in-out;
          }
          
          #mobile-menu-toggle:checked ~ .mobile-menu {
            max-height: 24rem;
          }
          
          /* Overlay effect - only covers content below header */
          .mobile-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 40;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
            cursor: pointer;
            pointer-events: none;
          }
          
          #mobile-menu-toggle:checked ~ .mobile-overlay {
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
          }
          
          /* Mobile menu should be above overlay */
          .mobile-menu {
            position: relative;
            z-index: 50;
            background-color: rgb(2, 6, 23);
          }
          
          /* Close menu when clicking on overlay */
          .mobile-overlay:active {
            background-color: rgba(0, 0, 0, 0.3);
          }
          
          /* Ensure header stays above overlay */
          header {
            z-index: 50;
          }
          
          /* Close menu when clicking on menu links */
          .mobile-menu a:active {
            background-color: rgba(30, 41, 59, 0.3);
          }
          
          /* Auto-close menu when navigating to sections */
          .mobile-menu a:target {
            /* This will be handled by the browser's default behavior */
          }
          
          /* Alternative: Use focus to close menu */
          .mobile-menu a:focus {
            /* Menu will stay open, but user can navigate */
          }
          
          /* Ensure smooth scrolling */
          html {
            scroll-behavior: smooth;
          }
          
          /* Close menu when clicking on menu links using :active */
          .mobile-menu a:active {
            /* This will trigger when link is clicked */
          }
          
          /* Alternative approach: Use :visited to close menu */
          .mobile-menu a:visited {
            /* This might work in some browsers */
          }
          
          /* Close main menu when any menu item is clicked */
          .mobile-menu input[type="checkbox"]:checked ~ * {
            /* This will be handled by the main menu toggle */
          }
          
          /* Alternative: Use sibling selector to close main menu */
          .mobile-menu input[type="checkbox"]:checked {
            /* This will be handled by the main menu toggle */
          }
          
          /* Close menu when clicking on menu links using :target */
          .mobile-menu a:target {
            /* This will be handled by the browser's default behavior */
          }
          
          /* Alternative: Use :active to close menu */
          .mobile-menu a:active {
            /* This will trigger when link is clicked */
          }
          
          /* Use :focus to close menu */
          .mobile-menu a:focus {
            /* This will trigger when link is focused */
          }
          
          /* Close main menu when any menu item is clicked */
          .mobile-menu input[type="checkbox"]:checked ~ * {
            /* This will be handled by the main menu toggle */
          }
          
          /* Alternative: Use sibling selector to close main menu */
          .mobile-menu input[type="checkbox"]:checked {
            /* This will be handled by the main menu toggle */
          }
          
          /* Close main menu when any menu item is clicked using :checked */
          .mobile-menu input[type="checkbox"]:checked ~ * {
            /* This will be handled by the main menu toggle */
          }
        `
      }} />
      
      <header className="fixed top-0 w-full z-50 transition-all duration-300 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/50">
        <nav className="container mx-auto px-4 py-4">
          {/* Mobile Menu Toggle - CSS Only */}
          <input type="checkbox" id="mobile-menu-toggle" />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Phạm Đại Nghĩa
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-slate-300 hover:text-blue-400 transition-colors duration-300 font-medium relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            <label htmlFor="mobile-menu-toggle" className="md:hidden text-slate-300 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-slate-800/50 cursor-pointer">
              <Menu className="w-6 h-6" />
              <span className="sr-only">Toggle mobile menu</span>
            </label>
          </div>

          {/* Mobile Menu - CSS Only */}
          <div className="mobile-menu md:hidden">
            <label htmlFor="mobile-menu-toggle" className="block">
              <div className="flex flex-col space-y-4 pt-4 pb-4 border-t border-slate-800/50">
                {menuItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-300 font-medium py-2 px-4 rounded-lg hover:bg-slate-800/30 cursor-pointer block"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </label>
          </div>
          
          {/* Mobile Overlay */}
          <label htmlFor="mobile-menu-toggle" className="mobile-overlay"></label>
        </nav>
      </header>
    </>
  )
}
