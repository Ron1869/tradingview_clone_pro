import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const toggleMoreMenu = () => {
    setIsMoreMenuOpen(!isMoreMenuOpen);
  };

  const handleNavigation = (path) => {
    console.log(`Navigating to: ${path}`);
    // Navigation logic would be implemented here
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Icon name="TrendingUp" size={20} color="var(--color-primary-foreground)" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-foreground leading-none">TradingView</span>
              <span className="text-xs text-muted-foreground leading-none">Clone Pro</span>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="hidden md:flex items-center space-x-1">
          <Button
            variant="ghost"
            onClick={() => handleNavigation('/market-analysis')}
            className="text-foreground hover:text-primary hover:bg-muted/50 transition-colors duration-150"
          >
            Market Analysis
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => handleNavigation('/charts')}
            className="text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors duration-150"
          >
            Charts
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => handleNavigation('/portfolio')}
            className="text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors duration-150"
          >
            Portfolio
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => handleNavigation('/watchlist')}
            className="text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors duration-150"
          >
            Watchlist
          </Button>

          {/* More Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={toggleMoreMenu}
              className="text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors duration-150"
              iconName="MoreHorizontal"
              iconSize={16}
            >
              More
            </Button>
            
            {isMoreMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-md shadow-elevation-2 py-1 z-50">
                <button
                  onClick={() => {
                    handleNavigation('/settings');
                    setIsMoreMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-popover-foreground hover:bg-muted/50 transition-colors duration-150 flex items-center space-x-2"
                >
                  <Icon name="Settings" size={16} />
                  <span>Settings</span>
                </button>
                <button
                  onClick={() => {
                    handleNavigation('/help');
                    setIsMoreMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-popover-foreground hover:bg-muted/50 transition-colors duration-150 flex items-center space-x-2"
                >
                  <Icon name="HelpCircle" size={16} />
                  <span>Help</span>
                </button>
                <button
                  onClick={() => {
                    handleNavigation('/admin');
                    setIsMoreMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-popover-foreground hover:bg-muted/50 transition-colors duration-150 flex items-center space-x-2"
                >
                  <Icon name="Shield" size={16} />
                  <span>Admin</span>
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Connection Status */}
          <div className="hidden sm:flex items-center space-x-1 px-2 py-1 bg-success/10 rounded-md">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-success font-medium">Live</span>
          </div>

          {/* User Menu */}
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors duration-150"
          >
            <Icon name="User" size={20} />
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors duration-150"
            onClick={toggleMoreMenu}
          >
            <Icon name="Menu" size={20} />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMoreMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <nav className="px-4 py-2 space-y-1">
            <button
              onClick={() => {
                handleNavigation('/market-analysis');
                setIsMoreMenuOpen(false);
              }}
              className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-muted/50 rounded-md transition-colors duration-150 flex items-center space-x-2"
            >
              <Icon name="BarChart3" size={16} />
              <span>Market Analysis</span>
            </button>
            <button
              onClick={() => {
                handleNavigation('/charts');
                setIsMoreMenuOpen(false);
              }}
              className="w-full px-3 py-2 text-left text-sm text-muted-foreground hover:bg-muted/50 rounded-md transition-colors duration-150 flex items-center space-x-2"
            >
              <Icon name="LineChart" size={16} />
              <span>Charts</span>
            </button>
            <button
              onClick={() => {
                handleNavigation('/portfolio');
                setIsMoreMenuOpen(false);
              }}
              className="w-full px-3 py-2 text-left text-sm text-muted-foreground hover:bg-muted/50 rounded-md transition-colors duration-150 flex items-center space-x-2"
            >
              <Icon name="Briefcase" size={16} />
              <span>Portfolio</span>
            </button>
            <button
              onClick={() => {
                handleNavigation('/watchlist');
                setIsMoreMenuOpen(false);
              }}
              className="w-full px-3 py-2 text-left text-sm text-muted-foreground hover:bg-muted/50 rounded-md transition-colors duration-150 flex items-center space-x-2"
            >
              <Icon name="Eye" size={16} />
              <span>Watchlist</span>
            </button>
            <div className="border-t border-border my-2"></div>
            <button
              onClick={() => {
                handleNavigation('/settings');
                setIsMoreMenuOpen(false);
              }}
              className="w-full px-3 py-2 text-left text-sm text-muted-foreground hover:bg-muted/50 rounded-md transition-colors duration-150 flex items-center space-x-2"
            >
              <Icon name="Settings" size={16} />
              <span>Settings</span>
            </button>
            <button
              onClick={() => {
                handleNavigation('/help');
                setIsMoreMenuOpen(false);
              }}
              className="w-full px-3 py-2 text-left text-sm text-muted-foreground hover:bg-muted/50 rounded-md transition-colors duration-150 flex items-center space-x-2"
            >
              <Icon name="HelpCircle" size={16} />
              <span>Help</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;