import React, { createContext, useContext, useState, useEffect } from 'react';
import { WebsiteSectionConfig, CategoryItem, Promotion, PresetType, BusinessSettings } from '../types';
import { DataStore, SEED_SECTIONS, SEED_CATEGORIES, SEED_SETTINGS } from '../services/store';

interface WebsiteCmsContextType {
  sections: WebsiteSectionConfig[];
  categories: CategoryItem[];
  promotions: Promotion[];
  settings: BusinessSettings;
  isSectionEnabled: (sectionId: string) => boolean;
  isCategoryVisible: (categorySlug: string) => boolean;
  toggleSection: (sectionId: string) => Promise<void>;
  applyPreset: (preset: PresetType) => Promise<void>;
  refreshCms: () => Promise<void>;
}

const WebsiteCmsContext = createContext<WebsiteCmsContextType | undefined>(undefined);

export const WebsiteCmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sections, setSections] = useState<WebsiteSectionConfig[]>(SEED_SECTIONS);
  const [categories, setCategories] = useState<CategoryItem[]>(SEED_CATEGORIES);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [settings, setSettings] = useState<BusinessSettings>(SEED_SETTINGS);

  const refreshCms = async () => {
    try {
      const [secs, cats, promos, sets] = await Promise.all([
        DataStore.getSectionConfigs(),
        DataStore.getCategories(),
        DataStore.getPromotions(),
        DataStore.getSettings(),
      ]);
      setSections(secs);
      setCategories(cats);
      setPromotions(promos);
      setSettings(sets);
    } catch (err) {
      console.warn('Error refreshing CMS config:', err);
    }
  };

  useEffect(() => {
    refreshCms();
  }, []);

  const isSectionEnabled = (sectionId: string): boolean => {
    const sec = sections.find(s => s.id === sectionId);
    return sec ? sec.enabled : true;
  };

  const isCategoryVisible = (categorySlug: string): boolean => {
    const cat = categories.find(c => c.slug === categorySlug);
    return cat ? cat.homepageVisible : true;
  };

  const toggleSection = async (sectionId: string) => {
    const updated = sections.map(s => s.id === sectionId ? { ...s, enabled: !s.enabled } : s);
    setSections(updated);
    await DataStore.saveSectionConfigs(updated);
  };

  const applyPreset = async (preset: PresetType) => {
    await DataStore.applyPreset(preset);
    await refreshCms();
  };

  return (
    <WebsiteCmsContext.Provider value={{
      sections,
      categories,
      promotions,
      settings,
      isSectionEnabled,
      isCategoryVisible,
      toggleSection,
      applyPreset,
      refreshCms,
    }}>
      {children}
    </WebsiteCmsContext.Provider>
  );
};

export const useWebsiteCms = () => {
  const context = useContext(WebsiteCmsContext);
  if (!context) throw new Error('useWebsiteCms must be used within WebsiteCmsProvider');
  return context;
};
