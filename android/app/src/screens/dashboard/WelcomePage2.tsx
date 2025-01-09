import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Card, Text, } from 'react-native-paper';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { NavigationProp,useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/types';
import { createStackNavigator } from '@react-navigation/stack';

const WelcomePage2 = () => {
    const navigation= useNavigation<NavigationProp<RootStackParamList>>();
    return (
        <View style={styles.headerContainer}>
            <View style={styles.container}>
                <Card style={styles.card}>
                    <Card.Content>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <Text style={styles.welcomeTitle}>WELCOME , Name</Text>
                            <Image source={{ uri: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250' }}
                                style={styles.profileImage}></Image>

                        </View>
                        <View style={{
                            flexDirection: 'column',
                            alignItems: 'center',


                        }}>
                            <Text style={styles.testCompatablityText}>Test your Compatability</Text>

                            <View style={styles.rowContainer}>
                                <TouchableOpacity style={styles.buttonContainer} onPress={() => console.log('Button Pressed')}>
                                    <Text >Current Job</Text>
                                </TouchableOpacity>
                                <Image source={require('../../../../../assets/images/search.png')} style={styles.forwardImage} />
                            </View>

                            <View style={styles.rowContainer}>
                                <TouchableOpacity style={styles.buttonContainer} onPress={() => console.log('Qualification Pressed')}>
                                    <Text>Target Job</Text>
                                </TouchableOpacity>
                                <Image source={require('../../../../../assets/images/search.png')} style={styles.forwardImage} />

                            </View>

                            <View style={styles.rowContainer}>
                                <TouchableOpacity style={styles.buttonContainer} onPress={() => console.log('Certification Pressed')}>
                                    <Text>Job Type</Text>
                                </TouchableOpacity>
                                <Image source={require('../../../../../assets/images/forwardimage.png')} style={styles.forwardImage} />

                            </View>
                            <View style={styles.rowContainer}>
                                <TouchableOpacity style={styles.buttonContainer} onPress={() => console.log('Certification Pressed')}>
                                    <Text>Budget Range</Text>
                                </TouchableOpacity>
                                <Image source={require('../../../../../assets/images/forwardimage.png')} style={styles.forwardImage} />

                            </View>

                            <View style={styles.rowContainer}>
                                <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('WelcomePage3')}>
                                    <Text style={styles.nextButtonText}>Compute Score</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </Card.Content>
                </Card>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#D0D6D3',
        justifyContent: 'center',
        padding: 16
    },
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    card: {
        width: '100%',
        height: '100%',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        borderRadius: 8
    },
    welcomeTitle: {
        marginTop: verticalScale(30),
        fontSize: moderateScale(20),
        fontWeight: 'bold',
    },
    testCompatablityText: {
        fontSize: moderateScale(14),
        marginTop: verticalScale(30),
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: '400',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 2,
    },
    buttonContainer: {
        fontSize: moderateScale(18),
        marginTop: verticalScale(40),
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: verticalScale(10),
        paddingHorizontal: moderateScale(20),
        borderRadius: 10,
        borderWidth: 0.7,
        backgroundColor: 'transparent'
    },
    addButtonContainer: {
        borderRadius: 25,
        marginTop: verticalScale(40),
        marginLeft: 40,
        padding: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#15df7a'
    },
    adduttonText: {
        color: 'black',

    },
    buttonText: {
        color: 'black',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginTop: verticalScale(30)
    },
    nextButton: {
        backgroundColor: '#f0c95f',
        position: 'relative',
        width: '70%',
        justifyContent: 'center',
        borderRadius: 10,
        paddingHorizontal: moderateScale(10),
        paddingVertical: verticalScale(5),
        marginTop: verticalScale(60),
        alignItems: 'center'
    },
    nextButtonText: {
        fontSize: moderateScale(15),
        textTransform: 'uppercase'
    },
    forwardImage: {
        width: 40,
        height: 40,
        marginLeft: moderateScale(40),
        marginTop: verticalScale(20),
        alignSelf: 'flex-end'
    }

});
export default WelcomePage2;
