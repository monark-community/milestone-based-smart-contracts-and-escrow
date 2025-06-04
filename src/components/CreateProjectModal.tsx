
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Calendar, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  percentage: number;
  deadline: string;
}

const CreateProjectModal = ({ isOpen, onClose }: CreateProjectModalProps) => {
  const { toast } = useToast();
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    client: "",
    contractor: "",
    totalAmount: "",
    deadline: "",
  });

  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: "1",
      title: "",
      description: "",
      percentage: 0,
      deadline: "",
    },
  ]);

  const addMilestone = () => {
    const newMilestone: Milestone = {
      id: Date.now().toString(),
      title: "",
      description: "",
      percentage: 0,
      deadline: "",
    };
    setMilestones([...milestones, newMilestone]);
  };

  const removeMilestone = (id: string) => {
    setMilestones(milestones.filter(m => m.id !== id));
  };

  const updateMilestone = (id: string, field: keyof Milestone, value: string | number) => {
    setMilestones(milestones.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const totalPercentage = milestones.reduce((sum, m) => sum + m.percentage, 0);
    if (totalPercentage !== 100) {
      toast({
        title: "Error",
        description: "Milestone percentages must add up to 100%",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically submit to your smart contract
    console.log("Creating project:", { projectData, milestones });
    
    toast({
      title: "Success",
      description: "Project created successfully!",
    });
    
    onClose();
  };

  const totalPercentage = milestones.reduce((sum, m) => sum + m.percentage, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Set up a new milestone-based project with escrow functionality
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    value={projectData.title}
                    onChange={(e) => setProjectData({...projectData, title: e.target.value})}
                    placeholder="Enter project title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalAmount">Total Amount (USD)</Label>
                  <Input
                    id="totalAmount"
                    type="number"
                    value={projectData.totalAmount}
                    onChange={(e) => setProjectData({...projectData, totalAmount: e.target.value})}
                    placeholder="50000"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={projectData.description}
                  onChange={(e) => setProjectData({...projectData, description: e.target.value})}
                  placeholder="Project description and requirements"
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client">Client</Label>
                  <Input
                    id="client"
                    value={projectData.client}
                    onChange={(e) => setProjectData({...projectData, client: e.target.value})}
                    placeholder="Client name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contractor">Contractor</Label>
                  <Input
                    id="contractor"
                    value={projectData.contractor}
                    onChange={(e) => setProjectData({...projectData, contractor: e.target.value})}
                    placeholder="Contractor name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Project Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={projectData.deadline}
                    onChange={(e) => setProjectData({...projectData, deadline: e.target.value})}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Milestones */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Milestones</CardTitle>
                  <CardDescription>
                    Define project milestones and payment schedule
                  </CardDescription>
                </div>
                <div className="text-sm">
                  Total: <span className={`font-bold ${totalPercentage === 100 ? 'text-green-600' : 'text-red-600'}`}>
                    {totalPercentage}%
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {milestones.map((milestone, index) => (
                <div key={milestone.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Milestone {index + 1}</h4>
                    {milestones.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeMilestone(milestone.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={milestone.title}
                        onChange={(e) => updateMilestone(milestone.id, 'title', e.target.value)}
                        placeholder="Milestone title"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Payment Percentage</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={milestone.percentage}
                        onChange={(e) => updateMilestone(milestone.id, 'percentage', parseInt(e.target.value) || 0)}
                        placeholder="25"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={milestone.description}
                      onChange={(e) => updateMilestone(milestone.id, 'description', e.target.value)}
                      placeholder="Milestone deliverables and requirements"
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Deadline</Label>
                    <Input
                      type="date"
                      value={milestone.deadline}
                      onChange={(e) => updateMilestone(milestone.id, 'deadline', e.target.value)}
                      required
                    />
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addMilestone}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Milestone
              </Button>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={totalPercentage !== 100}
            >
              Create Project
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectModal;
