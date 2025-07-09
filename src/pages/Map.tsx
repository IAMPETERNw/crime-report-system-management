
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Filter, Layers } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// You'll need to set your Mapbox access token
// Get it from https://account.mapbox.com/access-tokens/
const MAPBOX_TOKEN = 'YOUR_MAPBOX_ACCESS_TOKEN';

interface CrimeIncident {
  id: string;
  title: string;
  description: string;
  incident_type: string;
  status: string;
  priority: string;
  latitude: number;
  longitude: number;
  address: string;
  created_at: string;
}

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [incidents, setIncidents] = useState<CrimeIncident[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<CrimeIncident | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchIncidents();
  }, []);

  useEffect(() => {
    if (mapContainer.current && !map.current) {
      // Initialize map only if Mapbox token is provided
      if (MAPBOX_TOKEN === 'YOUR_MAPBOX_ACCESS_TOKEN') {
        // Show a message about Mapbox token
        toast({
          title: 'Mapbox Token Required',
          description: 'Please set your Mapbox access token to view the map.',
          variant: 'destructive',
        });
        return;
      }

      mapboxgl.accessToken = MAPBOX_TOKEN;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-74.006, 40.7128], // Default to NYC
        zoom: 12,
      });

      map.current.addControl(new mapboxgl.NavigationControl());
    }

    // Add markers when incidents are loaded
    if (map.current && incidents.length > 0) {
      addMarkersToMap();
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [incidents]);

  const fetchIncidents = async () => {
    try {
      const { data, error } = await supabase
        .from('crime_incidents')
        .select('*')
        .not('latitude', 'is', null)
        .not('longitude', 'is', null)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setIncidents(data || []);
    } catch (error) {
      console.error('Error fetching incidents:', error);
      toast({
        title: 'Error',
        description: 'Failed to load crime incidents.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addMarkersToMap = () => {
    if (!map.current) return;

    incidents.forEach((incident) => {
      if (incident.latitude && incident.longitude) {
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.width = '20px';
        el.style.height = '20px';
        el.style.borderRadius = '50%';
        el.style.cursor = 'pointer';
        
        // Color code based on incident type
        const colors = {
          theft: '#ef4444',
          assault: '#f97316',
          vandalism: '#eab308',
          burglary: '#8b5cf6',
          other: '#6b7280',
        };
        
        el.style.backgroundColor = colors[incident.incident_type as keyof typeof colors] || colors.other;
        el.style.border = '2px solid white';
        el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';

        el.addEventListener('click', () => {
          setSelectedIncident(incident);
        });

        new mapboxgl.Marker(el)
          .setLngLat([incident.longitude, incident.latitude])
          .addTo(map.current!);
      }
    });
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      investigating: 'bg-blue-100 text-blue-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800',
    };

    return (
      <Badge className={statusColors[status as keyof typeof statusColors] || statusColors.pending}>
        {status}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <MapPin className="h-8 w-8 text-blue-600" />
          Crime Map
        </h1>
        <p className="text-slate-600 mt-2">
          Interactive map showing reported crime incidents in your area.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <Card className="h-[600px]">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Layers className="h-5 w-5" />
                  Interactive Map
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-[calc(100%-80px)]">
              {MAPBOX_TOKEN === 'YOUR_MAPBOX_ACCESS_TOKEN' ? (
                <div className="flex items-center justify-center h-full bg-slate-50">
                  <div className="text-center space-y-4">
                    <MapPin className="h-16 w-16 text-slate-400 mx-auto" />
                    <div>
                      <h3 className="text-lg font-semibold text-slate-700">
                        Mapbox Integration Required
                      </h3>
                      <p className="text-slate-500 max-w-md">
                        To view the interactive map, please add your Mapbox access token 
                        to the Map component. Get your token from mapbox.com.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div ref={mapContainer} className="w-full h-full rounded-b-lg" />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Legend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span className="text-sm">Theft</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                <span className="text-sm">Assault</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <span className="text-sm">Vandalism</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                <span className="text-sm">Burglary</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-gray-500"></div>
                <span className="text-sm">Other</span>
              </div>
            </CardContent>
          </Card>

          {/* Selected Incident */}
          {selectedIncident && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Incident Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h3 className="font-semibold">{selectedIncident.title}</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    {selectedIncident.description}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">Type:</span>
                    <span className="text-sm font-medium">{selectedIncident.incident_type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">Status:</span>
                    {getStatusBadge(selectedIncident.status)}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">Priority:</span>
                    <Badge variant="outline">{selectedIncident.priority}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">Date:</span>
                    <span className="text-sm">
                      {new Date(selectedIncident.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                {selectedIncident.address && (
                  <div className="pt-2 border-t">
                    <p className="text-sm text-slate-600">
                      📍 {selectedIncident.address}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Total Incidents:</span>
                <span className="text-sm font-semibold">{incidents.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">This Month:</span>
                <span className="text-sm font-semibold">
                  {incidents.filter(i => 
                    new Date(i.created_at).getMonth() === new Date().getMonth()
                  ).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Pending:</span>
                <span className="text-sm font-semibold text-yellow-600">
                  {incidents.filter(i => i.status === 'pending').length}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Map;
