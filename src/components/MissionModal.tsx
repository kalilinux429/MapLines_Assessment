// // import * as Dialog from '@radix-ui/react-dialog';
// // import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
// // import { MoreVertical } from 'lucide-react';
// // import { calculateDistance } from '@/lib/utils';
// // import { Button } from './ui/button';

// // interface MissionModalProps {
// //   open: boolean;
// //   onOpenChange: (open: boolean) => void;
// //   coordinates: number[][];
// //   onInsertPolygon: (index: number, mode: 'before' | 'after') => void;
// // }

// // export const MissionModal = ({ open, onOpenChange, coordinates, onInsertPolygon }: MissionModalProps) => {
// //   return (
// //     <Dialog.Root open={open} onOpenChange={onOpenChange}>
// //       <Dialog.Portal>
// //         <Dialog.Overlay className="fixed inset-0 bg-black/50" />
// //         <Dialog.Content className="fixed left-1/2 top-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6">
// //           <Dialog.Title className="mb-4 text-lg font-semibold">
// //             Mission Creation
// //           </Dialog.Title>

// //           <div className="mb-4">
// //             <div className="grid grid-cols-[auto,1fr,auto,auto] gap-4 font-medium">
// //               <div>WP</div>
// //               <div>Coordinates</div>
// //               <div>Distance (m)</div>
// //               <div></div>
// //             </div>

// //             {coordinates.map((coord, index) => {
// //               const distance = index > 0 
// //                 ? calculateDistance(coordinates[index - 1], coord).toFixed(1)
// //                 : '--';

// //               return (
// //                 <div key={index} className="grid grid-cols-[auto,1fr,auto,auto] gap-4 items-center py-2">
// //                   <div>{String(index).padStart(2, '0')}</div>
// //                   <div>{coord[0].toFixed(8)}, {coord[1].toFixed(8)}</div>
// //                   <div>{distance}</div>
// //                   <DropdownMenu.Root>
// //                     <DropdownMenu.Trigger asChild>
// //                       <Button variant="ghost" size="icon">
// //                         <MoreVertical className="h-4 w-4" />
// //                       </Button>
// //                     </DropdownMenu.Trigger>
// //                     <DropdownMenu.Portal>
// //                       <DropdownMenu.Content className="min-w-[200px] rounded-md bg-white p-1 shadow-md">
// //                         <DropdownMenu.Item 
// //                           className="cursor-pointer rounded px-2 py-1.5 outline-none hover:bg-gray-100"
// //                           onClick={() => onInsertPolygon(index, 'before')}
// //                         >
// //                           Insert Polygon Before
// //                         </DropdownMenu.Item>
// //                         <DropdownMenu.Item 
// //                           className="cursor-pointer rounded px-2 py-1.5 outline-none hover:bg-gray-100"
// //                           onClick={() => onInsertPolygon(index, 'after')}
// //                         >
// //                           Insert Polygon After
// //                         </DropdownMenu.Item>
// //                       </DropdownMenu.Content>
// //                     </DropdownMenu.Portal>
// //                   </DropdownMenu.Root>
// //                 </div>
// //               );
// //             })}
// //           </div>

// //           <div className="flex justify-end">
// //             <Button>Generate Data</Button>
// //           </div>
// //         </Dialog.Content>
// //       </Dialog.Portal>
// //     </Dialog.Root>
// //   );
// // };



// import * as Dialog from '@radix-ui/react-dialog';
// import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
// import { MoreVertical, ArrowLeft } from 'lucide-react';
// import { calculateDistance } from '@/lib/utils';
// import { Button } from './ui/button';
// import { useState } from 'react';

// interface MissionModalProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   coordinates: number[][];
//   onInsertPolygon: (index: number, mode: 'before' | 'after') => void;
// }

// export const MissionModal = ({ open, onOpenChange, coordinates, onInsertPolygon }: MissionModalProps) => {
//   const [checkedState, setCheckedState] = useState(new Array(coordinates.length).fill(false));

//   const handleCheckboxChange = (index: number) => {
//     const updatedCheckedState = checkedState.map((item, i) =>
//       i === index ? !item : item
//     );
//     setCheckedState(updatedCheckedState);
//   };

//   return (
//     <Dialog.Root open={open} onOpenChange={onOpenChange}>
//       <Dialog.Portal>
//         <Dialog.Overlay className="fixed inset-0 bg-black/50" />
//         <Dialog.Content className="fixed left-1/2 top-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6">
//           <div className="flex items-center mb-4">
//             <ArrowLeft className="mr-2 h-4 w-4 cursor-pointer" onClick={() => onOpenChange(false)} />
//             <Dialog.Title className="text-lg font-semibold">
//               Mission Creation
//             </Dialog.Title>
//           </div>

//           <div className="mb-4">
//             <div className="grid grid-cols-[auto,auto,1fr,auto,auto] gap-4 font-medium">
//               <div>Check</div>
//               <div>WP</div>
//               <div>Coordinates</div>
//               <div>Distance (m)</div>
//               <div></div>
//             </div>

//             {coordinates.map((coord, index) => {
//               const distance = index > 0 
//                 ? calculateDistance(coordinates[index - 1], coord).toFixed(1)
//                 : '--';

//               return (
//                 <div key={index} className="grid grid-cols-[auto,auto,1fr,auto,auto] gap-4 items-center py-2">
//                   <input
//                     type="checkbox"
//                     checked={checkedState[index]}
//                     onChange={() => handleCheckboxChange(index)}
//                     className="mr-2"
//                   />
//                   <div>{String(index).padStart(2, '0')}</div>
//                   <div>{coord[0].toFixed(8)}, {coord[1].toFixed(8)}</div>
//                   <div>{distance}</div>
//                   <DropdownMenu.Root>
//                     <DropdownMenu.Trigger asChild>
//                       <Button variant="ghost" size="icon">
//                         <MoreVertical className="h-4 w-4" />
//                       </Button>
//                     </DropdownMenu.Trigger>
//                     <DropdownMenu.Portal>
//                       <DropdownMenu.Content className="min-w-[200px] rounded-md bg-white p-1 shadow-md">
//                         <DropdownMenu.Item 
//                           className="cursor-pointer rounded px-2 py-1.5 outline-none hover:bg-gray-100"
//                           onClick={() => onInsertPolygon(index, 'before')}
//                         >
//                           Insert Polygon Before
//                         </DropdownMenu.Item>
//                         <DropdownMenu.Item 
//                           className="cursor-pointer rounded px-2 py-1.5 outline-none hover:bg-gray-100"
//                           onClick={() => onInsertPolygon(index, 'after')}
//                         >
//                           Insert Polygon After
//                         </DropdownMenu.Item>
//                       </DropdownMenu.Content>
//                     </DropdownMenu.Portal>
//                   </DropdownMenu.Root>
//                 </div>
//               );
//             })}
//           </div>

//           <div className="flex justify-end">
//             <Button>Generate Data</Button>
//           </div>
//         </Dialog.Content>
//       </Dialog.Portal>
//     </Dialog.Root>
//   );
// };



import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { MoreVertical, ArrowLeft } from 'lucide-react';
import { calculateDistance } from '@/lib/utils';
import { Button } from './ui/button';
import { useState } from 'react';

interface MissionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  coordinates: number[][];
  onInsertPolygon: (index: number, mode: 'before' | 'after') => void;
}

export const MissionModal = ({ open, onOpenChange, coordinates, onInsertPolygon }: MissionModalProps) => {
  const [checkedState, setCheckedState] = useState(new Array(coordinates.length).fill(false));

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
          <div className="flex items-center mb-4">
            <ArrowLeft className="mr-2 h-4 w-4 cursor-pointer" onClick={() => onOpenChange(false)} />
            <Dialog.Title className="text-lg font-semibold">
              Mission Creation
            </Dialog.Title>
          </div>

          <div className="mb-4">
            <div className="grid grid-cols-[auto,auto,1fr,auto,auto] gap-4 font-medium">
              <div>Check</div>
              <div>WP</div>
              <div>Coordinates</div>
              <div>Distance (m)</div>
              <div></div>
            </div>

            {coordinates.map((coord, index) => {
              const distance = index > 0 
                ? calculateDistance(coordinates[index - 1], coord).toFixed(1)
                : '--';

              return (
                <div
                  key={index}
                  className="grid grid-cols-[auto,auto,1fr,auto,auto] gap-4 items-center py-2 border-b border-gray-300"
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
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                      <DropdownMenu.Content className="min-w-[200px] rounded-md bg-white p-1 shadow-md">
                        <DropdownMenu.Item 
                          className="cursor-pointer rounded px-2 py-1.5 outline-none hover:bg-gray-100"
                          onClick={() => onInsertPolygon(index, 'before')}
                        >
                          Insert Polygon Before
                        </DropdownMenu.Item>
                        <DropdownMenu.Item 
                          className="cursor-pointer rounded px-2 py-1.5 outline-none hover:bg-gray-100"
                          onClick={() => onInsertPolygon(index, 'after')}
                        >
                          Insert Polygon After
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end">
            <Button>Generate Data</Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};