import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';
import { supabase, isSupabaseConfigured } from '../services/supabase';
import { trackEvent } from '../services/analytics';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, phone: string, pass: string, businessName?: string, gstNumber?: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => Promise<boolean>;
  mustChangeAdminPassword?: boolean;
}

const AUTH_STORAGE_KEY = 'chb_auth_user_v1';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  // Initial Supabase Session Sync if configured
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user && !user) {
          const profile: UserProfile = {
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.name || 'Customer',
            phone: session.user.user_metadata?.phone || '',
            role: session.user.email?.toLowerCase().includes('admin') ? 'ADMIN' : 'CUSTOMER',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          setUser(profile);
        }
      });
    }
  }, []);

  const login = async (email: string, pass: string): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);
    const cleanEmail = email.trim().toLowerCase();

    // Development / Bootstrap Admin Fallback
    if (cleanEmail === 'admin@chhabilalcards.in' && (pass === 'ChangeMe@12345' || pass === 'admin123')) {
      const adminUser: UserProfile = {
        id: 'usr-admin-super',
        email: 'admin@chhabilalcards.in',
        name: 'Chhabilal Admin',
        phone: '+91 7873837941',
        role: 'SUPER_ADMIN',
        mustChangePassword: pass === 'ChangeMe@12345',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setUser(adminUser);
      setIsLoading(false);
      trackEvent('login', '/login', undefined, undefined, undefined, { role: 'SUPER_ADMIN' });
      return { success: true };
    }

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email: cleanEmail, password: pass });
      if (error) {
        setIsLoading(false);
        return { success: false, message: error.message };
      }
      if (data.user) {
        const profile: UserProfile = {
          id: data.user.id,
          email: data.user.email || cleanEmail,
          name: data.user.user_metadata?.name || cleanEmail.split('@')[0],
          phone: data.user.user_metadata?.phone || '',
          role: cleanEmail.includes('admin') ? 'ADMIN' : 'CUSTOMER',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setUser(profile);
        setIsLoading(false);
        trackEvent('login', '/login', undefined, undefined, undefined, { role: profile.role });
        return { success: true };
      }
    }

    // Local Customer Authentication Fallback
    const mockCustomer: UserProfile = {
      id: 'usr-' + Date.now(),
      email: cleanEmail,
      name: cleanEmail.split('@')[0].toUpperCase(),
      phone: '+91 9876543210',
      role: cleanEmail.includes('admin') ? 'ADMIN' : 'CUSTOMER',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setUser(mockCustomer);
    setIsLoading(false);
    trackEvent('login', '/login');
    return { success: true };
  };

  const register = async (
    name: string, 
    email: string, 
    phone: string, 
    pass: string, 
    businessName?: string, 
    gstNumber?: string
  ): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);
    const cleanEmail = email.trim().toLowerCase();

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password: pass,
        options: {
          data: { name, phone, businessName, gstNumber }
        }
      });
      if (error) {
        setIsLoading(false);
        return { success: false, message: error.message };
      }
    }

    const newUser: UserProfile = {
      id: 'usr-' + Date.now(),
      email: cleanEmail,
      name,
      phone,
      role: 'CUSTOMER',
      businessName,
      gstNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setUser(newUser);
    setIsLoading(false);
    trackEvent('signup', '/register');
    return { success: true };
  };

  const logout = () => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const updateProfile = async (updates: Partial<UserProfile>): Promise<boolean> => {
    if (!user) return false;
    const updated = { ...user, ...updates, updatedAt: new Date().toISOString() };
    setUser(updated);
    return true;
  };

  const role = user?.role || 'CUSTOMER';
  const isAdmin = role === 'ADMIN' || role === 'SUPER_ADMIN';

  return (
    <AuthContext.Provider value={{
      user,
      role,
      isAdmin,
      isLoading,
      login,
      register,
      logout,
      updateProfile,
      mustChangeAdminPassword: user?.mustChangePassword,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
