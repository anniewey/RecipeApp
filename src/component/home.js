/**
 * @format
 * @flow
 */

import {
  Body,
  Button,
  Container,
  Header,
  Icon,
  Item,
  Left,
  ListItem,
  Picker,
  Right,
  Text,
  Thumbnail,
  Title
} from 'native-base';
import { Dimensions, FlatList, Platform, StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import XMLParser from 'react-xml-parser';

import { recipeAddAction } from '../actions';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const RECIPE_LOGO = require('../../img/recipe.png');

import RNFetchBlob, { fs } from 'rn-fetch-blob';

function Home({ navigation }) {
  const [type, setType] = useState([]);
  const [selectedType, setSelectedType] = useState('All');

  const state = useSelector(states => states);

  useEffect(() => {
    if (!type.length) {
      const path =
        Platform.OS === 'ios'
          ? RNFetchBlob.fs.dirs.MainBundleDir + '/assets/recipetypes.xml'
          : RNFetchBlob.fs.asset('recipetypes.xml');

      RNFetchBlob.fs.readFile(path).then(res => {
        const xml = new XMLParser().parseFromString(res); // parsing the xml content from data.xml
        const xmlData = xml.getElementsByTagName('type');

        let xmlType = [];
        xmlData.forEach(item => xmlType.push(item.value));
        setType(xmlType);
      });
    }
  });

  const onPickerValueChange = value => {
    setSelectedType(value);
  };

  const renderHeader = () => {
    return state.recipe.length ? (
      <Picker
        mode="dropdown"
        iosHeader="Recipe Type"
        iosIcon={
          <Icon
            name="filter"
            type="MaterialCommunityIcons"
            style={styles.filterIcon}
          />
        }
        textStyle={styles.filterText}
        style={styles.filterView}
        placeholder="Filter recipe type"
        selectedValue={selectedType}
        onValueChange={onPickerValueChange}
      >
        {type.map((item, index) => (
          <Item label={item} value={item} key={index} />
        ))}
        <Item label={'All'} value={'All'} key={type.length + 1} />
      </Picker>
    ) : null;
  };

  const renderEmpty = () => (
    <View style={styles.emptyView}>
      <Text style={styles.emptyText}>No recipe listed yet. Add one now!</Text>
    </View>
  );

  const renderItem = ({ item }) => {
    return (
      <ListItem onPress={() => navigation.navigate('Recipe', { data: item })}>
        <Left>
          <Thumbnail large source={item.image || RECIPE_LOGO} />
        </Left>
        <Body style={styles.listBody}>
          <View style={styles.listView}>
            <View>
              <Text style={styles.listName}>{item.name}</Text>
              {item.time ? <Text>{`Prep: ${item.time} hrs`}</Text> : null}
            </View>
            <Text note>{item.type}</Text>
          </View>
        </Body>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    );
  };

  return (
    <Container>
      <Header>
        <Left style={styles.headerSide} />
        <Body>
          <Title>My Recipes</Title>
        </Body>
        <Right style={styles.headerSide}>
          <Button
            transparent
            onPress={() => navigation.navigate('UpdateRecipe')}
          >
            <Icon name="md-add" />
          </Button>
        </Right>
      </Header>

      <FlatList
        data={
          selectedType !== 'All'
            ? state.recipe.filter(obj => obj.type === selectedType)
            : state.recipe
        }
        stickyHeaderIndices={[0]}
        keyExtractor={item => item.id?.toString()}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  emptyView: {
    height: DEVICE_HEIGHT * 0.9,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyText: { color: '#999' },
  filterIcon: { color: '#999' },
  filterText: { color: '#666' },
  filterView: { backgroundColor: '#EFEFEF' },
  listBody: { flex: 3 },
  listView: { justifyContent: 'space-between', flex: 0.5 },
  listName: { fontSize: 18, fontWeight: 'bold' },
  headerSide: { flex: 1 }
});

export default Home;
