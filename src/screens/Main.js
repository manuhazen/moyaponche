import React, { Component } from "react";
import { StyleSheet, FlatList, Alert, Platform, Modal } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import Constants from "expo-constants";
import styled from "styled-components/native";
import AuthItem from "../components/AuthItem";
import { Camera } from "expo-camera";
import { DATA } from "../utils";
import uuid from "uuid";

const MainContainer = styled.View`
  flex: 1;
  padding-top: ${Constants.statusBarHeight}px;
  background-color: #ecf0f1;
  margin: 0 12px;
`;

const HeaderText = styled.Text`
  font-size: 18px;
  text-align: center;
  margin-right: 12px;
  margin-left: 12px;
`;

const SectionText = styled.Text`
  font-size: 18px;
  padding: 12px 0;
  margin-right: 12px;
  margin-left: 12px;
  text-align: left;
`;

const ButtonsContainer = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 15px;
`;

const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 45px;
  background-color: #056ecf;
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  color: #fff;
`;

const ListContainer = styled.SafeAreaView`
  margin-top: 12px;
  height: 400px;
  width: 100%;
  border: 1px solid #ccc;
`;

const ControlCamera = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  background-color: #056ecf;
  align-items: center;
  justify-content: center;
`;

const ControlCameraText = styled.Text`
  font-size: 18px;
  color: #fff;
  text-align: center;
`;

export class Main extends Component {
  state = {
    punchs: [],
    compatible: false,
    fingerprints: false,
    typeCamera: null,
    modalVisible: false,
    result: "",
  };

  async componentDidMount() {
    await Camera.requestPermissionsAsync();
    this.checkDeviceForHardware();
    this.checkForFingerprints();
    this.setState({
      punchs: DATA,
      typeCamera: Camera.Constants.Type.front,
    });
  }

  toggleCamera = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  checkDeviceForHardware = async () => {
    let compatible = await LocalAuthentication.hasHardwareAsync();
    this.setState({ compatible });
  };

  checkForFingerprints = async () => {
    let fingerprints = await LocalAuthentication.isEnrolledAsync();
    this.setState({ fingerprints });
  };

  scanFingerprint = async () => {
    await LocalAuthentication.authenticateAsync({
      promptMessage: "Escanea tu huella para ponchar",
    });
    this.setState({
      punchs: [
        ...this.state.punchs,
        { id: uuid.v4(), type: 1, by: "Alex Moya", date: new Date() },
      ],
    });
  };

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 1, base64: true };
      await this.camera.takePictureAsync(options);
      await this.setState({
        punchs: [
          ...this.state.punchs,
          { id: uuid.v4(), type: 0, by: "Alex Moya", date: new Date() },
        ],
      });
      this.toggleCamera();
    }
  };

  showAndroidAlert = () => {
    Alert.alert(
      "Fingerprint Scan",
      "Place your finger over the touch sensor and press scan.",
      [
        {
          text: "Scan",
          onPress: () => {
            this.scanFingerprint();
          },
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel"),
          style: "cancel",
        },
      ]
    );
  };

  render() {
    return (
      <MainContainer>
        <Modal animationType="slide" visible={this.state.modalVisible}>
          <Camera
            ref={(ref) => {
              this.camera = ref;
            }}
            style={{ height: 400, flexDirection: "column-reverse" }}
            type={this.state.typeCamera}
          >
            <ControlCamera onPress={() => this.takePicture()}>
              <ControlCameraText>Tomar FotoPonche</ControlCameraText>
            </ControlCamera>
          </Camera>
        </Modal>
        <HeaderText>Ponche O&M</HeaderText>
        <ButtonsContainer>
          <Button
            onPress={
              Platform.OS === "android"
                ? this.scanFingerprint
                : this.scanFingerprint
            }
          >
            <ButtonText>Escanea tu Huella</ButtonText>
          </Button>
          <Button onPress={() => this.toggleCamera()}>
            <ButtonText>Toma una Foto</ButtonText>
          </Button>
        </ButtonsContainer>
        <SectionText>Lista de ultimos ponches</SectionText>
        <ListContainer>
          <FlatList
            data={this.state.punchs}
            renderItem={(item) => <AuthItem item={item.item} />}
            keyExtractor={(item) => item.id}
          />
        </ListContainer>
      </MainContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginRight: 12,
    marginLeft: 12,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 45,
    backgroundColor: "#056ecf",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
});

export default Main;
