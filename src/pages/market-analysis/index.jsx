import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import AnalyticalToolbar from '../../components/ui/AnalyticalToolbar';
import DataPanelController from '../../components/ui/DataPanelController';
import MarketContextNavigator from '../../components/ui/MarketContextNavigator';
import ExportSettingsHub from '../../components/ui/ExportSettingsHub';
import MarketOverviewWidget from './components/MarketOverviewWidget';
import TopMoversWidget from './components/TopMoversWidget';
import ClusterAnalysisChart from './components/ClusterAnalysisChart';
import AIPredictionsPanel from './components/AIPredictionsPanel';
import MarketDepthVisualization from './components/MarketDepthVisualization';
import EconomicCalendar from './components/EconomicCalendar';
import CorrelationMatrix from './components/CorrelationMatrix';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const MarketAnalysis = () => {
  const [activeView, setActiveView] = useState('overview');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const viewOptions = [
    { id: 'overview', label: 'Обзор рынка', icon: 'BarChart3' },
    { id: 'cluster', label: 'Кластерный анализ', icon: 'Scatter3D' },
    { id: 'predictions', label: 'ИИ Прогнозы', icon: 'Brain' },
    { id: 'depth', label: 'Глубина рынка', icon: 'Layers' }
  ];

  const handleRefreshAll = async () => {
    setRefreshing(true);
    console.log('Refreshing all market data...');
    // Simulate API calls
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleExportReport = () => {
    console.log('Exporting comprehensive market analysis report...');
    // Export logic would be implemented here
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      document.documentElement?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AnalyticalToolbar />
      <DataPanelController />
      <ExportSettingsHub />
      <div className="pt-32 md:pl-64">
        <div className="p-4 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Анализ рынка</h1>
              <p className="text-muted-foreground">
                Комплексный анализ рыночных условий и прогнозирование с использованием ИИ
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefreshAll}
                loading={refreshing}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="RefreshCw" size={16} className="mr-1" />
                Обновить всё
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportReport}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="FileText" size={16} className="mr-1" />
                Отчёт PDF
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name={isFullscreen ? "Minimize" : "Maximize"} size={16} />
              </Button>
            </div>
          </div>

          {/* View Selector */}
          <div className="flex space-x-1 bg-muted/20 rounded-lg p-1">
            {viewOptions?.map((option) => (
              <Button
                key={option?.id}
                variant={activeView === option?.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveView(option?.id)}
                className={`flex-1 ${
                  activeView === option?.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={option?.icon} size={16} className="mr-2" />
                {option?.label}
              </Button>
            ))}
          </div>

          {/* Market Context Navigator */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <MarketContextNavigator />
            </div>
            
            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {activeView === 'overview' && (
                <div className="space-y-6">
                  {/* Market Overview Section */}
                  <MarketOverviewWidget />
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <TopMoversWidget />
                    <CorrelationMatrix />
                  </div>
                  
                  <EconomicCalendar />
                </div>
              )}

              {activeView === 'cluster' && (
                <div className="space-y-6">
                  <ClusterAnalysisChart />
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <MarketOverviewWidget />
                    <CorrelationMatrix />
                  </div>
                </div>
              )}

              {activeView === 'predictions' && (
                <div className="space-y-6">
                  <AIPredictionsPanel />
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <TopMoversWidget />
                    <EconomicCalendar />
                  </div>
                </div>
              )}

              {activeView === 'depth' && (
                <div className="space-y-6">
                  <MarketDepthVisualization />
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ClusterAnalysisChart />
                    <AIPredictionsPanel />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Market Status Footer */}
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm text-foreground">Рынок открыт</span>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Московская биржа: 10:00 - 18:45 МСК
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Последнее обновление: {new Date()?.toLocaleTimeString('ru-RU')}
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm">
                <div className="text-muted-foreground">
                  Индекс ММВБ: <span className="text-success font-mono">3,247.85 (+1.23%)</span>
                </div>
                <div className="text-muted-foreground">
                  RTS: <span className="text-success font-mono">1,089.42 (+0.87%)</span>
                </div>
                <div className="text-muted-foreground">
                  USD/RUB: <span className="text-error font-mono">92.45 (-0.34%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-2">
        <div className="flex items-center justify-around">
          {viewOptions?.map((option) => (
            <Button
              key={option?.id}
              variant="ghost"
              size="sm"
              onClick={() => setActiveView(option?.id)}
              className={`flex flex-col items-center p-2 ${
                activeView === option?.id ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name={option?.icon} size={16} />
              <span className="text-xs mt-1">{option?.label?.split(' ')?.[0]}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysis;