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
const bubbleIcon = require("../../assets/habit-pet-images/support16.1.png")

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
              key={chat.chatId}
              onPress={() => {
                navigation.navigate("HabitPetOnboarding", {
                  isChatbot: chat.isChatbot,
                  chatId: chat.chatId,
                });
              }}
              style={styles.row}
              activeOpacity={0.7}
            >
              <View style={styles.avatarRing}>
                <Image
                  source={bobIcon}
                  style={styles.avatar}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.textCol}>
                <Text numberOfLines={1} style={styles.name}>
                  Bob Mosley
                </Text>
                <View style={styles.metaRow}>
                  {/* <Ionicons
                    name="chatbubble-outline"
                    size={14}
                    style={styles.metaIcon}
                  /> */}
                  <Image
                    source={bubbleIcon}
                    resizeMode="contain"
                    style={styles.metaIcon}
                  />
                  <Text numberOfLines={1} style={styles.metaText}>
                    Received · 2h
                  </Text>
                </View>
              </View>

              <Ionicons name="camera-outline" size={22} style={styles.camera} />
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
    borderWidth: 0.75,
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
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
  listContent: { paddingBottom: 16 },

  separator: { height: 1, backgroundColor: "#E6E6E6", marginLeft: 72 },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 12,
    backgroundColor: "#FFF",
  },

  avatarRing: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 0.75,
    borderColor: "#BFBFBF",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  avatar: { width: 42, height: 40 },

  textCol: { flex: 1, minWidth: 0 },

  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },

  metaRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  metaIcon: { marginRight: 4 ,width: 15, height: 15},
  metaText: { fontSize: 13, color: "#8E8E93" },

  camera: { color: "#C7C7CC" },
});
