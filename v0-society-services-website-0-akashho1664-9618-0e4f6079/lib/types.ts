export type UserRole = "resident" | "manager" | "admin"

export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: UserRole
  avatar?: string
  society?: string
  flatNumber?: string
  joinedDate: string
}

export interface Service {
  id: string
  name: string
  description: string
  category: string
  icon: string
  basePrice: number
  priceUnit: string
  active: boolean
  image: string
}

export type RequestStatus = "pending" | "approved" | "assigned" | "in-progress" | "completed" | "cancelled"

export interface ServiceRequest {
  id: string
  serviceId: string
  serviceName: string
  residentName: string
  residentFlat: string
  society: string
  description: string
  status: RequestStatus
  priority: "low" | "medium" | "high" | "urgent"
  assignedStaff?: string
  createdAt: string
  updatedAt: string
  scheduledDate?: string
  completedDate?: string
}

export interface Payment {
  id: string
  requestId: string
  serviceName: string
  amount: number
  status: "paid" | "pending" | "overdue" | "refunded"
  date: string
  invoiceNumber: string
  residentName: string
  society: string
}

export interface Staff {
  id: string
  name: string
  email: string
  phone: string
  specialty: string
  availability: boolean
  assignedRequests: number
  rating: number
  joinedDate: string
}

export interface Society {
  id: string
  name: string
  address: string
  totalFlats: number
  activeResidents: number
  managerId: string
  managerName: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "success" | "error"
  read: boolean
  createdAt: string
  targetRole: UserRole | "all"
}

export interface Testimonial {
  id: string
  name: string
  society: string
  rating: number
  review: string
  avatar?: string
   image: string 
}

export interface MonthlyRevenue {
  month: string
  revenue: number
  requests: number
}

export interface ServiceStat {
  name: string
  requests: number
  revenue: number
}
