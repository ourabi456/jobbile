import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

export type UserRole = 'technician' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export type JobStatus = 'scheduled' | 'in_progress' | 'completed' | 'draft';

export interface Job {
  id: string;
  title: string;
  status: JobStatus;
  scheduledAt: string;
  clientName: string;
  address: string;
  description?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  lineItems?: LineItem[];
  photos?: string[];
  totalAmount?: number;
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  jobCount: number;
  totalRevenue: number;
  initials: string;
  color: string;
}

export interface Invoice {
  id: string;
  number: string;
  clientName: string;
  jobTitle: string;
  status: 'draft' | 'sent' | 'paid' | 'void';
  subtotal: number;
  tax: number;
  total: number;
  dueDate: string;
  lineItems: LineItem[];
}

interface AppState {
  user: User | null;
  token: string | null;
  isOffline: boolean;
  jobs: Job[];
  clients: Client[];
  invoices: Invoice[];
  setUser: (user: User | null, token: string | null) => void;
  logout: () => void;
  setOffline: (v: boolean) => void;
  setJobs: (jobs: Job[]) => void;
  updateJobStatus: (id: string, status: JobStatus) => void;
}

// Mock data matching the HTML preview
const MOCK_JOBS: Job[] = [
  { id: '1', title: 'HVAC Maintenance', status: 'completed', scheduledAt: '8:00 AM', clientName: 'Johnson Residence', address: '14 Oak Lane, Suite 1', description: 'Annual HVAC maintenance and filter replacement.', priority: 'medium', totalAmount: 180 },
  { id: '2', title: 'Plumbing Repair', status: 'in_progress', scheduledAt: '10:30 AM', clientName: 'Smith Office Park', address: '42 Business Park Drive, Suite 5', description: 'Replace kitchen faucet (customer-supplied Delta model). Check under-sink supply lines for corrosion. Diagnose slow drain reported since Tuesday — possible partial blockage.', priority: 'high', totalAmount: 313.99, lineItems: [{ id: 'li1', description: 'Labor (2.5 hrs @ $80)', quantity: 2.5, unitPrice: 80, total: 200 }, { id: 'li2', description: 'Delta Faucet Kit', quantity: 1, unitPrice: 89.99, total: 89.99 }, { id: 'li3', description: 'Drain Treatment', quantity: 1, unitPrice: 24, total: 24 }] },
  { id: '3', title: 'AC Installation', status: 'scheduled', scheduledAt: '1:00 PM', clientName: 'Metro Plaza', address: 'Metro Plaza, Suite 4', description: 'Install new Carrier 3-ton split AC unit.', priority: 'medium', totalAmount: 850 },
  { id: '4', title: 'Annual Inspection', status: 'scheduled', scheduledAt: '4:00 PM', clientName: 'Harbor View Apts', address: '88 Harbor View Blvd', description: 'Annual property inspection per contract.', priority: 'low', totalAmount: 200 },
  { id: '5', title: 'Boiler Inspection', status: 'completed', scheduledAt: 'Apr 16', clientName: 'Metro Hotel', address: '200 Central Ave', priority: 'medium', totalAmount: 320 },
  { id: '6', title: 'Pipe Replacement', status: 'completed', scheduledAt: 'Apr 15', clientName: 'Riverside Office', address: '5 River Rd', priority: 'high', totalAmount: 480 },
];

const MOCK_CLIENTS: Client[] = [
  { id: 'c1', name: 'David Smith', email: 'david@smithoffices.com', phone: '(415) 555-0192', location: 'Smith Office Park', jobCount: 8, totalRevenue: 2400, initials: 'DS', color: '#EFF6FF' },
  { id: 'c2', name: 'Sarah Johnson', email: 'sarah@johnson.com', phone: '(415) 555-0101', location: 'Johnson Residence', jobCount: 12, totalRevenue: 4100, initials: 'SJ', color: '#F0FDF4' },
  { id: 'c3', name: 'Metro Plaza LLC', email: 'mgmt@metroplaza.com', phone: '(415) 555-0200', location: 'Commercial', jobCount: 24, totalRevenue: 18600, initials: 'MP', color: '#FFFBEB' },
  { id: 'c4', name: 'Harbor View Apts', email: 'admin@harborview.com', phone: '(415) 555-0300', location: 'Property Mgmt', jobCount: 6, totalRevenue: 3200, initials: 'HA', color: '#FEF2F2' },
  { id: 'c5', name: 'Riverside Corp', email: 'info@riverside.com', phone: '(415) 555-0400', location: 'Commercial', jobCount: 3, totalRevenue: 950, initials: 'RC', color: '#F3F4F6' },
];

const MOCK_INVOICES: Invoice[] = [
  { id: 'inv1', number: 'INV-2026-0042', clientName: 'David Smith', jobTitle: 'Plumbing Repair — April 18, 2026', status: 'sent', subtotal: 313.99, tax: 25.12, total: 339.11, dueDate: 'May 18, 2026', lineItems: [{ id: 'li1', description: 'Labor (2.5 hrs)', quantity: 2.5, unitPrice: 80, total: 200 }, { id: 'li2', description: 'Delta Faucet Kit', quantity: 1, unitPrice: 89.99, total: 89.99 }, { id: 'li3', description: 'Drain Treatment', quantity: 1, unitPrice: 24, total: 24 }] },
  { id: 'inv2', number: 'INV-2026-0041', clientName: 'Sarah Johnson', jobTitle: 'HVAC Maintenance — April 18, 2026', status: 'sent', subtotal: 166.67, tax: 13.33, total: 180, dueDate: 'May 18, 2026', lineItems: [{ id: 'li4', description: 'Labor (1.5 hrs)', quantity: 1.5, unitPrice: 80, total: 120 }, { id: 'li5', description: 'Air Filter', quantity: 1, unitPrice: 46.67, total: 46.67 }] },
  { id: 'inv3', number: 'INV-2026-0040', clientName: 'Metro Plaza LLC', jobTitle: 'AC Installation — April 17, 2026', status: 'paid', subtotal: 783.33, tax: 62.67, total: 846, dueDate: 'May 17, 2026', lineItems: [{ id: 'li6', description: 'Labor (5 hrs)', quantity: 5, unitPrice: 80, total: 400 }, { id: 'li7', description: 'Carrier AC Unit', quantity: 1, unitPrice: 383.33, total: 383.33 }] },
];

export const useStore = create<AppState>((set) => ({
  user: null,
  token: null,
  isOffline: false,
  jobs: MOCK_JOBS,
  clients: MOCK_CLIENTS,
  invoices: MOCK_INVOICES,

  setUser: async (user, token) => {
    if (user && token) {
      await SecureStore.setItemAsync('access_token', token);
      await SecureStore.setItemAsync('user', JSON.stringify(user));
    }
    set({ user, token });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync('access_token');
    await SecureStore.deleteItemAsync('user');
    set({ user: null, token: null });
  },

  setOffline: (v) => set({ isOffline: v }),
  setJobs: (jobs) => set({ jobs }),
  updateJobStatus: (id, status) =>
    set((state) => ({
      jobs: state.jobs.map((j) => (j.id === id ? { ...j, status } : j)),
    })),
}));
