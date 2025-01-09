import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { ActivityIndicator, Card } from "react-native-paper";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types/types"; 
import { AppDispatch } from "../../redux/ProgressStore";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/ProgressStore"; 
import { login } from "../../redux/AuthActions"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen: React.FC = () => {
    const [username, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const dispatch: AppDispatch = useDispatch();
    const { loading, error,  } = useSelector((state: RootState) => state.loginSlice);
    const token = useSelector((state: RootState) => state.loginSlice.access_token);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    useEffect(() => {
        checkToken(); 
    }, []);
    const handleLogin = async () => {
        if (username && password) {
            try {
                await dispatch(login({ username, password }));
    
                // Retrieve the token from the Redux state after dispatch
                const receivedToken = token;  // Directly access the token from state
                console.log("Token Received:", receivedToken); 
                if (receivedToken) {
                    await AsyncStorage.setItem('userToken', receivedToken);
                    Alert.alert("Success", "Logged in successfully");
                    navigation.navigate('WelcomePage1');
                } else {
                    console.warn("No token received:", receivedToken); 
                    Alert.alert("Login failed", "Token not received from the server. Please try again.");
                }
            } catch (err: any) {
                console.error("Error during login:", err); 
                Alert.alert("Login failed", err.message || "An error occurred. Please try again.");
            }
        } else {
            Alert.alert("Input Error", "Please enter valid credentials");
        }
    };
    const checkToken = async () => {
        const savedToken = await AsyncStorage.getItem('userToken');
        if (savedToken) {
            navigation.navigate('WelcomePage1');
        }
    };
   
    useEffect(() => {
        // Show error alert if there's an error
        if (error) {
            Alert.alert("Login Error", error);
        }
    }, [error]);

    return (
        <View style={styles.headerContainer}>
            <View style={styles.container}>
                <Card style={styles.card}>
                    <Card.Content>
                        <View style={styles.container}>
                            <Text style={styles.welcomeText}>Welcome</Text>
                            <Text style={styles.loginText}>Login into your account to continue</Text>
                            <View style={styles.rowContainer}>
                                <Image source={require('../../../../../assets/images/username.png')} style={styles.userIcon} />
                                <TextInput
                                    style={styles.usernameText}
                                    placeholder="Email Address"
                                    value={username}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                />
                            </View>

                            <View style={styles.rowContainer}>
                                <Image source={require('../../../../../assets/images/password.png')} style={styles.userIcon} />
                                <TextInput
                                    style={styles.usernameText}
                                    placeholder="Password"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={true}
                                    keyboardType="ascii-capable"
                                />
                            </View>
                            {loading ? (
                                <ActivityIndicator size="large" color="#0000ff" />
                            ) : (
                                <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                                    <Text>Login</Text>
                                </TouchableOpacity>
                            )}
                            <Text style={styles.loginWithText}> (Or) login with</Text>
                            <View style={styles.socialLoginContainer}>
                                <Image source={require('../../../../../assets/images/googlesignin.png')} style={styles.socialmediaIcon} />
                                <Image source={require('../../../../../assets/images/facebook.png')} style={styles.socialmediaIcon} />
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
        alignItems: 'center',
        backgroundColor: '#D0D6D3',
        justifyContent: 'center',
        padding: 16,
    },
    userIcon: {
        height: 30,
        width: 30,
    },
    socialmediaIcon: {
        height: 30,
        width: 30,
        justifyContent: 'space-evenly',
    },
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        margin: moderateScale(10),
        justifyContent: 'center',
    },
    loginWithText: {
        fontSize: moderateScale(12),
        marginTop: moderateScale(20),
    },
    card: {
        width: '100%',
        height: '85%',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        borderRadius: 8,
    },
    usernameText: {
        borderWidth: 0.1,
        padding: 10,
        width: '100%',
    },
    welcomeText: {
        marginTop: verticalScale(10),
        alignItems: 'center',
        width: '50%',
        justifyContent: 'center',
        fontSize: moderateScale(20),
        color: '#3380ff',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    loginText: {
        marginTop: verticalScale(30),
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: moderateScale(15),
        color: '#000',
        textAlign: 'center',
        fontWeight: '400',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.3,
        marginStart: moderateScale(40),
        marginEnd: moderateScale(40),
        marginTop: verticalScale(15),
        marginHorizontal: moderateScale(10),
        padding: moderateScale(1),
        justifyContent: 'space-between',
    },
    socialLoginContainer: {
        flexDirection: 'row',
    },
    loginBtn: {
        backgroundColor: '#f0c95f',
        position: 'relative',
        width: '70%',
        justifyContent: 'center',
        borderRadius: 10,
        paddingHorizontal: moderateScale(10),
        paddingVertical: verticalScale(10),
        marginTop: verticalScale(30),
        alignItems: 'center',
    },
});

export default LoginScreen;
