
import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  Filter,
  MapPin,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Eye,
  Download
} from "lucide-react";

// Sample crime data
const crimeData = [
  {
    id: "CR001",
    type: "Theft",
    location: "Main Street & 5th Ave",
    date: "2024-01-15",
    time: "14:30",
    status: "Under Investigation",
    severity: "medium",
    description: "Bicycle stolen from bike rack outside library"
  },
  {
    id: "CR002",
    type: "Vandalism",
    location: "Central Park",
    date: "2024-01-14",
    time: "22:15",
    status: "Resolved",
    severity: "low",
    description: "Graffiti on park benches"
  },
  {
    id: "CR003",
    type: "Assault",
    location: "Downtown Plaza",
    date: "2024-01-13",
    time: "18:45",
    status: "Under Investigation",
    severity: "high",
    description: "Physical altercation between two individuals"
  },
  {
    id: "CR004",
    type: "Burglary",
    location: "Elm Street Residential",
    date: "2024-01-12",
    time: "03:20",
    status: "Resolved",
    severity: "high",
    description: "Break-in at residential property, electronics stolen"
  },
  {
    id: "CR005",
    type: "Vehicle Crime",
    location: "Shopping Mall Parking",
    date: "2024-01-11",
    time: "16:00",
    status: "Under Investigation",
    severity: "medium",
    description: "Car window broken, items stolen from vehicle"
  },
  {
    id: "CR006",
    type: "Public Disorder",
    location: "City Center",
    date: "2024-01-10",
    time: "23:30",
    status: "Resolved",
    severity: "low",
    description: "Noise complaint from late night gathering"
  }
];

const ViewCrimes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSeverity, setFilterSeverity] = useState("all");

  const filteredData = useMemo(() => {
    return crimeData.filter(crime => {
      const matchesSearch = crime.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           crime.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           crime.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = filterType === "all" || crime.type === filterType;
      const matchesStatus = filterStatus === "all" || crime.status === filterStatus;
      const matchesSeverity = filterSeverity === "all" || crime.severity === filterSeverity;

      return matchesSearch && matchesType && matchesStatus && matchesSeverity;
    });
  }, [searchTerm, filterType, filterStatus, filterSeverity]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved": return "bg-green-100 text-green-800 border-green-200";
      case "Under Investigation": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Crime Reports Database</h1>
        <p className="text-slate-600">
          Browse and filter reported incidents in your area
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Search & Filter</span>
          </CardTitle>
          <CardDescription>
            Find specific incidents using the search and filter options below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2 space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by location, type, or description..."
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Crime Type</Label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Theft">Theft</SelectItem>
                  <SelectItem value="Vandalism">Vandalism</SelectItem>
                  <SelectItem value="Assault">Assault</SelectItem>
                  <SelectItem value="Burglary">Burglary</SelectItem>
                  <SelectItem value="Vehicle Crime">Vehicle Crime</SelectItem>
                  <SelectItem value="Public Disorder">Public Disorder</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Under Investigation">Under Investigation</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Severity</Label>
              <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredData.length} of {crimeData.length} reports
            </p>
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Data</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Crime Reports */}
      <div className="space-y-4">
        {filteredData.map((crime) => (
          <Card key={crime.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-lg">{crime.type}</h3>
                      <Badge variant="outline" className="text-xs">
                        {crime.id}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{crime.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{crime.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{crime.time}</span>
                      </div>
                    </div>
                    <p className="text-slate-700">{crime.description}</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <Badge className={getStatusColor(crime.status)}>
                    {crime.status === "Resolved" ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <Eye className="h-3 w-3 mr-1" />
                    )}
                    {crime.status}
                  </Badge>
                  <Badge className={getSeverityColor(crime.severity)}>
                    {crime.severity.charAt(0).toUpperCase() + crime.severity.slice(1)} Priority
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredData.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No reports found</h3>
              <p className="text-gray-500">
                Try adjusting your search terms or filters to find relevant reports.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ViewCrimes;
