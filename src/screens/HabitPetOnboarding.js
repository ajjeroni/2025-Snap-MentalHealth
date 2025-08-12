// HabitPetOnboarding: Onboarding screen introducing Habit Pets
// Actions:
// Primary button ("Pick out your reminders!") navigates/replaces to HabitPetSurvey;
// Secondary ("Maybe later") navigates/replaces to Conversation.


import { React, useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Platform,
  Text,
  SafeAreaView,
  Image,
  Pressable,
  View
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { Svg, Defs, RadialGradient, Stop, Circle } from 'react-native-svg';

export default function HabitPetOnboarding() {
  const navigation = useNavigation();
  // const [showModal, setShowModal] = useState(true);
  //   const [surveyModal, setSurveyModal] = useState(false);
  //   const [isChecked, setChecked] = useState([false, false, false, false, false]);

  return (
    // Info Container
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FFFC78', '#FFC69F']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView style={styles.container}>
        <View>
          <Svg style={styles.halo} pointerEvents="none" width={1800} height={1800}>
            <Defs>
              <RadialGradient id="haloGrad" cx="50%" cy="50%" r="50%">
                <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
                <Stop offset="65%" stopColor="#FFFFFF" stopOpacity="0.3" />
                <Stop offset="100%" stopColor="#FFFC78" stopOpacity="0" />
              </RadialGradient>
            </Defs>
            <Circle cx="200" cy="200" r="200" fill="url(#haloGrad)" />
          </Svg>

          <Image
            style={styles.onboardingBitmoji}
            source={require('../../assets/habit-pet-images/onboardingBitmoji.png')}
          />
        </View>
        <Text style={styles.header}>Say Hello to Habit Pets</Text>
        <Text style={styles.subHeader}>Unlock a shared pet with your bestie!</Text>

        <View style={styles.containerBox}>
          <View style={styles.onboardingInfoContainer}>
            <Image
              style={styles.onboardingIcon}
              source={require('../../assets/habit-pet-images/Spiral Notepad.png')}
            />
            <View style={styles.onboardingTextContainer}>
              <Text style={styles.infoSubtitle}>Receive Reminders</Text>
              <Text style={styles.infoText}>Raise a pet by checking in daily activites.</Text>
            </View>
          </View>
          <View style={styles.onboardingInfoContainer}>
            <Image
              style={styles.onboardingIcon}
              source={require('../../assets/habit-pet-images/Bullseye.png')}
            />
            <View style={styles.onboardingTextContainer}>
              <Text style={styles.infoSubtitle}>Set a Shared Goal</Text>
              <Text style={styles.infoText}>Pick one habit to foster your friend.</Text>
            </View>
          </View>
          <View style={styles.onboardingInfoContainer}>
            <Image
              style={styles.onboardingIcon}
              source={require('../../assets/habit-pet-images/Paw Prints.png')}
            />
            <View style={styles.onboardingTextContainer}>
              <Text style={styles.infoSubtitle}>Co-Pet with a Friend</Text>
              <Text style={styles.infoText}>Your pet lives in your Chat & Profile, evolving with you.</Text>
            </View>
          </View>
        </View>
{/* 
        <LinearGradient
          colors={['#FFFD76', '#c48100']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientBorder}
        > */}
          <View style={styles.SnapchatPlusContainer}>

            <View style={styles.onboardingInfoContainer}>
              <Image
                style={styles.onboardingIcon}
                source={require('../../assets/habit-pet-images/Snapchat+.png')}
              />
              <View style={styles.onboardingTextContainer}>
                <Text style={styles.infoSubtitle}>Snapchat+</Text>
                <Text style={styles.infoText}>Custom Bitmoji Pets, interactions, & more!</Text>
              </View>
              <View style={styles.exclusiveBadge}>
                <Text style={styles.exclusiveBadgeText}>Exclusive 🔒</Text>
              </View>
              <View>
                <Icon name="chevron-forward" size={25} color="#646567" />
              </View>
            </View>
          </View>
        {/* </LinearGradient> */}

        {/* Action Buttons */}
        <Pressable
          style={styles.primaryButton}
          onPress={() => {
            navigation.replace("HabitPetSurvey", {});
          }}
        >
          <Text style={styles.primaryButtonText}>
            Pick out your reminders!
          </Text>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={() => {
            navigation.replace("Conversation", {});
          }}
        >
          <Text style={styles.secondaryButtonText}>Maybe later</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: -10,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 14,
    fontWeight: "450",
    color: "#646567",
    borderRadius: 12,
    marginBottom: 10,
    textAlign: "center",
  },
  primaryButton: {
    backgroundColor: "#0FADFF",
    paddingVertical: 12,
    paddingHorizontal: 85,
    borderRadius: 24,
    marginTop: 15,
    shadowColor: "#646567",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: "#FFF1ED",
    paddingVertical: 12,
    paddingHorizontal: 130,
    borderRadius: 24,
    marginTop: 12,
    shadowColor: "#646567",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2,
  },
  secondaryButtonText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 16,
    paddingHorizontal: 4,
  },
  halo: {
    position: 'absolute',
    top: '-40%',
    left: '-28%',
  },
  onboardingBitmoji: {
    width: 175,
    height: 175,
    marginBottom: 24,
  },
  containerBox: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 25,
    width: "68%",
    alignItems: "stretch",
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  onboardingInfoContainer: {
    flexDirection: "row",
    display: "flex",
    margin: 12,
    alignItems: "center",
    width: "100%",
  },
  onboardingIcon: {
    width: 50,
    height: 50,
    marginRight: 14,
  },
  infoSubtitle: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    color: "#646567",
  },
  gradientBorder: {
    borderRadius: 25,
    paddingHorizontal: 0
  },
  SnapchatPlusContainer: {
    backgroundColor: "#fff",
    margin: 5,
    padding: 5,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#c48100",
    width: "68%",
    alignItems: "stretch",
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  exclusiveBadge: {
    position: "absolute",
    top: -25,
    right: 20,
    backgroundColor: "#0FADFF",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  exclusiveBadgeText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
});