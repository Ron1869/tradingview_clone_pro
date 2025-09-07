import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const MarketOverviewWidget = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [selectedSegment, setSelectedSegment] = useState('all');

  const timeframes = [
    { value: '1H', label: '1 час' },
    { value: '4H', label: '4 часа' },
    { value: '1D', label: '1 день' },
    { value: '1W', label: '1 неделя' },
    { value: '1M', label: '1 месяц' }
  ];

  const segments = [
    { value: 'all', label: 'Все сектора' },
    { value: 'tech', label: 'Технологии' },
    { value: 'finance', label: 'Финансы' },
    { value: 'energy', label: 'Энергетика' },
    { value: 'healthcare', label: 'Здравоохранение' }
  ];

  const marketData = [
    {
      sector: 'Технологии',
      change: '+2.34%',
      value: '₽125,430',
      volume: '₽2.4М',
      trend: 'up',
      instruments: 45
    },
    {
      sector: 'Финансы',
      change: '+1.87%',
      value: '₽89,250',
      volume: '₽1.8М',
      trend: 'up',
      instruments: 32
    },
    {
      sector: 'Энергетика',
      change: '-0.45%',
      value: '₽67,890',
      volume: '₽1.2М',
      trend: 'down',
      instruments: 28
    },
    {
      sector: 'Здравоохранение',
      change: '+0.89%',
      value: '₽54,320',
      volume: '₽890К',
      trend: 'up',
      instruments: 21
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Обзор рынка</h3>
        <div className="flex items-center space-x-2">
          <Select
            options={timeframes}
            value={selectedTimeframe}
            onChange={setSelectedTimeframe}
            className="w-24"
          />
          <Select
            options={segments}
            value={selectedSegment}
            onChange={setSelectedSegment}
            className="w-32"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => console.log('Refresh market data')}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="RefreshCw" size={16} />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {marketData?.map((sector, index) => (
          <div key={index} className="bg-muted/20 rounded-md p-3 hover:bg-muted/30 transition-colors duration-150">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-foreground">{sector?.sector}</h4>
              <Icon 
                name={sector?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
                className={sector?.trend === 'up' ? 'text-success' : 'text-error'}
              />
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Изменение:</span>
                <span className={`text-sm font-mono ${
                  sector?.trend === 'up' ? 'text-success' : 'text-error'
                }`}>
                  {sector?.change}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Стоимость:</span>
                <span className="text-sm font-mono text-foreground">{sector?.value}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Объём:</span>
                <span className="text-sm font-mono text-foreground">{sector?.volume}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Инструменты:</span>
                <span className="text-sm text-foreground">{sector?.instruments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Последнее обновление: {new Date()?.toLocaleTimeString('ru-RU')}</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span>Рынок открыт</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketOverviewWidget;