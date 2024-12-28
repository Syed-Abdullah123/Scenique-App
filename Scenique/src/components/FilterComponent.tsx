import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Chip } from "react-native-paper";

const Filter = ({ visible, onClose, onApply, initialValues }) => {
  const [selectedOrientation, setSelectedOrientation] = useState("all");

  // Update local state when initialValues change
  useEffect(() => {
    setSelectedOrientation(initialValues?.orientation || "all");
  }, [initialValues]);

  const handleApply = () => {
    onApply({ orientation: selectedOrientation });
  };

  const OrientationOption = ({ option }) => (
    <Chip
      key={option}
      mode="outlined"
      selected={selectedOrientation === option}
      onPress={() => setSelectedOrientation(option)}
      style={[
        styles.chip,
        selectedOrientation === option && styles.selectedChip,
      ]}
    >
      <View style={styles.chipContent}>
        <Ionicons
          name={
            option === "portrait"
              ? "phone-portrait-outline"
              : option === "landscape"
              ? "phone-landscape-outline"
              : "albums-outline"
          }
          size={16}
          color={selectedOrientation === option ? "#fff" : "#aaa"}
          style={styles.chipIcon}
        />
        <Text
          style={[
            styles.chipText,
            selectedOrientation === option && styles.selectedChipText,
          ]}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </Text>
      </View>
    </Chip>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter Options</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Orientation</Text>
            {/* Chips container */}
            {["all", "portrait", "landscape"].map((option) => (
              <OrientationOption key={option} option={option} />
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <Pressable style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end", // Makes modal slide up from bottom
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#363B40",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: "50%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
  },
  modalTitle: {
    fontFamily: "Lexend_Bold",
    fontSize: 22,
    color: "#fff",
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontFamily: "Lexend_Bold",
    fontSize: 18,
    color: "#fff",
    marginBottom: 15,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: "#4A5057",
    borderColor: "#4A5057",
    alignItems: "center",
    width: 150,
  },
  chipContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectedChip: {
    backgroundColor: "#32BAE8",
    borderColor: "#32BAE8",
  },
  chipText: {
    fontFamily: "Lexend_Regular",
    color: "#aaa",
  },
  selectedChipText: {
    fontFamily: "Lexend_Regular",
    color: "white",
  },
  chipIcon: {
    paddingRight: 5,
    alignSelf: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: "auto",
    gap: 10,
  },
  cancelButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#4A5057",
    height: 40,
    width: "25%",
  },
  cancelButtonText: {
    fontFamily: "Lexend_Regular",
    color: "#fff",
    fontSize: 14,
  },
  applyButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#32BAE8",
    height: 40,
    width: "72%",
  },
  applyButtonText: {
    fontFamily: "Lexend_Regular",
    color: "white",
    fontSize: 14,
  },
});

export default Filter;
