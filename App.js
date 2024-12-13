import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, NativeModules, Button } from 'react-native';

const { ManageExternalStorage } = NativeModules;

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    // Check permissions on component mount
    async function checkPermission() {
      const permissionStatus = await ManageExternalStorage.hasPermission();
      setHasPermission(permissionStatus);
    }

    checkPermission();
  }, []);

  // Request permission when the button is clicked
  async function requestPermission() {
    try {
      const result = await ManageExternalStorage.requestPermission();
      setHasPermission(result); // Update the state based on user's response
    } catch (error) {
      console.error("Permission request error:", error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {hasPermission === null
          ? "Checking permissions..."
          : hasPermission
          ? "Permission granted! 🎉"
          : "Permission denied. 😞"}
      </Text>
      {hasPermission === false && (
        <Button
          title="Request Permission"
          onPress={requestPermission}
          color="#6200EE"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default App;
