'use client';

import { useState } from 'react';

import HebrewLetterTrainer from './HebrewLetterTrainer';
import LearnLetters from './LearnLetters';

type TabValue = 'type-speed' | 'learn-letters';

const tabs: { value: TabValue; label: string; description: string }[] = [
  {
    value: 'type-speed',
    label: 'Type Speed',
    description: 'Match each sound to the right letter and track your score.',
  },
  {
    value: 'learn-letters',
    label: 'Learn Letters',
    description: 'Browse every Hebrew letter with its common sounds.',
  },
];

export default function TrainerTabs() {
  const [activeTab, setActiveTab] = useState<TabValue>('type-speed');

  const renderContent = (value: TabValue) => {
    switch (value) {
      case 'type-speed':
        return <HebrewLetterTrainer />;
      case 'learn-letters':
      default:
        return <LearnLetters />;
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="order-1 sm:order-2">
        {tabs.map(tab => (
          <div
            key={tab.value}
            role="tabpanel"
            id={`trainer-tabpanel-${tab.value}`}
            aria-labelledby={`trainer-tab-${tab.value}`}
            hidden={activeTab !== tab.value}
          >
            {renderContent(tab.value)}
          </div>
        ))}
      </div>

      <div className="order-2 sm:order-1">
        <div className="mx-auto w-full max-w-xl">
          <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-2 shadow-lg shadow-slate-900/5 backdrop-blur">
            <nav
              className="grid grid-cols-2 gap-2 sm:flex"
              role="tablist"
              aria-label="Hebrew trainer modes"
            >
              {tabs.map(tab => {
                const isActive = tab.value === activeTab;

                return (
                  <button
                    key={tab.value}
                    type="button"
                    className={`group flex-1 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 sm:min-w-[10rem]
                    ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-md shadow-slate-900/25'
                        : 'bg-transparent text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                    }`}
                    onClick={() => setActiveTab(tab.value)}
                    aria-selected={isActive}
                    role="tab"
                    tabIndex={isActive ? 0 : -1}
                    id={`trainer-tab-${tab.value}`}
                    aria-controls={`trainer-tabpanel-${tab.value}`}
                  >
                    <div className="text-base font-semibold">{tab.label}</div>
                    <p className="mt-1 text-xs font-medium text-slate-400 transition-colors group-hover:text-slate-500">
                      {tab.description}
                    </p>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
