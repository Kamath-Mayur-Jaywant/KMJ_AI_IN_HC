import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Heart, 
  Activity, 
  User, 
  BookOpen, 
  Home,
  Stethoscope,
  Menu,
  X
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const navigationItems = [
  {
    title: "Home",
    url: createPageUrl("Home"),
    icon: Home,
  },
  {
    title: "Symptom Checker",
    url: createPageUrl("SymptomChecker"),
    icon: Activity,
  },
  {
    title: "My Health",
    url: createPageUrl("HealthProfile"),
    icon: User,
  },
  {
    title: "Assessment History",
    url: createPageUrl("AssessmentHistory"),
    icon: Heart,
  },
  {
    title: "Resources",
    url: createPageUrl("Resources"),
    icon: BookOpen,
  },
  {
    title: "Doctor Portal",
    url: createPageUrl("DoctorPortal"),
    icon: Stethoscope,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <style>{`
        :root {
          --primary-blue: #0066CC;
          --primary-blue-dark: #0052A3;
          --accent-green: #10B981;
          --accent-mint: #E8F5F3;
          --text-primary: #1F2937;
          --text-secondary: #6B7280;
        }
        
        .nav-link-active {
          background: linear-gradient(135deg, var(--primary-blue) 0%, var(--accent-green) 100%);
          color: white;
        }
      `}</style>

      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          {/* Desktop Sidebar */}
          <Sidebar className="hidden lg:flex border-r border-gray-200 bg-white/80 backdrop-blur-sm">
            <SidebarHeader className="border-b border-gray-100 p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Heart className="w-6 h-6 text-white" fill="white" />
                </div>
                <div>
                  <h2 className="font-bold text-lg text-gray-900">MediAI</h2>
                  <p className="text-xs text-gray-500">Smart Healthcare</p>
                </div>
              </div>
            </SidebarHeader>
            
            <SidebarContent className="p-3">
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {navigationItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton 
                          asChild 
                          className={`mb-1 rounded-xl transition-all duration-300 ${
                            location.pathname === item.url 
                              ? 'nav-link-active shadow-md' 
                              : 'hover:bg-blue-50'
                          }`}
                        >
                          <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Mobile Header */}
            <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" fill="white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">MediAI</h2>
                    <p className="text-xs text-gray-500">Smart Healthcare</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X /> : <Menu />}
                </Button>
              </div>

              {/* Mobile Menu */}
              {mobileMenuOpen && (
                <div className="mt-4 pb-4 space-y-1">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.title}
                      to={item.url}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        location.pathname === item.url
                          ? 'nav-link-active shadow-md text-white'
                          : 'hover:bg-blue-50 text-gray-700'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </header>

            {/* Page Content */}
            <main className="flex-1">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
