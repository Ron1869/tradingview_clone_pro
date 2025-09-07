import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const EconomicCalendar = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [selectedImportance, setSelectedImportance] = useState('all');

  const periods = [
    { value: 'today', label: 'Сегодня' },
    { value: 'tomorrow', label: 'Завтра' },
    { value: 'week', label: 'Эта неделя' },
    { value: 'month', label: 'Этот месяц' }
  ];

  const importanceLevels = [
    { value: 'all', label: 'Все события' },
    { value: 'high', label: 'Высокая важность' },
    { value: 'medium', label: 'Средняя важность' },
    { value: 'low', label: 'Низкая важность' }
  ];

  const economicEvents = [
    {
      time: '10:30',
      country: 'RU',
      event: 'Ключевая ставка ЦБ РФ',
      importance: 'high',
      forecast: '16.00%',
      previous: '16.00%',
      actual: null,
      impact: 'RUB',
      description: 'Решение Центрального банка по процентной ставке'
    },
    {
      time: '12:00',
      country: 'RU',
      event: 'Индекс PMI в производстве',
      importance: 'medium',
      forecast: '51.2',
      previous: '50.8',
      actual: '51.5',
      impact: 'RUB',
      description: 'Индекс деловой активности в производственном секторе'
    },
    {
      time: '14:30',
      country: 'US',
      event: 'Данные по занятости (NFP)',
      importance: 'high',
      forecast: '180K',
      previous: '175K',
      actual: null,
      impact: 'USD',
      description: 'Изменение количества рабочих мест в несельскохозяйственном секторе'
    },
    {
      time: '16:00',
      country: 'EU',
      event: 'Решение ЕЦБ по ставкам',
      importance: 'high',
      forecast: '4.50%',
      previous: '4.50%',
      actual: null,
      impact: 'EUR',
      description: 'Решение Европейского центрального банка по процентным ставкам'
    },
    {
      time: '18:00',
      country: 'RU',
      event: 'Данные по инфляции',
      importance: 'medium',
      forecast: '7.2%',
      previous: '7.4%',
      actual: null,
      impact: 'RUB',
      description: 'Годовой уровень инфляции потребительских цен'
    }
  ];

  const getImportanceColor = (importance) => {
    switch (importance) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getImportanceIcon = (importance) => {
    switch (importance) {
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'AlertCircle';
      case 'low':
        return 'Info';
      default:
        return 'Circle';
    }
  };

  const getCountryFlag = (country) => {
    const flags = {
      'RU': '🇷🇺',
      'US': '🇺🇸',
      'EU': '🇪🇺',
      'CN': '🇨🇳',
      'JP': '🇯🇵'
    };
    return flags?.[country] || '🌍';
  };

  const filteredEvents = economicEvents?.filter(event => {
    if (selectedImportance === 'all') return true;
    return event?.importance === selectedImportance;
  });

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Экономический календарь</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Select
            options={periods}
            value={selectedPeriod}
            onChange={setSelectedPeriod}
            className="w-32"
          />
          <Select
            options={importanceLevels}
            value={selectedImportance}
            onChange={setSelectedImportance}
            className="w-36"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => console.log('Refresh calendar')}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="RefreshCw" size={16} />
          </Button>
        </div>
      </div>
      {/* Current Date */}
      <div className="bg-muted/20 rounded-md p-3 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-foreground">
              {new Date()?.toLocaleDateString('ru-RU', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <div className="text-xs text-muted-foreground">
              Московское время (UTC+3)
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-foreground">{filteredEvents?.length} событий</div>
            <div className="text-xs text-muted-foreground">запланировано</div>
          </div>
        </div>
      </div>
      {/* Events List */}
      <div className="space-y-2">
        {filteredEvents?.map((event, index) => (
          <div 
            key={index} 
            className="bg-muted/10 rounded-md p-3 hover:bg-muted/20 transition-colors duration-150 cursor-pointer"
            onClick={() => console.log(`Selected event: ${event?.event}`)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="text-sm font-mono text-foreground min-w-0">
                  {event?.time}
                </div>
                <div className="text-lg">{getCountryFlag(event?.country)}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">{event?.event}</div>
                  <div className="text-xs text-muted-foreground">{event?.description}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getImportanceIcon(event?.importance)} 
                  size={16} 
                  className={getImportanceColor(event?.importance)}
                />
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  event?.impact === 'RUB' ? 'bg-primary/20 text-primary' :
                  event?.impact === 'USD'? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                }`}>
                  {event?.impact}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div>
                <div className="text-muted-foreground">Прогноз</div>
                <div className="font-mono text-foreground">{event?.forecast}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Предыдущий</div>
                <div className="font-mono text-foreground">{event?.previous}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Фактический</div>
                <div className={`font-mono ${
                  event?.actual ? 
                    (parseFloat(event?.actual) > parseFloat(event?.forecast) ? 'text-success' : 'text-error') :
                    'text-muted-foreground'
                }`}>
                  {event?.actual || 'Ожидается'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Market Impact Summary */}
      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Влияние на рынок</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => console.log('View market impact analysis')}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Подробный анализ
          </Button>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm font-semibold text-error">3</div>
            <div className="text-xs text-muted-foreground">Высокое влияние</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-warning">2</div>
            <div className="text-xs text-muted-foreground">Среднее влияние</div>
          </div>
          <div>
            <div className="text-sm font-semibold text-success">0</div>
            <div className="text-xs text-muted-foreground">Низкое влияние</div>
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="mt-4 flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => console.log('Set alert')}
          className="flex-1 text-xs"
        >
          <Icon name="Bell" size={14} className="mr-1" />
          Уведомления
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => console.log('Export calendar')}
          className="flex-1 text-xs"
        >
          <Icon name="Download" size={14} className="mr-1" />
          Экспорт
        </Button>
      </div>
    </div>
  );
};

export default EconomicCalendar;