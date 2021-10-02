import React, { Component } from 'react';
import { Neomorph } from 'react-native-neomorph-shadows';
import { TouchableOpacity, View, Text, Dimensions, ActivityIndicator, Image } from 'react-native';

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

export const wp = (float) => {
    return WIDTH * float / 100
}
export const hp = (float) => {
    return HEIGHT * float / 100
}


export default ({ name, active, text, borderRadius, marginBottom }) => {


    return (
        <TouchableOpacity style={{

            justifyContent: "center", alignItems: "center",
            zIndex: active ? 1 : 0,
            // marginLeft: active === 1 ? -20 : 0

        }}>
            <Neomorph

                inner={!active}


                style={{

                    // shadowOffset: { width: 3, height: 3 },
                    // shadowOpacity: 0.6,
                    // shadowColor: "grey",
                    // shadowRadius: 2,
                    backgroundColor: "#ECF0F3",
                    borderRadius: 6,
                    width: wp(40),
                    height: 36,
                    justifyContent: "center",
                    alignItems: "center",


                }}
            >

                <Text style={{ color: active ? "green" : "red" }} >{name}

                </Text>


            </Neomorph>
        </TouchableOpacity>
    )
}


