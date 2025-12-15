import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const Index = () => {
  const consultationPackages = [
    {
      icon: 'MessageSquare',
      title: 'Базовая консультация',
      duration: '30 минут',
      description: 'Ответы на вопросы по электромонтажу, общие рекомендации',
      features: [
        'Видеосвязь или телефон',
        'Ответы на 3-5 вопросов',
        'Общие рекомендации',
        'Запись консультации'
      ],
      basePrice: 1500,
      category: 'basic'
    },
    {
      icon: 'FileText',
      title: 'Разбор проекта',
      duration: '60 минут',
      description: 'Детальный анализ вашего проекта или схемы электромонтажа',
      features: [
        'Видеоконференция',
        'Анализ схем и чертежей',
        'Выявление ошибок',
        'Письменные рекомендации',
        'Повторная связь в течение недели'
      ],
      basePrice: 3500,
      category: 'standard'
    },
    {
      icon: 'ShieldCheck',
      title: 'Экспертная оценка',
      duration: '90 минут',
      description: 'Полная экспертиза с расчетами и детальным отчетом',
      features: [
        'Видеоконференция',
        'Анализ всей документации',
        'Расчет нагрузок',
        'Проверка по нормам ПУЭ',
        'Развернутый отчет PDF',
        'Поддержка 2 недели'
      ],
      basePrice: 6000,
      category: 'premium'
    },
    {
      icon: 'Wrench',
      title: 'Помощь в монтаже',
      duration: '45 минут',
      description: 'Консультация в процессе выполнения работ',
      features: [
        'Видеосвязь в реальном времени',
        'Подсказки по ходу работы',
        'Советы по инструментам',
        'Проверка результата'
      ],
      basePrice: 2500,
      category: 'basic'
    },
    {
      icon: 'Calculator',
      title: 'Расчет сметы',
      duration: '60 минут',
      description: 'Помощь в расчете стоимости материалов и работ',
      features: [
        'Видеоконференция',
        'Подбор материалов',
        'Расчет количества',
        'Смета в Excel',
        'Советы по оптимизации'
      ],
      basePrice: 4000,
      category: 'standard'
    },
    {
      icon: 'GraduationCap',
      title: 'Обучающая сессия',
      duration: '120 минут',
      description: 'Подробное обучение основам электромонтажа',
      features: [
        'Видеоконференция',
        'Теория и практика',
        'Разбор кейсов',
        'Обучающие материалы',
        'Сертификат участника',
        'Доступ к записи'
      ],
      basePrice: 7500,
      category: 'premium'
    }
  ];

  const [selectedCards, setSelectedCards] = useState<{[key: number]: {urgency: string, complexity: string, price: number}}>({});

  const calculatePrice = (basePrice: number, urgency: string, complexity: string) => {
    let price = basePrice;
    
    if (urgency === 'urgent') price *= 1.5;
    if (urgency === 'express') price *= 2;
    
    if (complexity === 'medium') price *= 1.3;
    if (complexity === 'high') price *= 1.7;
    
    return Math.round(price);
  };

  const updateCardCalculation = (index: number, urgency: string, complexity: string, basePrice: number) => {
    const price = calculatePrice(basePrice, urgency, complexity);
    setSelectedCards({
      ...selectedCards,
      [index]: { urgency, complexity, price }
    });
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'basic': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'standard': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'premium': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryName = (category: string) => {
    switch(category) {
      case 'basic': return 'Базовый';
      case 'standard': return 'Стандарт';
      case 'premium': return 'Премиум';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Zap" className="text-primary" size={32} />
            <h1 className="text-2xl font-heading font-bold">ЭлектроКонсалт Онлайн</h1>
          </div>
          <Button>Забронировать консультацию</Button>
        </div>
      </header>

      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-5xl font-heading font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Онлайн-консультации по электромонтажу
          </h2>
          <p className="text-xl text-muted-foreground">
            Получите профессиональную консультацию, не выходя из дома. 
            Выберите пакет услуг и рассчитайте стоимость с учетом ваших требований.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {consultationPackages.map((pkg, index) => {
            const cardData = selectedCards[index];
            const hasCalculation = cardData && cardData.urgency && cardData.complexity;
            
            return (
              <Card 
                key={index} 
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-scale-in border-2 flex flex-col"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="flex-grow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon name={pkg.icon} className="text-primary" size={28} />
                    </div>
                    <Badge className={`${getCategoryColor(pkg.category)} border`}>
                      {getCategoryName(pkg.category)}
                    </Badge>
                  </div>
                  
                  <CardTitle className="font-heading text-xl mb-2">{pkg.title}</CardTitle>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon name="Clock" className="text-muted-foreground" size={16} />
                    <span className="text-sm text-muted-foreground">{pkg.duration}</span>
                  </div>
                  <CardDescription className="text-base mb-4">{pkg.description}</CardDescription>
                  
                  <div className="space-y-2">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Icon name="Check" className="text-primary mt-0.5 flex-shrink-0" size={16} />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 border-t pt-6">
                  <div className="text-center mb-4">
                    <p className="text-sm text-muted-foreground mb-1">Базовая цена</p>
                    <p className="text-3xl font-bold text-primary">{pkg.basePrice.toLocaleString('ru-RU')} ₽</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Срочность</label>
                      <Select onValueChange={(value) => {
                        const complexity = cardData?.complexity || '';
                        if (complexity) updateCardCalculation(index, value, complexity, pkg.basePrice);
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите срочность" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Обычная (в течение недели)</SelectItem>
                          <SelectItem value="urgent">Срочная (+50%)</SelectItem>
                          <SelectItem value="express">Экспресс (+100%)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Сложность задачи</label>
                      <Select onValueChange={(value) => {
                        const urgency = cardData?.urgency || '';
                        if (urgency) updateCardCalculation(index, urgency, value, pkg.basePrice);
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите сложность" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Низкая</SelectItem>
                          <SelectItem value="medium">Средняя (+30%)</SelectItem>
                          <SelectItem value="high">Высокая (+70%)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {hasCalculation && (
                    <Card className="bg-primary/5 border-primary/20 animate-scale-in">
                      <CardContent className="p-4">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground mb-1">Ваша стоимость</p>
                          <p className="text-3xl font-bold text-primary">{cardData.price.toLocaleString('ru-RU')} ₽</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <Button className="w-full" disabled={!hasCalculation}>
                    <Icon name="Calendar" className="mr-2" size={18} />
                    Записаться
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="mt-16 bg-secondary/10 border-secondary/20 animate-fade-in">
          <CardContent className="p-8 text-center">
            <Icon name="Info" className="mx-auto mb-4 text-primary" size={40} />
            <h3 className="text-2xl font-heading font-bold mb-3">Как проходит консультация?</h3>
            <div className="grid md:grid-cols-3 gap-6 mt-8 text-left">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">1</div>
                <div>
                  <h4 className="font-semibold mb-1">Выберите пакет</h4>
                  <p className="text-sm text-muted-foreground">Укажите срочность и сложность для расчета точной стоимости</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">2</div>
                <div>
                  <h4 className="font-semibold mb-1">Забронируйте время</h4>
                  <p className="text-sm text-muted-foreground">Выберите удобное время для видеоконсультации</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">3</div>
                <div>
                  <h4 className="font-semibold mb-1">Получите результат</h4>
                  <p className="text-sm text-muted-foreground">Профессиональные рекомендации и материалы по итогам</p>
                </div>
              </div>
            </div>
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