import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const ButtonLayout = () => {
  const [image, setImage] = useState(null);

  // Constants for button dimensions (in inches) - from BAM!! template
  const PICTURE_DIAMETER = 2.187; // Picture size from template
  const TOTAL_DIAMETER = 2.747; // Cut line diameter from template
  const BLEED = (TOTAL_DIAMETER - PICTURE_DIAMETER) / 2; // Calculate bleed from template specs
  
  // Convert to pixels (assuming 96 DPI)
  const DPI = 96;
  const PICTURE_PX = Math.round(PICTURE_DIAMETER * DPI);
  const TOTAL_PX = Math.round(TOTAL_DIAMETER * DPI);
  const BLEED_PX = Math.round(BLEED * DPI);

  // Printer safe margin (0.25 inches)
  const PRINTER_MARGIN = Math.round(0.25 * DPI);
  const GRID_GAP = Math.round(0.0625 * DPI); // 1/16 inch gap for tighter spacing
  const VERTICAL_OFFSET = TOTAL_PX * 0.5; // Offset middle row by half a button

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Calculate centering values
  const THREE_BUTTON_WIDTH = (TOTAL_PX * 3) + (GRID_GAP * 2);
  const PAGE_WIDTH = 8.5 * DPI; // Letter size width
  const CENTER_OFFSET = Math.max(0, (PAGE_WIDTH - THREE_BUTTON_WIDTH) / 2);

  return (
    <div className="print:m-0 print:p-0">
      <div className="mb-6 space-y-4 print:hidden">
        <div className="flex items-center space-x-4">
          <label className="flex items-center px-4 py-2 bg-purple-500 text-white rounded cursor-pointer hover:bg-purple-600">
            <Upload className="w-4 h-4 mr-2" />
            Upload Image
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!image}
          >
            Print Layout
          </button>
        </div>
        
        {!image && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <p className="text-gray-500">Upload an image to begin</p>
          </div>
        )}
      </div>

      {image && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          padding: `${PRINTER_MARGIN}px`,
          boxSizing: 'border-box'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: GRID_GAP,
            width: 'fit-content',
            marginLeft: `${CENTER_OFFSET}px`,
            position: 'relative'
          }}>
            {/* All columns */}
            <div style={{ display: 'flex', gap: GRID_GAP }}>
              {/* Left column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: GRID_GAP }}>
                {[0, 3, 6].map(i => (
                  <ButtonCircle 
                    key={i} 
                    image={image} 
                    index={i} 
                    buttonPx={PICTURE_PX} 
                    totalPx={TOTAL_PX} 
                    bleedPx={BLEED_PX} 
                  />
                ))}
              </div>

              {/* Middle column - with vertical offset */}
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: GRID_GAP,
                marginTop: VERTICAL_OFFSET 
              }}>
                {[1, 4, 7].map(i => (
                  <ButtonCircle 
                    key={i} 
                    image={image} 
                    index={i} 
                    buttonPx={PICTURE_PX} 
                    totalPx={TOTAL_PX} 
                    bleedPx={BLEED_PX} 
                  />
                ))}
              </div>

              {/* Right column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: GRID_GAP }}>
                {[2, 5, 8].map(i => (
                  <ButtonCircle 
                    key={i} 
                    image={image} 
                    index={i} 
                    buttonPx={PICTURE_PX} 
                    totalPx={TOTAL_PX} 
                    bleedPx={BLEED_PX} 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media print {
          @page {
            size: letter;
            margin: 0;
          }
          body {
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .print-hide {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

// Separate component for button circles
const ButtonCircle = ({ image, index, buttonPx, totalPx, bleedPx }) => (
  <div
    className="relative"
    style={{
      width: totalPx,
      height: totalPx
    }}
  >
    {/* Outer cutting border */}
    <div className="absolute inset-0 border border-black border-dashed rounded-full print:border-solid" />
    
    {/* Bleed area indicator */}
    <div className="absolute inset-0 border border-red-300 rounded-full print:hidden" />
    
    {/* Button circle with image */}
    <div
      className="absolute rounded-full overflow-hidden"
      style={{
        top: bleedPx,
        left: bleedPx,
        width: buttonPx,
        height: buttonPx
      }}
    >
      <img
        src={image}
        alt={`Button ${index + 1}`}
        className="w-full h-full object-cover"
      />
    </div>
  </div>
);

export default ButtonLayout;