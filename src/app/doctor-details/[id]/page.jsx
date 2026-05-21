import DoctorDetailsMain from "@/components/doctor-details/DoctorDetailsMain";

export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: `Doctor Profile | ${id}`,
    description: "View detailed profile and available slots for this doctor.",
  };
}

export default function DoctorDetailsPage({ params }) {
  return <DoctorDetailsMain params={params} />;
}