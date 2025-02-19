import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Validation Schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format.")
    .required("Email is required."),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long.")
    .required("Password is required."),
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <Text style={styles.title}>Welcome Back</Text>

          {/* Hình ảnh hoặc logo */}
          <Image
            source={require("../assets/login-logo.png")}
            style={styles.logo}
          />

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="#999"
              style={styles.icon}
            />
            <TextInput
              placeholder="Email"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
          </View>
          {touched.email && errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="lock-outline"
              size={24}
              color="#999"
              style={styles.icon}
            />
            <TextInput
              placeholder="Password"
              style={styles.input}
              secureTextEntry={!showPassword}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <MaterialCommunityIcons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="#999"
              />
            </TouchableOpacity>
          </View>
          {touched.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          {/* Remember Password Checkbox */}
          <View style={styles.checkboxContainer}>
            <Checkbox
              status={remember ? "checked" : "unchecked"}
              onPress={() => setRemember(!remember)}
            />
            <Text style={styles.checkboxLabel}>Remember password</Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>

          {/* Signup Link */}
          <Text style={styles.signupText}>
            Don't have an account?{" "}
            <Text style={styles.signupLink}>Sign up</Text>
          </Text>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width : '100%' ,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 25,
    
    fontSize: 16,
  },
  icon: {
    marginRight: 8,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  loginButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#FF3B30",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 10,
    color: "#333",
  },
  logo: {
    width: 300,  
    height: 270,
    alignSelf: "center",
    marginBottom: 15, 
  },
  signupLink: {
    color: "#007AFF",
    fontWeight: "bold",
  },
});

export default LoginPage;
