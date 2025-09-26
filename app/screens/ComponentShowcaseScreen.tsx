import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Collapsible } from '../../components/Collapsible';
import { ExternalLink } from '../../components/ExternalLink';
import { HelloWave } from '../../components/HelloWave';
import ParallaxScrollView from '../../components/ParallaxScrollView';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';

export default function ComponentShowcaseScreen() {
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <View style={styles.headerImage}>
          <ThemedText type="title" style={styles.headerTitle}>
            Component Showcase
          </ThemedText>
          <HelloWave />
        </View>
      }
    >
      <ThemedView style={styles.container}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Themed Components
        </ThemedText>

        <ThemedView style={styles.componentCard}>
          <ThemedText type="defaultSemiBold">ThemedText Examples:</ThemedText>
          <ThemedText type="default">Default text</ThemedText>
          <ThemedText type="title">Title text</ThemedText>
          <ThemedText type="defaultSemiBold">Semi-bold text</ThemedText>
          <ThemedText type="subtitle">Subtitle text</ThemedText>
          <ThemedText type="link">Link text</ThemedText>
        </ThemedView>

        <ThemedView style={styles.componentCard}>
          <ThemedText type="defaultSemiBold">ThemedView:</ThemedText>
          <ThemedView style={styles.themedViewExample}>
            <ThemedText>This is inside a ThemedView</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Interactive Components
        </ThemedText>

        <ThemedView style={styles.componentCard}>
          <ThemedText type="defaultSemiBold">Collapsible Component:</ThemedText>
          <Collapsible title="Tap to expand/collapse">
            <ThemedText>
              This content can be collapsed and expanded. It&apos;s useful for showing/hiding
              additional information or options.
            </ThemedText>
          </Collapsible>
        </ThemedView>

        <ThemedText type="subtitle" style={styles.sectionTitle}>
          External Links
        </ThemedText>

        <ThemedView style={styles.componentCard}>
          <ThemedText type="defaultSemiBold">ExternalLink Component:</ThemedText>
          <ExternalLink href="https://docs.expo.dev">
            <ThemedText type="link">Visit Expo Documentation</ThemedText>
          </ExternalLink>
          <ExternalLink href="https://reactnative.dev">
            <ThemedText type="link">Visit React Native Documentation</ThemedText>
          </ExternalLink>
        </ThemedView>

        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Animations
        </ThemedText>

        <ThemedView style={styles.componentCard}>
          <ThemedText type="defaultSemiBold">HelloWave Animation:</ThemedText>
          <HelloWave />
          <ThemedText style={styles.description}>
            The HelloWave component demonstrates smooth animations using React Native Reanimated.
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    padding: 20,
    gap: 20,
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
  },
  componentCard: {
    padding: 16,
    borderRadius: 8,
    gap: 12,
  },
  themedViewExample: {
    padding: 12,
    borderRadius: 6,
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    marginTop: 8,
    opacity: 0.7,
  },
});
