import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';
import Select from './Select';

const MarketContextNavigator = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('US');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const popularSymbols = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: '$175.43', change: '+2.34%', changeType: 'positive' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: '$2,847.63', change: '+1.87%', changeType: 'positive' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: '$378.85', change: '-0.45%', changeType: 'negative' },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: '$248.50', change: '+3.21%', changeType: 'positive' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: '$144.05', change: '+0.89%', changeType: 'positive' }
  ];

  const marketSegments = [
    { value: 'US', label: 'US Markets' },
    { value: 'EU', label: 'European Markets' },
    { value: 'ASIA', label: 'Asian Markets' },
    { value: 'CRYPTO', label: 'Cryptocurrency' },
    { value: 'FOREX', label: 'Forex' },
    { value: 'COMMODITIES', label: 'Commodities' }
  ];

  const timeframes = [
    { value: '1m', label: '1 Minute' },
    { value: '5m', label: '5 Minutes' },
    { value: '15m', label: '15 Minutes' },
    { value: '1h', label: '1 Hour' },
    { value: '4h', label: '4 Hours' },
    { value: '1D', label: '1 Day' },
    { value: '1W', label: '1 Week' },
    { value: '1M', label: '1 Month' }
  ];

  const handleSymbolSelect = (symbol) => {
    setSelectedSymbol(symbol);
    setIsSearchOpen(false);
    console.log(`Symbol selected: ${symbol}`);
  };

  const handleMarketChange = (market) => {
    setSelectedMarket(market);
    console.log(`Market changed to: ${market}`);
  };

  const handleTimeframeChange = (timeframe) => {
    setSelectedTimeframe(timeframe);
    console.log(`Timeframe changed to: ${timeframe}`);
  };

  const handleCompare = () => {
    console.log('Opening comparison tool');
  };

  const handleWatchlistAdd = () => {
    console.log(`Adding ${selectedSymbol} to watchlist`);
  };

  const filteredSymbols = popularSymbols?.filter(item =>
    item?.symbol?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    item?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">Market Context</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCompare}
            className="text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-150"
          >
            <Icon name="GitCompare" size={14} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleWatchlistAdd}
            className="text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-150"
          >
            <Icon name="Plus" size={14} />
          </Button>
        </div>
      </div>
      {/* Symbol Search */}
      <div className="space-y-2">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search symbols..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            onFocus={() => setIsSearchOpen(true)}
            className="pr-10"
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Icon name="Search" size={16} />
          </Button>
        </div>

        {/* Search Results */}
        {isSearchOpen && (
          <div className="bg-popover border border-border rounded-md shadow-elevation-2 max-h-64 overflow-y-auto">
            {filteredSymbols?.map((item) => (
              <button
                key={item?.symbol}
                onClick={() => handleSymbolSelect(item?.symbol)}
                className="w-full px-3 py-2 text-left hover:bg-muted/50 transition-colors duration-150 border-b border-border last:border-b-0"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-popover-foreground">{item?.symbol}</div>
                    <div className="text-xs text-muted-foreground truncate">{item?.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono text-popover-foreground">{item?.price}</div>
                    <div className={`text-xs font-mono ${
                      item?.changeType === 'positive' ? 'text-success' : 'text-error'
                    }`}>
                      {item?.change}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Current Selection */}
      <div className="bg-muted/20 rounded-md p-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold text-foreground">{selectedSymbol}</div>
            <div className="text-sm text-muted-foreground">
              {popularSymbols?.find(s => s?.symbol === selectedSymbol)?.name || 'Loading...'}
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-mono text-foreground">
              {popularSymbols?.find(s => s?.symbol === selectedSymbol)?.price || '$0.00'}
            </div>
            <div className={`text-sm font-mono ${
              popularSymbols?.find(s => s?.symbol === selectedSymbol)?.changeType === 'positive' ?'text-success' : 'text-error'
            }`}>
              {popularSymbols?.find(s => s?.symbol === selectedSymbol)?.change || '0.00%'}
            </div>
          </div>
        </div>
      </div>
      {/* Market Segment Selector */}
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">Market Segment</label>
        <Select
          options={marketSegments}
          value={selectedMarket}
          onChange={handleMarketChange}
        />
      </div>
      {/* Timeframe Selector */}
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">Historical Timeframe</label>
        <Select
          options={timeframes}
          value={selectedTimeframe}
          onChange={handleTimeframeChange}
        />
      </div>
      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => console.log('View fundamentals')}
          className="text-xs"
        >
          <Icon name="FileText" size={14} className="mr-1" />
          Fundamentals
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => console.log('View news')}
          className="text-xs"
        >
          <Icon name="Newspaper" size={14} className="mr-1" />
          News
        </Button>
      </div>
      {/* Market Status */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-xs text-muted-foreground">Market Open</span>
        </div>
        <div className="text-xs text-muted-foreground">
          Last updated: {new Date()?.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default MarketContextNavigator;