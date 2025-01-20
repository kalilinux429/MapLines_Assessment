

import { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Draw } from 'ol/interaction';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { LineString, Polygon } from 'ol/geom';
import { transform } from 'ol/proj';
import { Button } from './ui/button';
import { MissionModal } from './MissionModal';
import { PolygonModal } from './PolygonModal';
import { MapPin, Trash2 } from 'lucide-react';
import { Oval } from 'react-loader-spinner';

export const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [loading, setLoading] = useState(true); // State to manage loading
  const [drawingMode, setDrawingMode] = useState<'LineString' | 'Polygon' | null>(null);
  const [vectorSource] = useState(new VectorSource());
  const [coordinates, setCoordinates] = useState<number[][]>([]);
  const [polygonCoordinates, setPolygonCoordinates] = useState<number[][]>([]);
  const [showMissionModal, setShowMissionModal] = useState(false);
  const [showPolygonModal, setShowPolygonModal] = useState(false);
  const [showInitialModal, setShowInitialModal] = useState(false);
  const [showPolygonInsertModal, setShowPolygonInsertModal] = useState(false);
  const [insertPolygonIndex, setInsertPolygonIndex] = useState<number | null>(null);
  const [insertMode, setInsertMode] = useState<'before' | 'after' | null>(null);
  const drawRef = useRef<Draw | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    const initialMap = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: transform([88.8965, 21.7175], 'EPSG:4326', 'EPSG:3857'),
        zoom: 12,
      }),
    });

    setMap(initialMap);

    // Hide loader when the map is fully loaded
    initialMap.once('rendercomplete', () => {
      setLoading(false);
    });

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && drawRef.current) {
        event.preventDefault();
        drawRef.current.finishDrawing();
        initialMap.removeInteraction(drawRef.current);
        drawRef.current = null;
        setDrawingMode(null);
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      initialMap.setTarget(undefined);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const startDrawing = (type: 'LineString' | 'Polygon') => {
    if (!map) return;

    setDrawingMode(type);
    if (type === 'LineString') {
      setShowInitialModal(true);
    }

    const draw = new Draw({
      source: vectorSource,
      type: type,
    });

    drawRef.current = draw;

    draw.on('drawstart', () => {
      if (type === 'LineString') {
        setCoordinates([]);
        setShowInitialModal(false);
      } else {
        setPolygonCoordinates([]);
      }
    });

    draw.on('drawend', (event) => {
      const feature = event.feature;
      const geometry = feature.getGeometry();
      
      if (geometry instanceof LineString) {
        const coords = geometry.getCoordinates().map(coord => 
          transform(coord, 'EPSG:3857', 'EPSG:4326')
        );
        setCoordinates(coords);
        setShowMissionModal(true);
      } else if (geometry instanceof Polygon) {
        const coords = geometry.getCoordinates()[0].map(coord =>
          transform(coord, 'EPSG:3857', 'EPSG:4326')
        );
        setPolygonCoordinates(coords);
        setShowPolygonModal(true);
      }
      
      map.removeInteraction(draw);
      drawRef.current = null;
      setDrawingMode(null);
    });

    map.addInteraction(draw);
  };

  const handleInsertPolygon = (index: number, mode: 'before' | 'after') => {
    setInsertPolygonIndex(index);
    setInsertMode(mode);
    setShowMissionModal(false);
    setShowPolygonInsertModal(true);
  };

  const handleImportPoints = () => {
    if (insertPolygonIndex === null || !insertMode) return;

    const newCoordinates = [...coordinates];
    const insertAt = insertMode === 'after' ? insertPolygonIndex + 1 : insertPolygonIndex;
    
    // Insert polygon coordinates at the specified position
    newCoordinates.splice(insertAt, 0, ...polygonCoordinates);
    
    setCoordinates(newCoordinates);
    setShowPolygonModal(false);
    setShowMissionModal(true);
    setInsertPolygonIndex(null);
    setInsertMode(null);
  };

  const clearFeatures = () => {
    vectorSource.clear();
    setCoordinates([]);
    setPolygonCoordinates([]);
  };

  return (
    <div className="relative h-screen w-full">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white">
          <Oval
            height={80}
            width={80}
            color="#3498db"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#f3f3f3"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      )} {/* Display loader while loading */}
      <div ref={mapRef} className="h-full w-full" />
      
      <div className="absolute top-4 left-4 z-10 space-x-2">
        <Button
          onClick={() => startDrawing('LineString')}
          disabled={drawingMode !== null}
          className="bg-white text-black hover:bg-gray-100"
        >
          <MapPin className="mr-2 h-4 w-4" />
          Draw LineString
        </Button>
        <Button
          onClick={clearFeatures}
          className="bg-white text-black hover:bg-gray-100"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Clear
        </Button>
      </div>

      {showInitialModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <h2 className="text-lg font-semibold mb-4">Mission Creation</h2>
            <div className="bg-gray-100 p-4 rounded mb-4">
              <p>Click on the map to mark points of the route and then press Enter to complete the route.</p>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setShowInitialModal(false)}>
                Start Drawing
              </Button>
            </div>
          </div>
        </div>
      )}

      {showPolygonInsertModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <h2 className="text-lg font-semibold mb-4">Insert Polygon</h2>
            <div className="bg-gray-100 p-4 rounded mb-4">
              <p>Click on the map to draw a polygon and then press Enter to complete the polygon.</p>
            </div>
            <div className="flex justify-between space-x-2">
              <Button className='bg-white text-gray-500 hover:bg-gray-100 py-2 px-4 rounded' onClick={() => setShowPolygonInsertModal(false)}>
                Discard
              </Button>
              <Button onClick={() => {
                setShowPolygonInsertModal(false);
                startDrawing('Polygon');
              }}>
                Start Drawing
              </Button>
            </div>
          </div>
        </div>
      )}

      <MissionModal
        open={showMissionModal}
        onOpenChange={setShowMissionModal}
        coordinates={coordinates}
        onInsertPolygon={handleInsertPolygon}
      />

      <PolygonModal
        open={showPolygonModal}
        onOpenChange={setShowPolygonModal}
        coordinates={polygonCoordinates}
        onImportPoints={handleImportPoints}
      />
    </div>
  );
};




