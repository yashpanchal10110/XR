import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, Modal } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { dates, times } from "../data/test"
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";

const SelectDateAndTime = () => {
    const [selectedDate, setSelectedDate] = useState("22");
    const [selectedTime, setSelectedTime] = useState("11:00 AM");
    const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
    const navigation = useNavigation();
    const { width, height } = Dimensions.get("window");

    return (
        <View style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: wp(5), paddingTop: hp(3) }}>
            {/* Back Button */}
            <TouchableOpacity style={{ marginBottom: hp(2) }}
                onPress={() => navigation.navigate("checkout")}
            >
                <Icon name="arrow-left" size={hp(3)} color="black" />
            </TouchableOpacity>

            {/* Title */}
            <Text style={{ fontSize: hp(3), fontWeight: "bold", marginBottom: hp(1) }}>Checkout</Text>
            <Text style={{ fontSize: hp(2), color: "#666", marginBottom: hp(2) }}>
                Select Date & Time for the appointment
            </Text>

            <View>
                <Text style={{ fontSize: hp(2.5), fontWeight: "500", marginBottom: 10 }}>
                    When would you like your service?
                </Text>
                <FlatList
                    horizontal
                    data={dates}
                    keyExtractor={(item) => item.date}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={{
                                padding: 10,
                                borderWidth: 1,
                                borderRadius: 10,
                                borderColor: selectedDate === item.date ? "#6A5ACD" : "#ccc",

                                alignItems: "center",
                                marginRight: 10,
                                width: 60,
                            }}
                            onPress={() => setSelectedDate(item.date)}
                        >
                            <Text style={{
                                fontSize: 14,
                                color: selectedDate === item.date ? "#6A5ACD" : "#555"
                            }}>
                                {item.day}
                            </Text>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: "bold",
                                color: selectedDate === item.date ? "#6A5ACD" : "#000"
                            }}>
                                {item.date}
                            </Text>
                        </TouchableOpacity>
                    )}
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            {/* Time Selection */}
            <Text style={{ fontSize: hp(2), fontWeight: "bold", marginVertical: hp(2) }}>
                When would you like your service?
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                {times.map((time, index) => (
                    <TouchableOpacity
                        key={index}
                        style={{
                            width: "48%",
                            paddingVertical: hp(1.5),
                            marginVertical: hp(0.5),
                            borderRadius: hp(1),
                            borderWidth: 1,
                            borderColor: selectedTime === time ? "#5D5FEF" : "#ccc",

                        }}
                        onPress={() => setSelectedTime(time)}
                    >
                        <Text style={{
                            textAlign: "center",
                            fontSize: hp(2),
                            color: selectedTime === time ? "#5D5FEF" : "#000",  // Blue text for selected time
                            fontWeight: selectedTime === time ? "bold" : "normal"
                        }}>
                            {time}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Payment Details - Open Bottom Sheet */}
            <TouchableOpacity
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: hp(1.5),
                    marginTop: hp(3),
                    bottom: -130,
                }}
                onPress={() => setBottomSheetVisible(true)} // Open Modal Bottom Sheet
            >
                <Image
                    source={{ uri: "https://1000logos.net/wp-content/uploads/2017/06/VISA-Logo-2006.png" }}
                    style={{ width: hp(6), height: hp(4) }}
                    resizeMode="contain"
                />
                <Text style={{ flex: 1, marginLeft: wp(3), fontSize: hp(2) }}>Visa 4153 xxxx xxxx 0981</Text>
                <Icon name="chevron-right" size={hp(2)} color="#000" />
            </TouchableOpacity>

            {/* Bottom Sheet Modal */}
            <Modal
                transparent
                visible={isBottomSheetVisible}
                animationType="slide"
                onRequestClose={() => setBottomSheetVisible(false)}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => setBottomSheetVisible(false)}
                    style={{
                        flex: 1,
                        justifyContent: "flex-end",
                        backgroundColor: "rgba(0,0,0,0.5)",
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "#fff",
                            padding: height * 0.02,
                            width: "100%",
                            paddingBottom: height * 0.04,
                            borderTopLeftRadius: 15,
                            borderTopRightRadius: 15,
                        }}
                    >
                        {/* Close Button */}
                        <TouchableOpacity
                            onPress={() => setBottomSheetVisible(false)}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                paddingBottom: height * 0.01,
                            }}
                        >
                            <Icon name="times" size={height * 0.03} color="black" style={{ marginRight: width * 0.02 }} />
                            <Text style={{ fontSize: height * 0.025, fontWeight: "500" }}>
                                Select Payment Method
                            </Text>
                        </TouchableOpacity>
                        <View
                            style={{
                                height: 1,
                                backgroundColor: "#E0E0E0",
                                marginVertical: height * 0.005,
                                width: "100%",
                            }}
                        />

                        <View style={{ backgroundColor: "white", paddingVertical: height * 0.01 }}>
                            {/* Payment Options */}
                            {[
                                {
                                    name: "Apple Pay",
                                    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfp_3jN-zgVDJzWjr1I4lKWWRothBbWHb8hQ&s",
                                },
                                {
                                    name: "Cash",
                                    icon: "https://cdn-icons-png.flaticon.com/512/1086/1086741.png",
                                },
                                {
                                    name: "4153 xxxx xxxx 0981",
                                    icon: "https://1000logos.net/wp-content/uploads/2017/06/VISA-Logo-2006.png",
                                },
                            ].map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        paddingVertical: height * 0.015,
                                    }}
                                >
                                    <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                                        <Image
                                            source={{ uri: item.icon }}
                                            style={{
                                                width: height * 0.06,
                                                height: height * 0.04,
                                                marginRight: width * 0.03,
                                            }}
                                            resizeMode="contain"
                                        />
                                        <Text style={{ fontSize: height * 0.02, fontWeight: "500" }}>{item.name}</Text>
                                    </View>
                                    <Icon name="chevron-right" size={height * 0.02} color="#999" />
                                </TouchableOpacity>
                            ))}

                            {/* Add Payment Method */}
                            <TouchableOpacity
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    paddingVertical: height * 0.01,
                                }}
                            >
                                <Icon name="plus-circle" size={height * 0.03} />
                                <Text style={{ fontSize: height * 0.02, marginLeft: width * 0.02, fontWeight: "500" }}>
                                    Add Payment Method
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* Bottom Button */}
            <View
                style={{
                    position: "absolute",
                    bottom: height * 0.02,
                    left: 0,
                    right: 0,
                    backgroundColor: "#DD3163",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: height * 0.02,
                    borderRadius: height * 0.02,
                    marginHorizontal: width * 0.05,
                }}
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                        style={{
                            width: height * 0.03,
                            height: height * 0.03,
                            backgroundColor: "#fff",
                            borderRadius: height * 0.015,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text style={{ fontSize: height * 0.02, fontWeight: "bold", color: "#E53950" }}>2</Text>
                    </View>
                    <Text style={{ fontSize: height * 0.025, fontWeight: "bold", color: "#fff", marginLeft: width * 0.02 }}>
                        ₹439 <Text style={{ fontSize: height * 0.018, fontWeight: "normal" }}>plus taxes</Text>
                    </Text>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate("checkout")}>
                    <Text style={{ fontSize: height * 0.02, fontWeight: "bold", color: "#fff" }}>Select Date & Time</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SelectDateAndTime;
