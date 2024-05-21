'use client'

import { Passenger } from "@/types/passenger.type";
import { Ride } from "@/types/ride.type";
import { Suspense, useEffect, useState } from "react";
import { fetchPassengerById, fetchRides } from "./Upcoming.server";
import { useUser } from "@/lib/user/useUser";
import { Loader } from "@/ui/loader/Loader";


export const UpcomingRides: React.FC = () => {
    const [rides, setRides] = useState<Ride[]>([]);
    const [upcoming, setUpcoming]= useState<{r: Ride, p: Passenger}[]>([]);

    const {user} = useUser();

    //load all passengers
    useEffect(() => {
      const loadRidesAndPassengers = async () => {
        const rides = await fetchRides(user!);
        const upcoming: {r: Ride, p: Passenger}[] = [];

        for (const r of rides) {
          const np = await fetchPassengerById(r.passenger_1);
          if (!upcoming.some(u => u.r.id === r.id && u.p.id === np.id)) {
            upcoming.push({r: r, p: np});
          }
        }

        setRides(rides);
        setUpcoming(upcoming);
      };

      loadRidesAndPassengers();
    }, [user]);

    return (
        <div>
            <Suspense fallback={<Loader/>}>
            {upcoming.map((u) => (
              <div key={u.p.id + u.r.id}>
              {u.p.firstname}
            </div>
            ))}
            </Suspense>
        </div>
)}
