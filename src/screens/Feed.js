import React, { Component } from "react";
import styled from "styled-components/native";
import { FlatList, Text, Keyboard } from "react-native";
import uuid from "uuid";

import PostItem from "../components/PostItem";

const ScreenContainer = styled.SafeAreaView`
  flex: 1;
`;

const InnerContainer = styled.View`
  width: 100%;
  flex: 1;
  padding: 12px 24px 0 24px;
`;

const TitleScreen = styled.Text`
  font-size: 19px;
  font-weight: bold;
  color: #000;
`;

const FormContainer = styled.View`
  padding: 8px;
  margin-top: 10px;
  width: 100%;
`;

const Input = styled.TextInput`
  font-size: 16px;
  color: #000;
  border-radius: 7px;
  height: 100px;
  border: 1px solid #000;
  padding: 6px;
`;

const SubmitPostButton = styled.TouchableOpacity`
  background-color: mediumslateblue;
  border-radius: 8px;
  border: none;
  width: 100px;
  padding: 12px;
  margin-top: 8px;
  margin-left: auto;
`;

const SubmitButtonText = styled.Text`
  text-align: center;
  color: #fff;
  font-size: 18px;
`;

const ListContainer = styled.SafeAreaView`
  margin-top: 12px;
  height: 400px;
  width: 100%;
  border: 1px solid #ccc;
`;

export class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [], poncheText: "" };
  }

  onSubmit = (text) => {
    const post = {
      id: uuid.v4(),
      text: text,
      date: new Date(),
    };
    this.setState({
      posts: this.state.posts.concat(post),
      poncheText: "",
    });
    Keyboard.dismiss();
  };

  onChange = (text) => {
    this.setState({
      poncheText: text,
    });
  };

  render() {
    return (
      <ScreenContainer>
        <InnerContainer>
          <TitleScreen>Sistema de Ponches</TitleScreen>
          <FormContainer>
            <Input
              multiline
              numberOfLines={4}
              value={this.state.poncheText}
              onChangeText={(text) => this.onChange(text)}
            />
            <SubmitPostButton
              onPress={() => this.onSubmit(this.state.poncheText)}
            >
              <SubmitButtonText>Publicar</SubmitButtonText>
            </SubmitPostButton>
          </FormContainer>

          <ListContainer>
            {this.state.posts.length === 0 ? (
              <Text>No hay avisos todavia</Text>
            ) : (
              <FlatList
                data={this.state.posts}
                renderItem={(item) => <PostItem item={item.item} />}
                keyExtractor={(item) => item.id}
              />
            )}
          </ListContainer>
        </InnerContainer>
      </ScreenContainer>
    );
  }
}

export default Feed;
