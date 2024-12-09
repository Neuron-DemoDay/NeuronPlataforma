import React from 'react';
import { TrendingDown, TrendingUp, BarChart } from 'lucide-react'; // Adicionando o ícone de gráfico
import { Card, CardContent, CardHeader, CardTitle } from "../components/Ui/Card";

const subjects = [
  {
    name: "Matemática",
    grade: 8.5,
    trending: "up",
    iconBg: "bg-green-100",
    iconColor: "text-green-500"
  },
  {
    name: "Português",
    grade: 7.8,
    trending: "down",
    iconBg: "bg-red-100",
    iconColor: "text-red-500"
  },
  {
    name: "História",
    grade: 9.0,
    trending: "up",
    iconBg: "bg-green-100",
    iconColor: "text-green-500"
  },
  {
    name: "Física",
    grade: 7.5,
    trending: "neutral", // Física está marcada como "neutral"
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-500",
    isGraph: true // Adicionamos essa flag para diferenciar Física
  },
  {
    name: "Química",
    grade: 8.2,
    trending: "up",
    iconBg: "bg-green-100",
    iconColor: "text-green-500"
  }
];

export function RecentPerformance() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Desempenho Recente</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {subjects.map((subject, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className={`${subject.iconBg} p-2 rounded-full`}>
              {subject.isGraph ? ( // Condicional para Física
                <BarChart className={`w-4 h-4 ${subject.iconColor}`} />
              ) : subject.trending === "up" ? (
                <TrendingUp className={`w-4 h-4 ${subject.iconColor}`} />
              ) : subject.trending === "down" ? (
                <TrendingDown className={`w-4 h-4 ${subject.iconColor}`} />
              ) : (
                <div className={`w-4 h-4 ${subject.iconColor}`} />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-sm">{subject.name}</h3>
              <p className="text-sm text-muted-foreground">Última nota</p>
            </div>
            <span className="text-xl font-semibold">{subject.grade.toFixed(1)}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
