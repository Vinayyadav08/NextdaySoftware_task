import * as React from "react";
import { StatusBar, StyleSheet, Text, useWindowDimensions } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import AllMembers from "./Screens/AllMembers";
import SavedMembers from "./Screens/SavedMembers";
import { NavigationContainer } from "@react-navigation/native";

const routes = [
  { key: "all_Members", title: "ALL MEMBERS" },
  { key: "saved_Members", title: "SAVED MEMBERS" },
];

export default function App() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "all_Members":
        return <AllMembers index={index} />;
      case "saved_Members":
        return <SavedMembers index={index} />;
      default:
        return null;
    }
  };

  return (
    <>
      <StatusBar
        style="auto"
        animated={true}
        backgroundColor="white"
        barStyle="dark-content"
      />
      <NavigationContainer>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              style={styles.tabBar}
              indicatorStyle={styles.indicator}
              activeColor="#d4af37"
              inactiveColor="lightgray"
            />
          )}
        />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 3,
  },
  indicator: {
    backgroundColor: "black",
    height: 3,
  },
});
