import React, { useState } from "react";
import {
    ScrollView,
    TextInput,
    Text,
    View,
    StyleSheet,
    Modal,
    ActivityIndicator,
    Alert,
} from "react-native";
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

interface HistoricalWeatherData {
    // latitude: number;
    // longitude: number;
    // generationtime_ms: number;
    // utc_offset_seconds: number;
    // timezone: string;
    // timezone_abbreviation: string;
    // elevation: number;
    // daily_units: {
    //     time: string;
    //     weather_code: string;
    //     temperature_2m_min: string;
    //     temperature_2m_max: string;
    //     apparent_temperature_min: string;
    //     apparent_temperature_max: string;
    // };
    // daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_min: number[];
    temperature_2m_max: number[];
    apparent_temperature_min: number[];
    apparent_temperature_max: number[];
    // };
}

type SeasonSummary = {
    season: string;
    avg_max: number;
    avg_min: number;
    avg_apparent_max: number;
    avg_apparent_min: number;
    common_weather_code: number;
};

const Weather: React.FC<Props> = ({ navigation }) => {
    const [location, setLocation] = useState("");
    const [weather, setWeather] = useState<WeatherData | null>(null); // Add type here

    const [seasonalSummary, setSeasonalSummary] = useState<
        SeasonSummary[] | null
    >(null);
    const [loading, setLoading] = useState(false);

    const getSeason = (dateStr: string): string => {
        const date = new Date(dateStr);
        const month = date.getUTCMonth() + 1;

        if (month >= 3 && month <= 5) return "Spring";
        if (month >= 6 && month <= 8) return "Summer";
        if (month >= 9 && month <= 11) return "Autumn";
        return "Winter";
    };

    const getSeasonDateRange = (season: string): string => {
        const now = new Date();
        const currentYear = now.getFullYear();
        const previousYear = now.getFullYear() - 1;
        switch (season.toLowerCase()) {
            case "spring":
                return `Mar 1, ${previousYear} – May 31, ${previousYear}`;
            case "summer":
                return `Jun 1, ${previousYear} – Aug 31, ${previousYear}`;
            case "autumn":
                return `Sep 1, ${previousYear} – Nov 30, ${previousYear}`;
            case "winter":
                return `Dec 1, ${previousYear} – Feb 28, ${currentYear}`;
            default:
                return "";
        }
    };

    const processSeasonalData = (
        data: HistoricalWeatherData
    ): SeasonSummary[] => {
        const seasonGroups: { [key: string]: number[] } = {
            Spring: [],
            Summer: [],
            Autumn: [],
            Winter: [],
        };

        const tempMax: { [key: string]: number[] } = {
            Spring: [],
            Summer: [],
            Autumn: [],
            Winter: [],
        };

        const tempMin: { [key: string]: number[] } = {
            Spring: [],
            Summer: [],
            Autumn: [],
            Winter: [],
        };

        const apparentMax: { [key: string]: number[] } = {
            Spring: [],
            Summer: [],
            Autumn: [],
            Winter: [],
        };

        const apparentMin: { [key: string]: number[] } = {
            Spring: [],
            Summer: [],
            Autumn: [],
            Winter: [],
        };

        const weatherCodes: { [key: string]: number[] } = {
            Spring: [],
            Summer: [],
            Autumn: [],
            Winter: [],
        };

        data.time.forEach((date, index) => {
            const season = getSeason(date);
            tempMax[season].push(data.temperature_2m_max[index]);
            tempMin[season].push(data.temperature_2m_min[index]);
            apparentMax[season].push(data.apparent_temperature_max[index]);
            apparentMin[season].push(data.apparent_temperature_min[index]);
            weatherCodes[season].push(data.weather_code[index]);
        });

        const summaries: SeasonSummary[] = Object.keys(tempMax).map(
            (season) => {
                const avg = (arr: number[]) =>
                    arr.reduce((a, b) => a + b, 0) / arr.length;

                const mode = (arr: number[]) =>
                    arr.sort(
                        (a, b) =>
                            arr.filter((v) => v === b).length -
                            arr.filter((v) => v === a).length
                    )[0];

                return {
                    season,
                    avg_max: parseFloat(avg(tempMax[season]).toFixed(1)),
                    avg_min: parseFloat(avg(tempMin[season]).toFixed(1)),
                    avg_apparent_max: parseFloat(
                        avg(apparentMax[season]).toFixed(1)
                    ),
                    avg_apparent_min: parseFloat(
                        avg(apparentMin[season]).toFixed(1)
                    ),
                    common_weather_code: mode(weatherCodes[season]),
                };
            }
        );

        return summaries;
    };

    const fetchWeather = async () => {
        try {
            setLoading(true);

            if (!location) {
                throw new Error(
                    "Missing location name. Please enter your location name."
                );
            }

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
                throw new Error(
                    "Location not found. Please enter your location name."
                );
            }

            const { lat, lon } = geoRes.data[0];

            const weatherRes = await axios.get(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,sunset,sunrise&current=temperature_2m,is_day,apparent_temperature,weather_code&forecast_days=16&timezone=auto`
            );

            setWeather(weatherRes.data);

            const currentYear = new Date().getFullYear();
            const previousYear = currentYear - 1;
            const nextYear = currentYear;

            // Handle leap years
            const isLeapYear = (year: number) => {
                return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
            };

            const startDate = `${previousYear}-03-01`;
            const endDate = `${nextYear}-02-${
                isLeapYear(nextYear) ? "29" : "28"
            }`;

            const historyWeatherRes = await axios.get(
                `https://historical-forecast-api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&start_date=${startDate}&end_date=${endDate}&daily=weather_code,temperature_2m_max,sunrise,sunset,apparent_temperature_min,apparent_temperature_max,temperature_2m_min&hourly=temperature_2m`
            );

            const seasonalData = processSeasonalData(
                historyWeatherRes.data.daily
            );
            setSeasonalSummary(seasonalData);

            setLoading(false);
        } catch (err) {
            // console.error(err);
            setLoading(false);
            Alert.alert(`${err}`);
        }
    };

    const weatherIcon = (code: number, size: number) => {
        switch (code) {
            case 0: // Clear sky
                return <Ionicons name="sunny" size={size} color="#f39c12" />;

            case 1: // Mainly clear
            case 2: // Partly cloudy
                return (
                    <Ionicons name="partly-sunny" size={size} color="#f1c40f" />
                );

            case 3: // Overcast
                return <Ionicons name="cloudy" size={size} color="#95a5a6" />;

            case 45: // Fog
            case 48: // Depositing rime fog
                return (
                    <Ionicons
                        name="cloud-outline"
                        size={size}
                        color="#7f8c8d"
                    />
                );

            case 51: // Light drizzle
            case 53: // Moderate drizzle
            case 55: // Dense drizzle
                return (
                    <Ionicons
                        name="rainy-outline"
                        size={size}
                        color="#74b9ff"
                    />
                );

            case 56: // Light freezing drizzle
            case 57: // Dense freezing drizzle
                return <Ionicons name="snow" size={size} color="#81ecec" />;

            case 61: // Slight rain
            case 63: // Moderate rain
            case 65: // Heavy rain
                return <Ionicons name="rainy" size={size} color="#3498db" />;

            case 66: // Light freezing rain
            case 67: // Heavy freezing rain
                return (
                    <Ionicons name="snow-outline" size={size} color="#00cec9" />
                );

            case 71: // Slight snow fall
            case 73: // Moderate snow fall
            case 75: // Heavy snow fall
                return <Ionicons name="snow" size={size} color="#dfe6e9" />;

            case 77: // Snow grains
                return <Ionicons name="snow" size={size} color="#00cec9" />;

            case 80: // Slight rain showers
            case 81: // Moderate rain showers
            case 82: // Violent rain showers
                return <Ionicons name="rainy" size={size} color="#2980b9" />;

            case 85: // Slight snow showers
            case 86: // Heavy snow showers
                return <Ionicons name="snow" size={size} color="#00cec9" />;

            case 95: // Thunderstorm
                return (
                    <Ionicons name="thunderstorm" size={size} color="#e67e22" />
                );

            case 96: // Thunderstorm with slight hail
            case 99: // Thunderstorm with heavy hail
                return (
                    <Ionicons name="thunderstorm" size={size} color="#8e44ad" />
                );

            default: // Unknown code
                return (
                    <Ionicons name="help-circle" size={size} color="#7f8c8d" />
                );
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
                <Modal
                    visible={loading}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setLoading(false)}
                >
                    <View style={styles.loadingOverlay}>
                        <ActivityIndicator size="large" color="#C37BC3" />
                        <Text style={styles.loadingText}>
                            Searching Weather ...
                        </Text>
                    </View>
                </Modal>

                <Text style={styles.heading}>Search Weather</Text>
                <TextInput
                    keyboardType="email-address"
                    placeholder="Enter location to check weather"
                    placeholderTextColor="#C37BC3"
                    style={styles.inputBox}
                    value={location}
                    onChangeText={(text) => setLocation(text)}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        fetchWeather();
                    }}
                >
                    <Text style={styles.buttonText}>Find Weather</Text>
                </TouchableOpacity>

                {weather && (
                    <View style={styles.weatherCard}>
                        <Text style={styles.cityName}>{location}</Text>

                        {/* Weather Icon */}
                        {weatherIcon(weather.current.weather_code, 60)}

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

                {seasonalSummary && (
                    <View>
                        <Text style={styles.heading}>Historical Weather</Text>
                        <View style={styles.weatherCard}>
                            {seasonalSummary.map((season) => (
                                <View
                                    key={season.season}
                                    style={styles.dailyItem}
                                >
                                    <Text style={[styles.dailyDate]}>
                                        {season.season} (
                                        {getSeasonDateRange(season.season)})
                                    </Text>
                                    <Text>
                                        Avg Max Temp: {season.avg_max}°C
                                    </Text>
                                    <Text>
                                        Avg Min Temp: {season.avg_min}°C
                                    </Text>
                                    <Text>
                                        Avg Apparent Max:{" "}
                                        {season.avg_apparent_max}°C
                                    </Text>
                                    <Text>
                                        Avg Apparent Min:{" "}
                                        {season.avg_apparent_min}°C
                                    </Text>
                                    <Text>
                                        Common Weather Code:{" "}
                                        {weatherIcon(
                                            season.common_weather_code,
                                            15
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
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    inputBox: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        backgroundColor: "#fff",
    },
    buttonContainer: { alignItems: "center" },
    button: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#C37BC3",
        // width: 200,
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
    loadingOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    loadingText: {
        marginTop: 10,
        fontSize: 18,
        color: "#fff",
    },
});

export default Weather;
