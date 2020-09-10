import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, Rating } from 'react-native-elements';

const Review = ({ reviewData }) => {
    const { title, review, rating, createdAt, avatarUser } = reviewData;
    const dateOfReview = new Date(createdAt.seconds * 1000);
    return (
        <View style={styles.viewReview}>
            <View style={styles.viewImage}>
                <Avatar
                    size="large"
                    rounded
                    containerStyle={styles.ctnAvatar}
                    source={avatarUser ? { uri: avatarUser } : require('../../../assets/images/no-image.png')}
                />
            </View>
            <View style={styles.viewInfo}>
                <Text style={styles.txtReviewTitle}>{title}</Text>
                <Text style={styles.txtReviewText}>{review}</Text>
                <Rating
                    imageSize={15}
                    startingValue={rating}
                    readOnly
                />
                <Text style={styles.txtReviewDate}>
                    {dateOfReview.getDate()}/{dateOfReview.getMonth() + 1}/{dateOfReview.getFullYear()} -
                    {" "}{dateOfReview.getHours()}h{dateOfReview.getMinutes() < 10 ? "0" : ""}{dateOfReview.getMinutes()}m

                </Text>
            </View>
        </View>
    )
}

export default Review

const styles = StyleSheet.create({
    viewReview: {
        flexDirection: 'row',
        padding: 10,
        paddingBottom: 20,
        borderBottomColor: '#e3e3e3',
        borderBottomWidth: 1
    },
    viewImage: {
        marginRight: 15
    },
    ctnAvatar: {
        width: 50,
        height: 50
    },
    viewInfo: {
        flex: 1,
        alignItems: 'flex-start'
    },
    txtReviewTitle: {
        fontWeight: 'bold'
    },
    txtReviewText: {
        paddingTop: 2,
        color: 'grey',
        marginBottom: 5
    },
    txtReviewDate: {
        marginTop: 5,
        color: 'grey',
        fontSize: 12,
        position: 'absolute',
        right: 0,
        bottom: 0
    }
})
