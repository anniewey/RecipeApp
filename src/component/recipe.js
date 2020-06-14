/**
 * @format
 * @flow
 */

import { Alert, Image, StyleSheet, View } from 'react-native';
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Right,
  Text,
  Title
} from 'native-base';
import { useDispatch } from 'react-redux';
import React from 'react';

import { recipeDeleteAction } from '../actions';

const RECIPE_LOGO = require('../../img/recipe.png');

function Recipe({ navigation, route }) {
  const navData = route.params.data;

  const dispatch = useDispatch();
  const deleteRecipe = id => dispatch(recipeDeleteAction(id));

  const onPressDelete = () => {
    Alert.alert(
      'Delete',
      'Are you sure to delete this recipe?',
      [
        {
          text: 'OK',
          onPress: () => {
            deleteRecipe(route.params.data.id);
            Alert.alert('Deleted!', 'Your recipe has been deleted');
            navigation.goBack();
          }
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <Container>
      <Header>
        <Left style={styles.headerSide}>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Recipe Details</Title>
        </Body>
        <Right style={styles.headerSide}>
          <Button
            transparent
            onPress={() =>
              navigation.navigate('UpdateRecipe', { data: route.params.data })
            }
          >
            <Icon name="md-create" />
          </Button>
          <Button transparent onPress={onPressDelete}>
            <Icon name="md-trash" />
          </Button>
        </Right>
      </Header>
      <Content style={styles.container}>
        <View style={styles.imageView}>
          <Image source={navData.image || RECIPE_LOGO} style={styles.image} />
          <Text note uppercase>
            {navData.type}
          </Text>
          <Text style={styles.title}>{navData.name}</Text>
        </View>
        {navData.ingredient ? (
          <View style={styles.detailsView}>
            <Text style={styles.detailsTitle}>Ingredients</Text>
            <Text>{navData.ingredient}</Text>
          </View>
        ) : null}

        <View style={styles.detailsView}>
          <Text style={styles.detailsTitle}>Steps</Text>
          <Text>{navData.step}</Text>
        </View>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: { margin: 20 },
  imageView: { alignItems: 'center', marginBottom: 5 },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 15
  },
  title: { fontSize: 22, fontWeight: 'bold', marginTop: 3 },
  detailsView: {
    backgroundColor: '#EEE',
    marginTop: 15,
    padding: 15,
    borderRadius: 10
  },
  detailsTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  headerSide: { flex: 1 }
});

export default Recipe;
