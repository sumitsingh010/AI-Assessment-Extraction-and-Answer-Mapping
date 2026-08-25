import React from 'react';
import { Home, Users, FileText, FileCheck, Library, Settings, Sparkles, ChevronRight, Menu } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r h-screen overflow-y-auto">
      <div className="p-4 flex items-center space-x-2">
        <div className="bg-black text-white p-1 rounded-md">
          <span className="font-bold text-xl">V</span>
        </div>
        <span className="font-bold text-xl">VedaAI</span>
      </div>

      <div className="px-4 py-2">
        <button className="w-full bg-[#333333] hover:bg-black text-white rounded-full py-2 px-4 flex items-center justify-center space-x-2 transition-colors">
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span className="text-sm font-medium">AI Teacher's Toolkit</span>
        </button>
      </div>

      <nav className="flex-1 px-4 mt-6 space-y-1">
        <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
          <Home className="w-5 h-5" />
          <span className="text-sm font-medium">Home</span>
        </a>
        <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
          <Users className="w-5 h-5" />
          <span className="text-sm font-medium">My Classroom</span>
        </a>
        <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
          <FileText className="w-5 h-5" />
          <span className="text-sm font-medium">Assignments</span>
        </a>
        <a href="#" className="flex items-center space-x-3 text-gray-900 bg-gray-100 px-3 py-2 rounded-lg transition-colors">
          <FileCheck className="w-5 h-5 text-gray-900" />
          <span className="text-sm font-medium">Exams</span>
        </a>
        <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
          <Library className="w-5 h-5" />
          <span className="text-sm font-medium">My Library</span>
        </a>
      </nav>

      <div className="px-4 py-4 mt-auto border-t">
        <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors mb-4">
          <Settings className="w-5 h-5" />
          <span className="text-sm font-medium">Settings</span>
        </a>
        
        <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-800 font-bold text-xs">DPS</span>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">Delhi Public School</p>
              <p className="text-[10px] text-gray-500">Bokaro Steel City</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </aside>
  );
}
