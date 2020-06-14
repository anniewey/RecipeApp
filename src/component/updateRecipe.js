/**
 * @format
 * @flow
 */

import { Alert, StyleSheet, View } from 'react-native';
import {
  Body,
  Button,
  Container,
  Content,
  Form,
  Header,
  Icon,
  Input,
  Item,
  Label,
  Left,
  Picker,
  Right,
  Text,
  Title
} from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import ImagePicker from 'react-native-image-picker';
import React, { useState, useEffect } from 'react';
import XMLParser from 'react-xml-parser';

import { recipeAddAction, recipeUpdateAction } from '../actions';

function UpdateRecipe({ navigation, route }) {
  const [type, setType] = useState([]);
  const [name, setName] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [image, setImage] = useState(null);
  const [time, setTime] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [step, setStep] = useState('');

  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const addRecipe = recipe => dispatch(recipeAddAction(recipe));
  const updateRecipe = recipe => dispatch(recipeUpdateAction(recipe));

  const navData = route?.params?.data;

  useEffect(() => {
    RNFetchBlob.fs
      .readFile(RNFetchBlob.fs.dirs.MainBundleDir + '/assets/recipetypes.xml')
      .then(res => {
        // console.log('data', res);
        const xml = new XMLParser().parseFromString(res); // parsing the xml content from data.xml
        const xmlData = xml.getElementsByTagName('type');
        // console.log(xmlData);

        let xmlType = [];
        xmlData.forEach(item => xmlType.push(item.value));
        setType(xmlType);
      });

    if (navData) {
      setName(navData.name);
      setSelectedType(navData.type);
      setStep(navData.step);
      setIngredient(navData.ingredient || '');
      setImage(navData.image || null);
      setTime(navData.time || '');
    }
  }, []);

  const verifyField = () => {
    if (!name.trim() || !selectedType || !step.trim()) {
      Alert.alert('Oops!', 'Please fill the required fields', 'OK');
      return false;
    }
    return true;
  };

  const onPickerValueChange = value => {
    setSelectedType(value);
  };

  const onPressAdd = () => {
    const verified = verifyField();

    if (verified) {
      const obj = {
        name,
        time,
        ingredient,
        step,
        image,
        type: selectedType
      };

      addRecipe(obj);

      Alert.alert(
        'Yummy!',
        'Your recipe has been added succesfully',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            }
          }
        ],
        { cancelable: false }
      );
    }
  };

  const onPressUpdate = () => {
    const verified = verifyField();

    if (verified) {
      const obj = {
        name,
        time,
        ingredient,
        step,
        image,
        type: selectedType,
        id: navData.id
      };

      updateRecipe(obj);

      Alert.alert(
        'Sweet!',
        'Your recipe has been updated succesfully',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Recipe', { data: obj });
            }
          }
        ],
        { cancelable: false }
      );
    }
  };

  const onPressImagePicker = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {
          uri: response.uri,
          name: response.fileName || `${Date.now()}.jpg`,
          type: response.type
        };

        setImage(source);
      }
    });
  };

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Text>Cancel</Text>
          </Button>
        </Left>
        <Body>
          <Title>{route?.params?.data ? 'Update Recipe' : 'Add Recipe'}</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={route?.params?.data ? onPressUpdate : onPressAdd}
          >
            <Text>{route?.params?.data ? 'Update' : 'Add'}</Text>
          </Button>
        </Right>
      </Header>
      <Content>
        <Form style={styles.formView}>
          <Item fixedLabel>
            <Label>Name *</Label>
            <Input onChangeText={text => setName(text)} value={name} />
          </Item>
          <Item picker style={{ marginLeft: 15 }}>
            <Label style={{ flex: 1 }}>Type *</Label>
            <View style={{ flex: 2.4 }}>
              <Picker
                mode="dropdown"
                iosHeader="Recipe Type"
                iosIcon={
                  <Icon name="arrow-down" style={styles.placeholderText} />
                }
                placeholder="Select"
                placeholderStyle={styles.placeholderText}
                selectedValue={selectedType}
                onValueChange={onPickerValueChange}
              >
                {type.map((item, index) => (
                  <Item label={item} value={item} key={index} />
                ))}
              </Picker>
            </View>
          </Item>
          <Item fixedLabel>
            <Label>Image</Label>
            <View style={{ flex: 2.4 }}>
              <Button transparent onPress={onPressImagePicker}>
                <View style={styles.imageView}>
                  <Text
                    style={image ? styles.normalText : styles.placeholderText}
                  >
                    {image ? image.name : 'Add Image'}
                  </Text>
                  <Icon name="arrow-down" style={styles.placeholderText} />
                </View>
              </Button>
            </View>
          </Item>

          <Item fixedLabel>
            <Label>Prep Time</Label>
            <Input
              placeholder="2 (hours)"
              placeholderTextColor={'#999'}
              keyboardType={'numeric'}
              onChangeText={text => setTime(text)}
              value={time}
            />
          </Item>

          <Item style={styles.multiItem}>
            <Label>Ingredients</Label>
            <Input
              multiline
              style={styles.multiInput}
              onChangeText={text => setIngredient(text)}
              value={ingredient}
            />
          </Item>

          <Item style={styles.multiItem}>
            <Label>Steps *</Label>
            <Input
              multiline
              style={styles.multiInputLarge}
              onChangeText={text => setStep(text)}
              value={step}
            />
          </Item>
        </Form>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  placeholderText: { color: '#999' },
  normalText: { color: '#000' },
  formView: { paddingRight: 15 },
  imageView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between'
  },
  multiItem: {
    alignItems: 'flex-start',
    paddingVertical: 15,
    flexDirection: 'column'
  },
  multiInput: { marginBottom: 10, width: '100%', height: 150 },
  multiInputLarge: { marginBottom: 10, width: '100%', height: 200 }
});

export default UpdateRecipe;
