import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { cond, eq, Extrapolate, interpolate, interpolateNode, Value, } from 'react-native-reanimated';
import { runTiming } from './helper';



class Accordion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: props.title || "Title", height: new Value(0), totalHeight: 0
        }
        this.style = {
            opacity: 0
        }
        this.totalHeight = 0

        this._transXA = interpolateNode(this.state.height, {
            inputRange: [0, 100],
            outputRange: [0, -50],
            extrapolate: Extrapolate.CLAMP,
          });
    }

    componentDidMount() {

        this.style = {
            ...this.style,
            height: runTiming(new Value(0), this.state.height, 100),
            opacity: 1
        }
        // this.forceUpdate()



    }


    animate = () => {


        this.viewRef.measure((a, b, c, h) => {
            this.totalHeight = this.totalHeight > h ? this.totalHeight : h
            this.state.height.setValue(cond(eq(this.state.height, new Value(0)), this.totalHeight, 0))
            this.forceUpdate()
        })

        console.log(interpolateNode(this.state.height, { inputRange: [0, 100], outputRange: [0, 50] }))
    }


    render() {

        const { title, height, } = this.state

        const rotate = height.interpolate({
            inputRange: [0, this.totalHeight],
            outputRange: [0, -50]
        })

        return (
            <View style={{ paddingHorizontal: 20 }} >

                <Text>{this.totalHeight}</Text>

                <TouchableOpacity onPress={this.animate} activeOpacity={1}
                    style={{ flexDirection: "row", height: 40, backgroundColor: "cyan", alignItems: "center", justifyContent: "space-between" }}  >
                    <Text  >{title}</Text>
                    <Animated.Text style={{
                        fontSize: 30,
                        transform: [{ translateX: this._transXA }],

                    }} >^</Animated.Text>
                </TouchableOpacity>

                <Animated.View
                    ref={ref => this.viewRef = ref}
                    renderToHardwareTextureAndroid style={this.style} >
                    <Text >213</Text>
                    <Text >213</Text>
                    <Text >213</Text>
                    <Text >213</Text>
                    <Text >213</Text>
                </Animated.View>

            </View>
        )
    }


}


export default Accordion