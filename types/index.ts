export interface Field {
    id: string;
    name: string;
    cropType: string;
    lastIrrigated: string;
    moistureLevel: number;
    temperature: number;
    humidity: number;
    image: string;
  }
  
  export interface Alert {
    id: string;
    type: 'moisture' | 'equipment' | 'weather';
    message: string;
    timestamp: string;
    isRead: boolean;
    severity: 'low' | 'medium' | 'high';
  }
  
  export interface DashboardStats {
    totalFields: number;
    fieldsIrrigated: number;
    waterSaved: number;
    activeAlerts: number;
  }