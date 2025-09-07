import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Select from './Select';

const AnalyticalToolbar = () => {
  const [activeTimeframe, setActiveTimeframe] = useState('1D');
  const [activeIndicator, setActiveIndicator] = useState('');
  const [chartType, setChartType] = useState('candlestick');

  const timeframes = [
    { value: '1m', label: '1m' },
    { value: '5m', label: '5m' },
    { value: '15m', label: '15m' },
    { value: '1h', label: '1h' },
    { value: '4h', label: '4h' },
    { value: '1D', label: '1D' },
    { value: '1W', label: '1W' },
    { value: '1M', label: '1M' }
  ];

  const indicators = [
    { value: '', label: 'No Indicator' },
    { value: 'ma', label: 'Moving Average' },
    { value: 'rsi', label: 'RSI' },
    { value: 'macd', label: 'MACD' },
    { value: 'bb', label: 'Bollinger Bands' },
    { value: 'volume', label: 'Volume' }
  ];

  const chartTypes = [
    { value: 'candlestick', label: 'Candlestick' },
    { value: 'line', label: 'Line' },
    { value: 'area', label: 'Area' },
    { value: 'bar', label: 'Bar' }
  ];

  const handleTimeframeClick = (timeframe) => {
    setActiveTimeframe(timeframe);
    console.log(`Timeframe changed to: ${timeframe}`);
  };

  const handleIndicatorChange = (indicator) => {
    setActiveIndicator(indicator);
    console.log(`Indicator changed to: ${indicator}`);
  };

  const handleChartTypeChange = (type) => {
    setChartType(type);
    console.log(`Chart type changed to: ${type}`);
  };

  const handleDrawingTool = (tool) => {
    console.log(`Drawing tool activated: ${tool}`);
  };

  const handleZoom = (action) => {
    console.log(`Zoom action: ${action}`);
  };

  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-card border-b border-border">
      <div className="flex items-center justify-between px-4 py-2 overflow-x-auto">
        {/* Left Section - Chart Controls */}
        <div className="flex items-center space-x-4 min-w-0">
          {/* Chart Type Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">Chart:</span>
            <Select
              options={chartTypes}
              value={chartType}
              onChange={handleChartTypeChange}
              className="w-32"
            />
          </div>

          {/* Timeframe Buttons */}
          <div className="flex items-center space-x-1">
            <span className="text-sm text-muted-foreground whitespace-nowrap mr-2">Timeframe:</span>
            {timeframes?.map((tf) => (
              <Button
                key={tf?.value}
                variant={activeTimeframe === tf?.value ? "default" : "ghost"}
                size="sm"
                onClick={() => handleTimeframeClick(tf?.value)}
                className={`text-xs px-2 py-1 transition-colors duration-150 ${
                  activeTimeframe === tf?.value 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {tf?.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Center Section - Drawing Tools */}
        <div className="hidden lg:flex items-center space-x-2">
          <div className="flex items-center space-x-1 px-2 py-1 bg-muted/20 rounded-md">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDrawingTool('line')}
              className="text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-150"
            >
              <Icon name="Minus" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDrawingTool('rectangle')}
              className="text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-150"
            >
              <Icon name="Square" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDrawingTool('circle')}
              className="text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-150"
            >
              <Icon name="Circle" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDrawingTool('text')}
              className="text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-150"
            >
              <Icon name="Type" size={16} />
            </Button>
          </div>
        </div>

        {/* Right Section - Indicators and Controls */}
        <div className="flex items-center space-x-4">
          {/* Technical Indicators */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">Indicator:</span>
            <Select
              options={indicators}
              value={activeIndicator}
              onChange={handleIndicatorChange}
              className="w-36"
            />
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleZoom('in')}
              className="text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-150"
            >
              <Icon name="ZoomIn" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleZoom('out')}
              className="text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-150"
            >
              <Icon name="ZoomOut" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleZoom('fit')}
              className="text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-150"
            >
              <Icon name="Maximize2" size={16} />
            </Button>
          </div>

          {/* Fullscreen Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => console.log('Toggle fullscreen')}
            className="text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-150"
          >
            <Icon name="Expand" size={16} />
          </Button>
        </div>
      </div>
      {/* Mobile Toolbar - Simplified */}
      <div className="lg:hidden px-4 py-2 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Select
              options={timeframes}
              value={activeTimeframe}
              onChange={setActiveTimeframe}
              className="w-20"
            />
            <Select
              options={chartTypes}
              value={chartType}
              onChange={handleChartTypeChange}
              className="w-24"
            />
          </div>
          
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleZoom('in')}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="ZoomIn" size={16} />
            </Button>
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
              onClick={() => console.log('More tools')}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="MoreVertical" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticalToolbar;