import React from 'react';
import { SafeAreaView } from 'react-native';
import DynamicTabs from './HomeComponents/DynamicTabs';
import { AuthProvider } from './HomeComponents/Auth';



const HomeScreen = ({ navigation }) => {
    return (
        <AuthProvider>
        <SafeAreaView style={{ flex: 1 }}>
            <DynamicTabs navigation={navigation} />
        </SafeAreaView>
        </AuthProvider>
    );
}

export default HomeScreen;
