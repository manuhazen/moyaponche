import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import moment from "moment";

const Container = styled.View`
  width: 100%;
  padding: 4px 12px;
  margin-bottom: 6px;
`;
const SummaryText = styled.Text`
  font-size: 17px;
  color: #000;
`;

const TimeText = styled.Text`
  font-size: 12px;
  color: #f90;
  font-style: italic;
  margin-top: 6px;
`;

const PostItem = (props) => {
  let { item } = props;
  return (
    <Container>
      <SummaryText>{item.text}</SummaryText>
      <TimeText>{moment(item.date).format("DD-MM-YYYY, HH:mm")}</TimeText>
    </Container>
  );
};

export default PostItem;
