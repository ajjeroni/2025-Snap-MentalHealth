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

export default function HabitPetOnboarding() {
  const navigation = useNavigation();
  // const [showModal, setShowModal] = useState(true);
  //   const [surveyModal, setSurveyModal] = useState(false);
  //   const [isChecked, setChecked] = useState([false, false, false, false, false]);

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.container}>
        {/* Image Placeholder */}
        <View>
          <Image
            style={styles.onboardingBitmoji}
            source={require('../../assets/habit-pet-images/onboardingBitmoji.png')}
          />
        </View>
        <Text style={styles.header}>Say Hello to Habit Pets</Text>
        <Text style={styles.subHeader}>Unlock a shared pet with your bestie!</Text>

        {/* Capability Buttons */}
        <Pressable style={styles.capabilityBox}>
          <View style={styles.onboardingInfoContainer}>
            <Image
              style={styles.onboardingIcon}
              source={require('../../assets/habit-pet-images/habit_pet.png')}
            />
            <Text>Receive Reminders</Text>
            <Text>Raise a pet by checking in daily activites.</Text>
          </View>
        </Pressable>
        <Pressable style={styles.capabilityBox}>
          <Text>Capability 2</Text>
        </Pressable>
        <Pressable style={styles.capabilityBox}>
          <Text>Capability 3</Text>
        </Pressable>

        {/* Action Buttons */}
        <Pressable
          style={styles.primaryButton}
          onPress={() => {
            navigation.navigate("HabitPetSurvey", {});
          }}
        >
          <Text style={styles.primaryButtonText}>
            Pick out your reminders!
          </Text>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={() => {
            navigation.navigate("Conversation", {});
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
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    fontSize: 18,
    marginBottom: 16,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 14,
    fontWeight: "450",
    color: "#666",
    borderRadius: 12,
    marginBottom: 16,
    textAlign: "center",
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: "#ccc",
    borderRadius: 12,
    marginBottom: 24,
  },
  capabilityBox: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  primaryButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginTop: 24,
  },

  primaryButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  secondaryButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  secondaryButtonText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 16,
  },
  onboardingIcon: {
    width: 65,
    height: 65,
    // marginBottom: 16,
  },
  onboardingInfoContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 16,
  },

  checkBoxContainer: {
    flexDirection: 'row',
  },
  checkbox: {
    marginRight: 8,
  },
  reminderOptionsContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  reminderButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  reminderButton: {
    backgroundColor: "#10adff",
    padding: 16,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  habitPet: {
    position: 'absolute',
    width: 100,
    height: 100,
    top: 12,
    right: 12,
    zIndex: 999, //incase it gets covered by the chat
  },
  onboardingBitmoji: {
    width: 175,
    height: 175,
    marginBottom: 24,
  }
});