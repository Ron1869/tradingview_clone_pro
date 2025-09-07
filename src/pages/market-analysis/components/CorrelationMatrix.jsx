import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const CorrelationMatrix = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30D');
  const [selectedAssets, setSelectedAssets] = useState('major');

  const timeframes = [
    { value: '7D', label: '7 дней' },
    { value: '30D', label: '30 дней' },
    { value: '90D', label: '90 дней' },
    { value: '1Y', label: '1 год' }
  ];

  const assetGroups = [
    { value: 'major', label: 'Основные активы' },
    { value: 'tech', label: 'Технологии' },
    { value: 'finance', label: 'Финансы' },
    { value: 'energy', label: 'Энергетика' }
  ];

  const symbols = ['SBER', 'GAZP', 'LKOH', 'YNDX', 'MTSS', 'ROSN'];
  
  const correlationData = {
    'SBER': { 'SBER': 1.00, 'GAZP': 0.73, 'LKOH': 0.68, 'YNDX': -0.12, 'MTSS': 0.45, 'ROSN': 0.71 },
    'GAZP': { 'SBER': 0.73, 'GAZP': 1.00, 'LKOH': 0.89, 'YNDX': -0.23, 'MTSS': 0.34, 'ROSN': 0.92 },
    'LKOH': { 'SBER': 0.68, 'GAZP': 0.89, 'LKOH': 1.00, 'YNDX': -0.18, 'MTSS': 0.29, 'ROSN': 0.85 },
    'YNDX': { 'SBER': -0.12, 'GAZP': -0.23, 'LKOH': -0.18, 'YNDX': 1.00, 'MTSS': 0.67, 'ROSN': -0.31 },
    'MTSS': { 'SBER': 0.45, 'GAZP': 0.34, 'LKOH': 0.29, 'YNDX': 0.67, 'MTSS': 1.00, 'ROSN': 0.28 },
    'ROSN': { 'SBER': 0.71, 'GAZP': 0.92, 'LKOH': 0.85, 'YNDX': -0.31, 'MTSS': 0.28, 'ROSN': 1.00 }
  };

  const getCorrelationColor = (value) => {
    if (value >= 0.7) return 'bg-success text-success-foreground';
    if (value >= 0.3) return 'bg-warning text-warning-foreground';
    if (value >= -0.3) return 'bg-muted text-muted-foreground';
    if (value >= -0.7) return 'bg-error/50 text-error';
    return 'bg-error text-error-foreground';
  };

  const getCorrelationIntensity = (value) => {
    const absValue = Math.abs(value);
    return absValue * 0.8 + 0.2; // Minimum opacity of 0.2
  };

  const getCorrelationLabel = (value) => {
    const absValue = Math.abs(value);
    if (absValue >= 0.7) return 'Сильная';
    if (absValue >= 0.3) return 'Умеренная';
    return 'Слабая';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Матрица корреляций</h3>
        <div className="flex items-center space-x-2">
          <Select
            options={timeframes}
            value={selectedTimeframe}
            onChange={setSelectedTimeframe}
            className="w-24"
          />
          <Select
            options={assetGroups}
            value={selectedAssets}
            onChange={setSelectedAssets}
            className="w-32"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => console.log('Refresh correlation matrix')}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="RefreshCw" size={16} />
          </Button>
        </div>
      </div>
      {/* Correlation Matrix */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Header Row */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            <div className="h-8"></div> {/* Empty corner */}
            {symbols?.map((symbol) => (
              <div key={symbol} className="h-8 flex items-center justify-center text-xs font-medium text-foreground bg-muted/20 rounded">
                {symbol}
              </div>
            ))}
          </div>
          
          {/* Data Rows */}
          {symbols?.map((rowSymbol) => (
            <div key={rowSymbol} className="grid grid-cols-7 gap-1 mb-1">
              <div className="h-8 flex items-center justify-center text-xs font-medium text-foreground bg-muted/20 rounded">
                {rowSymbol}
              </div>
              {symbols?.map((colSymbol) => {
                const correlation = correlationData?.[rowSymbol]?.[colSymbol];
                return (
                  <div
                    key={`${rowSymbol}-${colSymbol}`}
                    className={`h-8 flex items-center justify-center text-xs font-mono rounded cursor-pointer transition-all duration-150 hover:scale-105 ${
                      rowSymbol === colSymbol ? 'bg-primary text-primary-foreground' : getCorrelationColor(correlation)
                    }`}
                    style={{
                      opacity: rowSymbol === colSymbol ? 1 : getCorrelationIntensity(correlation)
                    }}
                    onClick={() => console.log(`Correlation between ${rowSymbol} and ${colSymbol}: ${correlation}`)}
                    title={`${rowSymbol} vs ${colSymbol}: ${correlation} (${getCorrelationLabel(correlation)})`}
                  >
                    {correlation?.toFixed(2)}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Интерпретация корреляции</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => console.log('Show correlation help')}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="HelpCircle" size={16} />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-success rounded"></div>
            <span className="text-muted-foreground">Сильная положительная (&gt; 0.7)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-warning rounded"></div>
            <span className="text-muted-foreground">Умеренная положительная (0.3-0.7)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-muted rounded"></div>
            <span className="text-muted-foreground">Слабая (-0.3 до 0.3)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-error rounded"></div>
            <span className="text-muted-foreground">Отрицательная (&lt; -0.3)</span>
          </div>
        </div>
      </div>
      {/* Key Insights */}
      <div className="mt-4 pt-3 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-2">Ключевые наблюдения</h4>
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <Icon name="TrendingUp" size={14} className="text-success mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <span className="text-foreground font-medium">ГАЗП-РОСН:</span> Сильная положительная корреляция (0.92) - энергетический сектор движется синхронно
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="TrendingDown" size={14} className="text-error mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <span className="text-foreground font-medium">YNDX-РОСН:</span> Отрицательная корреляция (-0.31) - технологии против энергетики
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="BarChart3" size={14} className="text-warning mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <span className="text-foreground font-medium">Диверсификация:</span> YNDX и MTSS показывают низкую корреляцию с энергетическим сектором
            </div>
          </div>
        </div>
      </div>
      {/* Export Options */}
      <div className="mt-4 flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => console.log('Export correlation matrix')}
          className="flex-1 text-xs"
        >
          <Icon name="Download" size={14} className="mr-1" />
          Экспорт матрицы
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => console.log('Create portfolio based on correlation')}
          className="flex-1 text-xs"
        >
          <Icon name="Briefcase" size={14} className="mr-1" />
          Создать портфель
        </Button>
      </div>
    </div>
  );
};

export default CorrelationMatrix;