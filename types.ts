export interface Intent {
  id: string
  type: 'swap'
  from: string
  to: string
  amount: number
  minRate: number
  privacy: boolean
  status: 'pending' | 'fulfilled'
  createdBy: string
}
