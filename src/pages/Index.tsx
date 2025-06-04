
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Clock, CheckCircle, AlertCircle, DollarSign, Users } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import CreateProjectModal from "@/components/CreateProjectModal";
import MilestoneTracker from "@/components/MilestoneTracker";

const Index = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  // Mock data for demonstration
  const projects = [
    {
      id: "1",
      title: "Website Redesign",
      client: "TechCorp Inc.",
      contractor: "DesignPro Studio",
      totalAmount: 50000,
      completedAmount: 30000,
      status: "in-progress",
      deadline: "2024-07-15",
      milestonesCompleted: 3,
      totalMilestones: 5,
    },
    {
      id: "2", 
      title: "Mobile App Development",
      client: "StartupXYZ",
      contractor: "AppDev Solutions",
      totalAmount: 75000,
      completedAmount: 0,
      status: "pending",
      deadline: "2024-08-30",
      milestonesCompleted: 0,
      totalMilestones: 4,
    },
    {
      id: "3",
      title: "Marketing Campaign",
      client: "RetailBrand",
      contractor: "Creative Agency",
      totalAmount: 25000,
      completedAmount: 25000,
      status: "completed",
      deadline: "2024-06-01",
      milestonesCompleted: 3,
      totalMilestones: 3,
    },
  ];

  const stats = {
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === "in-progress").length,
    totalLocked: projects.reduce((sum, p) => sum + p.totalAmount, 0),
    totalReleased: projects.reduce((sum, p) => sum + p.completedAmount, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">MilestoneMint</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={() => setIsCreateModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProjects}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeProjects}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Locked</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalLocked.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Released</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${stats.totalReleased.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={setSelectedProject}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="milestones">
            <MilestoneTracker projects={projects} />
          </TabsContent>
        </Tabs>
      </div>

      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default Index;
