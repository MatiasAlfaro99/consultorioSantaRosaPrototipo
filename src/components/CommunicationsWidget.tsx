import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { FileText, ArrowRight } from 'lucide-react';

interface Communication {
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
}

export function CommunicationsWidget() {
  const communications: Communication[] = [
    {
      id: '1',
      title: 'Actualización Protocolo de Atención COVID-19',
      author: 'Dirección CESFAM',
      date: '23 Oct 2025',
      category: 'Protocolo'
    },
    {
      id: '2',
      title: 'Jornada de Capacitación Personal - Noviembre 2025',
      author: 'RR.HH.',
      date: '22 Oct 2025',
      category: 'Capacitación'
    },
    {
      id: '3',
      title: 'Modificación Horarios de Atención - Feriado',
      author: 'Dirección CESFAM',
      date: '20 Oct 2025',
      category: 'Informativo'
    },
    {
      id: '4',
      title: 'Resultados Evaluación de Desempeño Q3 2025',
      author: 'RR.HH.',
      date: '18 Oct 2025',
      category: 'Evaluación'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Protocolo':
        return 'bg-red-100 text-red-700 hover:bg-red-100';
      case 'Capacitación':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      case 'Informativo':
        return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
      case 'Evaluación':
        return 'bg-purple-100 text-purple-700 hover:bg-purple-100';
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-900">Últimos Comunicados Oficiales</h3>
        <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
          {communications.length} Nuevos
        </Badge>
      </div>

      <ScrollArea className="h-[320px] pr-4">
        <div className="space-y-3">
          {communications.map((comm) => (
            <div
              key={comm.id}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">
                    {comm.title}
                  </h4>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-xs text-gray-600">{comm.author}</p>
                    <span className="text-xs text-gray-400">•</span>
                    <p className="text-xs text-gray-500">{comm.date}</p>
                  </div>
                  <div className="mt-2">
                    <Badge className={getCategoryColor(comm.category)}>
                      {comm.category}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <Button variant="outline" className="w-full mt-4 border-blue-200 text-blue-700 hover:bg-blue-50">
        Ver Tablón Completo
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </Card>
  );
}
