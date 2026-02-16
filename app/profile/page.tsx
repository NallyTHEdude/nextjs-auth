import React from 'react'

function ProfilePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Profile
        </h1>

        <div className="space-y-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Username</p>
            <p className="text-lg font-medium">USER USERNAME</p>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Email</p>
            <p className="text-lg font-medium">USER EMAIL</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage