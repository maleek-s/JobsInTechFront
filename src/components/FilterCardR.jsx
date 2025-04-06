import React from 'react';

const FilterCardR = ({ jobs, selectedCategory, onCategoryChange, onClose, onReset }) => {
  const uniqueCategories = [...new Set(jobs.map(job => job.jobCategory))].filter(Boolean);

  const formatCategoryDisplayName = (category) => {
    return category
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between camel case words
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
  };

  const changeHandler = (category) => {
    onCategoryChange(category);
    if (onClose) onClose();
  };

  const resetHandler = () => {
    onCategoryChange(null); // Set to null to show initial message
    if (onReset) onReset(); // Call the reset handler from parent
    if (onClose) onClose();
  };

  return (
    <div className='w-full rounded-lg dark:bg-gray-800 border dark:border-gray-700 overflow-hidden'>
      <div className="p-4 bg-gray-50 dark:bg-gray-700">
        <div className="flex justify-between items-center">
          <h1 className='font-bold text-lg dark:text-white'>Filters</h1>
          <button 
            onClick={resetHandler}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Clear all
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <h2 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Job Categories</h2>
        
        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
          {uniqueCategories.map((category, idx) => (
            <div 
              key={idx} 
              className={`flex items-center p-3 rounded-lg cursor-pointer transition ${selectedCategory === category 
                ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800' 
                : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
              onClick={() => changeHandler(category)}
            >
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${selectedCategory === category 
                ? 'border-blue-500 bg-blue-500' 
                : 'border-gray-400 dark:border-gray-500'}`}>
                {selectedCategory === category && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className="dark:text-gray-300">{formatCategoryDisplayName(category)}</span>
              <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
                ({jobs.filter(job => job.jobCategory === category).length})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div> 
  );
};

export default FilterCardR;