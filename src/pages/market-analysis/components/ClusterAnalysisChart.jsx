import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ClusterAnalysisChart = () => {
  const [selectedMetric, setSelectedMetric] = useState('price-volume');
  const [selectedSector, setSelectedSector] = useState('all');
  const [zoomLevel, setZoomLevel] = useState(1);

  const metrics = [
    { value: 'price-volume', label: 'Цена-Объём' },
    { value: 'volatility-volume', label: 'Волатильность-Объём' },
    { value: 'correlation', label: 'Корреляция' },
    { value: 'momentum', label: 'Моментум' }
  ];

  const sectors = [
    { value: 'all', label: 'Все сектора' },
    { value: 'tech', label: 'Технологии' },
    { value: 'finance', label: 'Финансы' },
    { value: 'energy', label: 'Энергетика' }
  ];

  const clusterData = [
    {
      symbol: 'SBER',
      x: 285,
      y: 2100,
      size: 15,
      sector: 'finance',
      change: '+12.45%',
      volume: '₽2.1М'
    },
    {
      symbol: 'GAZP',
      x: 157,
      y: 1800,
      size: 12,
      sector: 'energy',
      change: '+8.92%',
      volume: '₽1.8М'
    },
    {
      symbol: 'LKOH',
      x: 6245,
      y: 1500,
      size: 18,
      sector: 'energy',
      change: '+7.34%',
      volume: '₽1.5М'
    },
    {
      symbol: 'YNDX',
      x: 2846,
      y: 980,
      size: 10,
      sector: 'tech',
      change: '-5.67%',
      volume: '₽980К'
    },
    {
      symbol: 'MTSS',
      x: 290,
      y: 750,
      size: 8,
      sector: 'tech',
      change: '-4.23%',
      volume: '₽750К'
    }
  ];

  const getSectorColor = (sector) => {
    const colors = {
      finance: '#2563EB',
      energy: '#059669',
      tech: '#DC2626',
      healthcare: '#D97706'
    };
    return colors?.[sector] || '#64748B';
  };

  const handleZoom = (direction) => {
    if (direction === 'in' && zoomLevel < 3) {
      setZoomLevel(zoomLevel + 0.5);
    } else if (direction === 'out' && zoomLevel > 0.5) {
      setZoomLevel(zoomLevel - 0.5);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Кластерный анализ</h3>
        <div className="flex items-center space-x-2">
          <Select
            options={metrics}
            value={selectedMetric}
            onChange={setSelectedMetric}
            className="w-40"
          />
          <Select
            options={sectors}
            value={selectedSector}
            onChange={setSelectedSector}
            className="w-32"
          />
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleZoom('out')}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="ZoomOut" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleZoom('in')}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="ZoomIn" size={16} />
            </Button>
          </div>
        </div>
      </div>
      <div className="relative bg-muted/10 rounded-md h-80 overflow-hidden">
        <svg width="100%" height="100%" className="absolute inset-0">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--color-border)" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Axes */}
          <line x1="60" y1="20" x2="60" y2="300" stroke="var(--color-muted-foreground)" strokeWidth="1" opacity="0.5" />
          <line x1="60" y1="300" x2="580" y2="300" stroke="var(--color-muted-foreground)" strokeWidth="1" opacity="0.5" />
          
          {/* Axis labels */}
          <text x="320" y="330" textAnchor="middle" className="fill-muted-foreground text-xs">
            Цена (₽)
          </text>
          <text x="25" y="160" textAnchor="middle" className="fill-muted-foreground text-xs" transform="rotate(-90 25 160)">
            Объём торгов
          </text>
          
          {/* Data points */}
          {clusterData?.map((point, index) => {
            const x = 60 + (point?.x / 10000) * 520 * zoomLevel;
            const y = 300 - (point?.y / 2500) * 280 * zoomLevel;
            const radius = Math.max(4, point?.size * zoomLevel);
            
            return (
              <g key={index}>
                <circle
                  cx={x}
                  cy={y}
                  r={radius}
                  fill={getSectorColor(point?.sector)}
                  opacity="0.7"
                  className="hover:opacity-1 cursor-pointer transition-opacity duration-150"
                  onClick={() => console.log(`Selected ${point?.symbol}`)}
                />
                <text
                  x={x}
                  y={y - radius - 5}
                  textAnchor="middle"
                  className="fill-foreground text-xs font-medium pointer-events-none"
                >
                  {point?.symbol}
                </text>
              </g>
            );
          })}
        </svg>
        
        {/* Zoom indicator */}
        <div className="absolute top-2 right-2 bg-background/80 rounded px-2 py-1">
          <span className="text-xs text-muted-foreground">Масштаб: {zoomLevel}x</span>
        </div>
      </div>
      {/* Legend */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-xs text-muted-foreground">Финансы</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-success"></div>
            <span className="text-xs text-muted-foreground">Энергетика</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-error"></div>
            <span className="text-xs text-muted-foreground">Технологии</span>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => console.log('Export cluster analysis')}
          className="text-xs"
        >
          <Icon name="Download" size={14} className="mr-1" />
          Экспорт
        </Button>
      </div>
      {/* Statistics */}
      <div className="mt-4 pt-3 border-t border-border grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">5</div>
          <div className="text-xs text-muted-foreground">Кластеров</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">0.73</div>
          <div className="text-xs text-muted-foreground">Корреляция</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">₽8.1М</div>
          <div className="text-xs text-muted-foreground">Общий объём</div>
        </div>
      </div>
    </div>
  );
};

export default ClusterAnalysisChart;