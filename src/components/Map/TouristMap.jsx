import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import L, { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Box, Typography, Card, Chip, LinearProgress } from "@mui/material";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, ChartTooltip, Legend);

// ✅ Fix marker icons
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// ✅ Mock GeoJSON data
const mockDistrictData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "Kamrup Metropolitan",
        crimeRate: 45,
        disasters: 3,
        population: 1250000,
        safetyIndex: 65,
        developmentIndex: 70,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [91.6, 26.0],
            [91.7, 26.0],
            [91.7, 26.1],
            [91.6, 26.1],
            [91.6, 26.0],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Dibrugarh",
        crimeRate: 25,
        disasters: 2,
        population: 850000,
        safetyIndex: 78,
        developmentIndex: 82,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [94.9, 27.3],
            [95.0, 27.3],
            [95.0, 27.4],
            [94.9, 27.4],
            [94.9, 27.3],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Jorhat",
        crimeRate: 35,
        disasters: 1,
        population: 950000,
        safetyIndex: 72,
        developmentIndex: 76,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [94.2, 26.7],
            [94.3, 26.7],
            [94.3, 26.8],
            [94.2, 26.8],
            [94.2, 26.7],
          ],
        ],
      },
    },
  ],
};

// ✅ Fit map bounds on load
const FitMapBounds = ({ data }) => {
  const map = useMap();
  useEffect(() => {
    if (data) {
      const geoLayer = L.geoJSON(data);
      map.fitBounds(geoLayer.getBounds());
    }
  }, [data, map]);
  return null;
};

// ✅ Color helpers
const getColorByCrime = (rate) =>
  rate > 40 ? "#d73027" : rate > 30 ? "#fc8d59" : "#91cf60";

const getColorByDisaster = (count) =>
  count > 3 ? "#a50026" : count > 1 ? "#fdae61" : "#a6d96a";

const getColorBySafety = (idx) =>
  idx > 80 ? "#1a9850" : idx > 70 ? "#66bd63" : idx > 60 ? "#fee08b" : "#f46d43";

const getColorByDevelopment = (idx) =>
  idx > 80 ? "#3288bd" : idx > 70 ? "#66c2a5" : idx > 60 ? "#abdda4" : "#fdae61";

const TouristMap = () => {
  const [districtData, setDistrictData] = useState(null);
  const [viewMode, setViewMode] = useState("crime");
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const geoJsonRef = useRef();

  useEffect(() => {
    setTimeout(() => setDistrictData(mockDistrictData), 500);
  }, []);

  const getColor = (feature) => {
    const { crimeRate, disasters, safetyIndex, developmentIndex } =
      feature.properties;
    switch (viewMode) {
      case "crime":
        return getColorByCrime(crimeRate);
      case "disaster":
        return getColorByDisaster(disasters);
      case "safety":
        return getColorBySafety(safetyIndex);
      case "development":
        return getColorByDevelopment(developmentIndex);
      default:
        return "#ccc";
    }
  };

  const onEachFeature = (feature, layer) => {
    layer.bindTooltip(feature.properties.name);
    layer.on({
      click: () => setSelectedDistrict(feature.properties),
      mouseover: (e) => {
        e.target.setStyle({
          weight: 3,
          color: "#666",
          fillOpacity: 0.9,
        });
      },
      mouseout: (e) => {
        geoJsonRef.current.resetStyle(e.target);
      },
    });
  };

  const districtStyle = (feature) => ({
    fillColor: getColor(feature),
    weight: 1,
    opacity: 1,
    color: "#fff",
    dashArray: "3",
    fillOpacity: 0.7,
    cursor: "pointer",
  });

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
      {/* ✅ Fixed map height box */}
      <Box sx={{ height: 400, mb: 2 }}>
        {districtData ? (
          <MapContainer
            center={[26.2, 92.9]}
            zoom={7}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoJSON
              data={districtData}
              style={districtStyle}
              onEachFeature={onEachFeature}
              ref={geoJsonRef}
            />
            <FitMapBounds data={districtData} />
          </MapContainer>
        ) : (
          <LinearProgress />
        )}
      </Box>

      {/* ✅ View Mode Chips */}
      <Card sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          View Mode
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {["crime", "disaster", "safety", "development"].map((mode) => (
            <Chip
              key={mode}
              label={mode.toUpperCase()}
              color={viewMode === mode ? "primary" : "default"}
              onClick={() => setViewMode(mode)}
            />
          ))}
        </Box>
      </Card>

      {/* ✅ District info appears below without pushing map away */}
      {selectedDistrict && (
        <Card sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            {selectedDistrict.name}
          </Typography>
          <Typography>Population: {selectedDistrict.population.toLocaleString()}</Typography>
          <Typography>Crime Rate: {selectedDistrict.crimeRate}</Typography>
          <Typography>Disasters: {selectedDistrict.disasters}</Typography>
          <Typography>Safety Index: {selectedDistrict.safetyIndex}</Typography>
          <Typography>Development Index: {selectedDistrict.developmentIndex}</Typography>

          <Box sx={{ height: 250, mt: 2 }}>
            <Pie
              data={{
                labels: ["Crime", "Safety", "Development"],
                datasets: [
                  {
                    data: [
                      selectedDistrict.crimeRate,
                      selectedDistrict.safetyIndex,
                      selectedDistrict.developmentIndex,
                    ],
                    backgroundColor: ["#d73027", "#1a9850", "#3288bd"],
                  },
                ],
              }}
              options={{ responsive: true, plugins: { legend: { position: "bottom" } } }}
            />
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default TouristMap;
