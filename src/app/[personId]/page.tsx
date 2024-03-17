"use client";
import PersonDetail from "../components/PersonDetail/PersonDetail";
export default function PersonDetailPage({ params }: any) {
  return <PersonDetail personId={params.personId} />;
}
