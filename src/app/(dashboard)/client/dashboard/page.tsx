
"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Search, Filter, MapPin, Clock, DollarSign, Star, Bookmark, ChevronDown, Users, Calendar, Plus, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function ClientDashboardPage() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams(); 

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!loading && user && userProfile?.role !== 'client') {
      router.push(userProfile?.role === 'freelancer' ? '/freelancer/dashboard' : '/');
    }
  }, [user, userProfile, loading, router]);

  useEffect(() => {
    const queryParam = searchParams.get('q');
    const categoryParam = searchParams.get('category');
    if (queryParam) setSearchQuery(queryParam);
    if (categoryParam) setSelectedCategory(categoryParam);
  }, [searchParams]);


  // Hardcoded jobs data, in a real app this would be dynamic or fetched
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
  ];

  const filteredJobs = jobs.filter(job => {
    const normalizedSearchQuery = searchQuery.toLowerCase();
    const matchesSearch = job.title.toLowerCase().includes(normalizedSearchQuery) ||
                         job.description.toLowerCase().includes(normalizedSearchQuery) ||
                         job.skills.some(skill => skill.toLowerCase().includes(normalizedSearchQuery));
    
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory || selectedCategory.toLowerCase() === 'all specialties';
    
    return matchesSearch && matchesCategory;
  });

  if (loading || !user || userProfile?.role !== 'client') {
    return <div className="flex justify-center items-center h-screen"><p>Loading Zutara client dashboard...</p></div>;
  }

  return (
    <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
            <h1 className="text-3xl font-bold">Zutara Client Dashboard</h1>
            <p className="text-muted-foreground">
                Welcome, {userProfile?.displayName || user?.email}! Manage your projects on Zutara or find talent.
            </p>
            </div>
            <Link href="/client/post-job" className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-lg font-medium shadow-sm flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Post a New Job</span>
            </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card rounded-xl p-6 shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Briefcase className="w-6 h-6 text-blue-600" /> 
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">0</p> 
                <p className="text-muted-foreground">Your Active Projects on Zutara</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">0</p>
                <p className="text-muted-foreground">Proposals Received on Zutara</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">N/A</p>
                <p className="text-muted-foreground">Your Avg Rating on Zutara</p>
              </div>
            </div>
          </div>
        </div>

      <div className="bg-card rounded-xl shadow-sm border p-6 mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Browse All Available Projects on Zutara</h2>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects by type, location, or software..."
              className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative">
            <select
              className="appearance-none bg-background border border-input rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-ring focus:border-ring min-w-48"
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
            className="flex items-center space-x-2 px-4 py-3 border border-input rounded-lg hover:bg-accent/10 transition-colors bg-background"
          >
            <Filter className="w-5 h-5 text-muted-foreground" />
            <span className="text-foreground">Advanced Filters</span>
          </button>
        </div>
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="budgetRange" className="block text-sm font-medium text-foreground mb-1">Budget Range</label>
                <select id="budgetRange" className="w-full border-input rounded-md shadow-sm py-2 px-3 bg-background text-foreground">
                  <option>All Budgets</option><option>Under $5,000</option><option>$5,000 - $15,000</option>
                </select>
              </div>
              <div>
                <label htmlFor="projectDuration" className="block text-sm font-medium text-foreground mb-1">Project Duration</label>
                <select id="projectDuration" className="w-full border-input rounded-md shadow-sm py-2 px-3 bg-background text-foreground">
                  <option>All Durations</option><option>1-3 months</option><option>3-6 months</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-card rounded-xl shadow-sm border p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{filteredJobs.length} projects found matching your criteria on Zutara</span>
        </div>
      </div>

      <div className="space-y-6">
        {filteredJobs.length > 0 ? filteredJobs.map((job) => (
          <div key={job.id} className="bg-card rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-3 flex-wrap">
                    {job.featured && <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium mb-1 sm:mb-0">⭐ Featured</span>}
                    {job.urgent && <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium animate-pulse mb-1 sm:mb-0">🔥 Urgent</span>}
                    <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium mb-1 sm:mb-0">{job.category}</span>
                    <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full mb-1 sm:mb-0">{job.projectType}</span>
                  </div>
                  <Link href={`/jobs/${job.id}`} className="text-xl font-semibold text-foreground mb-3 hover:text-primary cursor-pointer transition-colors block">
                      {job.title}
                  </Link>
                  <p className="text-muted-foreground mb-4 leading-relaxed text-base line-clamp-2">{job.description}</p>
                </div>
                <button aria-label="Bookmark job" className="ml-4 p-2 text-muted-foreground hover:text-primary transition-colors">
                  <Bookmark className="w-6 h-6" />
                </button>
              </div>
              <div className="mb-4 px-6">
                <p className="text-sm font-medium text-foreground mb-2">Required Skills & Software:</p>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span key={index} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium border border-border">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-sm text-muted-foreground mb-6 bg-background/50 p-4 rounded-lg mx-6">
                <div className="flex items-center space-x-2"><DollarSign className="w-4 h-4 text-green-600 shrink-0" /><div><p className="text-xs text-muted-foreground/80">Budget</p><p className="font-semibold text-foreground">{job.budget}</p></div></div>
                <div className="flex items-center space-x-2"><Clock className="w-4 h-4 text-blue-600 shrink-0" /><div><p className="text-xs text-muted-foreground/80">Duration</p><p className="font-semibold text-foreground">{job.duration}</p></div></div>
                <div className="flex items-center space-x-2"><MapPin className="w-4 h-4 text-purple-600 shrink-0" /><div><p className="text-xs text-muted-foreground/80">Location</p><p className="font-semibold text-foreground">{job.location}</p></div></div>
                <div className="flex items-center space-x-2"><Users className="w-4 h-4 text-orange-600 shrink-0" /><div><p className="text-xs text-muted-foreground/80">Proposals</p><p className="font-semibold text-foreground">{job.proposals}</p></div></div>
                <div className="flex items-center space-x-2"><Calendar className="w-4 h-4 text-teal-600 shrink-0" /><div><p className="text-xs text-muted-foreground/80">Posted</p><p className="font-semibold text-foreground">{job.posted}</p></div></div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-border px-6 pb-6 gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary via-accent to-secondary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg shrink-0">
                    {job.client.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{job.client}</p>
                    <div className="flex items-center space-x-1"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /><span className="text-sm font-medium text-foreground">{job.clientRating}</span><span className="text-xs text-muted-foreground">• Verified Client</span></div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 w-full sm:w-auto">
                    <Link href={`/jobs/${job.id}`} className="flex-1 sm:flex-none px-5 py-2 border border-input text-foreground rounded-lg hover:bg-accent/10 transition-colors font-medium text-center">
                        View Details
                    </Link>
                </div>
              </div>
            </div>
          </div>
        )) : (
            <div className="text-center mt-8 py-10 bg-card rounded-xl shadow-sm border">
                <Search className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No Projects Found on Zutara</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria, or post a new job to attract talent to Zutara.</p>
            </div>
        )}
      </div>
    </div>
  );
}
