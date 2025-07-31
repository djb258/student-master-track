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
  first_name: string;
  last_name: string;
  relationship: string;
  phone: string;
  email: string;
}

const Intake = () => {
  const { toast } = useToast();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [guardians, setGuardians] = useState<Guardian[]>([
    { id: "1", first_name: "", last_name: "", relationship: "", phone: "", email: "" }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addGuardian = () => {
    const newId = Date.now().toString();
    setGuardians([...guardians, { id: newId, first_name: "", last_name: "", relationship: "", phone: "", email: "" }]);
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
          description: "Please enter first name and last name.",
          variant: "destructive"
        });
        return;
      }

      if (guardians.some(g => !g.first_name.trim() || !g.last_name.trim())) {
        toast({
          title: "Missing Guardian Information",
          description: "Please enter all required guardian information.",
          variant: "destructive"
        });
        return;
      }

      // Send to Render API
      const payload = {
        first_name: firstName,
        last_name: lastName,
        student_email: studentEmail,
        student_phone: studentPhone,
        guardians: guardians.filter(g => g.first_name.trim() && g.last_name.trim())
      };

      const response = await fetch("https://render-student-profile.onrender.com/intake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      toast({
        title: "Success!",
        description: "Student and guardians saved successfully!",
      });

      // Reset form
      setFirstName("");
      setLastName("");
      setStudentEmail("");
      setStudentPhone("");
      setGuardians([{ id: "1", first_name: "", last_name: "", relationship: "", phone: "", email: "" }]);

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
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Student Intake Form
          </h1>
          <p className="text-muted-foreground">
            Enter student and guardian information to complete enrollment
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Student Information */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
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
                <div className="space-y-2">
                  <Label htmlFor="studentEmail">Student Email</Label>
                  <Input
                    id="studentEmail"
                    type="email"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    placeholder="Enter student email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="studentPhone">Student Phone</Label>
                  <Input
                    id="studentPhone"
                    type="tel"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    placeholder="Enter student phone"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Guardian Information */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                Guardian Information
              </CardTitle>
              <CardDescription>
                Add at least one guardian. You may add more.
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
                      <Label>Guardian First Name *</Label>
                      <Input
                        value={guardian.first_name}
                        onChange={(e) => updateGuardian(guardian.id, 'first_name', e.target.value)}
                        placeholder="Enter first name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Guardian Last Name *</Label>
                      <Input
                        value={guardian.last_name}
                        onChange={(e) => updateGuardian(guardian.id, 'last_name', e.target.value)}
                        placeholder="Enter last name"
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
                      <Label>Guardian Email</Label>
                      <Input
                        type="email"
                        value={guardian.email}
                        onChange={(e) => updateGuardian(guardian.id, 'email', e.target.value)}
                        placeholder="Enter guardian email"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Guardian Phone</Label>
                      <Input
                        type="tel"
                        value={guardian.phone}
                        onChange={(e) => updateGuardian(guardian.id, 'phone', e.target.value)}
                        placeholder="Enter guardian phone"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline"
                onClick={addGuardian}
                className="w-full border-dashed border-2 border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-500 transition-all duration-300"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Guardian
              </Button>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg transition-all duration-300 text-lg py-6"
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