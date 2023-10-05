import React from 'react';
import { SafeAreaView } from 'react-native';
import DynamicTabs from './HomeComponents/DynamicTabs';

const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <DynamicTabs navigation={navigation} />
        </SafeAreaView>
    );
}

export default HomeScreen;
