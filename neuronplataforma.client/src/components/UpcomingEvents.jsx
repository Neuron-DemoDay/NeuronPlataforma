import React from 'react';
import { Calendar, FileText, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/Ui/Card";

const events = [
  {
    icon: Calendar,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
    title: "Prova de Matemática",
    date: "15 de Maio, 2024 • 10:00"
  },
  {
    icon: FileText,
    iconBg: "bg-green-100",
    iconColor: "text-green-500",
    title: "Entrega do Trabalho de História",
    date: "20 de Maio, 2024 • 23:59"
  },
  {
    icon: Users,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-500",
    title: "Apresentação em Grupo - Biologia",
    date: "25 de Maio, 2024 • 14:30"
  }
];

export function UpcomingEvents() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Próximos Eventos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className={`${event.iconBg} p-3 rounded-full`}>
              <event.icon className={`w-5 h-5 ${event.iconColor}`} />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-sm">{event.title}</h3>
              <p className="text-sm text-muted-foreground">{event.date}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

