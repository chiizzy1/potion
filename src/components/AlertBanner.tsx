"use client";

import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X } from "lucide-react";
import { alerts } from "@/lib/data";
import { Button } from "./ui/button";

export function AlertBanner() {
  const [closedAlerts, setClosedAlerts] = useState<string[]>([]);

  const handleClose = (id: string) => {
    setClosedAlerts([...closedAlerts, id]);
  };

  const visibleAlerts = alerts.filter((alert) => !closedAlerts.includes(alert.id));

  if (visibleAlerts.length === 0) return null;

  return (
    <div className="space-y-2 mb-4">
      {visibleAlerts.map((alert) => (
        <Alert key={alert.id} variant={alert.type === "warning" ? "destructive" : "default"}>
          <div className="flex justify-between items-center">
            <AlertDescription>{alert.message}</AlertDescription>
            {alert.isCloseable && (
              <Button variant="ghost" size="icon" className="h-4 w-4" onClick={() => handleClose(alert.id)}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </Alert>
      ))}
    </div>
  );
}
