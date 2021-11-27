import React from "react";
import { Text, View } from "react-native";
import Animated, { add, Clock, set, Value } from "react-native-reanimated";
import { runTiming } from './helper'
import ProgressBar from './ProgressBar'
const WIDTH = 400

class MyProgress extends React.Component {

    constructor(props) {
        super(props);

        this.width = new Value(0)
        this.progress = 0.1
    }


    componentDidMount() {

        this.width.setValue(add(this.width, 200))
        this.progress = 0.50
        this.forceUpdate()
    }


    render() {

        return (

            <View style={{ flex: 1, }} >
                <Text>My Progress</Text>

                <Animated.View style={{ width: runTiming(new Value(0), this.width), height: 20, backgroundColor: "tan" }} />

                <ProgressBar progress={this.progress} width={400} />

            </View>

        )
    }

}

export default MyProgress