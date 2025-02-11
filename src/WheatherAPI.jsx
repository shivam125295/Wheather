import axios from "axios";
import React, { useState } from "react";

const WheatherAPI = () => {
    const [data, setData] = useState(null);
    const [city, setCity] = useState("");
    const [error, setError] = useState(null);

    let base_url = "http://api.openweathermap.org/data/2.5/weather?";
    let api_key = "b1b35bba8b434a28a0be2a3e1071ae5b";

    const wheatherHandler = () => {
        if (!city.trim()) {
            setError("Please enter a city name");
            return;
        }

        axios
            .get(`${base_url}appid=${api_key}&q=${city}`)
            .then((response) => {
                setData(response.data);
                setError(null);
            })
            .catch(() => {
                setData(null);
                setError("City not found or API error");
            });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-200 p-4">
            <div className="bg-green-400 shadow-[10px_10px_0px_0px_black] border-4 border-black p-6 rounded-2xl max-w-md w-full text-center">
                <h1 className="text-4xl font-bold text-black mb-4">🌿 Weather App</h1>
                <h2 className="text-lg font-semibold text-gray-800">Enter your city</h2>
                
                <div className="flex gap-2 mt-3">
                    <input
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="border-4 border-black px-4 py-2 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-green-800"
                    />
                    <button
                        onClick={wheatherHandler}
                        className="bg-green-600 text-white px-4 py-2 rounded-xl border-4 border-black transition hover:scale-105 hover:bg-green-700"
                    >
                        Get Weather
                    </button>
                </div>

                {error && <p className="text-red-600 font-bold mt-4">{error}</p>}

                {data && (
                    <div className="mt-6 p-4 bg-green-500 border-4 border-black rounded-xl shadow-[5px_5px_0px_0px_black]">
                        <h2 className="text-2xl font-bold text-black">{data.name}</h2>
                        <h3 className="text-lg font-semibold capitalize text-white">{data.weather[0].description}</h3>
                        <p className="text-xl font-semibold text-black">
                            🌡 Temperature: {(data.main.temp - 273.15).toFixed(2)}°C
                        </p>
                        <p className="text-lg text-black">💧 Humidity: {data.main.humidity}%</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WheatherAPI;
