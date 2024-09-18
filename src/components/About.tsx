import React from 'react';

export const About = () => {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center">
          <h2 className="font-unbounded text-black flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            The Blockspace Symmetry 
          </h2>
          <p className="font-unbounded text-primary flex-1 shrink-0 font-light tracking-tight sm:grow-0">
            A webapp to view the activity of projects created and worked on at WebZero hacker houses.
          </p>
        </div>
      </div>
    </section>
  );
};


