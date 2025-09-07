import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const DataPanelController = ({ isCollapsed = false }) => {
  const [collapsedState, setCollapsedState] = useState(isCollapsed);
  const [activePanels, setActivePanels] = useState({
    sectorPerformance: true,
    clusterAnalysis: false,
    aiPredictions: true,
    marketDepth: false,
    newsFlow: false,
    economicCalendar: false
  });

  const toggleCollapse = () => {
    setCollapsedState(!collapsedState);
  };

  const togglePanel = (panelKey) => {
    setActivePanels(prev => ({
      ...prev,
      [panelKey]: !prev?.[panelKey]
    }));
    console.log(`Panel ${panelKey} toggled:`, !activePanels?.[panelKey]);
  };

  const panelItems = [
    {
      key: 'sectorPerformance',
      label: 'Sector Performance',
      icon: 'PieChart',
      description: 'Real-time sector analysis'
    },
    {
      key: 'clusterAnalysis',
      label: 'Cluster Analysis',
      icon: 'Scatter3D',
      description: 'Stock correlation mapping'
    },
    {
      key: 'aiPredictions',
      label: 'AI Predictions',
      icon: 'Brain',
      description: 'Machine learning insights'
    },
    {
      key: 'marketDepth',
      label: 'Market Depth',
      icon: 'Layers',
      description: 'Order book visualization'
    },
    {
      key: 'newsFlow',
      label: 'News Flow',
      icon: 'Newspaper',
      description: 'Market-moving news'
    },
    {
      key: 'economicCalendar',
      label: 'Economic Calendar',
      icon: 'Calendar',
      description: 'Upcoming events'
    }
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden md:block fixed left-0 top-32 bottom-0 z-30 bg-card border-r border-border transition-all duration-300 ease-smooth ${
        collapsedState ? 'w-12' : 'w-64'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-border">
          {!collapsedState && (
            <h3 className="text-sm font-medium text-foreground">Data Panels</h3>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleCollapse}
            className="text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-150"
          >
            <Icon name={collapsedState ? "ChevronRight" : "ChevronLeft"} size={16} />
          </Button>
        </div>

        {/* Panel Controls */}
        <div className="p-2 space-y-1 overflow-y-auto">
          {panelItems?.map((panel) => (
            <div key={panel?.key} className="relative">
              <Button
                variant="ghost"
                onClick={() => togglePanel(panel?.key)}
                className={`w-full justify-start text-left transition-colors duration-150 ${
                  activePanels?.[panel?.key]
                    ? 'bg-primary/10 text-primary hover:bg-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                } ${collapsedState ? 'px-2' : 'px-3'}`}
              >
                <Icon name={panel?.icon} size={16} className="flex-shrink-0" />
                {!collapsedState && (
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{panel?.label}</div>
                    <div className="text-xs text-muted-foreground truncate">{panel?.description}</div>
                  </div>
                )}
                {!collapsedState && (
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    activePanels?.[panel?.key] ? 'bg-success' : 'bg-muted'
                  }`} />
                )}
              </Button>
              
              {/* Tooltip for collapsed state */}
              {collapsedState && (
                <div className="absolute left-full top-0 ml-2 px-2 py-1 bg-popover border border-border rounded-md shadow-elevation-2 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50 whitespace-nowrap">
                  <div className="text-sm font-medium text-popover-foreground">{panel?.label}</div>
                  <div className="text-xs text-muted-foreground">{panel?.description}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        {!collapsedState && (
          <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-border bg-card">
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const allActive = Object.values(activePanels)?.every(Boolean);
                  const newState = Object.keys(activePanels)?.reduce((acc, key) => {
                    acc[key] = !allActive;
                    return acc;
                  }, {});
                  setActivePanels(newState);
                }}
                className="w-full text-xs"
              >
                <Icon name="ToggleLeft" size={14} className="mr-2" />
                Toggle All
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => console.log('Reset panels')}
                className="w-full text-xs text-muted-foreground hover:text-foreground"
              >
                <Icon name="RotateCcw" size={14} className="mr-2" />
                Reset Layout
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Mobile Bottom Drawer */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-card border-t border-border">
        <div className="p-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-foreground">Data Panels</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => console.log('Toggle mobile drawer')}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="ChevronUp" size={16} />
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {panelItems?.slice(0, 6)?.map((panel) => (
              <Button
                key={panel?.key}
                variant="ghost"
                size="sm"
                onClick={() => togglePanel(panel?.key)}
                className={`flex flex-col items-center p-2 h-auto transition-colors duration-150 ${
                  activePanels?.[panel?.key]
                    ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon name={panel?.icon} size={16} className="mb-1" />
                <span className="text-xs text-center leading-tight">{panel?.label}</span>
                <div className={`w-1.5 h-1.5 rounded-full mt-1 ${
                  activePanels?.[panel?.key] ? 'bg-success' : 'bg-muted'
                }`} />
              </Button>
            ))}
          </div>
        </div>
      </div>
      {/* Spacer for fixed positioning */}
      <div className={`hidden md:block transition-all duration-300 ease-smooth ${
        collapsedState ? 'w-12' : 'w-64'
      }`} />
    </>
  );
};

export default DataPanelController;