import { User, Settings, LogOut } from 'lucide-react';

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#6B46C1] to-[#D4AF37] rounded-full flex items-center justify-center mb-4">
            <User size={48} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold">Pi Pioneer</h1>
          <p className="text-gray-500">@username</p>
          
          <div className="mt-6 space-y-3">
            <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl">
              <Settings size={20} /> Settings
            </button>
            <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl text-red-500">
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
