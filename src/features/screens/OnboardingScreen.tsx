// src/features/onboarding/screens/OnboardingScreen.tsx
import React, { useCallback, useRef, useState } from "react";
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
import Button from "../../shared/ui/Button";
import { H1, H2, P } from "../../shared/ui/Text";
import DotPager from "../components/DotPager";

const { width, height } = Dimensions.get("window");
const BUTTON_HEIGHT = 56;
const CARD_HEIGHT = 520;

const slides = [
  // FULL-BLEED (page 1) — no dots, no button
  {
    hero: require("../onboarding/assets/Images/ob4.png"),
    title: "Welcome to 👋",
    headline: "Moon",
    subtitle: "The best e-commerce app of the century for your daily needs!",
    fullBleed: true,
  },
  // STANDARD (pages 2–4)
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
  const insets = useSafeAreaInsets();
  const listRef = useRef<FlatList>(null);

  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);

  // Update index WHILE swiping so dots/button show immediately
  const handleScroll = useCallback((e: any) => {
    const x = e.nativeEvent.contentOffset.x;
    const i = Math.round(x / width); // flips at 50%
    if (i !== indexRef.current) {
      indexRef.current = i;
      setIndex(i);
    }
  }, []);

  const goNext = () => {
    const i = index;
    if (slides[i]?.last) {
      // TODO: navigate to auth/home
      return;
    }
    listRef.current?.scrollToIndex({
      index: Math.min(i + 1, slides.length - 1),
      animated: true,
    });
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: t.colors.bg }}
      edges={["top"]}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={index === 0 ? "light-content" : "dark-content"}
      />

      <FlatList
        ref={listRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={slides}
        keyExtractor={(_, i) => String(i)}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => {
          // ---------- FULL-SCREEN FIRST SLIDE (the version you preferred) ----------
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
                    {}
                  </LinearGradient>
                </ImageBackground>
              </View>
            );
          }

          // ---------- STANDARD SLIDES (2–4): image card + centered text ----------
          return (
            <View
              style={{
                width,
                paddingHorizontal: 20,
                paddingTop: 20,
                // leave vertical room for global dots + fixed bottom button
                paddingBottom: BUTTON_HEIGHT + Math.max(84, insets.bottom + 72),
              }}
            >
              <View
                style={{
                  height: CARD_HEIGHT,
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

              <View style={{ marginTop: 24, alignItems: "center" }}>
                <H2 style={{ textAlign: "center", lineHeight: 28 }}>
                  {item.title}
                </H2>
                {item.subtitle ? (
                  <P style={{ marginTop: 8, textAlign: "center" }}>
                    {item.subtitle}
                  </P>
                ) : null}
              </View>
            </View>
          );
        }}
      />

      {/* ---------- Global dots (previous placement): float above button; hidden on page 1 ---------- */}
      {index > 0 && (
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: Math.max(84, insets.bottom + 72), // sits clearly above the CTA
            alignItems: "center",
          }}
        >
          {/* 3 dots only (pages 2–4) */}
          <DotPager total={slides.length - 1} index={index - 1} />
        </View>
      )}

      {/* ---------- Fixed bottom CTA (Next / Get Started); hidden on page 1 ---------- */}
      {index > 0 && (
        <View
          style={{
            position: "absolute",
            left: 16,
            right: 16,
            bottom: Math.max(16, insets.bottom + 12),
          }}
        >
          <Button
            title={slides[index].last ? "Get Started" : "Next"}
            onPress={goNext}
            style={{ height: BUTTON_HEIGHT, borderRadius: 999 }}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
