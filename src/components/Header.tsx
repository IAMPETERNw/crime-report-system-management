
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Shield, FileText, Eye, Home, User, LogOut, Settings, Map, MessageSquare, AlertTriangle, Sun, Moon, Menu } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useTheme } from "@/components/ThemeProvider";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { profile } = useProfile();
  const { theme, toggleTheme } = useTheme();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  const navigationItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/report", label: "Report", icon: FileText },
    { path: "/view-crimes", label: "View Crimes", icon: Eye },
    { path: "/community", label: "Community", icon: MessageSquare },
    { path: "/emergency", label: "Emergency", icon: AlertTriangle },
    { path: "/map", label: "Map", icon: Map },
  ];

  const NavigationItems = ({ mobile = false }) => (
    <>
      {navigationItems.map((item) => (
        <Button
          key={item.path}
          variant={isActive(item.path) ? "default" : "ghost"}
          asChild
          className={`transition-all duration-200 ${mobile ? 'w-full justify-start' : ''}`}
          onClick={mobile ? () => setIsSheetOpen(false) : undefined}
        >
          <Link to={item.path} className="flex items-center space-x-2">
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </Link>
        </Button>
      ))}
    </>
  );
  
  return (
    <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-colors">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200">UrbanEye</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">Crime Report System</p>
            </div>
          </Link>
          
          {user ? (
            <>
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-2">
                <NavigationItems />
                
                {profile?.is_admin && (
                  <Button
                    variant={isActive("/admin") ? "default" : "ghost"}
                    asChild
                    className="transition-all duration-200"
                  >
                    <Link to="/admin" className="flex items-center space-x-2">
                      <Settings className="h-4 w-4" />
                      <span>Admin</span>
                    </Link>
                  </Button>
                )}
              </nav>

              {/* Mobile Navigation */}
              <div className="lg:hidden">
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                    <div className="flex flex-col space-y-4 mt-6">
                      <NavigationItems mobile />
                      
                      {profile?.is_admin && (
                        <Button
                          variant={isActive("/admin") ? "default" : "ghost"}
                          asChild
                          className="w-full justify-start"
                          onClick={() => setIsSheetOpen(false)}
                        >
                          <Link to="/admin" className="flex items-center space-x-2">
                            <Settings className="h-4 w-4" />
                            <span>Admin</span>
                          </Link>
                        </Button>
                      )}
                      
                      <div className="border-t pt-4">
                        <Button
                          variant="ghost"
                          asChild
                          className="w-full justify-start mb-2"
                          onClick={() => setIsSheetOpen(false)}
                        >
                          <Link to="/profile" className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span>Profile</span>
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={handleSignOut}
                          className="w-full justify-start text-red-600"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Desktop User Menu */}
              <div className="hidden lg:flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="transition-all duration-200"
                >
                  {theme === 'light' ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <Sun className="h-4 w-4" />
                  )}
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span className="max-w-[150px] truncate">{profile?.full_name || user?.email}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          ) : (
            /* Non-authenticated user buttons */
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="transition-all duration-200"
              >
                {theme === 'light' ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </Button>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" asChild size="sm">
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/auth">Sign Up</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
