import React from "react";

export default function SkeletonForm() {
  return (
    <div className="max-w-2xl w-full mx-auto bg-white shadow-md p-6 rounded-md animate-pulse space-y-6">
      {/* Header section with photo and name */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-300 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="h-5 w-3/4 bg-gray-300 rounded" />
          <div className="h-4 w-1/2 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Contact section */}
      <div className="space-y-2">
        <div className="h-4 w-1/3 bg-gray-300 rounded" />
        <div className="h-3 w-2/3 bg-gray-200 rounded" />
        <div className="h-3 w-1/2 bg-gray-200 rounded" />
      </div>

      {/* Section Heading */}
      <div className="h-4 w-32 bg-gray-300 rounded" />

      {/* Work Experience */}
      <div className="space-y-3">
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
        <div className="h-3 w-2/3 bg-gray-200 rounded" />
        <div className="h-3 w-3/4 bg-gray-200 rounded" />
      </div>

      {/* Education */}
      <div className="space-y-3 pt-4">
        <div className="h-4 w-1/3 bg-gray-300 rounded" />
        <div className="h-3 w-2/3 bg-gray-200 rounded" />
        <div className="h-3 w-1/2 bg-gray-200 rounded" />
      </div>

      {/* Skills */}
      <div className="space-y-2 pt-4">
        <div className="h-4 w-28 bg-gray-300 rounded" />
        <div className="flex gap-2">
          <div className="h-3 w-20 bg-gray-200 rounded" />
          <div className="h-3 w-16 bg-gray-200 rounded" />
          <div className="h-3 w-24 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
