export type Ride = {
    car: string
    carecenter_id: string
    created_at?: string
    destination: string
    driver: string | null
    id?: string
    origin: string
    passenger_1: string
    passenger_2: string | null
    timestamp: string
    duration: number | null
    distance: number | null
  }