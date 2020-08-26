import React, { Component } from "react";
import styled from "styled-components/native";

const LoginContainer = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  background-color: #f9f9f9;
  justify-content: center;
`;

const InnerContainer = styled.View`
  width: 100%;
  flex: 1;
  padding: 0 24px;
  justify-content: center;
`;

const ImageContainer = styled.View`
  margin: 0 auto 30px auto;
  width: 100px;
  height: 100px;
`;

const Image = styled.Image`
  height: 100%;
  width: 100%;
`;

const Input = styled.TextInput`
  font-size: 19px;
  border: 1px solid #000;
  padding: 12px 6px;
  border-radius: 10px;
  margin-top: 10px;
`;

const SubmitButton = styled.TouchableOpacity`
  margin-top: 24px;
  width: 100%;
  background-color: blanchedalmond;
  padding: 12px;
  border-radius: 12px;
`;

const TextButton = styled.Text`
  font-size: 19px;
  text-align: center;
`;

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  render() {
    const { login } = this.props;
    return (
      <LoginContainer>
        <InnerContainer>
          <ImageContainer>
            <Image
              source={require("../images/003-key.png")}
              resizeMode="cover"
            />
          </ImageContainer>
          <Input
            placeholder="Correo"
            keyboardType="email-address"
            value={this.state.email}
            onChange={(text) => this.setState({ email: text })}
          />
          <Input
            secureTextEntry
            placeholder="Contraseña"
            keyboardType="visible-password"
            value={this.state.password}
            onChange={(text) => this.setState({ password: text })}
          />
          <SubmitButton
            onPress={() =>
              login({ email: this.state.email, password: this.state.password })
            }
          >
            <TextButton>Ingresar</TextButton>
          </SubmitButton>
        </InnerContainer>
      </LoginContainer>
    );
  }
}

export default Login;
