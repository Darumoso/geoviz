'use client'

import React, { useState, useEffect } from "react";
import Image from "next/image";
import DeckGL from "@deck.gl/react";
import Link from "next/link";
import { Map, ScaleControl } from "react-map-gl";
import maplibregl from "maplibre-gl";
import ButtonImg from "./imgbutton";
import { Line } from "react-chartjs-2"; 
import Chart from 'chart.js/auto';
import { GeoJsonLayer, ScatterplotLayer } from "@deck.gl/layers";
import "node_modules/maplibre-gl/dist/maplibre-gl.css";

const MAP_STYLE = [
    "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
    "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
    "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
];
//const MAP_STYLE = "http://server.arcgisonline.com/arcgis/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"
//https://c.tile.openstreetmap.org/{z}/{x}/{y}.png
//const DATA_URL = "http://localhost:3001/data"
//"https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
//"https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"

const INITIAL_VIEW = {
    latitude: 29.61234,
    longitude: -100.98259,
    zoom: 10
};

export default function Visualizer() {
    const [mapStyle, setMapStyle] = useState(MAP_STYLE[0]);
    const [viewState, setViewState] = useState(INITIAL_VIEW);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [graph, setGraph] = useState(false);
    const [displacements, setDisplacements] = useState([]);
    const [dates, setDates] = useState([]);
    const [points, setPoints] = useState([]);

    const fetchPoints = async () => {
        try {
            const response = await fetch("/api/datasets"); 
            if (!response.ok) throw new Error("Error al obtener los puntos");
            const data = await response.json();
            setPoints(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => { 
        fetchPoints();
    }, []);

    const scatterplotLayer = new ScatterplotLayer({
        id: 'scatterplot-layer',
        data: points,
        pickable: true,
        getPosition: (d) => [d.longitude, d.latitude],
        getFillColor: [255, 99, 71, 200],
        getRadius: 4,
        onClick: async ({ object }) => {
            if (object) {
                console.log("Punto:", object.id);
                console.log(`Latitud: ${object.latitude}, Longitud: ${object.longitude}`)
                try {
                    const response = await fetch(`/api/datasets/${object.id}`);
                    if (response.ok) {
                        const data = await response.json();
                        setDates([]); // Esto borra el array de fechas
                        for (let i = 0; i < data[0].desplazamientos.length; i++) {
                            setDates((prevDates) => [...prevDates, i + 1]);
                        }
                        setDisplacements(data[0].desplazamientos);
                        setGraph(true);
                        console.log("Desplazamientos:", data[0].desplazamientos);
                        console.log("Pendiente:", data[0].pendiente);
                    } else {
                        console.error("No se encontraron los datos para el punto.");
                    }
                } catch (error) {
                    console.error("Error al obtener los desplazamientos:", error);
                }
            }
          }
    });

    /* const layers = [
        new GeoJsonLayer({
            id: "geo-json",
            //data: DATA_URL,
            data: geoData,
            stroked: false,
            filled: true,
            pickable: true,
            getFillColor: [160, 160, 180, 200],
            getPointRadius: 40,
        }),
    ]; */

    const changeMapStyle = (map) => {
        setMapStyle(map);
        setIsMenuOpen(false);
    };

    const changeViewState = ({ viewState }) => {
        setViewState(viewState);
    };

    const chartData = {
        labels: dates,
        datasets: [
            {
                label: "Desplazamientos",
                data: displacements,
                fill: false,
                borderColor: "rgba(75,192,192,1)",
                tension: 0.1
            }
        ]
    };

    return (
        <div className="absolute flex top-0 left-0 w-full h-full">
            <DeckGL
                viewState={viewState}
                onViewStateChange={changeViewState}
                controller
                layers = {[scatterplotLayer]}
            >
                <Map
                    mapLib={maplibregl}
                    reuseMaps
                    mapStyle={mapStyle}
                    {...viewState}
                >
                    <ScaleControl
                        maxWidth={200}
                        unit="metric"
                        position="bottom-right"
                    />
                </Map>
            </DeckGL>
            <Link href="/dashboard">
                <ButtonImg
                    className="absolute top-4 left-4 bg-blue-700 hover:bg-blue-800"
                    imgSrc="/home.png"
                    imgAlt="Ícono home"
                    width={30}
                    height={30}
                />
            </Link>
            <div className="absolute top-4 right-16">
                <ButtonImg
                    className="bg-blue-500 hover:bg-blue-600"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    imgSrc="/mundo.png"
                    imgAlt="Ícono mapa"
                    width={30}
                    height={30}
                />
                {isMenuOpen && (
                    <div className="absolute top-10 right-0 bg-blue-300 font-bold shadow-lg p-2 rounded mt-2 w-48 z-10">
                        <div className="space-y-2">
                            <button
                                className="w-full bg-blue-400 rounded p-2 text-white text-center hover:bg-blue-500"
                                onClick={() => changeMapStyle(MAP_STYLE[0])}
                            >
                                Voyager
                            </button>
                            <button
                                className="w-full bg-blue-400 rounded p-2 text-white text-center hover:bg-blue-500"
                                onClick={() => changeMapStyle(MAP_STYLE[1])}
                            >
                                Dark Matter
                            </button>
                            <button
                                className="w-full bg-blue-400 rounded p-2 text-white text-center hover:bg-blue-500"
                                onClick={() => changeMapStyle(MAP_STYLE[2])}
                            >
                                Positron
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className="absolute flex bottom-4 left-4 w-64 bg-blue-500 shadow-md p-1 rounded">
                <Image
                    className="ml-4 mt-1 mb-1"
                    src="/position.png"
                    alt="Ícono posición"
                    width={25}
                    height={25}
                />
                <span className="text-white flex-grow mt-1 text-center font-bold">{viewState.latitude.toFixed(5)} , {viewState.longitude.toFixed(5)}</span>
            </div>
            <div className="absolute flex-col top-4 right-4 bg-blue-500 flex p-1 rounded">
                <button 
                    className="px-2 py-1 font-bold bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => setViewState({...viewState, zoom: viewState.zoom + 1})}
                >
                    +
                </button>
                <button 
                    className="px-2 py-1 font-bold bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => setViewState({...viewState, zoom: viewState.zoom - 1})}
                >
                    -
                </button>
            </div>
            {graph && (
                <div className="absolute right-4 top-1/2 h-64 w-96 transform -translate-y-1/2 bg-white border p-2 rounded shadow-md">
                    <button
                        onClick={() => setGraph(false)}
                        className="absolute top-0 right-0 p-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        ×
                    </button>
                    <Line data={chartData}/>
                </div>
            
            )}
        </div>
    );
}
