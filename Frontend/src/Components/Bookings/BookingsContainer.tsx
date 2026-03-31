import Banner from "../Common/Banner";
import BookingsGrid from "./Grid/BookingsGrid";
import BookingStatistics from "./Grid/BookingStatistics";

const BookingsContainer = () => {
  return (
    <main className="min-h-screen bg-background">
      <Banner title="My Bookings" description="View and manage your parking reservations" />
      <div className="mx-auto max-w-7xl px-4 py-8 flex flex-col gap-6">
        <BookingStatistics />
        <BookingsGrid />
      </div>
    </main>
  );
};

export default BookingsContainer;