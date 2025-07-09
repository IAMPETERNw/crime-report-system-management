
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { AlertTriangle, Clock, MapPin, Users, Plus, Bell } from 'lucide-react';

interface EmergencyAlert {
  id: string;
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  created_at: string;
  author_name: string;
  status: 'active' | 'resolved';
}

const EmergencyAlerts = () => {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const [newAlert, setNewAlert] = useState({
    title: '',
    message: '',
    severity: 'medium' as const,
    location: ''
  });

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      // Mock emergency alerts data
      const mockAlerts: EmergencyAlert[] = [
        {
          id: '1',
          title: 'Suspicious Activity Reported',
          message: 'Multiple residents have reported suspicious individuals in the downtown area. Please be cautious and report any unusual activity to authorities.',
          severity: 'high',
          location: 'Downtown Area',
          created_at: new Date().toISOString(),
          author_name: 'Community Watch',
          status: 'active'
        },
        {
          id: '2',
          title: 'Street Light Outage',
          message: 'Several street lights are out on Main Street between 5th and 7th Avenue. Use caution when walking in this area after dark.',
          severity: 'medium',
          location: 'Main Street',
          created_at: new Date(Date.now() - 3600000).toISOString(),
          author_name: 'City Maintenance',
          status: 'active'
        },
        {
          id: '3',
          title: 'Road Closure - Maintenance',
          message: 'Oak Street will be closed for emergency water main repair from 8 AM to 6 PM today. Please use alternate routes.',
          severity: 'low',
          location: 'Oak Street',
          created_at: new Date(Date.now() - 7200000).toISOString(),
          author_name: 'City Services',
          status: 'resolved'
        }
      ];
      setAlerts(mockAlerts);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  const createAlert = async () => {
    if (!user || !newAlert.title.trim() || !newAlert.message.trim()) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    try {
      const mockAlert: EmergencyAlert = {
        id: Date.now().toString(),
        title: newAlert.title,
        message: newAlert.message,
        severity: newAlert.severity,
        location: newAlert.location,
        created_at: new Date().toISOString(),
        author_name: user.email || 'Anonymous',
        status: 'active'
      };

      setAlerts(prev => [mockAlert, ...prev]);
      setNewAlert({ title: '', message: '', severity: 'medium', location: '' });
      setShowCreateForm(false);
      
      toast({
        title: 'Success',
        description: 'Emergency alert created successfully!',
      });
    } catch (error) {
      console.error('Error creating alert:', error);
      toast({
        title: 'Error',
        description: 'Failed to create alert',
        variant: 'destructive',
      });
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
            <Bell className="h-8 w-8" />
            Emergency Alerts
          </h1>
          <p className="text-slate-600 dark:text-slate-400">Stay informed about emergency situations and community alerts</p>
        </div>
        {user && (
          <Button onClick={() => setShowCreateForm(!showCreateForm)} className="w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            New Alert
          </Button>
        )}
      </div>

      {showCreateForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create Emergency Alert</CardTitle>
            <CardDescription>Report emergency situations or important community updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Alert title"
              value={newAlert.title}
              onChange={(e) => setNewAlert({ ...newAlert, title: e.target.value })}
            />
            <Input
              placeholder="Location (optional)"
              value={newAlert.location}
              onChange={(e) => setNewAlert({ ...newAlert, location: e.target.value })}
            />
            <select
              className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-600"
              value={newAlert.severity}
              onChange={(e) => setNewAlert({ ...newAlert, severity: e.target.value as any })}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
              <option value="critical">Critical</option>
            </select>
            <Textarea
              placeholder="Describe the emergency or situation..."
              rows={6}
              value={newAlert.message}
              onChange={(e) => setNewAlert({ ...newAlert, message: e.target.value })}
            />
            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={createAlert} className="w-full sm:w-auto">Create Alert</Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)} className="w-full sm:w-auto">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {alerts.map((alert) => (
          <Card key={alert.id} className={`${alert.status === 'resolved' ? 'opacity-70' : ''}`}>
            <CardHeader>
              <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    <CardTitle className="text-xl">{alert.title}</CardTitle>
                    <Badge className={getSeverityColor(alert.severity)} variant="outline">
                      {alert.severity.toUpperCase()}
                    </Badge>
                    {alert.status === 'resolved' && (
                      <Badge variant="secondary">RESOLVED</Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {getTimeAgo(alert.created_at)}
                    </div>
                    {alert.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {alert.location}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {alert.author_name}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">{alert.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EmergencyAlerts;
