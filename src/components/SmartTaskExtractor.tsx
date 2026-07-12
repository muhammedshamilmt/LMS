import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Calendar, CheckCircle2, MessageSquare, ArrowRight } from "lucide-react";

export function SmartTaskExtractor() {
  return (
    <div className="w-full max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Left Section - Copy & Value Proposition */}
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          <span>AI Task Detection</span>
        </div>
        
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
          Stop losing tasks inside conversations
        </h2>
        
        <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
          Automatically detect action items, follow-ups, and assignments from Slack, email, meetings, and team threads — without manually creating tasks.
        </p>

        <div className="pt-4 flex items-center gap-4">
          <button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
            Try it now
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Right Section - Visual Demonstration suitable for LMS */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl blur-3xl -z-10" />
        
        <div className="space-y-6 relative">
          {/* Mock Message Source */}
          <Card className="bg-card/80 backdrop-blur-sm border-muted shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    MJ
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Marcus Johnson</h4>
                    <p className="text-xs text-muted-foreground">Yesterday, 3:00 PM</p>
                  </div>
                </div>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  #onboarding
                </Badge>
              </div>
              <div className="text-sm text-foreground/80 space-y-2">
                <p>Hey Tailor,</p>
                <p>After reviewing the onboarding analytics from last week, I noticed that nearly 38% of users are dropping off during the workspace setup step.</p>
                <p>A few things we should prioritize this week:</p>
                <p className="bg-primary/10 text-primary p-1 rounded font-medium inline-block">
                  Update the onboarding copy to make the setup instructions clearer
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Extracted Task Output */}
          <div className="flex justify-center -my-2 relative z-10">
            <div className="bg-background border shadow-sm rounded-full p-2">
              <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            </div>
          </div>

          <Card className="border-primary/20 shadow-md bg-card/95 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
                    <h3 className="font-semibold text-base">Update onboarding copy</h3>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground ml-7">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>25-May-2026</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 ml-7 flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-background">SaaS</Badge>
                <Badge variant="outline" className="bg-background">Onboarding</Badge>
                <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/20">
                  LMS Content
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
