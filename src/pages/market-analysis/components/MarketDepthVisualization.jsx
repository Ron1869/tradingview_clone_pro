import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const MarketDepthVisualization = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('SBER');
  const [viewMode, setViewMode] = useState('depth');

  const symbols = [
    { value: 'SBER', label: 'SBER - Сбербанк' },
    { value: 'GAZP', label: 'GAZP - Газпром' },
    { value: 'LKOH', label: 'LKOH - ЛУКОЙЛ' },
    { value: 'YNDX', label: 'YNDX - Яндекс' }
  ];

  const viewModes = [
    { value: 'depth', label: 'Глубина рынка' },
    { value: 'volume', label: 'Профиль объёма' },
    { value: 'flow', label: 'Поток ордеров' }
  ];

  const orderBookData = {
    bids: [
      { price: '₽285.35', volume: '1,250', total: '1,250' },
      { price: '₽285.30', volume: '2,100', total: '3,350' },
      { price: '₽285.25', volume: '1,800', total: '5,150' },
      { price: '₽285.20', volume: '3,200', total: '8,350' },
      { price: '₽285.15', volume: '2,500', total: '10,850' },
      { price: '₽285.10', volume: '1,900', total: '12,750' },
      { price: '₽285.05', volume: '2,800', total: '15,550' }
    ],
    asks: [
      { price: '₽285.40', volume: '1,100', total: '1,100' },
      { price: '₽285.45', volume: '1,850', total: '2,950' },
      { price: '₽285.50', volume: '2,200', total: '5,150' },
      { price: '₽285.55', volume: '1,600', total: '6,750' },
      { price: '₽285.60', volume: '2,900', total: '9,650' },
      { price: '₽285.65', volume: '2,100', total: '11,750' },
      { price: '₽285.70', volume: '1,750', total: '13,500' }
    ]
  };

  const currentPrice = '₽285.38';
  const spread = '₽0.05';
  const spreadPercent = '0.018%';

  const getVolumeBarWidth = (volume, maxVolume) => {
    return (parseInt(volume?.replace(',', '')) / maxVolume) * 100;
  };

  const maxBidVolume = Math.max(...orderBookData?.bids?.map(bid => parseInt(bid?.volume?.replace(',', ''))));
  const maxAskVolume = Math.max(...orderBookData?.asks?.map(ask => parseInt(ask?.volume?.replace(',', ''))));
  const maxVolume = Math.max(maxBidVolume, maxAskVolume);

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Глубина рынка</h3>
        <div className="flex items-center space-x-2">
          <Select
            options={symbols}
            value={selectedSymbol}
            onChange={setSelectedSymbol}
            className="w-40"
          />
          <Select
            options={viewModes}
            value={viewMode}
            onChange={setViewMode}
            className="w-32"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => console.log('Refresh market depth')}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="RefreshCw" size={16} />
          </Button>
        </div>
      </div>
      {/* Current Price & Spread */}
      <div className="bg-muted/20 rounded-md p-3 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground">Текущая цена</div>
            <div className="text-lg font-mono font-semibold text-foreground">{currentPrice}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Спред</div>
            <div className="text-sm font-mono text-foreground">{spread} ({spreadPercent})</div>
          </div>
        </div>
      </div>
      {/* Order Book */}
      <div className="grid grid-cols-2 gap-4">
        {/* Bids (Buy Orders) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-success">Покупка</h4>
            <div className="text-xs text-muted-foreground">Объём: {orderBookData?.bids?.reduce((sum, bid) => sum + parseInt(bid?.volume?.replace(',', '')), 0)?.toLocaleString('ru-RU')}</div>
          </div>
          
          <div className="space-y-1">
            {orderBookData?.bids?.map((bid, index) => (
              <div key={index} className="relative bg-success/5 rounded p-2 hover:bg-success/10 transition-colors duration-150">
                <div 
                  className="absolute inset-0 bg-success/20 rounded"
                  style={{ width: `${getVolumeBarWidth(bid?.volume, maxVolume)}%` }}
                ></div>
                <div className="relative flex items-center justify-between text-xs">
                  <span className="font-mono text-success">{bid?.price}</span>
                  <span className="font-mono text-foreground">{bid?.volume}</span>
                  <span className="font-mono text-muted-foreground">{bid?.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Asks (Sell Orders) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-error">Продажа</h4>
            <div className="text-xs text-muted-foreground">Объём: {orderBookData?.asks?.reduce((sum, ask) => sum + parseInt(ask?.volume?.replace(',', '')), 0)?.toLocaleString('ru-RU')}</div>
          </div>
          
          <div className="space-y-1">
            {orderBookData?.asks?.reverse()?.map((ask, index) => (
              <div key={index} className="relative bg-error/5 rounded p-2 hover:bg-error/10 transition-colors duration-150">
                <div 
                  className="absolute inset-0 bg-error/20 rounded"
                  style={{ width: `${getVolumeBarWidth(ask?.volume, maxVolume)}%` }}
                ></div>
                <div className="relative flex items-center justify-between text-xs">
                  <span className="font-mono text-error">{ask?.price}</span>
                  <span className="font-mono text-foreground">{ask?.volume}</span>
                  <span className="font-mono text-muted-foreground">{ask?.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Column Headers */}
      <div className="grid grid-cols-2 gap-4 mt-4 pt-2 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Цена</span>
          <span>Объём</span>
          <span>Всего</span>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Цена</span>
          <span>Объём</span>
          <span>Всего</span>
        </div>
      </div>
      {/* Market Statistics */}
      <div className="mt-4 pt-3 border-t border-border">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-sm font-semibold text-success">₽285.35</div>
            <div className="text-xs text-muted-foreground">Лучшая покупка</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-error">₽285.40</div>
            <div className="text-xs text-muted-foreground">Лучшая продажа</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">29,050</div>
            <div className="text-xs text-muted-foreground">Общий объём</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-primary">1.2</div>
            <div className="text-xs text-muted-foreground">Соотношение B/S</div>
          </div>
        </div>
      </div>
      {/* Real-time indicator */}
      <div className="mt-3 flex items-center justify-center">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-xs text-muted-foreground">Данные в реальном времени</span>
        </div>
      </div>
    </div>
  );
};

export default MarketDepthVisualization;