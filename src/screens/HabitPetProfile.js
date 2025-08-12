// HabitPetProfile: Screen that displays user's habit pet info,
// including:Current Quest, Co-Parent, & Pet Missions
// Edit Button on Current Quest: redirects you to HabitPetSurvey
// Pet Missions: connected to Supabase, click when you've completed a pet mission


import { React, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../utils/hooks/supabase";

const petBanner = require('../../assets/habit-pet-images/Group 93.png');
const trophieIcon = require('../../assets/habit-pet-images/Trophy.png')
const snapPlusIcon = require('../../assets/habit-pet-images/Image.png')
const bobIcon = require('../../assets/habit-pet-images/image 7.png')
const editBannerButton = require('../../assets/habit-pet-images/Edit Button.png')

export default function HabitPetProfile() {
  const navigation = useNavigation();
  const [selected, setSelected] = useState([]);
  const [petMissions, setPetMissions] = useState([]);

  // gameplan:
  // fetch id, missions/tasks, & completion status from supabase
  // update the mission completion in supabase (withint the on press) in map

  useEffect(() => {
    async function fetchPetMissions() {
      try {
        const { data, error } = await supabase
          .from("petMissions")
          .select("id, task, is_complete");
        if (error) {
          console.error("Error fetching pet missions:", error.message);
          return;
        }
        if (data) {
          console.log("Fetched pet missions:", data);
          setPetMissions(data);
          setSelected(data.map(m => m.is_complete));
        }
      } catch (error) {
        console.error("Error fetching pet missions:", error.message);
      }
    }
    fetchPetMissions();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <Image
            source={petBanner}
            style={styles.petImage}
            resizeMode="cover"
          />
          <Pressable style={styles.heroBannerBtn}>
            <Image
              source={editBannerButton}
              style={{ width: 32, height: 32 }}
              resizeMode="contain"
            />
          </Pressable>
        </View>
        <View style={styles.chipsRow}>
          <Chip>🐾 Lv 3</Chip>
          <Chip>🌟 240/500 XP</Chip>
          <Chip>🎂 Aug 5</Chip>
          <Chip>♌ Leo</Chip>
        </View>

        <SectionHeader title="Our Habit Pet" />
        <View style={styles.card}>
          <Image
            source={trophieIcon}
            style={{ width: 34, height: 34 }}
            resizeMode="contain"
          />
          <View style={styles.cardLeft}>
            <Text style={styles.cardTitle}>Current Quest</Text>
            <Text style={styles.cardSub}>Stay Active!</Text>
          </View>
          <View style={styles.cardRight}>
            <Pressable style={styles.smallBtn}
            onPress={() => navigation.navigate("HabitPetSurvey")}>
              <Text style={styles.smallBtnText}>Edit</Text>
            </Pressable>
            <Text style={styles.menuDot}>⋯</Text>
          </View>
        </View>

        <View style={[styles.card, styles.goldOutlineCard]}>
          <View style={styles.snapIconBubble}>
            <Image
              source={snapPlusIcon}
              style={{ width: 34, height: 34 }}
              resizeMode="contain"
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Snapchat+</Text>
            <Text style={styles.cardSub}>Custom Bitmoji Pets and more!</Text>
          </View>
          <Pressable style={styles.smallBtn}>
            <Text style={styles.smallBtnText}>More info</Text>
          </Pressable>
          <Text style={styles.chevron}>›</Text>
        </View>

        <SectionHeader title="Co-parent" />
        <Pressable style={styles.rowItem}>
          <Image
            source={bobIcon}
            style={styles.avatar}
          />
          <Text style={styles.rowText}>Bob Mosley</Text>
          <Text style={styles.chevron}>›</Text>
        </Pressable>

        <SectionHeader title="Pet Missions" />

        {petMissions.map((petMission, index) => (
          <Pressable
            key={petMission.id}
            style={[
              styles.missionItem,
              selected[index] && styles.missionCompleted // highlight if selected
            ]}
            onPress={async () => {
              const newSelected = [...selected];
              newSelected[index] = !newSelected[index]; //toggle selection
              setSelected(newSelected);

              // Update mission completion in Supabase
              const missionId = petMission.id;
              const { error } = await supabase
                .from("petMissions")
                .update({ is_complete: newSelected[index] }) //updates the is_complete column
                .eq("id", missionId);
              if (error) {
                console.error("Error updating mission:", error.message);
              }
            }}
          >
            <Text style={styles.missionText}>{petMission.task}</Text>
            {selected[index] && (
              <View style={styles.smallBtn}>
                <Text style={styles.smallBtnText}>Completed</Text>
              </View>
            )}
          </Pressable>
        ))}

        <View style={{ height: 28 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const Chip = ({ children }) => (
  <View style={styles.chip}>
    <Text style={styles.chipText}>{children}</Text>
  </View>
);

const SectionHeader = ({ title }) => (
  <Text style={styles.sectionHeader}>{title}</Text>
);

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F8EDEA",
  },
  scroll: {
    padding: 16,
  },

  heroCard: {
    borderRadius: 16,
    height: 230,
    // width: 420,
    width: '100%',
    padding: 12,
    justifyContent: "flex",
    overflow: "hidden",
    // shadowColor: "#000",
    // shadowOpacity: 0.08,
    // shadowOffset: { width: 0, height: 6 },
    // shadowRadius: 12,
    elevation: 2,
  },
  petImage: {
    width: "100%",
    height: "100%",
    borderRadius: 32,
    alignSelf: "center",
  },
  fab: {
    position: "absolute",
    top: 12,
    backgroundColor: "rgba(255,255,255,0.9)",
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  fabIcon: { fontSize: 20 },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  chip: {
    backgroundColor: "transparent",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: .25,
    borderColor: "grey"
  },
  chipText: { fontSize: 12, fontWeight: "600", color: "#5B5565" },

  sectionHeader: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "700",
    color: "#2F2A35",
  },
  sectionMiniHeader: {
    marginTop: 18,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "700",
    color: "#5B5565",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 1,
  },
  goldOutlineCard: {
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  cardLeft: { flex: 1 },
  cardRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardTitle: { fontSize: 14, fontWeight: "600", color: "#2F2A35" },
  cardSub: { fontSize: 12, color: "#7B7484", marginTop: 2 },

  smallBtn: {
    backgroundColor: "#4BB4FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  smallBtnText: { color: "white", fontWeight: "700", fontSize: 12 },
  menuDot: { fontSize: 22, color: "#928A9B", marginLeft: 2 },

  infoBtn: {
    backgroundColor: "#F1F6FF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  infoBtnText: { color: "#2C6BE4", fontWeight: "700", fontSize: 12 },
  snapIconBubble: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FFF3C4",
    alignItems: "center",
    justifyContent: "center",
  },

  rowItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 1,
  },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#eee" },
  rowText: { flex: 1, fontSize: 14, fontWeight: "600", color: "#2F2A35" },
  chevron: { fontSize: 22, color: "#928A9B" },

  missionItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  missionCompleted: {
    backgroundColor: "#ffe65cff",
    borderWidth: 1,
  },
  missionText: { flex: 1, fontSize: 12, color: "#2F2A35", fontWeight: "600" },
  completedPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: "#4BB4FF",
  },
  completedPillText: {
    fontSize: 11,
    fontWeight: "800",
    color: "white",
    textTransform: "capitalize",
  },
  heroBannerBtn: {
    position: "absolute",
    top: 20,
    right: 20,
    // backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 16,
    padding: 4,
    zIndex: 2,
    elevation: 3,
  },
});
