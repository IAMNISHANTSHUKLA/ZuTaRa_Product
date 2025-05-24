
"use client";

import React, { useState } from 'react';
import { Search, Filter, MapPin, Clock, DollarSign, Star, Bookmark, ChevronDown, Users, Calendar, TrendingUp, Home, Palette, Compass } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Zutara',
  description: 'Find your next architecture and design project on Zutara.',
};

const JobListingsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  // const [selectedBudget, setSelectedBudget] = useState('all'); // Commented out as not used in filtering
  // const [selectedDuration, setSelectedDuration] = useState('all'); // Commented out as not used in filtering
  const [showFilters, setShowFilters] = useState(false);

  // const categories = [ // Commented out as not used in current select, but kept for potential future use
  //   'All Categories',
  //   'Residential Architecture',
  //   'Commercial Architecture',
  //   'Interior Design',
  //   'Landscape Architecture',
  //   'Urban Planning',
  //   'Structural Engineering',
  //   '3D Visualization',
  //   'CAD Drafting',
  //   'Renovation Design'
  // ];

  const jobs = [
    {
      id: "1",
      title: 'Modern Residential Home Design',
      description: 'Seeking an experienced residential architect to design a contemporary 3,500 sq ft family home with sustainable features and open-concept living spaces.',
      client: 'GreenLiving Developers',
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
    {
      id: "4",
      title: 'Corporate Office Space Planning',
      description: 'Design an efficient and modern workspace for 150 employees including open areas, private offices, meeting rooms, and collaborative spaces.',
      client: 'TechFlow Solutions',
      clientRating: 4.6,
      budget: '$12,000 - $18,000',
      duration: '2-3 months',
      category: 'Commercial Architecture',
      skills: ['Space Planning', 'Revit', 'AutoCAD', 'LEED Certification', 'Workplace Design'],
      posted: '2 days ago',
      proposals: 9,
      location: 'Seattle, WA',
      projectType: 'Office Design',
      urgent: false,
      featured: false
    },
    {
      id: "5",
      title: 'Historic Building Renovation Design',
      description: 'Seeking an architect experienced in historic preservation to renovate a 1920s warehouse into modern loft apartments while maintaining historic character.',
      client: 'Heritage Properties LLC',
      clientRating: 4.9,
      budget: '$15,000 - $25,000',
      duration: '5-7 months',
      category: 'Renovation Design',
      skills: ['Historic Preservation', 'Building Codes', 'Structural Analysis', 'Revit', 'Zoning Compliance'],
      posted: '3 days ago',
      proposals: 5,
      location: 'Boston, MA',
      projectType: 'Historic Renovation',
      urgent: false,
      featured: true
    },
    {
      id: "6",
      title: 'Landscape Design for Residential Community',
      description: 'Design sustainable landscaping and outdoor spaces for a 50-unit residential development including parks, walkways, and water features.',
      client: 'EcoVillage Developments',
      clientRating: 4.8,
      budget: '$6,000 - $10,000',
      duration: '6-8 weeks',
      category: 'Landscape Architecture',
      skills: ['Landscape Design', 'AutoCAD', 'SketchUp', 'Plant Selection', 'Sustainability'],
      posted: '5 days ago',
      proposals: 11,
      location: 'Portland, OR',
      projectType: 'Landscape Design',
      urgent: false,
      featured: false
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    // Add other filter conditions for budget, duration here if states are used
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-gray-800"> {/* Ensure text color contrast */}
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <Compass className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Zutara</h1>
              </Link>
              <span className="text-gray-500 hidden md:inline">|</span>
              <span className="text-gray-600 hidden md:inline">Architecture & Design Marketplace</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/client/post-job">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Post a Project
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Find Your Next Design Project</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Connect with clients seeking exceptional architectural and design talent for residential, commercial, and specialized projects</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Home className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">2,847</p>
                <p className="text-gray-600">Active Projects</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Palette className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">1,293</p>
                <p className="text-gray-600">Design Professionals</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">4.8</p>
                <p className="text-gray-600">Avg. Client Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
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

            {/* Category Filter */}
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

            {/* Advanced Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5 text-gray-400" />
              <span>Filters</span>
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="budgetRange" className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                  <select id="budgetRange" className="w-full border border-gray-300 rounded-lg px-3 py-2">
                    <option>All Budgets</option>
                    <option>Under $5,000</option>
                    <option>$5,000 - $15,000</option>
                    <option>$15,000 - $30,000</option>
                    <option>$30,000+</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="projectDuration" className="block text-sm font-medium text-gray-700 mb-2">Project Duration</label>
                  <select id="projectDuration" className="w-full border border-gray-300 rounded-lg px-3 py-2">
                    <option>All Durations</option>
                    <option>Less than 1 month</option>
                    <option>1-3 months</option>
                    <option>3-6 months</option>
                    <option>6+ months</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="projectTypeFilter" className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
                  <select id="projectTypeFilter" className="w-full border border-gray-300 rounded-lg px-3 py-2">
                    <option>All Types</option>
                    <option>New Construction</option>
                    <option>Renovation</option>
                    <option>Commercial Interior</option>
                    <option>Visualization</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="clientRating" className="block text-sm font-medium text-gray-700 mb-2">Client Rating</label>
                  <select id="clientRating" className="w-full border border-gray-300 rounded-lg px-3 py-2">
                    <option>All Ratings</option>
                    <option>4.5+ stars</option>
                    <option>4.0+ stars</option>
                    <option>3.5+ stars</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats Bar */}
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
            <span className="font-medium">{filteredJobs.length} projects available</span>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4" />
                <span>Sort by: Most Recent</span>
              </div>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300">
              <div className="p-6">
                {/* Job Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-3 flex-wrap">
                      {job.featured && (
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium mb-1 sm:mb-0">
                          ⭐ Featured
                        </span>
                      )}
                      {job.urgent && (
                        <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium animate-pulse mb-1 sm:mb-0">
                          🔥 Urgent
                        </span>
                      )}
                      <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium mb-1 sm:mb-0">
                        {job.category}
                      </span>
                      <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full mb-1 sm:mb-0">
                        {job.projectType}
                      </span>
                    </div>
                     <Link href={`/jobs/${job.id}`} legacyBehavior>
                      <a className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer transition-colors block">
                        {job.title}
                      </a>
                    </Link>
                    <p className="text-gray-600 mb-4 leading-relaxed text-base">{job.description}</p>
                  </div>
                  <button aria-label="Bookmark job" className="ml-4 p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Bookmark className="w-6 h-6" />
                  </button>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Required Skills & Software:</p>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <span key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Job Details */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-sm text-gray-600 mb-6 bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-green-600 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Budget</p>
                      <p className="font-semibold text-gray-900">{job.budget}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="font-semibold text-gray-900">{job.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-purple-600 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="font-semibold text-gray-900">{job.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-orange-600 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Proposals</p>
                      <p className="font-semibold text-gray-900">{job.proposals}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-teal-600 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Posted</p>
                      <p className="font-semibold text-gray-900">{job.posted}</p>
                    </div>
                  </div>
                </div>

                {/* Client Info & Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-gray-100 gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
                      {job.client.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{job.client}</p>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> {/* Ensure star is filled */}
                        <span className="text-sm font-medium text-gray-700">{job.clientRating}</span>
                        <span className="text-xs text-gray-500">• Verified Client</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 w-full sm:w-auto">
                     <Link href={`/jobs/${job.id}`} legacyBehavior>
                        <a className="flex-1 sm:flex-none px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                           View Details
                        </a>
                    </Link>
                    <button className="flex-1 sm:flex-none px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-sm">
                      Submit Proposal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {jobs.length > filteredJobs.length || filteredJobs.length === jobs.length && jobs.length > 0 && ( // Simplified logic for showing load more
           <div className="text-center mt-8">
             <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
               Load More Projects
             </button>
           </div>
        )}
         {filteredJobs.length === 0 && (
            <div className="text-center mt-8 py-10 bg-white rounded-xl shadow-sm border">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Projects Found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default JobListingsPage;


    