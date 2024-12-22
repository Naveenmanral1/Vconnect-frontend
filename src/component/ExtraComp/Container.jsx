import React from 'react';
function Container ({children}) {
  return (
    <main className="sm:ml-16  md:ml-64 bg-gray-50 min-h-screen  mt-14">    
           {children}
    </main>
  );
};

export default Container;