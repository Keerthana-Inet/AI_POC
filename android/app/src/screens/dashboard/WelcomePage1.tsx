import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/types';
import { resumeEvaluate } from '../../redux/AuthActions';
import { useDispatch } from 'react-redux';

const WelcomePage1 = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const dispatch = useDispatch(); 
    const handleResumePicker = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            if (result && result[0]) {
                const file = {
                    uri: result[0].uri,
                    name: result[0].name,
                    type: result[0].type || 'application/octet-stream',
                };

                // Alert to show selected file
                Alert.alert('File Selected', `You selected ${result[0].name}`);

                // Dispatch the resume evaluation action
                dispatch(resumeEvaluate('data_analyst', file.uri));
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User canceled file picker');
            } else {
                console.error('File picker error:', err);
            }
        }
    };
    
    return (
        <View style={styles.headerContainer}>
            <View style={styles.container}>
                <Card style={styles.card}>
                    <Card.Content>
                        <View style={styles.rowBetween}>
                            <Text style={styles.welcomeTitle}>WELCOME , Name</Text>
                            <Image
                                source={{ uri: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250' }}
                                style={styles.profileImage}
                            />
                        </View>
                        <View style={styles.centerColumn}>
                            <Text style={styles.testCompatablityText}>Test your Compatibility</Text>
                            <View style={styles.rowContainer}>
                                <TouchableOpacity style={styles.buttonContainer} onPress={handleResumePicker}>
                                    <Text>Resume</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.addButtonContainer} onPress={() => console.log('Add Pressed')}>
                                    <Text>Add</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.rowContainer}>
                                <TouchableOpacity style={styles.buttonContainer} onPress={() => console.log('Qualification Pressed')}>
                                    <Text>Qualification</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.addButtonContainer}
                                    onPress={() => console.log('Add Qualification Pressed')}
                                >
                                    <Text>Add</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.rowContainer}>
                                <TouchableOpacity style={styles.buttonContainer} onPress={() => console.log('Licenses Pressed')}>
                                    <Text>Licenses</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.addButtonContainer}
                                    onPress={() => console.log('Add Licenses Pressed')}>
                                    <Text>Add</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.rowContainer}>
                                <TouchableOpacity style={styles.buttonContainer} onPress={() => console.log('Skills Pressed')}>
                                    <Text>Skills</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.addButtonContainer}
                                    onPress={() => console.log('Add Skills Pressed')}
                                >
                                    <Text>Add</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.rowContainer}>
                                <TouchableOpacity
                                    style={styles.nextButton}
                                    onPress={() => navigation.navigate('WelcomePage2')}
                                >
                                    <Text style={styles.nextButtonText}>Next</Text>
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
        padding: 16,
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
        borderRadius: 8,
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    centerColumn: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    welcomeTitle: {
        marginTop: verticalScale(30),
        fontSize: moderateScale(20),
        fontWeight: 'bold',
    },
    testCompatablityText: {
        fontSize: moderateScale(14),
        marginTop: verticalScale(40),
        textAlign: 'center',
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
        borderRadius: 15,
        backgroundColor: '#d3d3d3',
    },
    addButtonContainer: {
        borderRadius: 25,
        marginTop: verticalScale(40),
        marginLeft: 40,
        padding: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#15df7a',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginTop: verticalScale(30),
    },
    nextButton: {
        backgroundColor: '#f0c95f',
        width: '70%',
        justifyContent: 'center',
        borderRadius: 10,
        paddingHorizontal: moderateScale(10),
        paddingVertical: verticalScale(10),
        marginTop: verticalScale(60),
        alignItems: 'center',
    },
    nextButtonText: {
        fontSize: moderateScale(15),
        textTransform: 'uppercase',
    },
});

export default WelcomePage1;
