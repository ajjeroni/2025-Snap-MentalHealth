import { React, useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Platform,
    Text,
    SafeAreaView,
    Modal,
    Pressable,
    View
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HabitPetProfile() {
    const navigation = useNavigation();
    const [showModal, setShowModal] = useState(true);
    return (
        <SafeAreaView style={styles.container}>
            <Modal
                visible={showModal}
                // transparent={true}
                transparent={false}
                animationType="slide"
                onRequestClose={() => setShowModal(false)}
            >
                <SafeAreaView style={styles.modalContainer}>
                    <Text style={styles.modalHeader}>Welcome to your habit Pet!</Text>

                    {/* habit Pet Placeholder */}
                    <View style={styles.habitPet} />

                    <Text style={styles.habitPetDescription}>Short description. Short description. Short description. Short description. Short description. Short description. Short description.</Text>

                    {/* Capability Buttons */}
                    <Pressable style={styles.capabilityBox}>
                        <Text>Goal</Text>
                    </Pressable>

                    {/* Action Buttons */}
                    <Pressable
                        style={styles.secondaryButton}
                        onPress={() => {
                            navigation.navigate("Conversation", {});
                        }}
                    >
                        <Text style={styles.secondaryButtonText}>Take me back to chat</Text>
                    </Pressable>
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    habitPet:{
        width: 250,
        height: 250,
        backgroundColor: "#ccc",
        borderRadius: 12,
        marginBottom: 24,
    },
    habitPetDescription:{
        fontSize: 14,
        color: "#666",
        textAlign: "center",
        marginBottom: 24,
        marginHorizontal: 20,
    },
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalText: {
        backgroundColor: "#fff",
        padding: 24,
        borderRadius: 12,
        fontSize: 18,
        marginBottom: 16,
        textAlign: "center",
    },
    modalButton: {
        backgroundColor: "#007AFF",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 8,
    },
    modalButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    modalHeader: {
        fontSize: 18,
        fontWeight: "bold",
        backgroundColor: "#fff",
        padding: 16,
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
});