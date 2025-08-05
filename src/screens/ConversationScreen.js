import { React, useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Platform,
  Text,
  SafeAreaView,
  Modal,
  Pressable,
  Image,
  View,
} from "react-native";
import BasicChatbot from "../chatbots/BasicChatbot";
import { supabase } from "../utils/hooks/supabase";
import { GiftedChat } from "react-native-gifted-chat";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import Checkbox from 'expo-checkbox';

const CHATBOT_USER_OBJ = {
  // user you are trying to send a message to
  _id: 1,
  name: "Areli",
  avatar: "",
};
export const CHATBOTS = {
  BasicChatbot: {
    name: "React Native Chatbot",
    imageUrl: "https://loremflickr.com/140/140",
    component: BasicChatbot,
  },
};
export default function ConversationScreen({ route, navigation }) {
  const { user } = useAuthentication();
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [onboardingModal, setOnboardingModal] = useState(true);
  const [surveyModal, setSurveyModal] = useState(false);
  const [isChecked, setChecked] = useState([false, false, false, false, false]);

  useEffect(() => {
    fetchConversations();
    if (user !== null) {
      setLoading(false);
      // console.log("USER", user);
    }
  }, [user]);

  const makeChatbotComponent = (chatbotName) => {
    if (CHATBOTS[chatbotName]) {
      const Chatbot = CHATBOTS[chatbotName].component;
      return <Chatbot />;
    } else {
      return <Text>No Chatbot Found with name '{chatbotName}'</Text>;
    }
  };
  async function fetchConversations() {
    try {
      const { data, error } = await supabase.from("conversations").select("*");
      if (error) {
        console.error("Error fetching conversations:", error.message);
        return;
      }
      if (data && data.length > 0) {
        setConversations(data);
        console.log("DATA", JSON.stringify(data, null, 4));
        setMessages(data[0].messages);
      } else {
        setConversations([]);
        setMessages([]); // or set to a default message if you want
        console.log("No conversations found.");
      }
    } catch (error) {
      console.error("Error fetching conversations:", error.message);
    }
  }
  const handleInserts = (payload) => {
    console.log("Change received!", JSON.stringify(payload, null, 4));
    addNewMessage(payload.new.messages[0]);
  };
  // Listen to inserts
  supabase
    .channel("conversations")
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "conversations" },
      handleInserts
    )
    .subscribe();

  const addNewMessage = (newMessages) => {
    setMessages((previousMessages) => {
      // console.log("PREVIOUS MESSAGES:", previousMessages);
      // console.log("NEW MESSAGE:", newMessages);
      return GiftedChat.append(previousMessages, newMessages);
    });
  };
  const onSend = useCallback((messages = []) => {
    addNewMessage(messages);
  }, []);
  async function postConversations(newMessages) {
    const allMessages = [newMessages[0], ...messages];
    const { data, error } = await supabase
      .from("conversations")
      .update({ messages: allMessages })
      .eq("id", "areli_allison"); // id to access row of table in supabase, is changable
    console.log("POST CONVERSATIONS ERROR: ", error);
  }
  // console.log("MESSAGES", JSON.stringify(messages, null, 4));
  return (
    <SafeAreaView style={styles.container}>
      <Modal
        visible={onboardingModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setOnboardingModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Welcome to the Conversation!</Text>

          {/* Image Placeholder */}
          <View style={styles.imagePlaceholder} />

          {/* Capability Buttons */}
          <Pressable style={styles.capabilityBox}>
            <Text>Capability 1</Text>
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
              setOnboardingModal(false);
              setSurveyModal(true);
            }}
          >
            <Text style={styles.primaryButtonText}>
              Pick out your reminders!
            </Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={() => setOnboardingModal(false)}
          >
            <Text style={styles.secondaryButtonText}>Maybe later</Text>
          </Pressable>
        </SafeAreaView>
      </Modal>
      <SafeAreaView style={styles.container}>
        <Modal
          visible={surveyModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setSurveyModal(false)}
        >
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
                    updated[0] = !isChecked[0]
                    setChecked(updated)
                  }}
                  color={isChecked ? '#9B870D' : undefined}
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
                    updated[1] = !isChecked[1]
                    setChecked(updated)
                  }}
                  color={isChecked ? '#9B870D' : undefined}
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
                    updated[2] = !isChecked[2]
                    setChecked(updated)
                  }}
                  color={isChecked ? '#9B870D' : undefined}
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
                    updated[3] = !isChecked[3]
                    setChecked(updated)
                  }}
                  color={isChecked ? '#9B870D' : undefined}
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
                    updated[4] = !isChecked[4]
                    setChecked(updated)
                  }}
                  color={isChecked ? '#9B870D' : undefined}
                />
                <Text style={styles.reminderButtonText}>Eat a snack</Text>
              </View>
            </Pressable>

            {/* Action Buttons */}
            <Pressable
              style={styles.secondaryButton}
              onPress={() => {
                navigation.navigate("Conversation", {});
                setSurveyModal(false);
              }}
            >
              <Text style={styles.secondaryButtonText}>Send goals to friend!</Text>
            </Pressable>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>

      {/* HABIT PET */}

      <Pressable
        onPress={() => {
          navigation.navigate("HabitPetProfile", {});
          // setSurveyModal(false);
        }}
      >
        <Image
          style={styles.habitPet}
          source={require('../../assets/habit-pet-images/habit_pet.png')}
        />
      </Pressable>

      {messages && (
        // <Text>{JSON.stringify(messages)}</Text>
        <GiftedChat
          messages={messages}
          onSend={(newMessages) => {
            onSend(newMessages);
            postConversations(newMessages);
          }}
          user={{
            // user that is doing the sending
            _id: 2,
            name: "Allison",
          }}
          renderUsernameOnMessage={true}
        />
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
    top: -350,
    right: 12,
    zIndex: 1, //incase it gets covered by the chat
  },
});