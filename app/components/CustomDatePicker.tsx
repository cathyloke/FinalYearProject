import React, { useState } from "react";
import {
    TextInput,
    Text,
    View,
    Platform,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

interface Props {
    onStartDateChange: (date: Date) => void;
    onEndDateChange: (date: Date) => void;
}

export const CustomStartEndDatePicker: React.FC<Props> = ({
    onStartDateChange,
    onEndDateChange,
}) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [showStartAndroidCalendar, setShowStartAndroidCalendar] =
        useState(false);
    const [showEndAndroidCalendar, setShowEndAndroidCalendar] = useState(false);

    const onChangeStartDate = (event: any, selectedDate: Date | undefined) => {
        if (selectedDate) {
            setStartDate(selectedDate);
            onStartDateChange(selectedDate);
        }
        setShowStartAndroidCalendar(false);
    };

    const onChangeEndDate = (event: any, selectedDate: Date | undefined) => {
        if (selectedDate) {
            setEndDate(selectedDate);
            onEndDateChange(selectedDate);
        }
        setShowEndAndroidCalendar(false);
    };

    return (
        <View style={styles.container}>
            {/* Start Date Picker */}
            <View style={styles.pickerContainer}>
                <View style={styles.labelContainer}>
                    <Text style={styles.inputLabel}>Start Date</Text>
                    <Ionicons
                        name="calendar"
                        size={25}
                        color="black"
                        style={{ marginLeft: 10 }}
                    />
                </View>
                {Platform.OS === "ios" ? (
                    <DateTimePicker
                        value={startDate || new Date()}
                        mode="date"
                        display="default"
                        onChange={onChangeStartDate}
                    />
                ) : (
                    <View>
                        <TouchableOpacity
                            onPress={() => setShowStartAndroidCalendar(true)}
                        >
                            <TextInput
                                style={styles.dateInput}
                                placeholder="Select start date"
                                editable={false}
                            >
                                <Text>
                                    {startDate
                                        ? startDate.toDateString()
                                        : "Select a date"}
                                </Text>
                            </TextInput>
                        </TouchableOpacity>
                        {showStartAndroidCalendar && (
                            <DateTimePicker
                                value={startDate || new Date()}
                                mode="date"
                                display="default"
                                onChange={onChangeStartDate}
                            />
                        )}
                    </View>
                )}
            </View>

            {/* End Date Picker */}
            <View style={styles.pickerContainer}>
                <View style={styles.labelContainer}>
                    <Text style={styles.inputLabel}>End Date</Text>
                    <Ionicons
                        name="calendar"
                        size={25}
                        color="black"
                        style={{ marginLeft: 10 }}
                    />
                </View>
                {Platform.OS === "ios" ? (
                    <DateTimePicker
                        value={endDate || new Date()}
                        mode="date"
                        display="default"
                        onChange={onChangeEndDate}
                    />
                ) : (
                    <View>
                        <TouchableOpacity
                            onPress={() => setShowEndAndroidCalendar(true)}
                        >
                            <TextInput
                                style={styles.dateInput}
                                placeholder="Select end date"
                                editable={false}
                            >
                                <Text>
                                    {endDate
                                        ? endDate.toDateString()
                                        : "Select a date"}
                                </Text>
                            </TextInput>
                        </TouchableOpacity>
                        {showEndAndroidCalendar && (
                            <DateTimePicker
                                value={endDate || new Date()}
                                mode="date"
                                display="default"
                                onChange={onChangeEndDate}
                            />
                        )}
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        gap: 20,
    },
    pickerContainer: {
        alignItems: "center",
    },
    labelContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    inputLabel: {
        fontSize: 18,
        fontFamily: "Itim-Regular",
        color: "black",
    },
    dateInput: {
        fontFamily: "Itim-Regular",
        color: "black",
        fontSize: 15,
        textAlign: "center",
        borderColor: "black",
        borderRadius: 10,
        borderWidth: 1.5,
        width: 175,
        height: 50,
    },
});
