import React, { useState } from "react";
import { ScrollView, TextInput, Text, View, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../assets/Types";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

type WeatherNavigationProp = StackNavigationProp<RootStackParamList, "Weather">;

type Props = {
    navigation: WeatherNavigationProp;
};

interface WeatherData {
    current: {
        temperature_2m: number;
        apparent_temperature: number;
        is_day: number;
        weather_code: number;
        time: string;
    };
    daily: {
        time: string[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        sunrise: string[];
        sunset: string[];
    };
}

const Weather: React.FC<Props> = ({ navigation }) => {
    const [location, setLocation] = useState("");
    const [weather, setWeather] = useState<WeatherData | null>(null); // Add type here
    const [error, setError] = useState("");

    const fetchWeather = async () => {
        try {
            const geoRes = await axios.get(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
                    location
                )}&format=json&limit=1`,
                {
                    headers: {
                        "Accept-Language": "en",
                        "User-Agent": "ReactNativeWeatherApp/1.0",
                    },
                }
            );

            if (!geoRes.data.length) {
                setError("Location not found.");
                return;
            }

            const { lat, lon } = geoRes.data[0];

            const weatherRes = await axios.get(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,sunset,sunrise&current=temperature_2m,is_day,apparent_temperature,weather_code&forecast_days=16&timezone=auto`
            );

            setWeather(weatherRes.data);
            setError("");
            console.log("weather data");
            console.log(weatherRes.data);
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Try again.");
        }
    };

    const weatherIcon = (code: number) => {
        console.log("Weather code:", code);
        // Map weather codes to Ionicons
        switch (code) {
            case 0:
                return <Ionicons name="sunny" size={60} color="#f39c12" />;
            case 1:
            case 2:
                return (
                    <Ionicons name="partly-sunny" size={60} color="#f39c12" />
                );
            case 3:
                return <Ionicons name="cloudy" size={60} color="#95a5a6" />;
            case 51:
            case 53:
                return <Ionicons name="rainy" size={60} color="#3498db" />;
            case 61:
            case 63:
                return (
                    <Ionicons name="thunderstorm" size={60} color="#e74c3c" />
                );
            default:
                return <Ionicons name="cloudy" size={60} color="#95a5a6" />;
        }
    };

    const formatDate = (date: string) => {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const formatDateTime = (dateTime: string) => {
        const dateObj = new Date(dateTime);

        const formattedDate = dateObj.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        const formattedTime = dateObj.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
        });

        return `${formattedTime} ${formattedDate}`;
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <TextInput
                    keyboardType="email-address"
                    placeholder="Enter location to check weather"
                    placeholderTextColor="#C37BC3"
                    style={styles.inputBox}
                    value={location}
                    onChangeText={(text) => setLocation(text)}
                />

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            fetchWeather();
                        }}
                    >
                        <Text style={styles.buttonText}>Find Weather</Text>
                    </TouchableOpacity>
                </View>

                {weather && !error && (
                    <View style={styles.weatherCard}>
                        <Text style={styles.cityName}>{location}</Text>

                        {/* Weather Icon */}
                        {weatherIcon(weather.current.weather_code)}

                        <Text style={styles.currentTemp}>
                            {weather.current.temperature_2m}°C
                        </Text>
                        <Text style={styles.feelsLike}>
                            Feels Like: {weather.current.apparent_temperature}°C
                        </Text>
                        <Text>
                            Time captured:{" "}
                            {formatDateTime(weather.current.time)}
                        </Text>

                        <Text style={styles.label}>Daylight:</Text>
                        <Text style={styles.daylightStatus}>
                            {weather.current.is_day ? "Yes" : "No"}
                        </Text>

                        <View style={styles.dailyForecast}>
                            <Text style={styles.label}>
                                Daily Forecast (16 days)
                            </Text>
                            {weather.daily.time.map((date, index) => (
                                <View key={date} style={styles.dailyItem}>
                                    <Text style={styles.dailyDate}>
                                        {formatDate(date)}
                                    </Text>
                                    <Text>
                                        Max Temp:{" "}
                                        {
                                            weather.daily.temperature_2m_max[
                                                index
                                            ]
                                        }
                                        °C
                                    </Text>
                                    <Text>
                                        Min Temp:{" "}
                                        {
                                            weather.daily.temperature_2m_min[
                                                index
                                            ]
                                        }
                                        °C
                                    </Text>

                                    <Text>
                                        Sunrise:{" "}
                                        {formatDateTime(
                                            weather.daily.sunrise[index]
                                        )}
                                    </Text>
                                    <Text>
                                        Sunset:{" "}
                                        {formatDateTime(
                                            weather.daily.sunset[index]
                                        )}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7EFE5",
        padding: 20,
    },
    content: {
        marginBottom: 20,
    },
    inputBox: {
        flex: 1,
        fontFamily: "Roboto",
        color: "black",
        fontSize: 15,
        textAlign: "left",
        paddingLeft: 20,
        marginRight: 10,
        borderColor: "black",
        borderRadius: 10,
        borderWidth: 1.5,
        // width: screenWidth * 0.7,
        height: 50,
    },
    buttonContainer: { alignItems: "center" },
    button: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#C37BC3",
        width: 200,
        height: 40,
        marginTop: 20,
        borderRadius: 10,
        borderWidth: 1.5,
    },
    buttonText: {
        fontFamily: "Itim-Regular",
        justifyContent: "center",
        color: "white",
        alignSelf: "center",
        fontSize: 20,
    },
    error: {
        color: "red",
        textAlign: "center",
        marginTop: 20,
    },
    weatherCard: {
        marginVertical: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
        alignItems: "center",
        justifyContent: "center",
    },
    cityName: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    currentTemp: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#f39c12",
    },
    feelsLike: {
        fontSize: 16,
        color: "#666",
        marginTop: 5,
        fontFamily: "Itim-Regular",
    },
    label: {
        fontSize: 18,
        marginTop: 20,
        fontWeight: "bold",
        textAlign: "left",
        width: "100%",
        fontFamily: "Roboto",
    },
    daylightStatus: {
        fontSize: 17,
        color: "#f39c12",
        marginTop: 5,
    },
    dailyForecast: {
        marginTop: 10,
        width: "100%",
    },
    dailyItem: {
        marginTop: 10,
        padding: 10,
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        marginBottom: 10,
    },
    dailyDate: {
        textAlign: "center",
        fontSize: 17,
        fontFamily: "Itim-Regular",
    },
});

export default Weather;
