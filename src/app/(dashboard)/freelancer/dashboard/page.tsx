
"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Search, Plus, Eye, MessageCircle, Star, Clock, DollarSign, Users, Edit, Trash2, Filter, MoreVertical, Download, CheckCircle, AlertCircle, Calendar, MapPin, Compass, Briefcase } from 'lucide-react';
import Link from 'next/link'; // Added for potential links

// Note: The user provided code for 'ClientDashboard' to be used for 'FreelancerDashboard'.
// Some elements like "Post New Project" might be less relevant for a freelancer,
// but I'm implementing as per the structure provided.
// I have removed the "Post New Project" button as it's not typical for a freelancer's primary dashboard.

export default function FreelancerDashboardPage() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('active'); // Assuming 'active' means active applications or ongoing projects for freelancer
  // const [showPostModal, setShowPostModal] = useState(false); // Removed as "Post Project" is not for freelancers
  const [selectedProject, setSelectedProject] = useState(null); // Placeholder for potential detailed view

  useEffect(() => {
    if (!loading && user && userProfile?.role !== 'freelancer') {
      router.push(userProfile?.role === 'client' ? '/client/dashboard' : '/');
    }
  }, [user, userProfile, loading, router]);

  // Sample data adapted for a freelancer's perspective (e.g., projects they are working on or applied to)
  // This data structure is from the user's provided "ClientDashboard" snippet.
  const projects = [
    {
      id: 1,
      title: 'My Application: Modern Residential Home Design',
      description: 'Applied for a role to design a contemporary 3,500 sq ft family home...',
      category: 'Residential Architecture',
      budget: '$8,000 - $15,000', // Client's budget for the project
      duration: '3-4 months',
      location: 'Austin, TX',
      posted: 'Client posted 2 hours ago', // When the client posted
      status: 'active', // 'active' could mean "application pending" or "actively interviewing"
      proposals: 12, // Total proposals client received
      views: 143, // Job views
      skills: ['AutoCAD', 'Revit', 'SketchUp', 'Sustainable Design'],
      urgent: false
    },
    {
      id: 3,
      title: 'Ongoing: Historic Building Renovation',
      description: 'Working on the renovation of a 1920s warehouse into modern loft apartments.',
      category: 'Renovation Design',
      budget: '$15,000 - $25,000',
      duration: '5-7 months',
      location: 'Boston, MA',
      posted: 'Client posted 2 weeks ago',
      status: 'in_progress', // Freelancer is working on this
      clientName: 'Heritage Properties LLC', // Added client name
      progress: 25, // Freelancer's progress
      skills: ['Historic Preservation', 'Building Codes', 'Structural Analysis'],
      urgent: false,
    },
    {
      id: 4,
      title: 'Completed: Luxury Hotel Interior Design',
      description: 'Successfully completed the interior design for a boutique hotel.',
      category: 'Interior Design',
      budget: '$25,000 - $40,000',
      duration: '4-6 months',
      location: 'Miami, FL',
      posted: 'Client posted 1 month ago',
      status: 'completed', // Freelancer completed this
      clientName: 'Prestige Hospitality Group', // Added client name
      progress: 100,
      myRating: 5.0, // Rating freelancer received or gave
      skills: ['3ds Max', 'V-Ray', 'Adobe Creative Suite'],
      urgent: false,
    }
  ];

  const filteredProjects = projects.filter(project => {
    if (activeTab === 'active') return project.status === 'active'; // Pending applications / interviewing
    if (activeTab === 'in_progress') return project.status === 'in_progress'; // Actively working on
    if (activeTab === 'completed') return project.status === 'completed'; // Finished projects
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-yellow-100 text-yellow-800'; // e.g. Applied
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
    return <div className="flex justify-center items-center h-screen"><p>Loading freelancer dashboard...</p></div>;
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {userProfile?.displayName || user?.email}!
        </h1>
        <p className="text-gray-600">Manage your applications, ongoing projects, and view your work history.</p>
      </div>

      {/* Stats Cards - Adapted for Freelancer */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
              <p className="text-gray-600 text-sm">Total Tracked Projects</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{projects.filter(p=>p.status === 'active').length}</p>
              <p className="text-gray-600 text-sm">Active Applications</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{projects.filter(p=>p.status === 'in_progress').length}</p>
              <p className="text-gray-600 text-sm">Ongoing Projects</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              {/* Placeholder for earnings or average project rating */}
              <p className="text-2xl font-bold text-gray-900">$0.00</p> 
              <p className="text-gray-600 text-sm">Total Earnings (Example)</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar - Adapted for Freelancer */}
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Link href="/jobs">
              <button
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-sm flex items-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>Browse Jobs</span>
              </button>
            </Link>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search your projects/applications..."
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm">Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border mb-6">
        <div className="border-b border-gray-200">
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
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Projects List - Adapted for Freelancer */}
      <div className="space-y-6">
        {filteredProjects.map((project: any) => ( // Added 'any' for project type due to dynamic fields
          <div key={project.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
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
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">{project.description}</p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 bg-gray-50 p-4 rounded-lg">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{project.budget}</p>
                  <p className="text-xs text-gray-600">Client Budget</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{project.duration}</p>
                  <p className="text-xs text-gray-600">Est. Duration</p>
                </div>
                 {project.proposals !== undefined && <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{project.proposals}</p>
                    <p className="text-xs text-gray-600">Total Proposals (Job)</p>
                  </div>}
                  {project.views !== undefined && <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{project.views}</p>
                    <p className="text-xs text-gray-600">Job Views</p>
                  </div>}
              </div>

              {project.status === 'in_progress' && (
                <div className="mb-4 px-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Your Progress</span>
                    <span className="text-sm text-gray-600">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {(project.status === 'in_progress' || project.status === 'completed') && project.clientName && (
                <div className="mb-4 p-3 mx-6 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold">
                        {project.clientName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Client: {project.clientName}</p>
                        {project.myRating && (
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600">Rated: {project.myRating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                        <MessageCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="px-6 flex flex-wrap gap-2 mb-4">
                {project.skills.map((skill: string, index: number) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="px-6 flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{project.location}</span>
                  <span>•</span>
                  <Calendar className="w-4 h-4" />
                  <span>{project.posted}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  {project.status === 'active' && (
                    <Link href={`/jobs/${project.id}`}>
                       <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium">
                        View Job Details
                      </button>
                    </Link>
                  )}
                  {project.status === 'in_progress' && (
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                      Submit Update
                    </button>
                  )}
                  {project.status === 'completed' && (
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      View Project Archieve
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects match your current filters.</h3>
          <p className="text-gray-600 mb-6">Try adjusting your filters or check back later for new opportunities or project updates.</p>
           <Link href="/jobs">
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Find Projects
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
