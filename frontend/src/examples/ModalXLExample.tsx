/**
 * Example component demonstrating ModalXL responsive behavior
 * This file is for reference and testing purposes
 */

import { useState } from 'react';
import ModalXL from '../components/ModalXL';
import { useViewport } from '../hooks/useViewport';

export default function ModalXLExample() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { breakpoint, width } = useViewport();

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">ModalXL Component Example</h1>
      
      {/* Viewport Info */}
      <section className="mb-6 p-4 bg-primary rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Current Viewport</h2>
        <p>Width: {width}px</p>
        <p>Breakpoint: {breakpoint}</p>
      </section>

      {/* Modal Trigger */}
      <section className="mb-6 p-4 bg-primary rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Modal Behavior</h2>
        <p className="mb-4 text-sm text-secondary">
          The modal demonstrates the following responsive features:
        </p>
        <ul className="list-disc list-inside mb-4 text-sm text-secondary space-y-1">
          <li>Full-width on mobile (no padding)</li>
          <li>Centered with max-width on tablet/desktop</li>
          <li>Scroll lock when open (body doesn't scroll)</li>
          <li>Click outside to close</li>
          <li>Keyboard visibility handling (inputs scroll into view)</li>
        </ul>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-accent text-white rounded-lg hover:opacity-80 min-h-[44px]"
        >
          Open Modal
        </button>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <ModalXL onClose={() => setIsModalOpen(false)}>
          <div className="p-6 md:p-8 bg-primary">
            <h2 className="text-2xl font-bold mb-4">Responsive Modal</h2>
            
            <p className="mb-4 text-secondary">
              This modal adapts to different screen sizes:
            </p>
            
            <ul className="list-disc list-inside mb-6 text-secondary space-y-2">
              <li><strong>Mobile:</strong> Full screen with no border radius</li>
              <li><strong>Tablet/Desktop:</strong> Centered with rounded corners</li>
              <li><strong>All sizes:</strong> Body scroll is locked</li>
            </ul>

            {/* Form Example */}
            <form className="space-y-4 mb-6">
              <div>
                <label className="block mb-2 text-sm font-medium">Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your name"
                  className="w-full min-h-[44px] px-4 py-2 bg-secondary rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium">Email</label>
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full min-h-[44px] px-4 py-2 bg-secondary rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium">Message</label>
                <textarea 
                  placeholder="Enter your message"
                  rows={4}
                  className="w-full px-4 py-2 bg-secondary rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </form>

            {/* Long content to test scrolling */}
            <div className="mb-6 p-4 bg-secondary rounded-lg">
              <h3 className="font-semibold mb-2">Scroll Test Content</h3>
              <p className="mb-2">
                This modal has enough content to test scrolling behavior. 
                The modal content should scroll while the body remains locked.
              </p>
              {Array.from({ length: 10 }, (_, i) => (
                <p key={i} className="mb-2 text-sm text-secondary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Paragraph {i + 1} of test content.
                </p>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-3">
              <button 
                type="button"
                className="flex-1 px-6 py-3 bg-accent text-white rounded-lg hover:opacity-80 min-h-[44px]"
              >
                Submit
              </button>
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-6 py-3 bg-secondary rounded-lg hover:opacity-80 min-h-[44px]"
              >
                Close
              </button>
            </div>
          </div>
        </ModalXL>
      )}
    </div>
  );
}
