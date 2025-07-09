
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  AlertTriangle, 
  FileText, 
  TrendingUp, 
  Shield, 
  MapPin, 
  Clock,
  Users,
  CheckCircle,
  MessageSquare,
  Siren,
  ArrowRight,
  Star
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from "@/contexts/AuthContext";

const monthlyData = [
  { month: 'Jan', reports: 45 },
  { month: 'Feb', reports: 52 },
  { month: 'Mar', reports: 38 },
  { month: 'Apr', reports: 61 },
  { month: 'May', reports: 55 },
  { month: 'Jun', reports: 42 },
];

const crimeTypeData = [
  { name: 'Theft', value: 35, color: '#3b82f6' },
  { name: 'Vandalism', value: 25, color: '#10b981' },
  { name: 'Assault', value: 20, color: '#f59e0b' },
  { name: 'Burglary', value: 15, color: '#ef4444' },
  { name: 'Other', value: 5, color: '#8b5cf6' },
];

const Index = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Hero Section for Non-authenticated Users */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-full mb-6">
                <Shield className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                Keep Your Community
                <span className="text-blue-600 block">Safe Together</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto">
                Join thousands of citizens working together to create safer neighborhoods through community reporting and real-time alerts.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/auth" className="flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/auth">
                  Sign In
                </Link>
              </Button>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="inline-flex items-center justify-center p-3 bg-green-100 dark:bg-green-900/20 rounded-full mb-4">
                    <FileText className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle>Quick Reporting</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400">
                    Report incidents quickly and securely with our easy-to-use interface. Your reports help keep everyone informed.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-4">
                    <MessageSquare className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle>Community Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400">
                    Share experiences, safety tips, and connect with neighbors to build a stronger, safer community.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="inline-flex items-center justify-center p-3 bg-red-100 dark:bg-red-900/20 rounded-full mb-4">
                    <Siren className="h-8 w-8 text-red-600" />
                  </div>
                  <CardTitle>Real-time Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400">
                    Stay informed with instant emergency alerts and important community updates delivered directly to you.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Testimonials */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-16">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8">What Our Community Says</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-left">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    "UrbanEye has transformed how our neighborhood communicates about safety. We're more connected and informed than ever."
                  </p>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">- Sarah M., Community Leader</p>
                </div>
                <div className="text-left">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    "The real-time alerts have helped us stay safe and respond quickly to situations in our area. Highly recommended!"
                  </p>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">- Mike T., Resident</p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Ready to Make Your Community Safer?
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
                Join our community today and start making a difference.
              </p>
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/auth" className="flex items-center gap-2">
                  Sign Up Now
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-200 animate-fade-in">
          Urban Crime Reporting System
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Help keep your community safe by reporting incidents and staying informed about local crime trends.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          <Button asChild size="lg" className="hover-scale h-auto py-4 px-6">
            <Link to="/report" className="flex flex-col items-center space-y-2">
              <FileText className="h-6 w-6" />
              <span>Report Incident</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="hover-scale h-auto py-4 px-6">
            <Link to="/view-crimes" className="flex flex-col items-center space-y-2">
              <Shield className="h-6 w-6" />
              <span>View Crime Data</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="hover-scale h-auto py-4 px-6">
            <Link to="/community" className="flex flex-col items-center space-y-2">
              <MessageSquare className="h-6 w-6" />
              <span>Community Insights</span>
            </Link>
          </Button>
          <Button asChild variant="destructive" size="lg" className="hover-scale h-auto py-4 px-6">
            <Link to="/emergency" className="flex flex-col items-center space-y-2">
              <Siren className="h-6 w-6" />
              <span>Emergency Alerts</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">293</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Cases</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">247</div>
            <p className="text-xs text-muted-foreground">
              84% resolution rate
            </p>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">46</div>
            <p className="text-xs text-muted-foreground">
              Under investigation
            </p>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Community Safety</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">High</div>
            <p className="text-xs text-muted-foreground">
              Based on recent trends
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Monthly Crime Reports</CardTitle>
            <CardDescription>Number of reports submitted each month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="reports" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Crime Types Distribution</CardTitle>
            <CardDescription>Breakdown of reported crime categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={crimeTypeData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {crimeTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Recent Activity</span>
          </CardTitle>
          <CardDescription>Latest updates in your area</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-4 p-4 border rounded-lg">
            <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
            <div>
              <p className="font-medium">Vandalism Reported</p>
              <p className="text-sm text-muted-foreground">Downtown area - 2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 border rounded-lg">
            <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <p className="font-medium">Theft Investigation Complete</p>
              <p className="text-sm text-muted-foreground">Market Street - 1 day ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 border rounded-lg">
            <Users className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <p className="font-medium">Community Safety Meeting</p>
              <p className="text-sm text-muted-foreground">City Hall - Tomorrow 7 PM</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
