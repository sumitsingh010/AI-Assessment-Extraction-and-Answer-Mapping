import React from 'react';
import { ArrowLeft, Search, HelpCircle, Bell, Plus, ChevronDown } from 'lucide-react';

export default function TopBar() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:px-6 w-full shrink-0">
      <div className="flex items-center space-x-4 flex-1">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:block">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        
        <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
          <span>Exams</span>
        </div>

        <div className="md:hidden flex items-center space-x-2">
           <div className="bg-black text-white p-1 rounded-md text-xs">
            <span className="font-bold">V</span>
          </div>
          <span className="font-bold text-lg">VedaAI</span>
        </div>

        <div className="flex-1 max-w-xl hidden md:block ml-8">
           <div className="relative border-b-2 border-dotted border-purple-300 mx-8"></div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:block">
          <HelpCircle className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:block">
          <Plus className="w-5 h-5 text-gray-600" />
        </button>
        
        <div className="flex items-center space-x-2 pl-2 md:pl-4 md:border-l">
          <div className="w-8 h-8 rounded-full bg-orange-200 overflow-hidden">
            {/* Avatar placeholder */}
            <div className="w-full h-full bg-orange-300"></div>
          </div>
          <span className="text-sm font-medium text-gray-700 hidden md:block">Sumit Singh</span>
          <ChevronDown className="w-4 h-4 text-gray-500 hidden md:block" />
        </div>
      </div>
    </header>
  );
}
