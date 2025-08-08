import React, { useState } from "react";
import { SafeAreaView, Text, Pressable, View, StyleSheet } from "react-native";
import Checkbox from 'expo-checkbox';

export default function HabitPetSurvey({ navigation }) {
  const [isChecked, setChecked] = useState([false, false, false, false, false]);

  return (
    <SafeAreaView style={styles.reminderOptionsContainer}>
      <Text style={styles.modalHeader}>What reminders would you like?</Text>

      {/* Capability Buttons */}
      <Pressable style={styles.reminderButton}>
        <View style={styles.checkBoxContainer}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked[0]}
            onValueChange={() => {
              const updated = [...isChecked];
              updated[0] = !isChecked[0];
              setChecked(updated);
            }}
            color={isChecked[0] ? '#9B870D' : undefined}
          />
          <Text style={styles.reminderButtonText}>Drink more water</Text>
        </View>
      </Pressable>
      <Pressable style={styles.reminderButton}>
        <View style={styles.checkBoxContainer}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked[1]}
            onValueChange={() => {
              const updated = [...isChecked];
              updated[1] = !isChecked[1];
              setChecked(updated);
            }}
            color={isChecked[1] ? '#9B870D' : undefined}
          />
          <Text style={styles.reminderButtonText}>Take a walk!</Text>
        </View>
      </Pressable>
      <Pressable style={styles.reminderButton}>
        <View style={styles.checkBoxContainer}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked[2]}
            onValueChange={() => {
              const updated = [...isChecked];
              updated[2] = !isChecked[2];
              setChecked(updated);
            }}
            color={isChecked[2] ? '#9B870D' : undefined}
          />
          <Text style={styles.reminderButtonText}>Sleep soon!</Text>
        </View>
      </Pressable>
      <Pressable style={styles.reminderButton}>
        <View style={styles.checkBoxContainer}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked[3]}
            onValueChange={() => {
              const updated = [...isChecked];
              updated[3] = !isChecked[3];
              setChecked(updated);
            }}
            color={isChecked[3] ? '#9B870D' : undefined}
          />
          <Text style={styles.reminderButtonText}>Take a break</Text>
        </View>
      </Pressable>
      <Pressable style={styles.reminderButton}>
        <View style={styles.checkBoxContainer}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked[4]}
            onValueChange={() => {
              const updated = [...isChecked];
              updated[4] = !isChecked[4];
              setChecked(updated);
            }}
            color={isChecked[4] ? '#9B870D' : undefined}
          />
          <Text style={styles.reminderButtonText}>Eat a snack</Text>
        </View>
      </Pressable>

      {/* Action Button */}
      <Pressable
        style={styles.secondaryButton}
        onPress={() => {
          navigation.navigate("Conversation", {});
        }}
      >
        <Text style={styles.secondaryButtonText}>Send goals to friend!</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  reminderOptionsContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeader: {
    fontSize: 22,
    fontWeight: "bold",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    textAlign: "center",
    color: "#222",
  },
  reminderButton: {
    backgroundColor: "#10adff",
    padding: 16,
    borderRadius: 12,
    width: "80%",
    alignItems: "flex-start", // better alignment for checkbox + text
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 12,
  },
  reminderButtonText: {
    color: "#222", // dark text for contrast
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
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 16,
  },
});