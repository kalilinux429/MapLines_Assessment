import * as Dialog from '@radix-ui/react-dialog';
import { calculateDistance } from '@/lib/utils';
import { Button } from './ui/button';
import { useState } from 'react';

interface PolygonModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  coordinates: number[][];
  onImportPoints: () => void;
}

export const PolygonModal = ({ open, onOpenChange, coordinates, onImportPoints }: PolygonModalProps) => {
  // State to manage checkbox values
  const [checkedState, setCheckedState] = useState(new Array(coordinates.length).fill(false));

  // Handler for checkbox change
  const handleCheckboxChange = (index: number) => {
    const updatedCheckedState = checkedState.map((item, i) =>
      i === index ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6">
          <Dialog.Title className="mb-4 text-lg font-semibold">
            Polygon Tool
          </Dialog.Title>

          <div className="mb-4">
            <div className="grid grid-cols-[auto,auto,1fr,auto] gap-4 font-medium">
              <div>Check</div>
              <div>WP</div>
              <div>Coordinates</div>
              <div>Distance (m)</div>
            </div>

            {coordinates.map((coord, index) => {
              const distance = index > 0 
                ? calculateDistance(coordinates[index - 1], coord).toFixed(1)
                : '--';

              return (
                <div
                  key={index}
                  className="grid grid-cols-[auto,auto,1fr,auto] gap-4 items-center py-2 border-b border-gray-300"
                >
                  <input
                    type="checkbox"
                    checked={checkedState[index]}
                    onChange={() => handleCheckboxChange(index)}
                    className="mr-2"
                  />
                  <div>{String(index).padStart(2, '0')}</div>
                  <div>{coord[0].toFixed(8)}, {coord[1].toFixed(8)}</div>
                  <div>{distance}</div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between space-x-2">
            <Button
              onClick={() => onOpenChange(false)}
              className="bg-white text-gray-500 hover:bg-gray-100"
            >
              Discard
            </Button>
            <Button onClick={onImportPoints}>Import Points</Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};