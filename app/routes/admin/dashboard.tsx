
import { Header, StatsCard, TripCard } from 'components'
import React from 'react'
import { getUser } from '~/appwrite/auth';
import { dashboardSats, user ,allTrips} from '~/constants';
import type { Route } from './+types/dashboard';

const { totalUsers, userRole, totalTrips, tripsCreated, usersJoined } =
  dashboardSats;

  
  export const clientLoader = async () =>  await getUser();
 
const Dashboard = ({loaderData}: Route.ComponentProps) => {
 
const user = loaderData as User | null;
 
   
  return (
    <main className="dashboard wrapper">
      <Header
        title={`Welcome ${user?.name ?? "Guest"} 👋`}
        description="Track activity, manage trips, and plan your next trip"
      />
      <section className="flex flex-col gap-6">
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6
       w-full
      "
        >
          <StatsCard
            headerTitle="Total Users"
            total={totalUsers}
            lastMonthCount={usersJoined.lastMonth}
            currentMonthCount={usersJoined.currentMonth}
          />
          <StatsCard
            headerTitle="Total Trips"
            total={totalTrips}
            lastMonthCount={tripsCreated.lastMonth}
            currentMonthCount={tripsCreated.currentMonth}
          />
          <StatsCard
            headerTitle="Active Users "
            total={userRole.total}
            lastMonthCount={userRole.lastMonth}
            currentMonthCount={userRole.currentMonth}
          />
        </div>
      </section>
      <section className='container'>
        <h1 className='text-xl font-semibold text-dark-100'>
          Created Trips
        </h1>
        <div className='trip-grid'>
          {allTrips.slice(0, 4).map(({id,name,imageUrls,itinerary,tags,estimatedPrice}) => (
            <TripCard 
            key={id}
            id={id.toString()}
            name={name}
            location={itinerary[0].location ?? ""}
            imageUrl={imageUrls[0]}
            tags={tags}
            price={estimatedPrice}
              />
          ))}
        </div>
      </section>
      
    </main>
  );
}

export default Dashboard