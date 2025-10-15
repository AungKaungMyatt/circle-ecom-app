import React, { useRef, useState } from "react";
import {
  View,
  FlatList,
  Dimensions,
  Image,
  StatusBar,
  ImageBackground,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../app/providers/ThemeProvider";
import Card from "../../shared/ui/Card";
import { H1, H2, P } from "../../shared/ui/Text";
import DotPager from "../components/DotPager";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    hero: require("../onboarding/assets/Images/ob4.png"),
    title: "Welcome to 👋",
    headline: "Moon",
    subtitle: "The best e-commerce app of the century for your daily needs!",
    fullBleed: true, // full screen, no button, no dots
  },
  {
    hero: require("../onboarding/assets/Images/ob8.png"),
    title: "We provide high quality products just for you",
  },
  {
    hero: require("../onboarding/assets/Images/ob3.png"),
    title: "Your satisfaction is our number one priority",
  },
  {
    hero: require("../onboarding/assets/Images/ob7.png"),
    title: "Let’s fulfill your daily needs with Moon right now!",
    last: true,
  },
];

export default function OnboardingScreen() {
  const t = useTheme();
  const [index, setIndex] = useState(0);
  const ref = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: t.colors.bg }}
      edges={["top"]}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={slides[index]?.fullBleed ? "light-content" : "dark-content"}
      />

      <FlatList
        ref={ref}
        horizontal
        pagingEnabled
        data={slides}
        keyExtractor={(_, i) => String(i)}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) =>
          setIndex(Math.round(e.nativeEvent.contentOffset.x / width))
        }
        renderItem={({ item }) => {
          // ----- FULL SCREEN FIRST SLIDE -----
          if (item.fullBleed) {
            return (
              <View style={{ width }}>
                <ImageBackground
                  source={item.hero}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  imageStyle={{
                    resizeMode: "cover",
                  }}
                >
                  <LinearGradient
                    colors={[
                      "rgba(0,0,0,0)",
                      "rgba(0,0,0,0.55)",
                      "rgba(0,0,0,0.9)",
                    ]}
                    locations={[0.35, 0.75, 1]}
                    style={{
                      flex: 1,
                      justifyContent: "flex-end",
                      paddingHorizontal: 20,
                      paddingBottom: Math.max(20, insets.bottom + 12),
                    }}
                  >
                    <H2 style={{ color: "#fff", marginBottom: 4 }}>
                      {item.title}
                    </H2>
                    <H1 style={{ color: "#fff", marginBottom: 8 }}>
                      {item.headline}
                    </H1>
                    <P style={{ color: "rgba(255,255,255,0.9)" }}>
                      {item.subtitle}
                    </P>
                    {/* No button here; user swipes to continue */}
                  </LinearGradient>
                </ImageBackground>
              </View>
            );
          }

          // ----- OTHER SLIDES (your previous layout) -----
          return (
            <View style={{ width, paddingHorizontal: 20, paddingTop: 20 }}>
              <View
                style={{
                  height: 520,
                  borderRadius: 24,
                  overflow: "hidden",
                  backgroundColor: t.colors.card,
                }}
              >
                <Image
                  source={item.hero}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />
              </View>

              <Card style={{ marginTop: 16 }}>
                {item.headline ? (
                  <H1 style={{ marginBottom: 4 }}>{item.headline}</H1>
                ) : null}
                <H2 style={{ marginBottom: 8 }}>{item.title}</H2>
                {item.subtitle ? <P>{item.subtitle}</P> : null}
                {/* Keep button off; swipe to proceed on all slides */}
              </Card>
            </View>
          );
        }}
      />

      {/* Hide dots on the first (full-screen) slide */}
      {index > 0 && (
        <View
          style={{
            position: "absolute",
            bottom: Math.max(24, insets.bottom + 8),
            left: 0,
            right: 0,
          }}
        >
          <DotPager total={slides.length} index={index} />
        </View>
      )}
    </SafeAreaView>
  );
}
