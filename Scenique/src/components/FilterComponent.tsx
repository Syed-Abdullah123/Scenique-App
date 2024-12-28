import React, { useState, useEffect } from "react";
import { View, Text, Modal, StyleSheet, Pressable } from "react-native";
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
      textStyle={[
        styles.chipText,
        selectedOrientation === option && styles.selectedChipText,
      ]}
    >
      <Ionicons
        name={
          option === "portrait"
            ? "phone-portrait-outline"
            : option === "landscape"
            ? "phone-landscape-outline"
            : "albums-outline"
        }
        size={16}
        color={selectedOrientation === option ? "#fff" : "#4CAF50"}
        style={styles.chipIcon}
      />
      {option.charAt(0).toUpperCase() + option.slice(1)}
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
          <Text style={styles.modalTitle}>Filter Options</Text>

          {/* Orientation Options */}
          <View style={styles.chipsContainer}>
            {["all", "portrait", "landscape"].map((option) => (
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
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </Chip>
            ))}
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <Pressable style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>Apply</Text>
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
    backgroundColor: "white",
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
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    padding: 5,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
    marginBottom: 15,
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: "#f5f5f5",
    borderColor: "#4CAF50",
  },
  selectedChip: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  chipText: {
    color: "#4CAF50",
  },
  selectedChipText: {
    color: "white",
  },
  chipIcon: {
    marginRight: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: "auto",
    paddingTop: 20,
  },
  cancelButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
  applyButton: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#4CAF50",
  },
  applyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Filter;
