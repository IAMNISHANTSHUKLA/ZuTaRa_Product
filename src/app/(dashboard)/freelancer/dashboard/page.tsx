
"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Search, Plus, Eye, MessageCircle, Star, Clock, DollarSign, Users, Edit, Trash2, Filter, MoreVertical, Download, CheckCircle, AlertCircle, Calendar, MapPin, Compass, Briefcase } from 'lucide-react';
import Link from 'next/link'; 

export default function FreelancerDashboardPage() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('active'); 
  const [selectedProject, setSelectedProject] = useState<any>(null); // Added type any for simplicity

  useEffect(() => {
    if (!loading && user && userProfile?.role !== 'freelancer') {
      router.push(userProfile?.role === 'client' ? '/client/dashboard' : '/');
    }
  }, [user, userProfile, loading, router]);

  const projects = [
    {
      id: "1", // Changed to string for consistency with job IDs
      title: 'My Application: Modern Residential Home Design',
      description: 'Applied for a role to design a contemporary 3,500 sq ft family home...',
      category: 'Residential Architecture',
      budget: '$8,000 - $15,000', 
      duration: '3-4 months',
      location: 'Austin, TX',
      posted: 'Client posted 2 hours ago', 
      status: 'active', 
      proposals: 12, 
      views: 143, 
      skills: ['AutoCAD', 'Revit', 'SketchUp', 'Sustainable Design'],
      urgent: false
    },
    {
      id: "3",
      title: 'Ongoing: Historic Building Renovation',
      description: 'Working on the renovation of a 1920s warehouse into modern loft apartments.',
      category: 'Renovation Design',
      budget: '$15,000 - $25,000',
      duration: '5-7 months',
      location: 'Boston, MA',
      posted: 'Client posted 2 weeks ago',
      status: 'in_progress', 
      clientName: 'Heritage Properties LLC', 
      progress: 25, 
      skills: ['Historic Preservation', 'Building Codes', 'Structural Analysis'],
      urgent: false,
    },
    {
      id: "4",
      title: 'Completed: Luxury Hotel Interior Design',
      description: 'Successfully completed the interior design for a boutique hotel.',
      category: 'Interior Design',
      budget: '$25,000 - $40,000',
      duration: '4-6 months',
      location: 'Miami, FL',
      posted: 'Client posted 1 month ago',
      status: 'completed', 
      clientName: 'Prestige Hospitality Group', 
      progress: 100,
      myRating: 5.0, 
      skills: ['3ds Max', 'V-Ray', 'Adobe Creative Suite'],
      urgent: false,
    }
  ];

  const filteredProjects = projects.filter(project => {
    if (activeTab === 'active') return project.status === 'active'; 
    if (activeTab === 'in_progress') return project.status === 'in_progress'; 
    if (activeTab === 'completed') return project.status === 'completed'; 
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-yellow-100 text-yellow-800'; 
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Applied / Interviewing';
      case 'in_progress': return 'In Progress';
      case 'completed': return 'Completed';
      default: return status;
    }
  };
  
  if (loading || !user || userProfile?.role !== 'freelancer') {
    return <div className="flex justify-center items-center h-screen"><p>Loading Zutara freelancer dashboard...</p></div>;
  }

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back to Zutara, {userProfile?.displayName || user?.email}!
        </h1>
        <p className="text-muted-foreground">Manage your applications, ongoing projects, and view your work history on Zutara.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-card rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-foreground">{projects.length}</p>
              <p className="text-muted-foreground text-sm">Total Tracked Projects</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-foreground">{projects.filter(p=>p.status === 'active').length}</p>
              <p className="text-muted-foreground text-sm">Active Applications</p>
            </div>
            <div className="bg-purple-600/10 p-3 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-foreground">{projects.filter(p=>p.status === 'in_progress').length}</p>
              <p className="text-muted-foreground text-sm">Ongoing Projects</p>
            </div>
            <div className="bg-green-600/10 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-foreground">$0.00</p> 
              <p className="text-muted-foreground text-sm">Total Earnings (Example)</p>
            </div>
            <div className="bg-yellow-500/10 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-sm border p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Link href="/jobs" className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition-all font-medium shadow-sm flex items-center space-x-2">
                <Search className="w-5 h-5" />
                <span>Browse Jobs on Zutara</span>
            </Link>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search your projects..."
                className="pl-9 pr-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring bg-background"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-3 py-2 border border-input rounded-lg hover:bg-accent/10 transition-colors bg-background">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">Filter</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-sm border mb-6">
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'active', label: 'Active Applications', count: projects.filter(p=>p.status === 'active').length },
              { id: 'in_progress', label: 'Ongoing Projects', count: projects.filter(p=>p.status === 'in_progress').length },
              { id: 'completed', label: 'Completed Work', count: projects.filter(p=>p.status === 'completed').length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="space-y-6">
        {filteredProjects.map((project: any) => ( 
          <div key={project.id} className="bg-card rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {getStatusText(project.status)}
                    </span>
                    {project.urgent && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        Urgent
                      </span>
                    )}
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 bg-background/50 p-4 rounded-lg">
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground">{project.budget}</p>
                  <p className="text-xs text-muted-foreground">Client Budget</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground">{project.duration}</p>
                  <p className="text-xs text-muted-foreground">Est. Duration</p>
                </div>
                 {project.proposals !== undefined && <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{project.proposals}</p>
                    <p className="text-xs text-muted-foreground">Total Proposals (Job)</p>
                  </div>}
                  {project.views !== undefined && <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{project.views}</p>
                    <p className="text-xs text-muted-foreground">Job Views</p>
                  </div>}
              </div>

              {project.status === 'in_progress' && (
                <div className="mb-4 px-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Your Progress</span>
                    <span className="text-sm text-muted-foreground">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {(project.status === 'in_progress' || project.status === 'completed') && project.clientName && (
                <div className="mb-4 p-3 mx-6 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground font-semibold">
                        {project.clientName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Client: {project.clientName}</p>
                        {project.myRating && (
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm text-muted-foreground">Rated: {project.myRating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                        <MessageCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="px-6 flex flex-wrap gap-2 mb-4">
                {project.skills.map((skill: string, index: number) => (
                  <span key={index} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="px-6 flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{project.location}</span>
                  <span>•</span>
                  <Calendar className="w-4 h-4" />
                  <span>{project.posted}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  {project.status === 'active' && (
                    <Link href={`/jobs/${project.id}`} className="px-4 py-2 text-primary hover:bg-primary/10 rounded-lg transition-colors font-medium">
                        View Job Details
                    </Link>
                  )}
                  {project.status === 'in_progress' && (
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                      Submit Update
                    </button>
                  )}
                  {project.status === 'completed' && (
                    <button className="px-4 py-2 border border-input text-foreground rounded-lg hover:bg-accent/10 transition-colors">
                      View Project Archive
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="bg-card rounded-xl shadow-sm border p-12 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-muted-foreground/70" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No projects match your current filters on Zutara.</h3>
          <p className="text-muted-foreground mb-6">Try adjusting your filters or check back later for new opportunities or project updates.</p>
           <Link href="/jobs" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium">
              Find Projects on Zutara
          </Link>
        </div>
      )}
    </div>
  );
}
