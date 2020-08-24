import React from 'react'
import { StyleSheet, ScrollView, Image, Text, View } from 'react-native'
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const UserGuest = () => {
    const navigation = useNavigation();
    return (
        <ScrollView
            centerCounter={true}
            style={styles.viewBody}
        >
            <Image
                source={require("../../../../assets/images/user-guest.png")}
                resizeMode="contain"
                transition={true}
                style={styles.image}
            />
            <Text
                style={styles.title}
            >
                Check your profile on the app
            </Text>
            <Text
                style={styles.description}
            >
                How would you describe your best restaurant? Look and find the best restaurants in an easy way ,
                vote for your prefered ones and tell us how your experience was.
            </Text>
            <View
                style={styles.viewBtn}
            >
                <Button
                    buttonStyle={styles.btnStyle}
                    containerStyle={styles.btnContainerStyle}
                    title="Check your profile"
                    raised
                    onPress={() => {
                        navigation.navigate("login");
                    }}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        marginLeft: 30,
        marginRight: 30
    },
    image: {
        height: 300,
        width: "100%",
        marginBottom: 40
    },
    title: {
        fontWeight: "bold",
        fontSize: 19,
        marginBottom: 10,
        textAlign: "center"
    },
    description: {
        textAlign: "center",
        marginBottom: 20
    },
    viewBtn: {
        flex: 1,
        alignItems: "center"
    },
    btnStyle: {
        backgroundColor: "#00a680"
    },
    btnContainerStyle: {
        width: "70%"
    }
})
export default UserGuest;
