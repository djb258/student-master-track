import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Guardian {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
}

const Intake = () => {
  const { toast } = useToast();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [guardians, setGuardians] = useState<Guardian[]>([
    { id: "1", name: "", relationship: "", phone: "", email: "" }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addGuardian = () => {
    const newId = Date.now().toString();
    setGuardians([...guardians, { id: newId, name: "", relationship: "", phone: "", email: "" }]);
  };

  const removeGuardian = (id: string) => {
    if (guardians.length > 1) {
      setGuardians(guardians.filter(guardian => guardian.id !== id));
    }
  };

  const updateGuardian = (id: string, field: keyof Guardian, value: string) => {
    setGuardians(guardians.map(guardian => 
      guardian.id === id ? { ...guardian, [field]: value } : guardian
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!firstName.trim() || !lastName.trim()) {
        toast({
          title: "Missing Information",
          description: "Please enter both first and last name.",
          variant: "destructive"
        });
        return;
      }

      if (guardians.some(g => !g.name.trim())) {
        toast({
          title: "Missing Guardian Information",
          description: "Please enter all guardian names.",
          variant: "destructive"
        });
        return;
      }

      // Here you would send to your Render API
      const payload = {
        student: { firstName, lastName },
        guardians: guardians.filter(g => g.name.trim())
      };

      console.log("Submitting:", payload);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Success!",
        description: "Student intake submitted successfully.",
      });

      // Reset form
      setFirstName("");
      setLastName("");
      setGuardians([{ id: "1", name: "", relationship: "", phone: "", email: "" }]);

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit intake. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            Wrestling Program Intake
          </h1>
          <p className="text-muted-foreground">
            Enter student and guardian information to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Student Information */}
          <Card className="shadow-lg border-0" style={{ boxShadow: 'var(--shadow-elegant)' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-accent" />
                Student Information
              </CardTitle>
              <CardDescription>
                Basic information about the student
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Guardian Information */}
          <Card className="shadow-lg border-0" style={{ boxShadow: 'var(--shadow-elegant)' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-accent" />
                Guardian Information
              </CardTitle>
              <CardDescription>
                Add at least one guardian. You can add multiple guardians if needed.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {guardians.map((guardian, index) => (
                <div 
                  key={guardian.id} 
                  className="space-y-4 p-4 rounded-lg bg-secondary/30 border border-border/50 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground">
                      Guardian {index + 1}
                    </h4>
                    {guardians.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeGuardian(guardian.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Guardian Name *</Label>
                      <Input
                        value={guardian.name}
                        onChange={(e) => updateGuardian(guardian.id, 'name', e.target.value)}
                        placeholder="Enter guardian name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Relationship</Label>
                      <Select 
                        value={guardian.relationship} 
                        onValueChange={(value) => updateGuardian(guardian.id, 'relationship', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Parent">Parent</SelectItem>
                          <SelectItem value="Step-Parent">Step-Parent</SelectItem>
                          <SelectItem value="Grandparent">Grandparent</SelectItem>
                          <SelectItem value="Legal Guardian">Legal Guardian</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      <Input
                        type="tel"
                        value={guardian.phone}
                        onChange={(e) => updateGuardian(guardian.id, 'phone', e.target.value)}
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={guardian.email}
                        onChange={(e) => updateGuardian(guardian.id, 'email', e.target.value)}
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline"
                onClick={addGuardian}
                className="w-full border-dashed border-2 border-accent/50 text-accent hover:bg-accent/10 hover:border-accent transition-all duration-300"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Guardian
              </Button>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-primary to-wrestling-navy hover:shadow-lg transition-all duration-300 text-lg py-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Intake"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Intake;