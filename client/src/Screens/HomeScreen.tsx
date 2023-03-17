import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {ClickableBox} from "../Components/ClickableBox";

const CATEGORIES_LIST: [string, string[]][] = [['play', []], ['dress', []]];

export const HomeScreen = () => {
    return (
        <ScrollView>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10}}>
                <View style={{flexGrow: 0, flexShrink: 0, flexBasis: '15%'}}>
                    <Text style={{fontSize: 25}}>
                        בוקר טוב אלי ☀️
                        מה תרצה לעשות היום ?
                    </Text>
                </View>
                <View style={{
                    flex: 1,
                    flexWrap: 'wrap',
                    flexDirection: 'row', paddingTop: 10
                }}>
                    {
                        CATEGORIES_LIST.map((category) => {
                            return <ClickableBox categoryName={category[0]} subCategories={category[1]} key={category[0]}/>
                        })
                    }
                </View>
            </View>
        </ScrollView>
    );
}