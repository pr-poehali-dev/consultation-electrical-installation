import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [roomArea, setRoomArea] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [complexity, setComplexity] = useState('');
  const [totalCost, setTotalCost] = useState(0);

  const services = [
    {
      icon: 'Zap',
      title: 'Проектирование электросетей',
      description: 'Разработка полного проекта электроснабжения для квартир, домов и коммерческих помещений',
      price: 'от 5 000 ₽'
    },
    {
      icon: 'Home',
      title: 'Электромонтаж в квартире',
      description: 'Консультация по электромонтажу в жилых помещениях: розетки, освещение, автоматика',
      price: 'от 3 000 ₽'
    },
    {
      icon: 'Building2',
      title: 'Коммерческий электромонтаж',
      description: 'Консультации по электроснабжению офисов, магазинов и производственных объектов',
      price: 'от 8 000 ₽'
    },
    {
      icon: 'FileText',
      title: 'Экспертиза проектов',
      description: 'Проверка готовых проектов на соответствие нормам и стандартам безопасности',
      price: 'от 4 000 ₽'
    },
    {
      icon: 'Shield',
      title: 'Аудит электробезопасности',
      description: 'Оценка существующих электросетей и рекомендации по улучшению безопасности',
      price: 'от 6 000 ₽'
    },
    {
      icon: 'Lightbulb',
      title: 'Консультация онлайн',
      description: 'Удаленная консультация по видеосвязи с разбором чертежей и схем',
      price: 'от 2 000 ₽'
    }
  ];

  const calculateCost = () => {
    let baseCost = 0;
    
    switch(serviceType) {
      case 'design':
        baseCost = 5000;
        break;
      case 'apartment':
        baseCost = 3000;
        break;
      case 'commercial':
        baseCost = 8000;
        break;
      case 'expertise':
        baseCost = 4000;
        break;
      case 'audit':
        baseCost = 6000;
        break;
      case 'online':
        baseCost = 2000;
        break;
      default:
        baseCost = 0;
    }

    const area = parseFloat(roomArea) || 0;
    const areaCost = area * 100;

    let complexityMultiplier = 1;
    switch(complexity) {
      case 'low':
        complexityMultiplier = 1;
        break;
      case 'medium':
        complexityMultiplier = 1.5;
        break;
      case 'high':
        complexityMultiplier = 2;
        break;
    }

    const materialsCost = area * 50;
    const total = (baseCost + areaCost + materialsCost) * complexityMultiplier;
    
    setTotalCost(Math.round(total));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Zap" className="text-primary" size={32} />
            <h1 className="text-2xl font-heading font-bold">ЭлектроКонсалт</h1>
          </div>
          <Button>Связаться с нами</Button>
        </div>
      </header>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-5xl font-heading font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Консультации по электромонтажу
          </h2>
          <p className="text-xl text-muted-foreground">
            Профессиональные консультации по проектированию и монтажу электрических сетей. 
            Безопасность, качество и соответствие стандартам.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-scale-in border-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name={service.icon} className="text-primary" size={28} />
                </div>
                <CardTitle className="font-heading">{service.title}</CardTitle>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary">{service.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="max-w-4xl mx-auto shadow-2xl border-2 animate-fade-in">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-heading mb-2">Калькулятор стоимости</CardTitle>
            <CardDescription className="text-base">
              Рассчитайте предварительную стоимость консультации и материалов
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="service" className="text-base font-medium">Тип услуги</Label>
                <Select onValueChange={setServiceType}>
                  <SelectTrigger id="service" className="h-12">
                    <SelectValue placeholder="Выберите услугу" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="design">Проектирование электросетей</SelectItem>
                    <SelectItem value="apartment">Электромонтаж в квартире</SelectItem>
                    <SelectItem value="commercial">Коммерческий электромонтаж</SelectItem>
                    <SelectItem value="expertise">Экспертиза проектов</SelectItem>
                    <SelectItem value="audit">Аудит электробезопасности</SelectItem>
                    <SelectItem value="online">Консультация онлайн</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="area" className="text-base font-medium">Площадь помещения (м²)</Label>
                <Input
                  id="area"
                  type="number"
                  placeholder="Введите площадь"
                  value={roomArea}
                  onChange={(e) => setRoomArea(e.target.value)}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="complexity" className="text-base font-medium">Сложность работ</Label>
                <Select onValueChange={setComplexity}>
                  <SelectTrigger id="complexity" className="h-12">
                    <SelectValue placeholder="Выберите сложность" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Низкая</SelectItem>
                    <SelectItem value="medium">Средняя</SelectItem>
                    <SelectItem value="high">Высокая</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button 
                  onClick={calculateCost} 
                  className="w-full h-12 text-lg"
                  disabled={!serviceType || !roomArea || !complexity}
                >
                  <Icon name="Calculator" className="mr-2" size={20} />
                  Рассчитать
                </Button>
              </div>
            </div>

            {totalCost > 0 && (
              <Card className="bg-primary/5 border-primary/20 animate-scale-in">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-2 text-lg">Предварительная стоимость</p>
                    <p className="text-5xl font-bold text-primary font-heading">{totalCost.toLocaleString('ru-RU')} ₽</p>
                    <p className="text-sm text-muted-foreground mt-4">
                      * Итоговая стоимость может отличаться после детальной консультации
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </section>

      <footer className="border-t bg-secondary text-secondary-foreground mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Zap" size={24} />
              <span className="font-heading font-semibold">ЭлектроКонсалт © 2024</span>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Phone" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Mail" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="MessageCircle" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
