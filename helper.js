import { Dimensions } from "react-native";


const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width



export const wp = (float) => {
    return WIDTH * float / 100
}
export const hp = (float) => {
    return HEIGHT * float / 100
}