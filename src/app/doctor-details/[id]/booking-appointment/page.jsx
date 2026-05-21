import BookingMain from "@/components/doctor-details/BookingMain";

export const metadata = {
  title: "Book Appointment | Doctor Appointment",
  description: "Secure your appointment slot with the doctor.",
};

export default function BookingPage({ params }) {
  return <BookingMain params={params} />;
}