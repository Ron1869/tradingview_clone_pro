import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TopMoversWidget = () => {
  const [activeTab, setActiveTab] = useState('gainers');

  const gainers = [
    {
      symbol: 'SBER',
      name: 'Сбербанк',
      price: '₽285.40',
      change: '+12.45%',
      changeValue: '+₽31.60',
      volume: '₽2.1М'
    },
    {
      symbol: 'GAZP',
      name: 'Газпром',
      price: '₽156.80',
      change: '+8.92%',
      changeValue: '+₽12.90',
      volume: '₽1.8М'
    },
    {
      symbol: 'LKOH',
      name: 'ЛУКОЙЛ',
      price: '₽6,245.00',
      change: '+7.34%',
      changeValue: '+₽427.50',
      volume: '₽1.5М'
    },
    {
      symbol: 'ROSN',
      name: 'Роснефть',
      price: '₽542.30',
      change: '+6.78%',
      changeValue: '+₽34.50',
      volume: '₽1.2М'
    }
  ];

  const losers = [
    {
      symbol: 'YNDX',
      name: 'Яндекс',
      price: '₽2,845.60',
      change: '-5.67%',
      changeValue: '-₽170.90',
      volume: '₽980К'
    },
    {
      symbol: 'MTSS',
      name: 'МТС',
      price: '₽289.50',
      change: '-4.23%',
      changeValue: '-₽12.80',
      volume: '₽750К'
    },
    {
      symbol: 'MGNT',
      name: 'Магнит',
      price: '₽5,234.00',
      change: '-3.89%',
      changeValue: '-₽212.00',
      volume: '₽650К'
    },
    {
      symbol: 'NVTK',
      name: 'НОВАТЭК',
      price: '₽1,156.70',
      change: '-3.45%',
      changeValue: '-₽41.30',
      volume: '₽580К'
    }
  ];

  const volumeLeaders = [
    {
      symbol: 'SBER',
      name: 'Сбербанк',
      price: '₽285.40',
      change: '+12.45%',
      volume: '₽2.1М',
      trades: '15,432'
    },
    {
      symbol: 'GAZP',
      name: 'Газпром',
      price: '₽156.80',
      change: '+8.92%',
      volume: '₽1.8М',
      trades: '12,876'
    },
    {
      symbol: 'LKOH',
      name: 'ЛУКОЙЛ',
      price: '₽6,245.00',
      change: '+7.34%',
      volume: '₽1.5М',
      trades: '9,543'
    },
    {
      symbol: 'YNDX',
      name: 'Яндекс',
      price: '₽2,845.60',
      change: '-5.67%',
      volume: '₽980К',
      trades: '8,234'
    }
  ];

  const getCurrentData = () => {
    switch (activeTab) {
      case 'gainers':
        return gainers;
      case 'losers':
        return losers;
      case 'volume':
        return volumeLeaders;
      default:
        return gainers;
    }
  };

  const tabs = [
    { id: 'gainers', label: 'Лидеры роста', icon: 'TrendingUp' },
    { id: 'losers', label: 'Лидеры падения', icon: 'TrendingDown' },
    { id: 'volume', label: 'По объёму', icon: 'BarChart3' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Топ движения</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => console.log('View all movers')}
          className="text-muted-foreground hover:text-foreground"
        >
          <Icon name="ExternalLink" size={16} />
        </Button>
      </div>
      <div className="flex space-x-1 mb-4 bg-muted/20 rounded-md p-1">
        {tabs?.map((tab) => (
          <Button
            key={tab?.id}
            variant={activeTab === tab?.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab(tab?.id)}
            className={`flex-1 text-xs ${
              activeTab === tab?.id 
                ? 'bg-primary text-primary-foreground' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={14} className="mr-1" />
            {tab?.label}
          </Button>
        ))}
      </div>
      <div className="space-y-2">
        {getCurrentData()?.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-2 hover:bg-muted/20 rounded-md transition-colors duration-150 cursor-pointer"
            onClick={() => console.log(`Selected ${item?.symbol}`)}
          >
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-foreground">{item?.symbol}</span>
                <span className="text-xs text-muted-foreground truncate">{item?.name}</span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-sm font-mono text-foreground">{item?.price}</span>
                {activeTab !== 'volume' && (
                  <span className="text-xs text-muted-foreground">{item?.changeValue}</span>
                )}
              </div>
            </div>
            
            <div className="text-right">
              <div className={`text-sm font-mono ${
                activeTab === 'losers' ? 'text-error' : 
                activeTab === 'gainers'? 'text-success' : item?.change?.startsWith('+') ? 'text-success' : 'text-error'
              }`}>
                {item?.change}
              </div>
              <div className="text-xs text-muted-foreground">
                {activeTab === 'volume' ? `${item?.trades} сделок` : item?.volume}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          onClick={() => console.log('Add to watchlist')}
          className="w-full text-xs"
        >
          <Icon name="Plus" size={14} className="mr-1" />
          Добавить в список наблюдения
        </Button>
      </div>
    </div>
  );
};

export default TopMoversWidget;