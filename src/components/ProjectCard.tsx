
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, User, CheckCircle } from "lucide-react";

interface Project {
  id: string;
  title: string;
  client: string;
  contractor: string;
  totalAmount: number;
  completedAmount: number;
  status: string;
  deadline: string;
  milestonesCompleted: number;
  totalMilestones: number;
}

interface ProjectCardProps {
  project: Project;
  onSelect: (id: string) => void;
}

const ProjectCard = ({ project, onSelect }: ProjectCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const progressPercentage = (project.completedAmount / project.totalAmount) * 100;
  const milestoneProgress = (project.milestonesCompleted / project.totalMilestones) * 100;

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onSelect(project.id)}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{project.title}</CardTitle>
            <CardDescription className="flex items-center mt-2">
              <User className="w-4 h-4 mr-1" />
              {project.client}
            </CardDescription>
          </div>
          <Badge className={getStatusColor(project.status)}>
            {project.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Contractor</span>
          <span className="font-medium">{project.contractor}</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Payment Progress</span>
            <span className="font-medium">
              ${project.completedAmount.toLocaleString()} / ${project.totalAmount.toLocaleString()}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Milestones</span>
            <span className="font-medium">
              {project.milestonesCompleted} / {project.totalMilestones}
            </span>
          </div>
          <Progress value={milestoneProgress} className="h-2" />
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-1" />
          Deadline: {new Date(project.deadline).toLocaleDateString()}
        </div>

        <Button variant="outline" className="w-full mt-4" onClick={(e) => {
          e.stopPropagation();
          onSelect(project.id);
        }}>
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
