'use client';

import { useState, useEffect } from 'react';
import { CustomToast } from '@/components/ui/custom-toast';
 

interface Setting {
  id: string;
  key: string;
  value: any;
  label: string;
  description?: string;
  type: 'string' | 'number' | 'boolean' | 'json';
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    options?: any[];
  };
  updatedAt: string;
}

interface GroupedSettings {
  [category: string]: Setting[];
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<GroupedSettings>({});
  const [loading, setLoading] = useState(true);
  const [changes, setChanges] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/settings');
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch settings');
      }
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
      CustomToast({
        title: "Error Loading Settings",
        description: error instanceof Error ? error.message : 'Failed to load settings',
        variant: "destructive",
        className: "cursor-pointer select-none",
      } as any);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: string, value: any) => {
    setChanges(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const updates = Object.entries(changes).map(([key, value]) => ({ key, value }));
      
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      const data = await response.json();
      
      if (!response.ok) {
        if (data.results) {
          // Show validation errors
          const errors = data.results
            .filter((r: any) => r.status === 'error')
            .map((r: any) => `${r.key}: ${r.message}`)
            .join('\\n');
          throw new Error(errors);
        }
        throw new Error(data.error || 'Failed to save settings');
      }

      CustomToast({
        title: "Settings Saved",
        description: "Your changes have been saved successfully",
        variant: "success",
        className: "cursor-pointer select-none",
      } as any);

      setChanges({});
      fetchSettings();
    } catch (error) {
      console.error('Error saving settings:', error);
      CustomToast({
        title: "Error Saving Settings",
        description: error instanceof Error ? error.message : 'Failed to save settings',
        variant: "destructive",
        className: "cursor-pointer select-none",
      } as any);
    } finally {
      setSaving(false);
    }
  };

  const renderSettingInput = (setting: Setting) => {
    const value = changes[setting.key] ?? setting.value;

    switch (setting.type) {
      case 'boolean':
        return (
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={value}
              onChange={(e) => handleChange(setting.key, e.target.checked)}
            />
            <div className="w-11 h-6 bg-slate-700/50 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
          </label>
        );

      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handleChange(setting.key, Number(e.target.value))}
            min={setting.validation?.min}
            max={setting.validation?.max}
            className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-white/10 text-white/90 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/20 transition-all duration-200"
          />
        );

      case 'json':
        return (
          <textarea
            value={typeof value === 'object' ? JSON.stringify(value, null, 2) : value}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                handleChange(setting.key, parsed);
              } catch {
                handleChange(setting.key, e.target.value);
              }
            }}
            rows={4}
            className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-white/10 text-white/90 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/20 transition-all duration-200 font-mono text-sm"
          />
        );

      default:
        return setting.validation?.options ? (
          <select
            value={value}
            onChange={(e) => handleChange(setting.key, e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-white/10 text-white/90 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/20 transition-all duration-200"
          >
            {setting.validation.options.map((option: any) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => handleChange(setting.key, e.target.value)}
            pattern={setting.validation?.pattern}
            className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-white/10 text-white/90 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/20 transition-all duration-200"
          />
        );
    }
  };

  const categoryIcons: Record<string, JSX.Element> = {
    general: (
      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    points: (
      <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    payments: (
      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    notifications: (
      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    security: (
      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl space-y-8 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
            System Settings
          </h1>
          <p className="text-white/60 text-lg">Configure system-wide settings and preferences</p>
        </div>
        {Object.keys(changes).length > 0 && (
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-medium transition-all duration-200 shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {saving ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Save Changes</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Settings Grid */}
      <div className="grid gap-8">
        {loading ? (
          Array(5).fill(0).map((_, index) => (
            <div key={index} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-xl animate-pulse">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-slate-700/50" />
                <div className="h-6 bg-slate-700/50 rounded w-32" />
              </div>
              <div className="space-y-4">
                {Array(3).fill(0).map((_, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="space-y-2">
                      <div className="h-4 bg-slate-700/50 rounded w-24" />
                      <div className="h-3 bg-slate-700/50 rounded w-48" />
                    </div>
                    <div className="w-64 h-10 bg-slate-700/50 rounded-lg" />
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          Object.entries(settings).map(([category, categorySettings]) => (
            <div
              key={category}
              className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-white/20"
            >
              {/* Category Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-slate-700/50 group-hover:bg-slate-700/70 transition-colors duration-300">
                    {categoryIcons[category]}
                  </div>
                  <h2 className="text-xl font-semibold text-white/90 capitalize group-hover:text-white transition-colors duration-300">
                    {category} Settings
                  </h2>
                </div>
              </div>

              {/* Category Settings */}
              <div className="p-6">
                <div className="grid gap-8">
                  {categorySettings.map((setting) => (
                    <div key={setting.id} className="space-y-3">
                      <div className="flex justify-between items-start gap-8">
                        <div className="space-y-1 flex-1">
                          <label className="text-sm font-medium text-white/90 block">
                            {setting.label}
                          </label>
                          {setting.description && (
                            <p className="text-sm text-white/60">{setting.description}</p>
                          )}
                        </div>
                        <div className="w-80">
                          {renderSettingInput(setting)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
