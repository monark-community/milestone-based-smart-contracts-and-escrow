
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, AlertCircle, DollarSign, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

interface MilestoneTrackerProps {
  projects: Project[];
}

const MilestoneTracker = ({ projects }: MilestoneTrackerProps) => {
  const { toast } = useToast();

  // Mock milestone data
  const milestones = [
    {
      id: "m1",
      projectId: "1",
      projectTitle: "Website Redesign",
      title: "Design Mockups",
      description: "Create high-fidelity mockups for all pages",
      percentage: 20,
      amount: 10000,
      deadline: "2024-06-15",
      status: "completed",
      validator: "client",
    },
    {
      id: "m2",
      projectId: "1", 
      title: "Frontend Development",
      description: "Implement responsive frontend components",
      percentage: 40,
      amount: 20000,
      deadline: "2024-07-01",
      status: "in-progress",
      validator: "client",
    },
    {
      id: "m3",
      projectId: "1",
      title: "Backend Integration",
      description: "Connect frontend with API endpoints",
      percentage: 30,
      amount: 15000,
      deadline: "2024-07-10",
      status: "pending",
      validator: "tech-lead",
    },
    {
      id: "m4",
      projectId: "2",
      title: "App Architecture",
      description: "Design mobile app architecture and tech stack",
      percentage: 25,
      amount: 18750,
      deadline: "2024-07-05",
      status: "pending-validation",
      validator: "client",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-blue-600" />;
      case "pending-validation":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "pending-validation":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleValidate = (milestoneId: string) => {
    toast({
      title: "Milestone Validated",
      description: "Funds have been released to the contractor.",
    });
    console.log("Validating milestone:", milestoneId);
  };

  const handleReject = (milestoneId: string) => {
    toast({
      title: "Milestone Rejected",
      description: "Milestone requires additional work before approval.",
      variant: "destructive",
    });
    console.log("Rejecting milestone:", milestoneId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Milestone Tracker</h2>
        <div className="text-sm text-gray-600">
          {milestones.filter(m => m.status === "pending-validation").length} pending validation
        </div>
      </div>

      <div className="grid gap-6">
        {milestones.map((milestone) => {
          const project = projects.find(p => p.id === milestone.projectId);
          const isOverdue = new Date(milestone.deadline) < new Date() && milestone.status !== "completed";

          return (
            <Card key={milestone.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center space-x-2">
                      {getStatusIcon(milestone.status)}
                      <span>{milestone.title}</span>
                      {isOverdue && (
                        <Badge variant="destructive" className="ml-2">
                          Overdue
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription>
                      {project?.title} • {milestone.description}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(milestone.status)}>
                    {milestone.status.replace("-", " ")}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Payment:</span>
                    <span className="font-medium">${milestone.amount.toLocaleString()}</span>
                    <span className="text-gray-500">({milestone.percentage}%)</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Deadline:</span>
                    <span className={`font-medium ${isOverdue ? 'text-red-600' : ''}`}>
                      {new Date(milestone.deadline).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">Validator:</span>
                    <span className="font-medium capitalize">{milestone.validator}</span>
                  </div>
                </div>

                {milestone.status === "in-progress" && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                )}

                {milestone.status === "pending-validation" && (
                  <div className="flex space-x-2 pt-2">
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleValidate(milestone.id)}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve & Release Funds
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleReject(milestone.id)}
                    >
                      Request Changes
                    </Button>
                  </div>
                )}

                {milestone.status === "completed" && (
                  <div className="flex items-center space-x-2 text-sm text-green-600 pt-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Funds released on {new Date().toLocaleDateString()}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MilestoneTracker;
