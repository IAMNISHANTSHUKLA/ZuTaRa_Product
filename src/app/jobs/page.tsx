
"use client";

import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Clock, DollarSign, Star, Bookmark, ChevronDown, Users, Calendar, TrendingUp, Home, Palette, Compass, Briefcase, Award, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Added Card imports
import { Button } from '@/components/ui/button'; // Added Button import


const JobListingsPage = () => {
  const searchParamsHook = useSearchParams(); // Renamed to avoid conflict
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  // const [selectedBudget, setSelectedBudget] = useState('all'); // Not used in provided filtering
  // const [selectedDuration, setSelectedDuration] = useState('all'); // Not used
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    document.title = 'Zutara - Job Listings';
    const queryParam = searchParamsHook.get('q');
    const categoryParam = searchParamsHook.get('category');
    if (queryParam) {
      setSearchQuery(queryParam);
    }
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParamsHook]);

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
      title: '3D Architectural Visualization & Renderings (Internship Opportunity)',
      description: 'Need high-quality photorealistic renderings for a mixed-use development project including exterior and interior visualizations. Great for interns.',
      client: 'Urban Development Co',
      clientRating: 4.7,
      budget: '$3,500 - $6,000',
      duration: '4-6 weeks',
      category: '3D Visualization',
      skills: ['3ds Max', 'V-Ray', 'Corona Renderer', 'Photoshop', 'Architectural Visualization', 'Internship'],
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
    const normalizedSearchQuery = searchQuery.toLowerCase();
    const matchesSearch = job.title.toLowerCase().includes(normalizedSearchQuery) ||
                         job.description.toLowerCase().includes(normalizedSearchQuery) ||
                         job.skills.some(skill => skill.toLowerCase().includes(normalizedSearchQuery));
    
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory || selectedCategory.toLowerCase() === 'all specialties'; // Adjusted for "All Specialties" from select
    
    return matchesSearch && matchesCategory;
  });
  
  const specializations = {
    Architecture: ["Residential Design", "Commercial Architecture", "Urban Planning", "Sustainable Design", "Interior Architecture", "Landscape Architecture", "Historic Preservation", "Industrial Design"],
    Design: ["Graphic Design", "UX/UI Design", "Product Design", "Brand Identity", "Print Design", "Digital Media", "Packaging Design", "Environmental Design"]
  };

  const projectCategories = {
    Residential: ["Custom Home Design", "Renovations & Additions", "Interior Design", "Landscape Design", "Space Planning"],
    Commercial: ["Office Design", "Retail Spaces", "Hospitality Design", "Mixed-Use Developments", "Corporate Branding"],
    Digital: ["Website Design", "Mobile App Interfaces", "Digital Marketing Materials", "E-commerce Platforms", "Brand Development"]
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/50 pt-20 text-foreground"> {/* Added pt-20 for header offset */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-primary mb-3">Find Your Next Design Project on Zutara</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Connect with clients seeking exceptional architectural and design talent for residential, commercial, and specialized projects worldwide.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-card rounded-xl p-6 shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Home className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">2,847</p>
                <p className="text-muted-foreground">Active Projects on Zutara</p>
              </div>
            </div>
          </Card>
          <Card className="bg-card rounded-xl p-6 shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="bg-accent/10 p-3 rounded-lg">
                <Palette className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">1,293</p>
                <p className="text-muted-foreground">Design Professionals on Zutara</p>
              </div>
            </div>
          </Card>
          <Card className="bg-card rounded-xl p-6 shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500/10 p-3 rounded-lg">
                <Star className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">4.8</p>
                <p className="text-muted-foreground">Avg. Client Rating on Zutara</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="bg-card rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects by type, location, or software on Zutara..."
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
                <option value="Urban Planning">Urban Planning</option>
                <option value="3D Visualization">3D Visualization</option>
                <option value="Renovation Design">Renovation Design</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="UX/UI Design">UX/UI Design</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none" />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 border border-input rounded-lg hover:bg-accent/10 transition-colors bg-background"
            >
              <Filter className="w-5 h-5 text-muted-foreground" />
              <span className="text-foreground">Filters</span>
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="budgetRange" className="block text-sm font-medium text-foreground mb-1">Budget Range</label>
                  <select id="budgetRange" className="w-full border-input rounded-md shadow-sm py-2 px-3 bg-background text-foreground">
                    <option>All Budgets</option>
                    <option>Under $5,000</option>
                    <option>$5,000 - $15,000</option>
                    <option>$15,000 - $30,000</option>
                    <option>$30,000+</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="projectDuration" className="block text-sm font-medium text-foreground mb-1">Project Duration</label>
                  <select id="projectDuration" className="w-full border-input rounded-md shadow-sm py-2 px-3 bg-background text-foreground">
                    <option>All Durations</option>
                    <option>Less than 1 month</option>
                    <option>1-3 months</option>
                    <option>3-6 months</option>
                    <option>6+ months</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="projectTypeFilter" className="block text-sm font-medium text-foreground mb-1">Project Type</label>
                  <select id="projectTypeFilter" className="w-full border-input rounded-md shadow-sm py-2 px-3 bg-background text-foreground">
                    <option>All Types</option>
                    <option>New Construction</option>
                    <option>Renovation</option>
                    <option>Commercial Interior</option>
                    <option>Visualization</option>
                    <option>Branding</option>
                    <option>Web Design</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="clientRating" className="block text-sm font-medium text-foreground mb-1">Client Rating</label>
                  <select id="clientRating" className="w-full border-input rounded-md shadow-sm py-2 px-3 bg-background text-foreground">
                    <option>All Ratings</option>
                    <option>4.5+ stars</option>
                    <option>4.0+ stars</option>
                    <option>3.5+ stars</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </Card>

        <div className="bg-card rounded-xl shadow-sm border p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{filteredJobs.length} projects available on Zutara</span>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4" />
                <span>Sort by: Most Recent</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {filteredJobs.length > 0 ? filteredJobs.map((job) => (
            <Card key={job.id} className="bg-card rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300">
              <div className="p-6">
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
                      <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium mb-1 sm:mb-0">
                        {job.category}
                      </span>
                      <span className="bg-secondary text-secondary-foreground text-xs px-3 py-1 rounded-full mb-1 sm:mb-0">
                        {job.projectType}
                      </span>
                    </div>
                    <Link href={`/jobs/${job.id}`} className="text-xl font-semibold text-foreground mb-3 hover:text-primary cursor-pointer transition-colors block">
                        {job.title}
                    </Link>
                    <p className="text-muted-foreground mb-4 leading-relaxed text-base line-clamp-2">{job.description}</p>
                  </div>
                  <Button variant="ghost" size="icon" aria-label="Bookmark job" className="ml-4 text-muted-foreground hover:text-primary">
                    <Bookmark className="w-6 h-6" />
                  </Button>
                </div>

                <div className="mb-4 px-6">
                  <p className="text-sm font-medium text-foreground mb-2">Required Skills & Software:</p>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <span key={index} className="bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 text-primary px-3 py-1 rounded-full text-sm font-medium border border-primary/20">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-sm text-muted-foreground mb-6 bg-background/50 p-4 rounded-lg mx-6">
                  <div className="flex items-center space-x-2"><DollarSign className="w-4 h-4 text-green-600 shrink-0" /><div><p className="text-xs text-muted-foreground/80">Budget</p><p className="font-semibold text-foreground">{job.budget}</p></div></div>
                  <div className="flex items-center space-x-2"><Clock className="w-4 h-4 text-primary shrink-0" /><div><p className="text-xs text-muted-foreground/80">Duration</p><p className="font-semibold text-foreground">{job.duration}</p></div></div>
                  <div className="flex items-center space-x-2"><MapPin className="w-4 h-4 text-accent shrink-0" /><div><p className="text-xs text-muted-foreground/80">Location</p><p className="font-semibold text-foreground">{job.location}</p></div></div>
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
                      <Link href={`/jobs/${job.id}`} passHref>
                        <Button variant="outline" className="flex-1 sm:flex-none">View Details</Button>
                      </Link>
                      <Link href={`/jobs/${job.id}#apply`} passHref>
                         <Button className="flex-1 sm:flex-none bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90">Submit Proposal</Button>
                      </Link>
                  </div>
                </div>
              </div>
            </Card>
          )) : (
            <Card className="text-center mt-8 py-10 bg-card rounded-xl shadow-sm border">
                <Search className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No Projects Found on Zutara</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </Card>
          )}
        </div>

        {filteredJobs.length > 0 && ( 
           <div className="text-center mt-8">
             <Button variant="outline">Load More Projects</Button>
           </div>
        )}

        <Card className="mt-16 bg-card">
            <CardHeader>
                <CardTitle className="text-2xl text-center text-primary">Explore by Specialization</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center"><Lightbulb className="w-6 h-6 mr-2 text-accent" />Architecture Specializations</h3>
                    <ul className="space-y-1 columns-2">
                        {specializations.Architecture.map(spec => <li key={spec}><Link href={`/jobs?category=${encodeURIComponent(spec)}`} className="text-muted-foreground hover:text-primary transition-colors">{spec}</Link></li>)}
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center"><Award className="w-6 h-6 mr-2 text-accent" />Design Disciplines</h3>
                    <ul className="space-y-1 columns-2">
                        {specializations.Design.map(spec => <li key={spec}><Link href={`/jobs?category=${encodeURIComponent(spec)}`} className="text-muted-foreground hover:text-primary transition-colors">{spec}</Link></li>)}
                    </ul>
                </div>
            </CardContent>
        </Card>

        <Card className="mt-8 bg-card">
            <CardHeader>
                <CardTitle className="text-2xl text-center text-primary">Browse by Project Type</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-x-8 gap-y-6">
                 <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center"><Home className="w-6 h-6 mr-2 text-accent"/>Residential Projects</h3>
                    <ul className="space-y-1">
                        {projectCategories.Residential.map(type => <li key={type}><Link href={`/jobs?q=${encodeURIComponent(type)}`} className="text-muted-foreground hover:text-primary transition-colors">{type}</Link></li>)}
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center"><Briefcase className="w-6 h-6 mr-2 text-accent"/>Commercial Ventures</h3>
                    <ul className="space-y-1">
                        {projectCategories.Commercial.map(type => <li key={type}><Link href={`/jobs?q=${encodeURIComponent(type)}`} className="text-muted-foreground hover:text-primary transition-colors">{type}</Link></li>)}
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center"><Palette className="w-6 h-6 mr-2 text-accent"/>Digital Solutions</h3>
                    <ul className="space-y-1">
                        {projectCategories.Digital.map(type => <li key={type}><Link href={`/jobs?q=${encodeURIComponent(type)}`} className="text-muted-foreground hover:text-primary transition-colors">{type}</Link></li>)}
                    </ul>
                </div>
            </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default JobListingsPage;
