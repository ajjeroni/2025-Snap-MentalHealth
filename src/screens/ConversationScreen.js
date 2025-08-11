import { React, useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Platform,
  Text,
  SafeAreaView,
  Pressable,
  Image,
  View,
} from "react-native";
import BasicChatbot from "../chatbots/BasicChatbot";
import { supabase } from "../utils/hooks/supabase";
import { GiftedChat } from "react-native-gifted-chat";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import Toast from "react-native-toast-message";

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
  Example: {
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

  useEffect(() => {
    fetchConversations();
    if (user !== null) {
      setLoading(false);
      // console.log("USER", user);
    }
    showToast();
  }, [user]);

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Bob",
      text2: "accepted your Habit Pets request",
      position: "top",
    });
  };

  const toastConfig = {
    success: ({ text1, text2, ...rest }) => (
      <Pressable
        onPress={() => {
          Toast.hide();
          navigation.navigate('HabitPetProfile');
        }}
        style={{
          width: "90%",
          backgroundColor: "#F5F5F7",
          borderRadius: 16,
          padding: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          alignSelf: "center",
          marginTop: -38,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
          zIndex: 1,
        }}
      >
        <Image
          source={require("../../assets/snapchat/defaultprofile12.png")}
          style={{ width: 40, height: 40, borderRadius: 20, marginRight: 12 }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: "600", fontSize: 16, color: "#000" }}>
            {text1}
          </Text>
          {text2 ? (
            <Text style={{ fontSize: 14, color: "#555" }}>{text2}</Text>
          ) : null}
        </View>
        <Image
          source={require("../../assets/habit-pet-images/habit_pet.png")}
          style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 12 }}
        />
      </Pressable>
    ),
  };

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

      <Toast config={toastConfig} position="top" topOffset={50} />

      {/* HABIT PET */}
      <Pressable
        style={styles.habitPet}
        onPress={() => {
          navigation.navigate("HabitPetProfile", {});
        }}
      >
        <Image
          style={styles.habitPet}
          source={require('../../assets/habit-pet-images/habit_pet.png')}
        />
      </Pressable>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  habitPet: {
    position: 'absolute',
    width: 100,
    height: 100,
    top: 12,
    right: 12,
    zIndex: 999, //incase it gets covered by the chat
  },
});