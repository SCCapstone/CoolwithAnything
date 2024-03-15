import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const ToSScreen = () => {
  const navigation = useNavigation();
  return (
        <ScrollView style={{flex: 1}}>
            <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>Back</Text>
                </Pressable>
            </View>
            <View style={styles.contentTitleContainer}>
                <Text style={styles.contentTitleText}>Terms of Service</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.contentText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum maximus vel nisi sed facilisis. Praesent viverra sagittis volutpat. Donec vel facilisis lectus. Nulla facilisi. Nam finibus dignissim justo, quis venenatis urna cursus ultrices. Cras in ipsum et arcu suscipit luctus at vel dui. Nullam eu dui vitae elit eleifend mollis. Maecenas auctor ultrices nunc ut consectetur. Sed velit sem, tristique eu enim quis, scelerisque sollicitudin mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. 
                </Text>
                <Text style={styles.contentText}>
                Quisque fermentum semper venenatis. Curabitur sit amet ligula at sem lacinia cursus. Mauris lacinia mollis lectus, eu accumsan enim rhoncus vel. Etiam molestie dignissim dui, rhoncus pellentesque nisl tempus vel. Sed feugiat nulla diam, nec iaculis massa ultricies eu. In hac habitasse platea dictumst. Aenean eu dictum orci. 
                </Text>
                <Text style={styles.contentText}>
                Quisque blandit dapibus erat id convallis. Pellentesque in tincidunt est, at hendrerit dui. Donec venenatis nec arcu sit amet ultrices. Integer pellentesque pretium nunc, in vestibulum urna vehicula dictum. Nunc fringilla risus in enim mollis, non varius eros porttitor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla lobortis eros et lacinia convallis. Praesent nisl velit, iaculis et dolor non, venenatis bibendum nisl. Ut eu libero iaculis, vehicula tellus rutrum, dapibus lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                </Text>
                <Text style={styles.contentText}>
                Suspendisse eu libero gravida, hendrerit quam vel, aliquet ligula. Nulla suscipit nulla nec sem efficitur, at aliquam ante malesuada. Cras vel urna id diam ultricies ultrices vitae sed urna. Curabitur tincidunt iaculis semper. Mauris at vulputate mauris, eu consequat lacus. Aliquam aliquam dolor sit amet ante ullamcorper lacinia. In mattis vestibulum est sit amet iaculis. Phasellus id quam maximus, venenatis nisl vitae, maximus dui. Curabitur ut odio non velit tristique semper a quis leo.
                </Text>   
                <Text style={styles.contentText}>
                Quisque fringilla quis nisi vulputate tempor. Praesent eu nibh at quam vehicula commodo. Aliquam nisi sapien, laoreet facilisis nunc id, auctor tempor velit. Aliquam dapibus maximus ante. Morbi nibh enim, laoreet vitae sodales in, porta at dui. Nunc sit amet congue lectus, nec vulputate sem. Ut velit libero, sagittis id eros eget, aliquam venenatis nisl. Nunc elit turpis, faucibus auctor sapien id, laoreet aliquet diam. Quisque augue metus, elementum a pellentesque eu, lobortis et velit. Suspendisse pulvinar nibh ut volutpat faucibus. Aliquam erat volutpat.
                </Text>     
            </View>
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', 
    position: 'relative', 
  },
  header: {
    position: 'absolute', 
    top: 45, 
    left: 20, 
    zIndex: 1, 
  },
  backText: {
    fontSize: 18,
    fontWeight: '700',
  },
  contentTitleContainer: {
    marginTop: 85,
    alignItems: 'center',
  },
  contentTitleText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: -20,
  },
  content: {
    padding: 20,
  },
  contentText: {
    marginTop: 20,
  }
});

export default ToSScreen;
