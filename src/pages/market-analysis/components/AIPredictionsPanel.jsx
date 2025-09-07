import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AIPredictionsPanel = () => {
  const [selectedModel, setSelectedModel] = useState('ensemble');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');

  const models = [
    { value: 'ensemble', label: 'Ансамбль моделей' },
    { value: 'lstm', label: 'LSTM Neural Network' },
    { value: 'transformer', label: 'Transformer' },
    { value: 'random-forest', label: 'Random Forest' }
  ];

  const timeframes = [
    { value: '1H', label: '1 час' },
    { value: '4H', label: '4 часа' },
    { value: '1D', label: '1 день' },
    { value: '1W', label: '1 неделя' }
  ];

  const predictions = [
    {
      symbol: 'SBER',
      currentPrice: '₽285.40',
      predictedPrice: '₽298.50',
      confidence: 87,
      direction: 'up',
      change: '+4.59%',
      sentiment: 'Бычий',
      factors: ['Положительные финансовые результаты', 'Рост кредитного портфеля', 'Снижение процентных ставок']
    },
    {
      symbol: 'GAZP',
      currentPrice: '₽156.80',
      predictedPrice: '₽162.30',
      confidence: 73,
      direction: 'up',
      change: '+3.51%',
      sentiment: 'Умеренно бычий',
      factors: ['Рост цен на газ', 'Увеличение экспорта', 'Геополитические факторы']
    },
    {
      symbol: 'YNDX',
      currentPrice: '₽2,845.60',
      predictedPrice: '₽2,720.40',
      confidence: 65,
      direction: 'down',
      change: '-4.40%',
      sentiment: 'Медвежий',
      factors: ['Регуляторные риски', 'Конкуренция в IT-секторе', 'Макроэкономическая неопределённость']
    }
  ];

  const marketSentiment = {
    overall: 'Нейтральный',
    bullish: 45,
    bearish: 32,
    neutral: 23,
    fearGreedIndex: 58
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Brain" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">ИИ Прогнозы</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Select
            options={models}
            value={selectedModel}
            onChange={setSelectedModel}
            className="w-40"
          />
          <Select
            options={timeframes}
            value={selectedTimeframe}
            onChange={setSelectedTimeframe}
            className="w-24"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => console.log('Refresh predictions')}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="RefreshCw" size={16} />
          </Button>
        </div>
      </div>
      {/* Market Sentiment Overview */}
      <div className="bg-muted/20 rounded-md p-3 mb-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-foreground">Общие настроения рынка</h4>
          <span className="text-sm font-medium text-foreground">{marketSentiment?.overall}</span>
        </div>
        
        <div className="flex items-center space-x-4 mb-2">
          <div className="flex-1 bg-muted rounded-full h-2">
            <div 
              className="bg-success h-2 rounded-l-full" 
              style={{ width: `${marketSentiment?.bullish}%` }}
            ></div>
          </div>
          <div className="text-xs text-muted-foreground min-w-0">
            Бычий: {marketSentiment?.bullish}%
          </div>
        </div>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Индекс страха/жадности: {marketSentiment?.fearGreedIndex}</span>
          <span>Обновлено: {new Date()?.toLocaleTimeString('ru-RU')}</span>
        </div>
      </div>
      {/* Individual Predictions */}
      <div className="space-y-3">
        {predictions?.map((prediction, index) => (
          <div key={index} className="bg-muted/10 rounded-md p-3 hover:bg-muted/20 transition-colors duration-150">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-foreground">{prediction?.symbol}</span>
                <div className={`px-2 py-1 rounded text-xs ${
                  prediction?.direction === 'up' ?'bg-success/20 text-success' :'bg-error/20 text-error'
                }`}>
                  {prediction?.sentiment}
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-mono ${
                  prediction?.direction === 'up' ? 'text-success' : 'text-error'
                }`}>
                  {prediction?.change}
                </div>
                <div className="text-xs text-muted-foreground">
                  Уверенность: {prediction?.confidence}%
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-xs text-muted-foreground">Текущая цена</div>
                <div className="text-sm font-mono text-foreground">{prediction?.currentPrice}</div>
              </div>
              <Icon 
                name={prediction?.direction === 'up' ? 'ArrowRight' : 'ArrowRight'} 
                size={16} 
                className="text-muted-foreground"
              />
              <div>
                <div className="text-xs text-muted-foreground">Прогноз</div>
                <div className={`text-sm font-mono ${
                  prediction?.direction === 'up' ? 'text-success' : 'text-error'
                }`}>
                  {prediction?.predictedPrice}
                </div>
              </div>
            </div>
            
            {/* Confidence Bar */}
            <div className="mb-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>Уровень уверенности</span>
                <span>{prediction?.confidence}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full ${
                    prediction?.confidence >= 80 ? 'bg-success' :
                    prediction?.confidence >= 60 ? 'bg-warning' : 'bg-error'
                  }`}
                  style={{ width: `${prediction?.confidence}%` }}
                ></div>
              </div>
            </div>
            
            {/* Key Factors */}
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Ключевые факторы:</div>
              {prediction?.factors?.slice(0, 2)?.map((factor, factorIndex) => (
                <div key={factorIndex} className="text-xs text-foreground flex items-center space-x-1">
                  <div className="w-1 h-1 bg-primary rounded-full"></div>
                  <span>{factor}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Model Performance */}
      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Производительность модели</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => console.log('View model details')}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Подробнее
          </Button>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm font-semibold text-success">78.5%</div>
            <div className="text-xs text-muted-foreground">Точность</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">2.3%</div>
            <div className="text-xs text-muted-foreground">Средняя ошибка</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-primary">156</div>
            <div className="text-xs text-muted-foreground">Прогнозов</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPredictionsPanel;