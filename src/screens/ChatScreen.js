import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
// import Ionicons from "react-native-vector-icons/Ionicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { supabase } from "../utils/hooks/supabase"; // Import Supabase client

import Header from "../components/Header";
import { CHATBOTS } from "./ConversationScreen";
const bobIcon = require("../../assets/habit-pet-images/image 7.png");

export default function ChatScreen({ navigation }) {
  const [chats, setChats] = useState([]);
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();

  function getChatbots() {
    let chatbotsTemp = [];
    for (const botId in CHATBOTS) {
      chatbotsTemp.push({ isChatbot: true, chatId: botId });
    }

    setChats((otherChats) => [...otherChats, ...chatbotsTemp]);
  }

  // async function getUserChats() {
  //   // Fetch user chats from Supabase
  //   const { data: userChats, error } = await supabase
  //     .from('conversations')
  //     .select('id')
  //     .select('messages');

  //   if (error) {
  //     console.error("Error fetching user chats:", error);
  //     return;
  //   }

  //   // Add user chats to array
  //   let userChatsTemp = [];
  //   if (userChats) {
  //     userChats.forEach((userChat) => {
  //       userChatsTemp.push({ isChatbot: false, chatId: userChat.id });
  //     });
  //   }

  //   setChats((otherChats) => [...otherChats, ...userChatsTemp]);
  // }

  useEffect(() => {
    if (chats.length < 1) {
      getChatbots();
      // getUserChats();
    }
  }, [chats.length]);

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          marginBottom: tabBarHeight,
        },
      ]}
    >
      <Header title="Chat" />
      <View>
        {chats?.map((chat) => {
          return (
            <TouchableOpacity
              style={styles.userButton}
              onPress={() => {
                navigation.navigate("HabitPetOnboarding", {
                  isChatbot: chat.isChatbot,
                  chatId: chat.chatId,
                });
              }}
              key={chat.chatId}
            >
              <View style={styles.userIconCircle}>
                <Image
                  source={bobIcon}
                  style={styles.userIcon}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.userName}> {chat.chatId} </Text>
              <Ionicons
                style={styles.userCamera}
                name="camera-outline"
                size={24}
                color="lightgrey"
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  userButton: {
    padding: 25,
    display: "flex",
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
  },
  userIconCircle: {
    position: "absolute",
    left: 5,
    top: 5,
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: .75,
    borderColor: 'grey', 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  userIcon: {
    width: 40,
    height: 37,
  },
  userName: {
    position: "absolute",
    left: 50,
    top: 14,
    fontSize: 18,
  },
  userCamera: {
    position: "absolute",
    right: 15,
    top: 10,
  },
});
