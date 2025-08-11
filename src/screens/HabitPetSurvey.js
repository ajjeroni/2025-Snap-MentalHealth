// HabitPetSurvey: Screen allowing user to select a shared goal.
// Actions:
// Choose an option ("Mindfulness") lets user choose a goal to focus on
// Primary button ("Send your goals to Co-Parent") navigates/replaces to Conversation;
// Secondary ("Back") navigates/replaces to HabitPetOnboarding.


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
import { LinearGradient } from 'expo-linear-gradient';
import { Svg, Defs, RadialGradient, Stop, Circle } from 'react-native-svg';

export default function HabitPetSurvey() {
  const navigation = useNavigation();
  const [selected, setSelected] = useState([]);

  //options array
  const options = [
    {
      icon: require('../../assets/habit-pet-images/Bullseye.png'),
      subtitle: "Mindfulness",
      text: "Practice focusing on the present moment.",
    },
    {
      icon: require('../../assets/habit-pet-images/Paw Prints.png'),
      subtitle: "Staying Active",
      text: "Physical activity in one's daily routine.",
    },
    {
      icon: require('../../assets/habit-pet-images/Busts in Silhouette.png'),
      subtitle: "Connection",
      text: "Focus on connecting with people.",
    },
    {
      icon: require('../../assets/habit-pet-images/Writing Hand.png'),
      subtitle: "Journaling",
      text: "Write your thoughts, feelings, and experiences.",
    },
    {
      icon: require('../../assets/habit-pet-images/Cup with Straw.png'),
      subtitle: "Hydration",
      text: "Focus on your water intake.",
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      {/* yellow-orange gradient background */}
      <LinearGradient
        colors={['#FFFC78', '#FFC69F']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView style={styles.container}>

        <View>
          {/* White halo effect behind "Pick a Shared Goal" header */}
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

        </View>
        <Text style={styles.header}>Pick a Shared Goal</Text>
        <Text style={styles.subHeader}>Choose one habit to work on together!</Text>

        {/* Render options */}
        <View style={styles.optionContainer}>
          {options.map((option, index) => (
            <Pressable
              key={index}
              onPress={() => {
                const newSelected = Array(options.length).fill(false);
                newSelected[index] = true;
                setSelected(newSelected);
              }}
            >
              <View style={[
                styles.containerBox,
                selected[index] && styles.selectedBox
              ]}>
                <View style={styles.infoContainer}>
                  <Image style={styles.icon} source={option.icon} />
                  <View style={styles.textContainer}>
                    <Text style={styles.infoSubtitle}>{option.subtitle}</Text>
                    <Text style={styles.infoText}>{option.text}</Text>
                  </View>
                  {selected[index] && (
                    <View style={styles.selectedBadge}>
                      <Text style={styles.selectedBadgeText}>Selected</Text>
                    </View>
                  )}
                </View>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Action Buttons !*/}
        <View style={styles.actionButtons}>
          <Pressable
            style={styles.primaryButton}
            onPress={() => {
              navigation.replace("HabitPetSurvey", {});
            }}
          >
            <Text style={styles.primaryButtonText}>
              Send your goals to Co-Parent!
            </Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={() => {
              navigation.replace("HabitPetOnboarding", {});
            }}
          >
            <Text style={styles.secondaryButtonText}>Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: "column",
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    justifyContent: "flex-start",
  },
  header: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 5,
    marginTop: 50,
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
  actionButtons: {
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#0FADFF",
    width: "90%",
    paddingVertical: 12,
    paddingHorizontal: 60,
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
    paddingHorizontal: 155,
    borderRadius: 24,
    width: "90%",
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
    top: -120,
  },
  containerBox: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 25,
    alignItems: "stretch",
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedBox: {
    borderColor: "#0FADFF",
    borderWidth: 2,
  },
  infoContainer: {
    flexDirection: "row",
    display: "flex",
    margin: 12,
    alignItems: "center",
    width: "100%",
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
    flexShrink: 1,
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
  selectedBadge: {
    position: "absolute",
    top: -25,
    right: 35,
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
  selectedBadgeText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
});