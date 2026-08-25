"use client";

import { useAssessment } from "@/context/AssessmentContext";
import UploadScreen from "@/components/upload/UploadScreen";
import ExtractingScreen from "@/components/extracting/ExtractingScreen";
import MappingScreen from "@/components/mapping/MappingScreen";

export default function Home() {
  const { screen } = useAssessment();

  return (
    <div className="w-full h-full flex flex-col">
      {screen === 'upload' && <UploadScreen />}
      {screen === 'extracting' && <ExtractingScreen />}
      {screen === 'mapping' && <MappingScreen />}
    </div>
  );
}
