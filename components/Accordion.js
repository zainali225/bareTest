import React from 'react';
import { ActivityIndicator, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import Animated, { cond, Easing, EasingNode, eq, Extrapolate, interpolate, interpolateNode, Value, debug, set, event } from 'react-native-reanimated';
import { runTiming } from './helper';
// import { AntDesign } from 'vect';
import { GestureHandlerRootView, State, TapGestureHandler } from 'react-native-gesture-handler';



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
        const height = new Value(0)
        const state = new Value(-1);


        this.onGestureEvent = event([
            {
                nativeEvent: {
                    state,
                }
            }
        ]);

        this.height = cond(eq(State.END, state), [
            
            set(height, runTiming(new Value(0), new Value(100))),
            height
        ], [
            set(height, runTiming(new Value(100), new Value(0))),
            height
            // 0
        ])


    }

    componentDidMount() {

        this.style = {
            height: this.state.height,
            opacity: 1
        }
        // this.forceUpdate()



    }


    // animate = () => {

    //     set(this.state.height, debug("val", this.state.height))

    //     // this.viewRef.measure((a, b, c, h) => {

    //     //     this.totalHeight = this.totalHeight > h ? this.totalHeight : h
    //     // Animated.timing(this.state.height, {
    //     //     toValue:

    //     //     duration: 1000,
    //     //     easing: EasingNode.linear
    //     // }).start()

    //     // })

    //     // console.log(interpolateNode(this.state.height, { inputRange: [0, 100], outputRange: [0, 50] }))
    // }


    render() {

        const { title, height, } = this.state

        const rotate = height.interpolate({
            inputRange: [0, this.totalHeight],
            outputRange: [0, -50]
        })

        return (
            <GestureHandlerRootView style={{ paddingHorizontal: 20 }} >
                <StatusBar backgroundColor="green" />
                {/* <ActivityIndicator color="black" />
                <Text>{this.totalHeight}</Text> */}

                <TapGestureHandler
                    onHandlerStateChange={this.onGestureEvent}
                >
                    <Animated.View style={{ flexDirection: "row", height: 40, backgroundColor: "cyan", alignItems: "center", justifyContent: "space-between" }} >
                        <Text  >{title}</Text>
                        <Animated.Text style={{}} >
                            {/* <AntDesign name="caretdown" size={20} color="black" /> */}
                        </Animated.Text>
                    </Animated.View>
                </TapGestureHandler>

                <Animated.View
                    ref={ref => this.viewRef = ref}
                    renderToHardwareTextureAndroid style={{ height: this.height }} >
                    <Text >213</Text>
                    <Text >213</Text>
                    <Text >213</Text>
                    <Text >213</Text>
                    <Text >213</Text>
                </Animated.View>



            </GestureHandlerRootView>
        )
    }


}


export default Accordion