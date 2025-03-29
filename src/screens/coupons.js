import React from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";


const promoCodes = [
    {
        id: "1",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-o41hphsyp8srrJwZKcNx5GxIlWRJ9Xmfwg&s",
        title: "Get cashback upto $40 on VISA Debit or Credit cards",
        description: "On booking of $200 or more.",
    },
    {
        id: "2",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-o41hphsyp8srrJwZKcNx5GxIlWRJ9Xmfwg&s",
        title: "Get cashback upto $40 on VISA Debit or Credit cards",
        description: "On booking of $200 or more.",
    },
];

const CouponScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, backgroundColor: "#D3D3D3" }}>

        <View style={{ backgroundColor: "white", padding:hp(2.5), marginBottom:hp(1) }}>
            {/* Back Button */}
            <TouchableOpacity style={{ marginBottom: hp(2) }}
                onPress={() => navigation.navigate("checkout")}>
                <Icon name="arrow-left" size={hp(3)} color="black" />
            </TouchableOpacity>

            {/* Title */}
            <Text style={{ fontSize: hp(3), fontWeight: "bold", marginBottom: hp(2) }}>Offers & Promo Codes</Text>

            {/* Coupon Input */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: hp(1),
                    paddingHorizontal: wp(3),
                    paddingVertical: hp(1),
                    marginBottom: hp(2),
                }}
            >
                <TextInput
                    placeholder="Enter Coupon Code"
                    style={{ flex: 1, fontSize: hp(2) }}
                />
                <TouchableOpacity     onPress={() => navigation.navigate("checkout")}>
                    <Text style={{ color: "#007AFF", fontSize: hp(2), fontWeight: "bold" }}>APPLY</Text>
                </TouchableOpacity>
            </View>
            </View>
            {/* Promo Code List */}
            <FlatList
                data={promoCodes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: hp(1.5), borderBottomWidth: 1, borderBottomColor: "#eee" }}>
                        {/* Promo Image */}
                        <Image source={{ uri: item.image }} style={{ width: hp(6), height: hp(4) }} resizeMode="contain" />

                        {/* Promo Details */}
                        <View style={{ flex: 1, marginLeft: wp(4) }}>
                            <Text style={{ fontSize: hp(2), fontWeight: "400" }}>{item.title}</Text>
                            <Text style={{ fontSize: hp(1.8), color: "#666", marginTop: hp(0.5) }}>{item.description}</Text>
                        </View>

                        {/* Apply Button */}
                        <TouchableOpacity     onPress={() => navigation.navigate("checkout")}>
                            <Text style={{ color: "#007AFF", fontSize: hp(2), fontWeight: "300" }}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

export default CouponScreen;
