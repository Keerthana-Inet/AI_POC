import React, { useEffect } from "react";
import { View, StyleSheet, Text, Pressable, Image, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { Card } from "react-native-paper";
import Svg, { G } from "react-native-svg";
import { moderateScale, verticalScale, } from "react-native-size-matters";
import { setProgress } from "../../redux/ProgressSlice";
import { RootState } from "../../redux/ProgressStore";
import Animated, {
  useSharedValue,
  withTiming,
  useDerivedValue,
  useAnimatedStyle,
  withSequence,
} from "react-native-reanimated";
import { ReText } from "react-native-redash";
import ProgressLine from "./ProgressLine";
import { SCREEN_WIDTH } from "./constants/Window";
import {
  CENTER, LINE_COUNT,
  SIZE,
  STROKE_WIDTH,
} from "./constants/ProgressCircle";
import { useDispatch, useSelector } from "react-redux";

const CertificationData = [
  { id: "1", title: "Certification 1" },
  { id: "2", title: "Certification 2" },
  { id: "3", title: "Certification 3" },
  { id: "4", title: "Certification 4" },
]
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const svgHeight = SIZE + STROKE_WIDTH * 5; // Increased height to prevent overflow
const WelcomePage4 = () => {
  const progress = useSharedValue(0);
  const scale = useSharedValue(1);
  const dispatch = useDispatch();
  const progressRedux = useSelector((state: RootState) => state.progress.progress);
  const startAnimation = () => {
    scale.value = withSequence(withTiming(0.9), withTiming(1));
    if (progress.value > 0) {
      progress.value = withTiming(0, { duration: 2000 });
    } else {
      const randomValue = 0.6 + Math.random() * 0.4;
      const roundedValue = Math.round(randomValue * 10) / 10;
      progress.value = withTiming(roundedValue, { duration: 2000 });
      dispatch(setProgress(roundedValue * 100)); // Update Redux state
    }
  };
  useEffect(() => {
    startAnimation();
  }, []);
  // Create a derived value to display as text
  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}%`;
  });
  const buttonAStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  const allItemsClicked = CertificationData.every((item) => {
    return (progressRedux >= 60 && item.id === "1") ||
      (progressRedux >= 70 && item.id === "2") ||
      (progressRedux >= 80 && item.id === "3") ||
      (progressRedux >= 90 && item.id === "4");
  });
  const renderItem = ({ item }: { item: { id: string; title: string } }) => {
    const shouldTick = (progressRedux >= 60 && item.id === "1") ||
      (progressRedux >= 70 && item.id === "2") ||
      (progressRedux >= 80 && item.id === "3") ||
      (progressRedux >= 90 && item.id === "4");

   

    return (
      <View style={styles.certificationContainer}>
        <Text style={styles.certificationText}>{item.title}</Text>
        <Image
          source={shouldTick ? require('../../../../../assets/images/tick.png') : require('../../../../../assets/images/upload.png')}
          style={styles.uploadIcon}
        />

      </View>
    );
  };
  return (
    <>
      <View style={styles.headerContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.subContainer}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
                <Text style={styles.welcomeTitle}>WELCOME , Name</Text>
                <Image source={{ uri: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250' }}
                  style={styles.profileImage}></Image>
              </View>
              <Text style={styles.subTitle}>Your Personalised Pathway</Text>
              <View style={styles.svgContainer}>
                <Svg
                  width={SCREEN_WIDTH}
                  height={200}
                  viewBox={`0 -${STROKE_WIDTH * 5} ${SIZE} ${svgHeight}`}
                  style={styles.svg}>
                  <G origin={`${CENTER}, ${CENTER + STROKE_WIDTH * 5}`}>
                    {Array.from({ length: LINE_COUNT }).map((_, index) => (
                      <ProgressLine key={index} {...{ progress, index }} />
                    ))}
                  </G>
                </Svg>
                <View style={styles.progressTextContainer}>
                  <ReText style={styles.text} text={progressText} />
                </View>
              </View>
              <FlatList
                data={CertificationData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.viewBoxContainer}>
              </FlatList>
              {
                allItemsClicked && (
                  <TouchableOpacity style={styles.buttonContainer} onPress={() => { }}>
                  <Text style={styles.buttonText}> Done </Text>
                </TouchableOpacity>
                )
              }
              
            </View>
          </Card.Content>
        </Card>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#D0D6D3',
    padding: 16
  },
  subContainer: {
    alignItems: 'center',
    flexDirection: 'column'
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
  viewBoxContainer: {
    width: '100%',

    alignItems: 'center',
    borderWidth: 1,
    flexDirection: 'column',
    marginTop: 30,
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(10),
    borderRadius: 10,
  },
  certificationContainer: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginLeft: moderateScale(30),
    marginTop: verticalScale(20)
  },
  certificationText: {
    textAlign: 'center',
    padding: 5,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black'


  },
  uploadIcon: {
    width: 30,
    height: 30,
    padding: 10,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    marginLeft: moderateScale(20),
    marginRight: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
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

  welcomeTitle: {
    marginTop: verticalScale(20),
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },
  svgContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  progressTextContainer: {
    position: "absolute",
  },
  svg: {
    alignItems: 'center',
    position: "relative",
    justifyContent: 'center',
  },
  text: {
    color: "#4BC626",
    fontSize: 24,
    alignItems: 'center',
    fontWeight: "bold",
  },
  progressContainer: {
    position: "absolute",
    gap: 8,
    marginTop: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 15,
    backgroundColor: "#FF6347",
    borderRadius: 25,
    alignItems: "center",
    width: SCREEN_WIDTH * 0.6,
    position: "absolute",
    bottom: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "400",
  },
});

export default WelcomePage4;