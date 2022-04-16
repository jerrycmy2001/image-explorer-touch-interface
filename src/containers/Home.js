import { FlatList, StyleSheet, Text, View } from "react-native";
import React from 'react'
import data from "../../input/data.js"
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import DoubleClick from "./ClickHandler/DoubleClick"
import * as Speech from 'expo-speech';

// border for selected object
const hasBorder = {
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: 1,
}

// border for not selected object
const noBorder = {
    borderStyle: 'dotted',
    borderWidth: 0,
    borderRadius: 0,
}

class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedId: -1,
            itemList: [{
                id: -1,
                name: "(Choose an image)"
            }]
        };

        // construct list of images from data
        for (var i in data.data) {
            this.state.itemList.push({
                id: i,
                name: data.data[i].name
            })
        }

        // binding
        this.renderItem = this.renderItem.bind(this)
        this.onSwipe = this.onSwipe.bind(this)
        this.onDoubleClick = this.onDoubleClick.bind(this)
    }

    // increment or decrement selected index on swiping
    onSwipe(direction) {
        const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
        switch (direction) {
            case SWIPE_LEFT:
                if (this.state.selectedId > -1) {
                    this.setState({ selectedId: this.state.selectedId - 1 })
                }
                break;
            case SWIPE_RIGHT:
                if (this.state.selectedId < data.data.length - 1) {
                    this.setState({ selectedId: this.state.selectedId + 1 })
                }
                else { // at the end of the list
                    Speech.speak("end of the list", { language: 'en' })
                }
                break;
        }
    }

    // navigate to first layer
    onDoubleClick() {
        console.log("double click")
        if (this.state.selectedId != -1) {
            this.props.navigation.navigate('ImageLayer1', { index: this.state.selectedId, changePosition: true })
        }
    }

    // render item in the list
    renderItem(item) {
        // if this item is selected, give it a border
        const border = item.item.id == this.state.selectedId ? hasBorder : noBorder

        return (
            <View style={[styles.item, border]}>
                <Text style={styles.title}>{item.item.name}</Text>
            </View>
        )
    };

    render() {
        Speech.speak(this.state.itemList[this.state.selectedId + 1].name, { language: 'en' })

        // config for swiping
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };

        return (
            <View style={styles.container}>
                <GestureRecognizer
                    onSwipe={(direction, state) => this.onSwipe(direction)}
                    config={config}
                >
                    <DoubleClick
                        style={styles.container}
                        timeout={300}
                        onDoubleClick={this.onDoubleClick}>
                        <FlatList
                            data={this.state.itemList}
                            renderItem={this.renderItem}
                            keyExtractor={(item) => item.id}
                            extraData={this.state.selectedId}
                            contentContainerStyle={styles.container}
                        />
                    </DoubleClick>
                </GestureRecognizer>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 16,
        color: 'black',
    },
});

export default Home