import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Browse all</Text>
      <View style={styles.grid}>
        <View style={[styles.tile, { backgroundColor: '#E8115B' }]}>
          <Text style={styles.tileText}>Podcasts</Text>
        </View>
        <View style={[styles.tile, { backgroundColor: '#1E3264' }]}>
          <Text style={styles.tileText}>Made for you</Text>
        </View>
        <View style={[styles.tile, { backgroundColor: '#477D95' }]}>
          <Text style={styles.tileText}>Charts</Text>
        </View>
        <View style={[styles.tile, { backgroundColor: '#503750' }]}>
          <Text style={styles.tileText}>New releases</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191414',
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tile: {
    width: '47%',
    height: 100,
    borderRadius: 8,
    padding: 12,
    justifyContent: 'flex-end',
  },
  tileText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
