import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { FlashList } from "@shopify/flash-list";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/FontAwesome5";
import { test, priceDetails } from "../data/test";
import { useNavigation } from "@react-navigation/native";


const CheckoutScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, backgroundColor: "#D3D3D3" }}>
            <ScrollView>
                {/* Back Button */}
                <View style={{ backgroundColor: "#fff", height: hp(42) }}>
                    <TouchableOpacity style={{ marginLeft: wp(4), marginBottom: hp(2) }}>
                        <Icon name="arrow-left" size={hp(3)} color="black" />
                    </TouchableOpacity>

                    {/* Checkout Title */}
                    <Text
                        style={{
                            fontSize: hp(3),
                            fontWeight: "bold",
                            marginLeft: wp(4),
                            marginBottom: hp(1),
                        }}
                    >
                        Checkout
                    </Text>

                    {/* Salon Name */}
                    <Text
                        style={{
                            fontSize: hp(2.5),
                            fontWeight: "600",
                            marginLeft: wp(4),
                            marginBottom: hp(2),
                        }}
                    >
                        Woodlands Hills Salon
                    </Text>

                    {/* Shop Service Section */}
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginLeft: wp(4),
                            paddingVertical: hp(1.5),
                        }}
                    >
                        <Icon name="store" size={hp(2.5)} color="black" />
                        <Text
                            style={{ fontSize: hp(2), marginLeft: wp(3), fontWeight: "600" }}
                        >
                            {" "}
                            Shop Service
                        </Text>
                    </TouchableOpacity>

                    {/* Dashed Line */}
                    <View
                        style={{
                            borderBottomWidth: 1,
                            borderStyle: "dashed",
                            borderBottomColor: "#999",
                            marginHorizontal: wp(4),
                            marginBottom: hp(1),
                        }}
                    />

                    {/* Select Date & Time */}
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginLeft: wp(4),
                            paddingVertical: hp(1.5),
                        }}
                        onPress={() => navigation.navigate("selectDateAndTime")}
                    >
                        <Icon name="calendar-alt" size={hp(2.5)} color="black" />
                        <Text
                            style={{ fontSize: hp(2), marginLeft: wp(3), fontWeight: "600" }}
                        >
                            {" "}
                            Select Date & Time
                        </Text>
                        <Icon
                            name="chevron-right"
                            size={hp(2)}
                            color="black"
                            style={{ marginLeft: "auto", marginRight: wp(4) }}
                        />
                    </TouchableOpacity>

                    {/* Dashed Line */}
                    <View
                        style={{
                            borderBottomWidth: 1,
                            borderStyle: "dashed",
                            borderBottomColor: "#999",
                            marginHorizontal: wp(4),
                            marginBottom: hp(1),
                        }}
                    />

                    {/* Service List */}
                    <FlashList
                        data={test}
                        keyExtractor={(item) => item.id.toString()}
                        estimatedItemSize={hp(10)}
                        renderItem={({ item }) => (
                            <View
                                style={{ marginHorizontal: wp(4), paddingVertical: hp(1.5) }}
                            >
                                {/* Service Name & Price */}
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Text style={{ fontSize: hp(2), fontWeight: "500" }}>
                                        {item.item}
                                    </Text>
                                    <Text style={{ fontSize: hp(2), fontWeight: "400" }}>
                                        <Text>₹</Text>
                                        <Text>{item.price}</Text>
                                    </Text>
                                </View>
                                {/* Amount Below Haircut */}
                                <Text
                                    style={{
                                        fontSize: hp(1.8),
                                        color: "#666",
                                        marginTop: hp(0.5),
                                    }}
                                >
                                    <Text>₹</Text>
                                    <Text>{item.price}</Text>
                                </Text>
                            </View>
                        )}
                    />
                </View>
                <View
                    style={{ backgroundColor: "#fff", marginTop: hp(1), height: hp(7) }}
                >
                    {/* Offers & Promo Code */}
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginHorizontal: wp(4),
                            paddingVertical: hp(2),
                        }}
                        onPress={() => navigation.navigate("coupon")}
                    >
                        <Text style={{ fontSize: hp(2), fontWeight: "600" }}>
                            Offers & Promo Code
                        </Text>
                        <Text
                            style={{ fontSize: hp(2), fontWeight: "400", color: "#007AFF" }}
                        >
                            View Offers
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* Frequently Added Together */}
                <View
                    style={{ backgroundColor: "#fff", marginTop: hp(1), height: hp(28) }}
                >
                    {/* Frequently Added Together */}
                    <Text
                        style={{
                            fontSize: hp(2),
                            fontWeight: "bold",
                            marginLeft: wp(4),
                            marginTop: hp(2),
                        }}
                    >
                        Frequently added together
                    </Text>
                    <View
                        style={{
                            flexDirection: "column",
                            alignItems: "flex-start",
                            marginHorizontal: wp(4),
                            marginTop: hp(1),
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "column",
                                alignItems: "center",
                                padding: hp(1),
                            }}
                        >
                            <Image
                                source={{ uri: test[0].image }}
                                style={{ width: hp(9), height: hp(9), borderRadius: hp(1) }}
                            />
                            <View style={{ marginLeft: wp(3) }}>
                                <Text style={{ fontSize: hp(2), fontWeight: "600" }}>
                                    {test[0].item}
                                </Text>
                                <Text style={{ fontSize: hp(1.8), color: "#666" }}>
                                    ${test[0].price}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={{
                                borderWidth: 1,
                                borderColor: "#6c5ce7",
                                borderRadius: hp(0.8),
                                paddingVertical: hp(0.5),
                                paddingHorizontal: wp(3),
                                alignSelf: "flex-start",
                            }}
                        >
                            <Text
                                style={{
                                    color: "#6c5ce7",
                                    fontSize: hp(1.8),
                                    fontWeight: "500",
                                }}
                            >
                                Select +
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Price Details */}
                <View
                    style={{ backgroundColor: "#fff", marginTop: hp(1), height: hp(40) }}
                >
                    <View style={{ marginHorizontal: wp(4), marginTop: hp(2) }}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginBottom: hp(1),
                            }}
                        >
                            <Text style={{ fontSize: hp(2) }}>Item total</Text>
                            <Text style={{ fontSize: hp(2) }}>₹{priceDetails.itemTotal}</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginBottom: hp(1),
                            }}
                        >
                            <Text style={{ fontSize: hp(2) }}>Coupon Discount</Text>
                            <Text style={{ fontSize: hp(2), color: "green" }}>
                                -₹{priceDetails.couponDiscount}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                fontWeight: "bold",
                            }}
                        >
                            <Text style={{ fontSize: hp(2.2), fontWeight: "bold" }}>
                                Amount Payable
                            </Text>
                            <Text style={{ fontSize: hp(2.2), fontWeight: "bold" }}>
                                ₹{priceDetails.amountPayable}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View
                style={{
                    position: "absolute",
                    bottom: hp(2),
                    width: "90%",
                    alignSelf: "center",
                    flexDirection: "row",
                    backgroundColor: "#E91E63",
                    paddingVertical: hp(1),
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: hp(2), // Ensuring rounded corners
                    paddingHorizontal: wp(4),
                }}
            >
                {/* Left Side: Quantity & Price */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                        style={{
                            borderWidth: 1,
                            borderColor: "#fff",
                            borderRadius: hp(1.5),
                            paddingHorizontal: wp(3),
                            paddingVertical: hp(0.5),
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#DD3163",
                        }}
                    >
                        <Text
                            style={{ color: "#fff", fontSize: hp(2), fontWeight: "bold" }}
                        >
                            1
                        </Text>
                    </View>
                    <View style={{ marginLeft: wp(2) }}>
                        <Text
                            style={{ fontSize: hp(2.2), color: "#fff", fontWeight: "bold" }}
                        >
                            {priceDetails.itemTotal}
                        </Text>
                        <Text style={{ fontSize: hp(1.5), color: "#fff", opacity: 0.8 }}>
                            plus taxes
                        </Text>
                    </View>
                </View>

                {/* Right Side: Button with Smaller Width */}
                <TouchableOpacity
                    style={{
                        paddingVertical: hp(1.5),
                        paddingHorizontal: wp(5),
                        borderRadius: hp(2),
                    }}
                    onPress={() => navigation.navigate("selectDateAndTime")}

                >
                    <Text style={{ fontSize: hp(2), fontWeight: "bold", color: "#fff" }}>
                        Select Date & Time
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CheckoutScreen;
