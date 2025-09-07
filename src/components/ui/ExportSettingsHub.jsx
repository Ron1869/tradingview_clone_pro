import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Select from './Select';
import { Checkbox } from './Checkbox';

const ExportSettingsHub = () => {
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [exportFormat, setExportFormat] = useState('png');
  const [exportSettings, setExportSettings] = useState({
    includeIndicators: true,
    includeVolume: true,
    includeWatermark: false,
    highResolution: true
  });

  const themes = [
    { value: 'dark', label: 'Dark Theme' },
    { value: 'light', label: 'Light Theme' },
    { value: 'auto', label: 'Auto (System)' }
  ];

  const exportFormats = [
    { value: 'png', label: 'PNG Image' },
    { value: 'jpg', label: 'JPEG Image' },
    { value: 'svg', label: 'SVG Vector' },
    { value: 'pdf', label: 'PDF Document' },
    { value: 'csv', label: 'CSV Data' }
  ];

  const handleExport = (format) => {
    console.log(`Exporting chart as ${format}`, exportSettings);
    setIsExportMenuOpen(false);
    // Export logic would be implemented here
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    console.log(`Theme changed to: ${newTheme}`);
    // Theme change logic would be implemented here
  };

  const handleExportSettingChange = (setting, value) => {
    setExportSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handlePrint = () => {
    console.log('Printing chart');
    window.print();
  };

  const handleShare = () => {
    console.log('Sharing chart');
    // Share logic would be implemented here
  };

  const handleSaveLayout = () => {
    console.log('Saving current layout');
    // Layout save logic would be implemented here
  };

  const handleLoadLayout = () => {
    console.log('Loading saved layout');
    // Layout load logic would be implemented here
  };

  return (
    <div className="fixed top-16 right-4 z-40 flex items-center space-x-2">
      {/* Theme Switcher */}
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            const nextTheme = theme === 'dark' ? 'light' : theme === 'light' ? 'auto' : 'dark';
            handleThemeChange(nextTheme);
          }}
          className="text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-150"
        >
          <Icon 
            name={theme === 'dark' ? 'Moon' : theme === 'light' ? 'Sun' : 'Monitor'} 
            size={16} 
          />
        </Button>
      </div>
      {/* Export Menu */}
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
          className="text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-150"
        >
          <Icon name="Download" size={16} />
        </Button>

        {isExportMenuOpen && (
          <div className="absolute right-0 top-full mt-1 w-64 bg-popover border border-border rounded-md shadow-elevation-2 py-2 z-50">
            {/* Export Format Selection */}
            <div className="px-3 py-2 border-b border-border">
              <label className="text-xs text-muted-foreground mb-2 block">Export Format</label>
              <Select
                options={exportFormats}
                value={exportFormat}
                onChange={setExportFormat}
                className="w-full"
              />
            </div>

            {/* Export Settings */}
            <div className="px-3 py-2 border-b border-border space-y-2">
              <label className="text-xs text-muted-foreground block">Export Options</label>
              
              <Checkbox
                label="Include Technical Indicators"
                checked={exportSettings?.includeIndicators}
                onChange={(e) => handleExportSettingChange('includeIndicators', e?.target?.checked)}
                size="sm"
              />
              
              <Checkbox
                label="Include Volume Data"
                checked={exportSettings?.includeVolume}
                onChange={(e) => handleExportSettingChange('includeVolume', e?.target?.checked)}
                size="sm"
              />
              
              <Checkbox
                label="Add Watermark"
                checked={exportSettings?.includeWatermark}
                onChange={(e) => handleExportSettingChange('includeWatermark', e?.target?.checked)}
                size="sm"
              />
              
              <Checkbox
                label="High Resolution"
                checked={exportSettings?.highResolution}
                onChange={(e) => handleExportSettingChange('highResolution', e?.target?.checked)}
                size="sm"
              />
            </div>

            {/* Export Actions */}
            <div className="px-3 py-2 space-y-1">
              <Button
                variant="default"
                size="sm"
                onClick={() => handleExport(exportFormat)}
                className="w-full justify-start"
                iconName="Download"
                iconPosition="left"
                iconSize={14}
              >
                Export Chart
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrint}
                className="w-full justify-start text-muted-foreground hover:text-foreground"
              >
                <Icon name="Printer" size={14} className="mr-2" />
                Print Chart
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="w-full justify-start text-muted-foreground hover:text-foreground"
              >
                <Icon name="Share" size={14} className="mr-2" />
                Share Chart
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Settings Menu */}
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className="text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-150"
        >
          <Icon name="Settings" size={16} />
        </Button>

        {isSettingsOpen && (
          <div className="absolute right-0 top-full mt-1 w-72 bg-popover border border-border rounded-md shadow-elevation-2 py-2 z-50">
            {/* Theme Settings */}
            <div className="px-3 py-2 border-b border-border">
              <label className="text-xs text-muted-foreground mb-2 block">Appearance</label>
              <Select
                options={themes}
                value={theme}
                onChange={handleThemeChange}
                className="w-full"
              />
            </div>

            {/* Layout Management */}
            <div className="px-3 py-2 border-b border-border">
              <label className="text-xs text-muted-foreground mb-2 block">Layout Management</label>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSaveLayout}
                  className="w-full justify-start text-popover-foreground hover:bg-muted/50"
                >
                  <Icon name="Save" size={14} className="mr-2" />
                  Save Current Layout
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLoadLayout}
                  className="w-full justify-start text-popover-foreground hover:bg-muted/50"
                >
                  <Icon name="FolderOpen" size={14} className="mr-2" />
                  Load Saved Layout
                </Button>
              </div>
            </div>

            {/* Chart Preferences */}
            <div className="px-3 py-2 border-b border-border">
              <label className="text-xs text-muted-foreground mb-2 block">Chart Preferences</label>
              <div className="space-y-2">
                <Checkbox
                  label="Auto-refresh data"
                  checked
                  onChange={() => console.log('Auto-refresh toggled')}
                  size="sm"
                />
                <Checkbox
                  label="Show grid lines"
                  checked
                  onChange={() => console.log('Grid lines toggled')}
                  size="sm"
                />
                <Checkbox
                  label="Enable crosshair"
                  checked
                  onChange={() => console.log('Crosshair toggled')}
                  size="sm"
                />
                <Checkbox
                  label="Sound alerts"
                 
                  onChange={() => console.log('Sound alerts toggled')}
                  size="sm"
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="px-3 py-2">
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => console.log('Reset to defaults')}
                  className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted/50"
                >
                  <Icon name="RotateCcw" size={14} className="mr-2" />
                  Reset to Defaults
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => console.log('Open help')}
                  className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted/50"
                >
                  <Icon name="HelpCircle" size={14} className="mr-2" />
                  Help & Support
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Fullscreen Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          if (document.fullscreenElement) {
            document.exitFullscreen();
          } else {
            document.documentElement?.requestFullscreen();
          }
        }}
        className="text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-150"
      >
        <Icon name="Maximize" size={16} />
      </Button>
    </div>
  );
};

export default ExportSettingsHub;