 Here's a sample README for your GitHub repository:

---

# React OpenLayers Map Application

This is a React-based map application that utilizes OpenLayers to render interactive maps with the ability to draw both LineStrings and Polygons. The application features modals to display coordinates and distances, as well as the ability to insert polygons at specific points within a LineString.

## Features

### 1. **Draw LineString**
   - **Ability to draw a LineString** on the map.
   - **Stop drawing LineString** by pressing the Enter key.
   - The application will track the coordinates of the drawn LineString and display them in a modal.

### 2. **Draw Polygon**
   - **Ability to draw a Polygon** anywhere on the map.
   - The polygon can be inserted into the LineString at a specific coordinate.
   - **Stop drawing Polygon** by pressing the Enter key.

### 3. **Modal Implementation**
   - **Mission Modal** displays the coordinates (waypoints) of the drawn LineString, showing the distance between consecutive points.
   - **Polygon Modal** displays the coordinates of the drawn Polygon.

### 4. **Insertion of Polygon into LineString**
   - A dropdown menu in the coordinate row provides options to:
     - Insert the Polygon before or after a specific coordinate.
   - After the Polygon is drawn, the coordinates and distances of the Polygon are displayed in the modal.
   - The polygon is connected to the LineString at the insertion point.

### 5. **Map View**
   - A **"Draw" button** triggers the drawing mode on the map.
   - The user can select whether they want to draw a LineString or Polygon.

## How to Use

1. **Start Drawing**: 
   - Click the **"Draw"** button to initiate drawing mode.
   - For LineString: Click on the map to add coordinates, and press Enter to stop drawing.
   - For Polygon: Click on the map to add vertices, and press Enter to complete the polygon.

2. **View Coordinates**:
   - Once the LineString or Polygon is drawn, the coordinates along with distances between them will be displayed in a modal.

3. **Insert Polygon**:
   - Click on the three dots next to a coordinate in the modal to insert a Polygon before or after that point.
   - After drawing the Polygon, the coordinates of the Polygon are displayed in the modal.

4. **Import Points**:
   - After completing the polygon, click the **"Import Points"** button to add the polygon coordinates to the mission planner modal.

## Installation

 Dev DP==>  npm install
  Start==> npm run dev
