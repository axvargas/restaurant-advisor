import React from 'react'
import { View, Text } from 'react-native'
import { Image } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
const MyCarousel = ({ arrayImages, height, width }) => {
    const renderItem = ({ item }) => {
        return <Image style={{ width, height }} source={{ uri: item }} />
    }
    return (
        <Carousel
            layout={"default"}
            data={arrayImages}
            sliderWidth={width}
            itemWidth={width}
            renderItem={renderItem}
        />
    )
}

export default MyCarousel
