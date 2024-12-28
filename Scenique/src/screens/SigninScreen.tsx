import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ButtonComponent from "../components/ButtonComponent";

import { FIREBASE_AUTH } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../context/AuthenticationContext";

const Signin = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSignin = async () => {
    if (!email.trim() || !email.includes("@")) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return;
    }
    if (!password.trim()) {
      Alert.alert("Validation Error", "Password is required.");
      return;
    }

    setLoading(true);
    try {
      // Sign in user
      const userCredential = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );

      const user = userCredential.user;

      // Check if the email is verified
      if (!user.emailVerified) {
        Alert.alert(
          "Email Not Verified",
          "Please verify your email address before logging in."
        );
        setLoading(false);
        return;
      }

      // Save token to context and AsyncStorage
      await signIn(user.uid);
    } catch (error: any) {
      let errorMessage = "Something went wrong. Please try again.";
      if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password. Please try again.";
      }
      Alert.alert("Signin Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
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
            <Ionicons name="mail-outline" size={20} color="#363B4080" />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#363B4080"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#363B4080" />
            <TextInput
              style={styles.input}
              placeholder="Enter you password"
              placeholderTextColor="#363B4080"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
          </View>
        </View>

        {/* Button section */}
        <View style={styles.buttonContainer}>
          <ButtonComponent
            title={loading ? <ActivityIndicator color="#fff" /> : "Signin"}
            icon={loading ? null : "arrow-forward"}
            onPress={handleSignin}
            disabled={loading}
          />
        </View>
        <TouchableOpacity
          onPress={() => console.log("Forgot Password Pressed")}
          style={styles.forgotText}
        >
          <Text style={styles.signinText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    paddingVertical: 5,
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
  forgotText: {
    width: 120,
    alignSelf: "flex-end",
  },
  signinText: {
    fontFamily: "CG_Medium",
    fontSize: 14,
    color: "#32BAE8",
    marginTop: 10,
    textAlign: "right",
  },
});
