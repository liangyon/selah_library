'use client';

import { useAuth } from "@/contexts/AuthContext";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { MdLibraryMusic, MdSearch } from "react-icons/md";
import { NavBar } from "@/components/navbar";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  const isAuthenticated = !!token;

  return (
    <SidebarProvider defaultOpen={false}>
      {/* Only render sidebar if user is logged in */}
      {isAuthenticated && <AppSidebar />}

      <div className="flex flex-col min-h-screen w-full">
        {/* Nav bar */}
        <nav className="flex items-center border-b px-4 py-3 relative">
          {/* SidebarTrigger on the left (visible on small screens when logged in) */}
          {isAuthenticated && (
            <div className="md:hidden">
              <SidebarTrigger />
            </div>
          )}

          {/* Centered App Name with Icon (visible on small screens) */}
          <div className={`${isAuthenticated ? 'absolute left-1/2 transform -translate-x-1/2' : ''} md:hidden flex items-center`}>
            <MdLibraryMusic className="text-xl mr-2" size={24} />
            <h1 className="text-lg font-bold">Selah</h1>
          </div>


          {/* Search Icon (visible on small screens) - only when authenticated */}
          {isAuthenticated && (
            <div className="md:hidden ml-auto flex items-center justify-end relative left-10">
              <button
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center"
              >
                <MdSearch size={26} />
              </button>
            </div>
          )}

          {/* App Name with Icon (visible on larger screens) */}
          <div className="hidden md:flex md:items-center md:w-auto">
            <MdLibraryMusic className="text-xl mr-2" size={24} />
            <h1 className="text-lg font-bold">Selah</h1>
          </div>

          {/* Search Bar (visible on medium and larger screens when logged in) */}
          {isAuthenticated && (
            <div className="hidden md:flex md:flex-1 md:justify-left md:px-4">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MdSearch className="text-gray-400" />
                </div>
                <input
                  type="search"
                  placeholder="Search music..."
                  className="bg-gray-100 dark:bg-gray-800 pl-10 pr-4 py-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          )}

          {/* Navigation Menu (visible on larger screens - always shown but content may change) */}
          {isAuthenticated && (
            <div className={`hidden md:flex ${isAuthenticated ? 'md:w-auto' : 'md:flex-1'} md:justify-end`}>
              <NavBar />
            </div>
          )}

          {/* Empty div to balance the flex layout on mobile when logged in */}
          {isAuthenticated && (
            <div className="invisible md:hidden">
              <SidebarTrigger />
            </div>
          )}
        </nav>

        {/* Main content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}