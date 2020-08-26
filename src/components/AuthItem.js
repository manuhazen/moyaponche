import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import moment from "moment";

moment.locale("es");

const ItemContainer = styled.View`
  padding: 6px;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const ImageContainer = styled.View`
  width: 35px;
  height: 35px;
  margin-right: 12px;
  border-radius: 5px;
`;

const AuthImage = styled.Image`
  width: 100%;
  flex: 1;
`;

const AuthItem = (props) => {
  let { item } = props;
  return (
    <ItemContainer>
      <ImageContainer>
        <AuthImage
          resizeMode="cover"
          source={
            item.type === 1
              ? require("../images/001-fingerprint.png")
              : require("../images/002-camera.png")
          }
        />
      </ImageContainer>
      <View>
        <Text>{item.by}</Text>
        <Text>{moment(item.date).format("MMMM, DD YYYY, HH:mm a")}</Text>
      </View>
    </ItemContainer>
  );
};

export default AuthItem;
