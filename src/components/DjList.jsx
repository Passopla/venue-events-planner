import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon, PlusIcon } from '@radix-ui/react-icons';

const DjList = ({ djs = [], onAddDj }) => {
  const [isAddDjOpen, setIsAddDjOpen] = useState(false);
  const [newDjName, setNewDjName] = useState('');
  const [newDjGenres, setNewDjGenres] = useState('');

  const handleAddDj = (e) => {
    e.preventDefault();
    
    const colors = [
      'from-purple-500 to-indigo-500',
      'from-orange-500 to-pink-500',
      'from-yellow-400 to-orange-500',
      'from-blue-500 to-indigo-500',
      'from-green-400 to-teal-500',
      'from-red-500 to-pink-500',
    ];
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const newDj = {
      id: djs.length + 1,
      name: newDjName,
      genres: newDjGenres,
      color: randomColor,
    };
    
    onAddDj(newDj);
    setNewDjName('');
    setNewDjGenres('');
    setIsAddDjOpen(false);
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">DJ List</h2>
        <button 
          onClick={() => setIsAddDjOpen(true)}
          className="p-1 rounded-full bg-blue-600/80 hover:bg-blue-700/90 text-white"
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>
      
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 shadow-xl max-h-60 overflow-y-auto">
        <div className="space-y-2">
          {djs.map((dj) => (
            <div key={dj.id} className="bg-white/5 backdrop-blur-md rounded-lg p-3 flex items-center">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${dj.color} mr-3 flex-shrink-0`}></div>
              <div>
                <h3 className="font-medium">{dj.name}</h3>
                <p className="text-sm text-gray-300">{dj.genres}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Dialog.Root open={isAddDjOpen} onOpenChange={setIsAddDjOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800/90 backdrop-blur-md border border-gray-700 p-6 rounded-lg shadow-xl w-full max-w-md">
            <Dialog.Title className="text-xl font-medium mb-4">Add New DJ</Dialog.Title>
            
            <form onSubmit={handleAddDj}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">DJ Name</label>
                  <input
                    type="text"
                    value={newDjName}
                    onChange={(e) => setNewDjName(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter DJ name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Genres</label>
                  <input
                    type="text"
                    value={newDjGenres}
                    onChange={(e) => setNewDjGenres(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Hip-Hop, House, Techno"
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-6">
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md"
                  >
                    Cancel
                  </button>
                </Dialog.Close>
                
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md"
                >
                  Add DJ
                </button>
              </div>
            </form>
            
            <Dialog.Close asChild>
              <button
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-700"
                aria-label="Close"
              >
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default DjList;