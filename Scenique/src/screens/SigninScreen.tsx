import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ButtonComponent from "../components/ButtonComponent";

const Signin = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/icons/scenique-logo.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.midContainer}>
        {/* Title text section */}
        <Text style={styles.title}>Welcome Back,</Text>
        <Text style={styles.title1}>Please Sign in to Continue ...</Text>

        {/* Textinput containers section */}
        <View style={styles.inputs}>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#363B40" />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#363B40"
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#363B40" />
            <TextInput
              style={styles.input}
              placeholder="Enter you password"
              placeholderTextColor="#363B40"
            />
          </View>
        </View>

        {/* Button section */}
        <View style={styles.buttonContainer}>
          <ButtonComponent
            title="Sign In"
            icon="arrow-forward"
            onPress={() => navigation.navigate("Home")}
          />
          <TouchableOpacity
            onPress={() => console.log("Forgot Password Pressed")}
          >
            <Text style={styles.signinText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#363B40",
  },
  header: {
    alignItems: "center",
    height: 200,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderBottomLeftRadius: 60,
    borderBottomWidth: 2,
    borderBottomColor: "#32BAE8",
  },
  logo: {
    width: 130,
    height: 130,
    marginTop: 50,
    resizeMode: "contain",
    alignSelf: "center",
  },
  midContainer: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 15,
  },
  title: {
    fontFamily: "Lexend_Bold",
    fontSize: 24,
    color: "#fff",
  },
  title1: {
    fontFamily: "Lexend_Bold",
    fontSize: 14,
    color: "#c0c0c0",
    marginBottom: 20,
  },
  inputs: {
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 3,
    gap: 10,
  },
  input: {
    flex: 1,
    fontFamily: "CG_Regular",
    color: "#363B40",
  },
  buttonContainer: {
    marginTop: 20,
  },
  signinText: {
    fontFamily: "CG_Medium",
    fontSize: 14,
    color: "#32BAE8",
    marginTop: 10,
    textAlign: "right",
  },
});
