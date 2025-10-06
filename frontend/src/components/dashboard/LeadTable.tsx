import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Lead } from "@/types/lead";
import { Flame, Sun, Wind, DollarSign, Crown, TrendingUp, Target, GraduationCap, Briefcase, Users, Link2, RotateCcw, Rocket, HeartCrack, Eye } from "lucide-react";
import { LeadDetailModal } from "./LeadDetailModal";

interface LeadTableProps {
  leads: Lead[];
}

const priorityConfig = {
  hot: { icon: Flame, label: "HOT", className: "bg-hot text-white" },
  warm: { icon: Sun, label: "WARM", className: "bg-warm text-white" },
  cold: { icon: Wind, label: "COLD", className: "bg-cold text-white" },
};

const signalIcons = {
  funding: DollarSign,
  leadership: Crown,
  growth: TrendingUp,
  event: Target,
};

const relationshipIcons = {
  alumni: GraduationCap,
  employment: Briefcase,
  investor: Users,
  techstack: Link2,
};

const competitiveIcons = {
  migration: RotateCcw,
  expansion: Rocket,
  dissatisfaction: HeartCrack,
};

export function LeadTable({ leads }: LeadTableProps) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const getConfidenceColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 51) return "text-warning";
    return "text-destructive";
  };

  const getConfidenceBarColor = (score: number) => {
    if (score >= 80) return "bg-success";
    if (score >= 51) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <>
      <TooltipProvider>
        <div className="border rounded-lg overflow-hidden bg-card shadow-md">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Company</TableHead>
                <TableHead className="font-semibold">Priority</TableHead>
                <TableHead className="font-semibold">Temporal Signals</TableHead>
                <TableHead className="font-semibold">Relationships</TableHead>
                <TableHead className="font-semibold">Competitive</TableHead>
                <TableHead className="font-semibold">AI Confidence</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => {
                const PriorityIcon = priorityConfig[lead.priority].icon;
                return (
                  <TableRow key={lead.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-bold text-primary">
                            {lead.company.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{lead.company}</p>
                          <p className="text-sm text-muted-foreground">{lead.industry}</p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge className={`gap-1.5 ${priorityConfig[lead.priority].className}`}>
                        <PriorityIcon className="h-3.5 w-3.5" />
                        {priorityConfig[lead.priority].label}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <div className="flex gap-2">
                        {lead.temporalSignals.slice(0, 3).map((signal, idx) => {
                          const Icon = signalIcons[signal.type];
                          return (
                            <Tooltip key={idx}>
                              <TooltipTrigger>
                                <div className="p-2 rounded-md bg-muted hover:bg-muted/70 transition-colors">
                                  <Icon className="h-4 w-4 text-foreground" />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="font-medium">{signal.label}</p>
                                <p className="text-xs text-muted-foreground">{signal.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          );
                        })}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex gap-2">
                        {lead.relationships.slice(0, 3).map((rel, idx) => {
                          const Icon = relationshipIcons[rel.type];
                          return (
                            <Tooltip key={idx}>
                              <TooltipTrigger>
                                <div className="p-2 rounded-md bg-muted hover:bg-muted/70 transition-colors">
                                  <Icon className="h-4 w-4 text-foreground" />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="font-medium">{rel.label}</p>
                                <p className="text-xs text-muted-foreground">{rel.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          );
                        })}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex gap-2">
                        {lead.competitiveContext.map((comp, idx) => {
                          const Icon = competitiveIcons[comp.type];
                          return (
                            <Tooltip key={idx}>
                              <TooltipTrigger>
                                <div className="p-2 rounded-md bg-muted hover:bg-muted/70 transition-colors">
                                  <Icon className="h-4 w-4 text-foreground" />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="font-medium">{comp.label}</p>
                                <p className="text-xs text-muted-foreground">{comp.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          );
                        })}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-semibold ${getConfidenceColor(lead.aiConfidence)}`}>
                            {lead.aiConfidence}%
                          </span>
                        </div>
                        <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all ${getConfidenceBarColor(lead.aiConfidence)}`}
                            style={{ width: `${lead.aiConfidence}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex gap-2 justify-end">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="gap-2"
                          onClick={() => setSelectedLead(lead)}
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </Button>
                        <Button 
                          size="sm"
                          className="gap-2 bg-primary hover:bg-primary-hover"
                        >
                          Contact
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </TooltipProvider>

      <LeadDetailModal 
        lead={selectedLead} 
        onClose={() => setSelectedLead(null)} 
      />
    </>
  );
}
