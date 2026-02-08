"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Stepper, Step, StepLabel } from "@/components/ui/steps";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import ParticipantSelector from './checkbox.jsx';
import PerformanceMetricSelector from './performance.jsx';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ChevronLeft, ChevronRight, UploadCloud } from "lucide-react";

const jobSchema = z.object({
  jobName: z.string().min(3, "Job name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  participants: z.array(z.string()).min(1, "Select at least one participant"),
  configFile: z.any().optional(),
  metrics: z.array(z.string()).min(1, "Select at least one metric"),
});

const PARTICIPANTS = [
  { id: "aumc", name: "AUMC", description: "GPU Enabled", status: "approved" },
  { id: "barts", name: "BARTS", description: "GPU Enabled", status: "approved" },
  { id: "mrc", name: "MRC-GAMBIA", description: "GPU Enabled", status: "approved" },
  { id: "apollo", name: "APOLLO", description: "GPU Enabled", status: "approved" },
  { id: "cuh", name: "CUH", description: "CPU Only", status: "awaiting" },
  { id: "uclh", name: "UCLH", description: "CPU Only", status: "awaiting" },
];

const METRICS = [
  { id: "acc", label: "Accuracy" },
  { id: "pr", label: "Precision & Recall" },
  { id: "roc", label: "ROC Curve" },
  { id: "f1", label: "F1 Score" },
  { id: "loss", label: "Training Loss" },
];

const FederatedLearningJobWizard = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      jobName: "",
      description: "",
      participants: [],
      metrics: ["acc"],
    }
  });

  const steps = [
    { label: "Configuration", desc: "Job basic info & participants" },
    { label: "Training", desc: "Configuration & validation" },
    { label: "Evaluation", desc: "Performance metrics" },
  ];

  const handleNext = async () => {
    // Only validate fields relevant to the current step if needed, 
    // but for simplicity in this mockup we just proceed
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const onValidateConfig = () => {
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      setValidationResult({ type: "success", message: "YAML configuration is valid and compatible with selected participants." });
    }, 1500);
  };

  const onSubmit = (data) => {
    console.log("Submitting FL Job:", data);
    toast({
      title: "FL Job Created Successfully",
      description: (
        <div className="mt-2 w-full rounded-md bg-slate-950 p-4">
          <p className="text-primary-foreground font-mono text-xs">Job ID: FL-{Math.floor(Math.random() * 10000)}</p>
          <p className="text-slate-400 text-[10px] mt-1">Status: Initializing training rounds...</p>
        </div>
      ),
    });
    setActiveStep(steps.length);
  };

  const participantsValue = watch("participants");
  const metricsValue = watch("metrics");

  return (
    <div className="w-full max-w-5xl mx-auto py-6">
      <div className="mb-8">
        <Stepper current={activeStep} direction={isTablet ? "vertical" : "horizontal"}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>
                <div className="flex flex-col">
                  <span className="text-sm font-bold">{step.label}</span>
                  {!isTablet && <span className="text-[10px] text-default-500 font-medium">{step.desc}</span>}
                </div>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      <Card className="border-none shadow-xl bg-background/60 backdrop-blur-md">
        <CardContent className="p-8">
          {activeStep === steps.length ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-20 w-20 bg-success/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="h-10 w-10 text-success" />
              </div>
              <h2 className="text-2xl font-bold text-default-900 mb-2">Job Successfully Created!</h2>
              <p className="text-default-500 max-w-md mb-8">
                Your Federated Learning job has been initialized. You can monitor the progress of each training round in the dashboard.
              </p>
              <Button onClick={() => window.location.reload()} size="lg" className="rounded-full px-8">
                Go to Dashboard
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              {activeStep === 0 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="jobName">Job Name</Label>
                      <Controller
                        name="jobName"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="e.g. Brain Tumor Segmentation Round 1"
                            className={cn(errors.jobName && "border-destructive")}
                          />
                        )}
                      />
                      {errors.jobName && <p className="text-[10px] text-destructive font-medium">{errors.jobName.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Short Description</Label>
                      <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="Briefly explain the goal of this task"
                            className={cn(errors.description && "border-destructive")}
                          />
                        )}
                      />
                      {errors.description && <p className="text-[10px] text-destructive font-medium">{errors.description.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <Label className="text-sm font-bold">Select Participants</Label>
                      <span className="text-[10px] text-default-500 font-bold">{participantsValue.length} Selected</span>
                    </div>
                    <ParticipantSelector
                      participants={PARTICIPANTS}
                      selectedParticipants={participantsValue}
                      onToggleParticipant={(id) => {
                        const next = participantsValue.includes(id)
                          ? participantsValue.filter(p => p !== id)
                          : [...participantsValue, id];
                        setValue("participants", next, { shouldValidate: true });
                      }}
                    />
                    {errors.participants && <p className="text-[10px] text-destructive font-medium">{errors.participants.message}</p>}
                  </div>
                </div>
              )}

              {activeStep === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="p-12 border-2 border-dashed border-default-200 rounded-xl bg-default-50/50 flex flex-col items-center justify-center text-center group hover:border-primary/50 transition-colors cursor-pointer">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <UploadCloud className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="text-sm font-bold text-default-900">Upload FL Configuration</h4>
                    <p className="text-xs text-default-500 mt-1 mb-4 max-w-xs">
                      Drop your task-config.yaml file here or click to browse. This file defines model architecture and hyper-parameters.
                    </p>
                    <Button variant="outline" size="sm" type="button" className="rounded-full px-6">
                      Select YAML File
                    </Button>
                  </div>

                  <div className="flex flex-col items-center gap-4">
                    <Button
                      type="button"
                      variant="soft"
                      color="info"
                      onClick={onValidateConfig}
                      disabled={isValidating}
                      className="rounded-full"
                    >
                      {isValidating ? "Validating Schema..." : "Validate Configuration Template"}
                    </Button>

                    {validationResult && (
                      <Alert variant="soft" color={validationResult.type} className="max-w-md animate-in zoom-in-95">
                        <AlertDescription className="text-xs font-medium">
                          {validationResult.message}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <Label className="text-sm font-bold">Performance Metrics</Label>
                      <p className="text-[10px] text-default-500 font-medium">Choose how you want to evaluate the global model across training rounds.</p>
                    </div>
                    <PerformanceMetricSelector
                      metrics={METRICS}
                      selectedMetrics={metricsValue}
                      onToggleMetric={(id) => {
                        const next = metricsValue.includes(id)
                          ? metricsValue.filter(m => m !== id)
                          : [...metricsValue, id];
                        setValue("metrics", next, { shouldValidate: true });
                      }}
                    />
                    {errors.metrics && <p className="text-[10px] text-destructive font-medium">{errors.metrics.message}</p>}
                  </div>

                  <div className="bg-default-50 p-6 rounded-xl border border-default-100">
                    <h5 className="text-xs font-bold text-default-900 mb-3 uppercase tracking-wider">Job Summary</h5>
                    <div className="grid grid-cols-2 gap-y-3">
                      <div>
                        <p className="text-[10px] text-default-400 font-bold uppercase">Job Name</p>
                        <p className="text-xs font-medium text-default-700">{watch("jobName") || "Not set"}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-default-400 font-bold uppercase">Participants</p>
                        <p className="text-xs font-medium text-default-700">{participantsValue.length} nodes ready</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-default-400 font-bold uppercase">Config Status</p>
                        <p className="text-xs font-medium text-success flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Validated
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-default-400 font-bold uppercase">Metrics</p>
                        <p className="text-xs font-medium text-default-700">{metricsValue.length} active</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center mt-12 pt-6 border-t border-default-100">
                <Button
                  type="button"
                  size="md"
                  variant="ghost"
                  onClick={handleBack}
                  className={cn("rounded-full px-6", activeStep === 0 && "invisible")}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous Step
                </Button>

                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    size="lg"
                    color="success"
                    className="rounded-full px-10 shadow-lg shadow-success/20"
                  >
                    Launch FL Job
                  </Button>
                ) : (
                  <Button
                    type="button"
                    size="lg"
                    onClick={handleNext}
                    className="rounded-full px-10 shadow-lg shadow-primary/20"
                  >
                    Next Step
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FederatedLearningJobWizard;