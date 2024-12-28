import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ButtonComponent from "../components/ButtonComponent";

import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useAuth } from "../context/AuthenticationContext";

const Signup = ({ navigation }: any) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  // Function to handle signup
  const handleSignup = async () => {
    // Validate inputs
    if (!username.trim()) {
      Alert.alert("Validation Error", "Username is required.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      Alert.alert(
        "Validation Error",
        "Password must be at least 6 characters long."
      );
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Validation Error", "Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      // Create user with Firebase
      const userCredential = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );

      // Send email verification
      const user = userCredential.user;
      await sendEmailVerification(user);

      // Optional: Save additional user data to Firestore
      // Add user to Firestore database with username
      await setDoc(doc(FIREBASE_DB, "users", user.uid), {
        username: username.trim(),
        email: email.trim(),
        createdAt: new Date().toISOString(),
      });

      Alert.alert(
        "Signup Successful",
        "A verification email has been sent to your email address. Please verify your email to log in."
      );

      // Save token to context and AsyncStorage
      await signIn(user.uid);
    } catch (error: any) {
      // Handle common Firebase auth errors
      let errorMessage = "Something went wrong. Please try again.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "The email address is invalid.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "The password is too weak.";
      }
      Alert.alert("Signup Error", errorMessage);
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
        <Text style={styles.title}>Welcome,</Text>
        <Text style={styles.title1}>Please Sign Up to Continue ...</Text>

        {/* Textinput containers section */}
        <View style={styles.inputs}>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#363B4080" />
            <TextInput
              style={styles.input}
              placeholder="Enter username"
              placeholderTextColor="#363B4080"
              value={username}
              onChangeText={setUsername}
            />
          </View>
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
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#363B4080" />
            <TextInput
              style={styles.input}
              placeholder="Confirm password"
              placeholderTextColor="#363B4080"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={true}
            />
          </View>
        </View>

        {/* Button section */}
        <View style={styles.buttonContainer}>
          <ButtonComponent
            title={loading ? <ActivityIndicator color="#fff" /> : "Sign Up"}
            icon={loading ? null : "arrow-forward"}
            onPress={handleSignup}
            disabled={loading}
          />
          <Text style={styles.signinText}>
            Already have an account?
            <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
              <Text style={[styles.signinText, styles.signinText1]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup;

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
  signinText: {
    fontFamily: "CG_Regular",
    fontSize: 14,
    color: "#c0c0c0",
    marginTop: 5,
    textAlign: "center",
  },
  signinText1: {
    color: "#32BAE8",
    marginLeft: 5,
    textDecorationLine: "underline",
    top: 2,
    fontFamily: "CG_Medium",
  },
});
