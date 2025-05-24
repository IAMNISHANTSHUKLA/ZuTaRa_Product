
"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Search, Filter, MapPin, Clock, DollarSign, Star, Bookmark, ChevronDown, Users, Calendar, TrendingUp, Home, Palette, Compass, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'; // For potential query params if needed in future

// Note: The user provided code for 'JobListingsPage' to be used for 'ClientDashboard'.
// This will make the client dashboard primarily a job browsing interface.

export default function ClientDashboardPage() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams(); // Initialize searchParams

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  // const [selectedBudget, setSelectedBudget] = useState('all'); // Not used in provided UI
  // const [selectedDuration, setSelectedDuration] = useState('all'); // Not used in provided UI
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!loading && user && userProfile?.role !== 'client') {
      router.push(userProfile?.role === 'freelancer' ? '/freelancer/dashboard' : '/');
    }
  }, [user, userProfile, loading, router]);

  useEffect(() => {
    // Example: if you want to prefill search from URL like /client/dashboard?q=design
    const queryParam = searchParams.get('q');
    const categoryParam = searchParams.get('category');
    if (queryParam) setSearchQuery(queryParam);
    if (categoryParam) setSelectedCategory(categoryParam);
  }, [searchParams]);


  // Hardcoded jobs data from the user's 'JobListingsPage' snippet
  const jobs = [
    {
      id: "1", // Ensure IDs are strings if job detail page expects string IDs
      title: 'Modern Residential Home Design',
      description: 'Seeking an experienced residential architect to design a contemporary 3,500 sq ft family home with sustainable features and open-concept living spaces.',
      client: 'GreenLiving Developers', // This would ideally be the current client's projects
      clientRating: 4.9,
      budget: '$8,000 - $15,000',
      duration: '3-4 months',
      category: 'Residential Architecture',
      skills: ['AutoCAD', 'Revit', 'SketchUp', 'Sustainable Design', 'Building Codes'],
      posted: '2 hours ago',
      proposals: 7,
      location: 'Austin, TX',
      projectType: 'New Construction',
      urgent: false,
      featured: true
    },
    {
      id: "2",
      title: 'Luxury Hotel Interior Design',
      description: 'Looking for a creative interior designer to conceptualize and design interiors for a 120-room boutique hotel with spa and restaurant facilities.',
      client: 'Prestige Hospitality Group',
      clientRating: 4.8,
      budget: '$25,000 - $40,000',
      duration: '4-6 months',
      category: 'Interior Design',
      skills: ['3ds Max', 'V-Ray', 'Adobe Creative Suite', 'FF&E Specification', 'Hospitality Design'],
      posted: '4 hours ago',
      proposals: 12,
      location: 'Miami, FL',
      projectType: 'Commercial Interior',
      urgent: true,
      featured: true
    },
     {
      id: "3",
      title: '3D Architectural Visualization & Renderings',
      description: 'Need high-quality photorealistic renderings for a mixed-use development project including exterior and interior visualizations.',
      client: 'Urban Development Co',
      clientRating: 4.7,
      budget: '$3,500 - $6,000',
      duration: '4-6 weeks',
      category: '3D Visualization',
      skills: ['3ds Max', 'V-Ray', 'Corona Renderer', 'Photoshop', 'Architectural Visualization'],
      posted: '1 day ago',
      proposals: 18,
      location: 'Remote',
      projectType: 'Visualization',
      urgent: false,
      featured: false
    },
  ];

  const filteredJobs = jobs.filter(job => {
    const normalizedSearchQuery = searchQuery.toLowerCase();
    const matchesSearch = job.title.toLowerCase().includes(normalizedSearchQuery) ||
                         job.description.toLowerCase().includes(normalizedSearchQuery) ||
                         job.skills.some(skill => skill.toLowerCase().includes(normalizedSearchQuery));
    
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (loading || !user || userProfile?.role !== 'client') {
    return <div className="flex justify-center items-center h-screen"><p>Loading client dashboard...</p></div>;
  }

  return (
    <div className="space-y-8">
        {/* Welcome Section - Adapted from original client dashboard */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
            <h1 className="text-3xl font-bold">Client Dashboard</h1>
            <p className="text-muted-foreground">
                Welcome, {userProfile?.displayName || user?.email}! Manage your projects or find talent.
            </p>
            </div>
            <Link href="/client/post-job">
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-lg font-medium shadow-sm flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Post a New Job</span>
            </button>
            </Link>
        </div>

        {/* Quick Stats - from user's JobListingsPage snippet */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Briefcase className="w-6 h-6 text-blue-600" /> {/* Changed icon */}
              </div>
              <div>
                {/* These would be dynamic, showing client's own project stats */}
                <p className="text-2xl font-bold text-gray-900">0</p> 
                <p className="text-gray-600">Your Active Projects</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-gray-600">Proposals Received</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">N/A</p>
                <p className="text-gray-600">Your Avg Rating</p>
              </div>
            </div>
          </div>
        </div>

      {/* Search and Filters for browsing jobs */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Browse All Available Projects</h2>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects by type, location, or software..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-48"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Specialties</option>
              <option value="Residential Architecture">Residential Architecture</option>
              <option value="Commercial Architecture">Commercial Architecture</option>
              <option value="Interior Design">Interior Design</option>
              <option value="Landscape Architecture">Landscape Architecture</option>
              <option value="3D Visualization">3D Visualization</option>
              <option value="Renovation Design">Renovation Design</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-5 h-5 text-gray-400" />
            <span>Advanced Filters</span>
          </button>
        </div>
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Filters: Budget, Duration, Type, Client Rating (can be adapted or removed if not relevant for client browsing this way) */}
              <div>
                <label htmlFor="budgetRange" className="block text-sm font-medium text-gray-700 mb-1">Budget Range</label>
                <select id="budgetRange" className="w-full border-gray-300 rounded-md shadow-sm py-2 px-3">
                  <option>All Budgets</option><option>Under $5,000</option><option>$5,000 - $15,000</option>
                </select>
              </div>
              <div>
                <label htmlFor="projectDuration" className="block text-sm font-medium text-gray-700 mb-1">Project Duration</label>
                <select id="projectDuration" className="w-full border-gray-300 rounded-md shadow-sm py-2 px-3">
                  <option>All Durations</option><option>1-3 months</option><option>3-6 months</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stats Bar for Job Listings */}
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
          <span className="font-medium">{filteredJobs.length} projects found matching your criteria</span>
          {/* Sort by can be added here */}
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-6">
        {filteredJobs.length > 0 ? filteredJobs.map((job) => (
          <div key={job.id} className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-3 flex-wrap">
                    {job.featured && <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium mb-1 sm:mb-0">⭐ Featured</span>}
                    {job.urgent && <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium animate-pulse mb-1 sm:mb-0">🔥 Urgent</span>}
                    <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium mb-1 sm:mb-0">{job.category}</span>
                    <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full mb-1 sm:mb-0">{job.projectType}</span>
                  </div>
                  <Link href={`/jobs/${job.id}`} className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer transition-colors block">
                      {job.title}
                  </Link>
                  <p className="text-gray-600 mb-4 leading-relaxed text-base line-clamp-2">{job.description}</p>
                </div>
                <button aria-label="Bookmark job" className="ml-4 p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Bookmark className="w-6 h-6" />
                </button>
              </div>
              <div className="mb-4 px-6">
                <p className="text-sm font-medium text-gray-700 mb-2">Required Skills & Software:</p>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-sm text-gray-600 mb-6 bg-gray-50 p-4 rounded-lg mx-6">
                <div className="flex items-center space-x-2"><DollarSign className="w-4 h-4 text-green-600 shrink-0" /><div><p className="text-xs text-gray-500">Budget</p><p className="font-semibold text-gray-900">{job.budget}</p></div></div>
                <div className="flex items-center space-x-2"><Clock className="w-4 h-4 text-blue-600 shrink-0" /><div><p className="text-xs text-gray-500">Duration</p><p className="font-semibold text-gray-900">{job.duration}</p></div></div>
                <div className="flex items-center space-x-2"><MapPin className="w-4 h-4 text-purple-600 shrink-0" /><div><p className="text-xs text-gray-500">Location</p><p className="font-semibold text-gray-900">{job.location}</p></div></div>
                <div className="flex items-center space-x-2"><Users className="w-4 h-4 text-orange-600 shrink-0" /><div><p className="text-xs text-gray-500">Proposals</p><p className="font-semibold text-gray-900">{job.proposals}</p></div></div>
                <div className="flex items-center space-x-2"><Calendar className="w-4 h-4 text-teal-600 shrink-0" /><div><p className="text-xs text-gray-500">Posted</p><p className="font-semibold text-gray-900">{job.posted}</p></div></div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-gray-100 px-6 pb-6 gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {job.client.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{job.client}</p>
                    <div className="flex items-center space-x-1"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /><span className="text-sm font-medium text-gray-700">{job.clientRating}</span><span className="text-xs text-gray-500">• Verified Client</span></div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 w-full sm:w-auto">
                    <Link href={`/jobs/${job.id}`} className="flex-1 sm:flex-none px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-center">
                        View Details
                    </Link>
                    {/* Clients don't submit proposals to their own view of all jobs */}
                </div>
              </div>
            </div>
          </div>
        )) : (
            <div className="text-center mt-8 py-10 bg-white rounded-xl shadow-sm border">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Projects Found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria, or post a new job to attract talent.</p>
            </div>
        )}
      </div>
    </div>
  );
}
